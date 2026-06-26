/**
 * TypingIndicator.jsx
 * The concierge "thinking" loader — three pulsing dots plus the currently
 * active loading phrase (which the hook cycles every 800ms). Styled as a
 * bot bubble so it reads as part of the conversation.
 */

/**
 * @param {{ loadingText: string }} props
 */
export default function TypingIndicator({ loadingText }) {
  return (
    <div className="chat-msg chat-msg--bot chat-typing">
      <div className="chat-msg__bubble chat-typing__bubble">
        <span className="chat-typing__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="chat-typing__text">{loadingText}</span>
      </div>
      <div className="chat-msg__meta">Concierge &bull; typing&hellip;</div>
    </div>
  );
}
