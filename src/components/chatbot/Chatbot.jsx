import { useEffect, useState, useCallback } from 'react'
import { useChatbot } from './useChatbot'
import ChatLauncher from './ChatLauncher'
import ChatWindow from './ChatWindow'
import CustomerIntakeForm from './CustomerIntakeForm'
import SuccessOverlay from '../SuccessOverlay'
import './chatbot.css'

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
  } = useChatbot()

  const [showIntake, setShowIntake] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  // In-memory only: a page refresh resets this so the intake form is reachable
  // again. Within a single session we skip re-asking once details are given.
  const [intakeDone, setIntakeDone] = useState(false)

  const handleLauncherClick = useCallback(() => {
    if (isOpen) {
      closeChat()
    } else if (!intakeDone) {
      setShowIntake(true)
    } else {
      openChat()
    }
  }, [isOpen, closeChat, openChat, intakeDone])

  useEffect(() => {
    const handler = () => {
      if (!intakeDone) {
        setShowIntake(true)
      } else {
        openChat()
      }
    }
    window.addEventListener('rge:open-intake', handler)
    return () => window.removeEventListener('rge:open-intake', handler)
  }, [openChat, intakeDone])

  const handleIntakeSubmit = () => {
    setShowIntake(false)
    setShowSuccess(true)
  }

  const handleIntakeClose = () => {
    setShowIntake(false)
  }

  const handleSuccessDone = () => {
    setIntakeDone(true)
    setShowSuccess(false)
    openChat()
  }

  return (
    <div className="chat-root">
      <ChatLauncher isOpen={isOpen} onToggle={handleLauncherClick} />
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

      {showIntake && (
        <CustomerIntakeForm
          onSubmit={handleIntakeSubmit}
          onClose={handleIntakeClose}
        />
      )}

      {showSuccess && (
        <SuccessOverlay
          title="Thank You"
          subtitle="Your details have been received. Our concierge will be in touch shortly."
          onDone={handleSuccessDone}
        />
      )}
    </div>
  )
}
