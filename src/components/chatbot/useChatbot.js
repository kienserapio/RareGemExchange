/**
 * useChatbot.js
 * ────────────────────────────────────────────────────────────────────────────
 * The concierge state machine. Owns conversation history, open/loading state,
 * the user's position in the decision tree, and the simulated async control
 * flow (cycling "thinking" phrases + randomised delay) for every reply.
 *
 * All timing side-effects funnel through two refs so they can be reliably
 * cleared on unmount, reset, or when a new message supersedes an in-flight one.
 * ────────────────────────────────────────────────────────────────────────────
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  KNOWLEDGE_BASE,
  INITIAL_QUICK_REPLIES,
  HUMAN_SUPPORT_REPLY,
  KEYWORD_MAP,
  ROOT_KEY,
} from './knowledgeBase';
import {
  matchNodeKey,
  getNode,
  getQuickRepliesForNode,
  buildShuffledPhrases,
  randomResponseDelay,
  FALLBACK_MESSAGE,
  PHRASE_INTERVAL_MS,
} from './chatbotEngine';

/**
 * A single chat transcript entry.
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {'user'|'bot'} sender
 * @property {string} text
 * @property {number} timestamp Epoch ms.
 */

/**
 * @typedef {import('./knowledgeBase').QuickReply} QuickReply
 */

/* Monotonic id generator — unique even within the same millisecond. */
let messageSeq = 0;
/**
 * @param {'user'|'bot'} sender
 * @param {string} text
 * @returns {ChatMessage}
 */
function createMessage(sender, text) {
  messageSeq += 1;
  return { id: `msg-${Date.now()}-${messageSeq}`, sender, text, timestamp: Date.now() };
}

/** The welcome message, recreated fresh each time so timestamps are current. */
function welcomeMessage() {
  return createMessage('bot', KNOWLEDGE_BASE[ROOT_KEY].message);
}

/**
 * The concierge chatbot hook.
 * @returns {{
 *   isOpen: boolean,
 *   chatHistory: ChatMessage[],
 *   isLoading: boolean,
 *   loadingText: string,
 *   currentNode: string,
 *   availableQuickReplies: QuickReply[],
 *   sendUserMessage: (text: string) => void,
 *   selectQuickReply: (reply: QuickReply) => void,
 *   openChat: () => void,
 *   closeChat: () => void,
 *   resetChat: () => void,
 * }}
 */
export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState(/** @type {ChatMessage[]} */ ([]));
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [currentNode, setCurrentNode] = useState(ROOT_KEY);
  const [availableQuickReplies, setAvailableQuickReplies] = useState(
    /** @type {QuickReply[]} */ (INITIAL_QUICK_REPLIES),
  );

  // Timers + a liveness guard so a resolving response never sets state after
  // the component has unmounted.
  const phraseTimer = useRef(/** @type {ReturnType<typeof setInterval>|null} */ (null));
  const resolveTimer = useRef(/** @type {ReturnType<typeof setTimeout>|null} */ (null));
  const isMounted = useRef(true);

  /** The fallback path always offers the curated replies plus a human handoff. */
  const fallbackReplies = useMemo(
    () => [...INITIAL_QUICK_REPLIES, HUMAN_SUPPORT_REPLY],
    [],
  );

  const clearTimers = useCallback(() => {
    if (phraseTimer.current) {
      clearInterval(phraseTimer.current);
      phraseTimer.current = null;
    }
    if (resolveTimer.current) {
      clearTimeout(resolveTimer.current);
      resolveTimer.current = null;
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      clearTimers();
    };
  }, [clearTimers]);

  /**
   * Run the simulated async response for a resolved node (or fallback when
   * `nodeKey` is null / unknown): show the loader, cycle phrases, then append
   * the bot reply and refresh the context-aware quick replies.
   * @param {string|null} nodeKey
   */
  const runResponse = useCallback(
    (nodeKey) => {
      clearTimers();
      setIsLoading(true);
      setAvailableQuickReplies([]); // hide replies while "thinking"

      const phrases = buildShuffledPhrases();
      let index = 0;
      setLoadingText(phrases[0]);
      phraseTimer.current = setInterval(() => {
        index = (index + 1) % phrases.length;
        setLoadingText(phrases[index]);
      }, PHRASE_INTERVAL_MS);

      resolveTimer.current = setTimeout(() => {
        if (!isMounted.current) return;
        clearTimers();
        setIsLoading(false);

        const node = getNode(nodeKey);
        if (node) {
          setChatHistory((history) => [...history, createMessage('bot', node.message)]);
          setCurrentNode(node.id);
          setAvailableQuickReplies(getQuickRepliesForNode(node.id, INITIAL_QUICK_REPLIES));
        } else {
          setChatHistory((history) => [...history, createMessage('bot', FALLBACK_MESSAGE)]);
          setCurrentNode(ROOT_KEY);
          setAvailableQuickReplies(fallbackReplies);
        }
      }, randomResponseDelay());
    },
    [clearTimers, fallbackReplies],
  );

  /**
   * Free-text path: echo the user's message, run intent matching, then respond
   * via the matched node or the fallback.
   * @param {string} text
   */
  const sendUserMessage = useCallback(
    (text) => {
      const trimmed = String(text ?? '').trim();
      if (!trimmed || isLoading) return;
      setChatHistory((history) => [...history, createMessage('user', trimmed)]);
      runResponse(matchNodeKey(trimmed, KEYWORD_MAP));
    },
    [isLoading, runResponse],
  );

  /**
   * Quick-reply path: echo the reply label, then jump straight to its node.
   * @param {QuickReply} reply
   */
  const selectQuickReply = useCallback(
    (reply) => {
      if (!reply || isLoading) return;
      setChatHistory((history) => [...history, createMessage('user', reply.label)]);
      runResponse(reply.key);
    },
    [isLoading, runResponse],
  );

  const openChat = useCallback(() => {
    setIsOpen(true);
    // Seed the welcome message + initial replies only on a fresh transcript.
    setChatHistory((history) => (history.length === 0 ? [welcomeMessage()] : history));
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const resetChat = useCallback(() => {
    clearTimers();
    setIsLoading(false);
    setLoadingText('');
    setChatHistory([welcomeMessage()]);
    setCurrentNode(ROOT_KEY);
    setAvailableQuickReplies(INITIAL_QUICK_REPLIES);
  }, [clearTimers]);

  return {
    isOpen,
    chatHistory,
    isLoading,
    loadingText,
    currentNode,
    availableQuickReplies,
    sendUserMessage,
    selectQuickReply,
    openChat,
    closeChat,
    resetChat,
  };
}
