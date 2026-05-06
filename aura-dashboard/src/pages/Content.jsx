// src/pages/Content.jsx
import { useState } from 'react'
import Header from '../components/Header'

const CONTENT_TYPES = [
  { id: 'instagram', label: 'Instagram Caption' },
  { id: 'email_subject', label: 'Email Subject' },
  { id: 'email_body', label: 'Email Body' },
  { id: 'blog', label: 'Blog Post' },
  { id: 'product_description', label: 'Product Description' },
  { id: 'ad_copy', label: 'Ad Copy' },
  { id: 'tiktok', label: 'TikTok Script' },
  { id: 'tweet', label: 'Tweet' },
]

export default function Content() {
  const [type, setType] = useState('instagram')
  const [request, setRequest] = useState('')
  const [brandName, setBrandName] = useState('')
  const [niche, setNiche] = useState('')
  const [tone, setTone] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])

  const generate = async () => {
    if (!brandName || !request) return
    setLoading(true)
    setResult('')
    try {
      const res = await fetch('http://localhost:3000/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandName, niche, tone, platform: type, request })
      })
      const data = await res.json()
      if (data.success) {
        setResult(data.content)
        setHistory(prev => [{ type, request, content: data.content, time: new Date().toLocaleTimeString() }, ...prev])
      }
    } catch (err) {
      setResult('Error connecting to Aura backend. Make sure it is running.')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07080A' }}>
      <Header
        title="Content Engine"
        subtitle="Generate brand content automatically for any platform"
      />

      <div style={{ padding: '0 32px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          {/* Generator */}
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 16 }}>
              GENERATE CONTENT
            </div>

            {/* Brand Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'BRAND NAME', value: brandName, set: setBrandName, placeholder: 'e.g. LUMIÈRE' },
                { label: 'NICHE', value: niche, set: setNiche, placeholder: 'e.g. sustainable fashion' },
                { label: 'TONE', value: tone, set: setTone, placeholder: 'e.g. warm, aspirational, minimal' },
              ].map((field, i) => (
                <div key={i}>
                  <label style={{ fontSize: 10, color: '#00FFB2', letterSpacing: '0.15em', display: 'block', marginBottom: 6 }}>
                    {field.label}
                  </label>
                  <input
                    value={field.value}
                    onChange={e => field.set(e.target.value)}
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
            </div>

            {/* Content Type */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 10, color: '#00FFB2', letterSpacing: '0.15em', display: 'block', marginBottom: 8 }}>
                CONTENT TYPE
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {CONTENT_TYPES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setType(t.id)}
                    style={{
                      background: type === t.id ? '#00FFB2' : 'rgba(255,255,255,0.04)',
                      color: type === t.id ? '#07080A' : 'rgba(255,255,255,0.5)',
                      border: `1px solid ${type === t.id ? '#00FFB2' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: 6,
                      padding: '8px 12px',
                      fontSize: 10,
                      fontFamily: 'DM Mono, monospace',
                      letterSpacing: '0.06em',
                      cursor: 'pointer',
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Request */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 10, color: '#00FFB2', letterSpacing: '0.15em', display: 'block', marginBottom: 8 }}>
                WHAT TO GENERATE
              </label>
              <textarea
                value={request}
                onChange={e => setRequest(e.target.value)}
                placeholder="e.g. Summer linen collection launch post"
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
                  height: 80,
                  lineHeight: 1.6,
                }}
              />
            </div>

            <button
              onClick={generate}
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? 'rgba(0,255,178,0.3)' : '#00FFB2',
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
              {loading ? 'GENERATING...' : 'GENERATE CONTENT ✦'}
            </button>

            {/* Result */}
            {result && (
              <div style={{
                marginTop: 20,
                background: 'rgba(0,255,178,0.06)',
                border: '1px solid rgba(0,255,178,0.2)',
                borderRadius: 10,
                padding: '16px 18px',
                fontSize: 13,
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.85)',
                whiteSpace: 'pre-wrap',
              }}>
                {result}
              </div>
            )}
          </div>

          {/* History */}
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 16 }}>
              CONTENT HISTORY
            </div>
            {history.length === 0 ? (
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12,
                padding: 24,
                textAlign: 'center',
                color: 'rgba(255,255,255,0.2)',
                fontSize: 12,
              }}>
                No content generated yet.<br />Generate your first piece above.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {history.map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 12,
                    padding: '16px 18px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 10, color: '#00FFB2', letterSpacing: '0.1em' }}>
                        {item.type.toUpperCase()}
                      </span>
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{item.time}</span>
                    </div>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>{item.request}</p>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                      {item.content.slice(0, 150)}...
                    </p>
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