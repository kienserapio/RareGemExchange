/**
 * QuickReplies.jsx
 * The row of prepared-question / context-aware buttons shown beneath the
 * conversation. Each pill maps to a decision-tree node. Memoized; re-renders
 * only when the available replies or the handler change.
 */

import { memo } from 'react';

/** @typedef {import('./knowledgeBase').QuickReply} QuickReply */

/**
 * @param {{ replies: QuickReply[], onSelect: (reply: QuickReply) => void }} props
 */
function QuickReplies({ replies, onSelect }) {
  if (!replies || replies.length === 0) return null;

  return (
    <div className="chat-quick" role="group" aria-label="Suggested inquiries">
      {replies.map((reply) => (
        <button
          key={`${reply.key}:${reply.label}`}
          type="button"
          className="chat-quick__btn"
          onClick={() => onSelect(reply)}
        >
          {reply.label}
        </button>
      ))}
    </div>
  );
}

export default memo(QuickReplies);
