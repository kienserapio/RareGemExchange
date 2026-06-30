import { useCallback, useEffect, useRef, useState } from 'react'
import { useChatbot } from './useChatbot'
import { apiUrl } from '../../config'
import ChatLauncher from './ChatLauncher'
import ChatWindow from './ChatWindow'
import CustomerIntakeForm from './CustomerIntakeForm'
import SuccessOverlay from '../SuccessOverlay'
import './chatbot.css'

/** Map the in-memory transcript to the persisted shape the API expects. */
function normalizeChat(chatHistory) {
  return (chatHistory || []).map((m) => ({
    sender: m.sender === 'user' ? 'user' : 'bot',
    text: String(m.text ?? ''),
  }))
}

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
  // Set once intake succeeds; drives chat-transcript persistence. Also
  // in-memory, so a refresh starts a clean session (matches the intake gating).
  const [customerId, setCustomerId] = useState(null)

  // Refs mirror the latest values so the flush-on-close/unmount path can read
  // them without re-subscribing.
  const customerIdRef = useRef(null)
  const chatHistoryRef = useRef(chatHistory)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    customerIdRef.current = customerId
  }, [customerId])

  useEffect(() => {
    chatHistoryRef.current = chatHistory
  }, [chatHistory])

  // Best-effort immediate save of the latest snapshot (close / hide / unmount).
  const flushChat = useCallback(() => {
    const id = customerIdRef.current
    const history = chatHistoryRef.current
    if (!id || !history || history.length === 0) return
    try {
      fetch(apiUrl('/api/customers/' + id + '/chat'), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatHistory: normalizeChat(history) }),
        keepalive: true,
      }).catch(() => {})
    } catch {
      /* best-effort persistence — never block the UI */
    }
  }, [])

  // Debounced persistence: whenever the transcript changes and we have a
  // customer, save the full snapshot (~1.2s). The server overwrites.
  useEffect(() => {
    if (!customerId || chatHistory.length === 0) return undefined
    const timer = setTimeout(() => {
      fetch(apiUrl('/api/customers/' + customerId + '/chat'), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatHistory: normalizeChat(chatHistory) }),
      }).catch(() => {})
    }, 1200)
    return () => clearTimeout(timer)
  }, [chatHistory, customerId])

  // Flush a final save when the panel is closed (the debounce may not have run).
  useEffect(() => {
    if (wasOpenRef.current && !isOpen) flushChat()
    wasOpenRef.current = isOpen
  }, [isOpen, flushChat])

  // Flush when the tab is hidden/closed and on unmount.
  useEffect(() => {
    const onHide = () => flushChat()
    window.addEventListener('pagehide', onHide)
    return () => {
      window.removeEventListener('pagehide', onHide)
      flushChat()
    }
  }, [flushChat])

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

  // Only reached on a genuine save success (the form throws + stays open
  // otherwise). `id` is the persisted customer id used for chat persistence.
  const handleIntakeSubmit = (id) => {
    setCustomerId(id ?? null)
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
