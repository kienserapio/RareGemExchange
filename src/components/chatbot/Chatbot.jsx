/**
 * Chatbot.jsx
 * Root of the Rare Gem Exchange concierge. Owns the conversation state via
 * `useChatbot` and renders the floating launcher + the chat window. Import this
 * once near the root of the app (e.g. in App.jsx) — it self-positions as a
 * fixed overlay.
 */

import { useChatbot } from './useChatbot';
import ChatLauncher from './ChatLauncher';
import ChatWindow from './ChatWindow';
import './chatbot.css';

export default function Chatbot() {
  const {
    isOpen,
    chatHistory,
    isLoading,
    loadingText,
    availableQuickReplies,
    sendUserMessage,
    selectQuickReply,
    openChat,
    closeChat,
    resetChat,
  } = useChatbot();

  return (
    <div className="chat-root">
      <ChatLauncher isOpen={isOpen} onToggle={isOpen ? closeChat : openChat} />
      <ChatWindow
        isOpen={isOpen}
        chatHistory={chatHistory}
        isLoading={isLoading}
        loadingText={loadingText}
        availableQuickReplies={availableQuickReplies}
        sendUserMessage={sendUserMessage}
        selectQuickReply={selectQuickReply}
        closeChat={closeChat}
        resetChat={resetChat}
      />
    </div>
  );
}
