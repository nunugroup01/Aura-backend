// src/pages/Customer.jsx
import { useState } from 'react'
import Header from '../components/Header'

export default function Customer() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    brandName: '',
    tone: '',
    niche: '',
    customerName: '',
    customerMessage: '',
  })

  const sendMessage = async () => {
    if (!form.brandName || !form.customerName || !form.customerMessage) return
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/api/customer/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        setMessages(prev => [data.message, ...prev])
        setForm(prev => ({ ...prev, customerName: '', customerMessage: '' }))
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07080A' }}>
      <Header
        title="Customer AI"
        subtitle="Aura replies to every customer automatically in your brand voice"
      />

      <div style={{ padding: '0 32px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          {/* Form */}
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 16 }}>
              CUSTOMER MESSAGE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'BRAND NAME', key: 'brandName', placeholder: 'LUMIÈRE' },
                { label: 'TONE', key: 'tone', placeholder: 'warm, professional' },
                { label: 'NICHE', key: 'niche', placeholder: 'sustainable fashion' },
                { label: 'CUSTOMER NAME', key: 'customerName', placeholder: 'Jane Doe' },
              ].map((field, i) => (
                <div key={i}>
                  <label style={{ fontSize: 10, color: '#5BFFF8', letterSpacing: '0.15em', display: 'block', marginBottom: 6 }}>
                    {field.label}
                  </label>
                  <input
                    value={form[field.key]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      padding: '12px 14px',
                      color: '#fff',
                      fontSize: 12,
                      fontFamily: 'DM Mono, monospace',
                    }}
                  />
                </div>
              ))}

              <div>
                <label style={{ fontSize: 10, color: '#5BFFF8', letterSpacing: '0.15em', display: 'block', marginBottom: 6 }}>
                  CUSTOMER MESSAGE
                </label>
                <textarea
                  value={form.customerMessage}
                  onChange={e => setForm(prev => ({ ...prev, customerMessage: e.target.value }))}
                  placeholder="e.g. Hi, I haven't received my order yet, it's been 5 days..."
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    padding: '12px 14px',
                    color: '#fff',
                    fontSize: 12,
                    fontFamily: 'DM Mono, monospace',
                    resize: 'none',
                    height: 100,
                    lineHeight: 1.6,
                  }}
                />
              </div>

              <button
                onClick={sendMessage}
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading ? 'rgba(91,255,248,0.3)' : '#5BFFF8',
                  color: '#07080A',
                  border: 'none',
                  borderRadius: 8,
                  padding: '14px',
                  fontSize: 12,
                  fontFamily: 'DM Mono, monospace',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'AURA REPLYING...' : 'SEND TO AURA ◎'}
              </button>
            </div>
          </div>

          {/* Messages */}
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 16 }}>
              REPLIES ({messages.length})
            </div>
            {messages.length === 0 ? (
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12,
                padding: 24,
                textAlign: 'center',
                color: 'rgba(255,255,255,0.2)',
                fontSize: 12,
              }}>
                No messages yet.<br />Send a customer message to see Aura reply.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 12,
                    padding: '16px 18px',
                  }}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: 6 }}>
                        CUSTOMER — {msg.customerName}
                      </div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                        {msg.customerMessage}
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }}>
                      <div style={{ fontSize: 9, color: '#5BFFF8', letterSpacing: '0.1em', marginBottom: 6 }}>
                        AURA REPLIED ◎
                      </div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                        {msg.auraReply}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}