/**
 * ChatLauncher.jsx
 * The sticky bottom-right floating button (gold "CONCIERGE" bar from Figma).
 * Toggles the chat window; its icon morphs between a chat bubble (closed) and
 * an X (open) so the toggle affordance is always clear.
 */

const ChatBubbleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M3 4.5h14v9H8l-4 3v-3H3v-9Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * @param {{ isOpen: boolean, onToggle: () => void }} props
 */
export default function ChatLauncher({ isOpen, onToggle }) {
  return (
    <button
      type="button"
      className={`chat-launcher${isOpen ? ' chat-launcher--open' : ''}`}
      aria-label={isOpen ? 'Close concierge chat' : 'Open concierge chat'}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      onClick={onToggle}
    >
      <span className="chat-launcher__icon">{isOpen ? <CloseIcon /> : <ChatBubbleIcon />}</span>
      <span className="chat-launcher__label">Concierge</span>
    </button>
  );
}
