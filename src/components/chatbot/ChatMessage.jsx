/**
 * ChatMessage.jsx
 * A single chat bubble — bot (left) or user (right) — with a sender/time meta
 * line. Memoized: transcript entries are immutable once appended.
 */

import { memo } from 'react';

/** @typedef {import('./useChatbot').ChatMessage} ChatMessageData */

const SENDER_LABEL = { bot: 'Concierge', user: 'You' };

/**
 * Format an epoch timestamp as a short local clock time (e.g. "2:14 PM").
 * @param {number} timestamp
 * @returns {string}
 */
function formatTime(timestamp) {
  try {
    return new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  } catch {
    return '';
  }
}

/**
 * @param {{ message: ChatMessageData }} props
 */
function ChatMessage({ message }) {
  const isUser = message.sender === 'user';
  return (
    <div className={`chat-msg ${isUser ? 'chat-msg--user' : 'chat-msg--bot'}`}>
      <div className="chat-msg__bubble">{message.text}</div>
      <div className="chat-msg__meta">
        {SENDER_LABEL[message.sender]} &bull; {formatTime(message.timestamp)}
      </div>
    </div>
  );
}

export default memo(ChatMessage);
