// src/components/ChatBox.jsx
import { useState, useRef, useEffect } from 'react'
import { CFormInput, CButton, CSpinner } from '@coreui/react'
import axios from 'axios'

export default function ChatBox() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef()

  const send = async () => {
    if (!input.trim()) return
    const newMsgs = [...messages, { role: 'user', content: input }]
    setMessages(newMsgs)
    setInput('')
    setLoading(true)
    try {
      const { data } = await axios.post('/api/chat', { messages: newMsgs })
      setMessages([...newMsgs, { role: 'assistant', content: data.reply ?? '(no reply)' }])
    } catch (e) {
      setMessages([...newMsgs, { role: 'assistant', content: e.message }])
    } finally { setLoading(false) }
  }

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  return (
    <>
      <div style={{ height: 300, overflowY: 'auto', border: '1px solid #eee', padding: 8 }}>
        {messages.map((m, i) =>
          <p key={i} style={{ color: m.role === 'assistant' ? 'blue' : 'black' }}>{m.content}</p>)}
        <div ref={bottomRef} />
      </div>
      <div className="d-flex mt-2">
        <CFormInput value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type a message…" />
        <CButton className="ms-2" onClick={send} disabled={loading}>
          {loading ? <CSpinner size="sm" /> : 'Send'}
        </CButton>
      </div>
    </>
  )
}
