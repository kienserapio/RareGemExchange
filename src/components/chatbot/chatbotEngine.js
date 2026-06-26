/**
 * chatbotEngine.js
 * ────────────────────────────────────────────────────────────────────────────
 * Pure, side-effect-free helpers for the Rare Gem Exchange concierge.
 *
 * Everything here is deterministic given its inputs (aside from the explicitly
 * randomised loader timing / phrase ordering, which use Math.random — available
 * in this Vite app). No React, no DOM, no module-level state, so each function
 * is trivially unit-testable.
 * ────────────────────────────────────────────────────────────────────────────
 */

import { KNOWLEDGE_BASE, ROOT_KEY } from './knowledgeBase';

/**
 * @typedef {import('./knowledgeBase').ChatNode} ChatNode
 * @typedef {import('./knowledgeBase').QuickReply} QuickReply
 */

/* ── Loader / fallback content ──────────────────────────────────────────── */

/**
 * "Thinking" phrases cycled through while a response is being prepared.
 * @type {string[]}
 */
export const LOADING_PHRASES = [
  'Analyzing inventory registers…',
  'Fetching certification guidelines…',
  'Consulting appraisal parameters…',
  'Reviewing exchange policies…',
];

/** Polished message returned when free text matches no intent. */
export const FALLBACK_MESSAGE =
  "I apologize, but I am an automated concierge attuned strictly to core exchange inquiries, and I could not find an exact match for your message.\n\nMight I direct you to one of our most requested topics below — or would you prefer a personal introduction to an estate representative?";

/** Interval (ms) between loader phrase changes. */
export const PHRASE_INTERVAL_MS = 800;

/** Bounds (ms) for the randomised artificial response delay. */
export const MIN_RESPONSE_DELAY = 1500;
export const MAX_RESPONSE_DELAY = 2500;

/* ── Text normalization ─────────────────────────────────────────────────── */

/**
 * Lowercase, strip diacritics and punctuation, and collapse whitespace.
 * @param {string} text Raw user input.
 * @returns {string} A clean, space-delimited token string ('' if empty).
 */
export function normalizeText(text) {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFKD') // decompose accented characters …
    .replace(/[̀-ͯ]/g, '') // … then drop the diacritic marks
    .replace(/[^a-z0-9\s]/g, ' ') // punctuation → space
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalize then split into word tokens.
 * @param {string} text Raw user input.
 * @returns {string[]} Tokens (empty array if no content).
 */
export function tokenize(text) {
  const normalized = normalizeText(text);
  return normalized ? normalized.split(' ') : [];
}

/* ── Intent matching ────────────────────────────────────────────────────── */

/**
 * Score the input against each node's keyword list and return the best match.
 * Single-word keywords match whole tokens; multi-word keywords are matched as
 * substrings of the normalized text. On a score tie the earliest map entry
 * wins (so callers can prioritise via key order).
 *
 * @param {string} text Raw user input.
 * @param {Record<string, string[]>} keywordMap Node key → keywords.
 * @returns {string|null} Best-matching node key, or null if nothing matched.
 */
export function matchNodeKey(text, keywordMap) {
  const normalized = normalizeText(text);
  if (!normalized) return null;

  const tokens = new Set(normalized.split(' '));
  let bestKey = null;
  let bestScore = 0;

  for (const [nodeKey, keywords] of Object.entries(keywordMap)) {
    let score = 0;
    for (const keyword of keywords) {
      const hit = keyword.includes(' ')
        ? normalized.includes(keyword)
        : tokens.has(keyword);
      if (hit) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestKey = nodeKey;
    }
  }

  return bestScore > 0 ? bestKey : null;
}

/* ── Tree resolution ────────────────────────────────────────────────────── */

/**
 * Look up a node by key.
 * @param {string|null|undefined} key
 * @returns {ChatNode|null}
 */
export function getNode(key) {
  return (key && KNOWLEDGE_BASE[key]) || null;
}

/**
 * Resolve the context-aware quick replies to show after a node is rendered.
 * The root node surfaces the curated initial replies; every other node maps
 * its child keys to `{ key, label }` pairs using each child's `label`.
 *
 * @param {string} nodeKey Current node key.
 * @param {QuickReply[]} initialReplies The static welcome-screen replies.
 * @returns {QuickReply[]}
 */
export function getQuickRepliesForNode(nodeKey, initialReplies) {
  if (nodeKey === ROOT_KEY) return initialReplies;

  const node = getNode(nodeKey);
  if (!node) return initialReplies;

  return node.quickReplies.map((key) => ({
    key,
    label: KNOWLEDGE_BASE[key]?.label ?? key,
  }));
}

/* ── Loader timing helpers ──────────────────────────────────────────────── */

/**
 * Fisher–Yates shuffle (returns a new array; input is not mutated).
 * @template T
 * @param {T[]} arr
 * @returns {T[]}
 */
export function shuffle(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** A freshly shuffled copy of the loader phrases. */
export function buildShuffledPhrases() {
  return shuffle(LOADING_PHRASES);
}

/**
 * A randomised artificial delay (ms) for the simulated "thinking" pause.
 * @returns {number} Between {@link MIN_RESPONSE_DELAY} and {@link MAX_RESPONSE_DELAY}.
 */
export function randomResponseDelay() {
  return MIN_RESPONSE_DELAY + Math.random() * (MAX_RESPONSE_DELAY - MIN_RESPONSE_DELAY);
}
