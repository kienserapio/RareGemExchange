/**
 * ChatWindow.jsx
 * The chat panel: header (title + reset/close), auto-scrolling message log,
 * the typing indicator, context-aware quick replies, and the input form.
 *
 * Stays mounted at all times so it can animate open/closed; when closed it is
 * marked `inert` + `aria-hidden` so nothing inside is focusable or announced.
 */

import { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import QuickReplies from './QuickReplies';
import TypingIndicator from './TypingIndicator';

/** @typedef {import('./useChatbot').ChatMessage} ChatMessageData */
/** @typedef {import('./knowledgeBase').QuickReply} QuickReply */

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ResetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M12.5 4.5A5 5 0 1 0 13.5 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path d="M13 2v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 8l12-5-4.5 12L7 10 2 8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
  </svg>
);

/**
 * @param {{
 *   isOpen: boolean,
 *   chatHistory: ChatMessageData[],
 *   isLoading: boolean,
 *   loadingText: string,
 *   availableQuickReplies: QuickReply[],
 *   sendUserMessage: (text: string) => void,
 *   selectQuickReply: (reply: QuickReply) => void,
 *   closeChat: () => void,
 *   resetChat: () => void,
 * }} props
 */
export default function ChatWindow({
  isOpen,
  chatHistory,
  isLoading,
  loadingText,
  availableQuickReplies,
  sendUserMessage,
  selectQuickReply,
  closeChat,
  resetChat,
}) {
  const [draft, setDraft] = useState('');
  const listRef = useRef(/** @type {HTMLDivElement|null} */ (null));
  const inputRef = useRef(/** @type {HTMLInputElement|null} */ (null));

  // Keep the newest message in view.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chatHistory, isLoading, loadingText, availableQuickReplies]);

  // While open: Escape closes, and focus moves to the input after the open
  // animation settles.
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeChat();
    };
    document.addEventListener('keydown', onKeyDown);

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 320);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen, closeChat]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = draft.trim();
    if (!value || isLoading) return;
    sendUserMessage(value);
    setDraft('');
  };

  const canSend = draft.trim().length > 0 && !isLoading;

  return (
    <div
      className={`chat-window${isOpen ? ' chat-window--open' : ''}`}
      role="dialog"
      aria-modal="false"
      aria-label="Rare Gem Concierge"
      aria-hidden={!isOpen}
      inert={!isOpen || undefined}
    >
      <header className="chat-header">
        <div className="chat-header__titles">
          <span className="chat-header__title">Rare Gem Concierge</span>
          <span className="chat-header__status">
            <span className="chat-header__dot" aria-hidden="true" />
            Private concierge &bull; Online
          </span>
        </div>
        <div className="chat-header__actions">
          <button
            type="button"
            className="chat-icon-btn"
            aria-label="Reset conversation"
            title="Reset conversation"
            onClick={resetChat}
          >
            <ResetIcon />
          </button>
          <button
            type="button"
            className="chat-icon-btn"
            aria-label="Close concierge chat"
            title="Close"
            onClick={closeChat}
          >
            <CloseIcon />
          </button>
        </div>
      </header>

      <div
        className="chat-messages"
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation transcript"
      >
        {chatHistory.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator loadingText={loadingText} />}
      </div>

      {!isLoading && (
        <QuickReplies replies={availableQuickReplies} onSelect={selectQuickReply} />
      )}

      <form className="chat-input" onSubmit={handleSubmit}>
        <label htmlFor="chat-input-field" className="chat-visually-hidden">
          Type your inquiry
        </label>
        <input
          id="chat-input-field"
          ref={inputRef}
          className="chat-input__field"
          type="text"
          placeholder="Type your inquiry…"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          disabled={isLoading}
          autoComplete="off"
          enterKeyHint="send"
        />
        <button type="submit" className="chat-input__send" disabled={!canSend} aria-label="Send message">
          <span className="chat-input__send-label">Send</span>
          <span className="chat-input__send-icon" aria-hidden="true">
            <SendIcon />
          </span>
        </button>
      </form>
    </div>
  );
}
