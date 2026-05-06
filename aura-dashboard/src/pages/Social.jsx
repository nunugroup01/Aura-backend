// src/pages/Social.jsx
import { useState } from 'react'
import Header from '../components/Header'

const PLATFORMS = ['instagram', 'tiktok', 'twitter', 'facebook', 'linkedin', 'pinterest', 'threads']

const PLATFORM_COLORS = {
  instagram: '#FF6BFF',
  tiktok: '#00FFB2',
  twitter: '#5BFFF8',
  facebook: '#4A90FF',
  linkedin: '#0077B5',
  pinterest: '#FF4444',
  threads: '#AAAAAA',
}

export default function Social() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    brandName: '',
    platform: 'instagram',
    content: '',
    scheduledFor: '',
  })

  const schedulePost = async () => {
    if (!form.brandName || !form.content) return
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/api/social/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        setPosts(prev => [data.post, ...prev])
        setForm(prev => ({ ...prev, content: '', scheduledFor: '' }))
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const publishPost = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/social/posts/${id}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (data.success) {
        setPosts(prev => prev.map(p => p.id === id ? data.post : p))
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07080A' }}>
      <Header
        title="Social Scheduler"
        subtitle="Schedule and publish content to all platforms automatically"
      />

      <div style={{ padding: '0 32px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          {/* Form */}
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 16 }}>
              SCHEDULE POST
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

              <div>
                <label style={{ fontSize: 10, color: '#FF6BFF', letterSpacing: '0.15em', display: 'block', marginBottom: 6 }}>
                  BRAND NAME
                </label>
                <input
                  value={form.brandName}
                  onChange={e => setForm(prev => ({ ...prev, brandName: e.target.value }))}
                  placeholder="e.g. LUMIÈRE"
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

              {/* Platform selector */}
              <div>
                <label style={{ fontSize: 10, color: '#FF6BFF', letterSpacing: '0.15em', display: 'block', marginBottom: 8 }}>
                  PLATFORM
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {PLATFORMS.map(p => (
                    <button
                      key={p}
                      onClick={() => setForm(prev => ({ ...prev, platform: p }))}
                      style={{
                        background: form.platform === p ? PLATFORM_COLORS[p] : 'rgba(255,255,255,0.04)',
                        color: form.platform === p ? '#07080A' : 'rgba(255,255,255,0.5)',
                        border: `1px solid ${form.platform === p ? PLATFORM_COLORS[p] : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: 6,
                        padding: '8px 12px',
                        fontSize: 10,
                        fontFamily: 'DM Mono, monospace',
                        letterSpacing: '0.06em',
                        cursor: 'pointer',
                      }}
                    >
                      {p.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 10, color: '#FF6BFF', letterSpacing: '0.15em', display: 'block', marginBottom: 6 }}>
                  CONTENT
                </label>
                <textarea
                  value={form.content}
                  onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Paste your content here or generate it from the Content page..."
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
                    height: 120,
                    lineHeight: 1.6,
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 10, color: '#FF6BFF', letterSpacing: '0.15em', display: 'block', marginBottom: 6 }}>
                  SCHEDULE FOR (optional)
                </label>
                <input
                  type="datetime-local"
                  value={form.scheduledFor}
                  onChange={e => setForm(prev => ({ ...prev, scheduledFor: e.target.value }))}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    padding: '12px 14px',
                    color: '#fff',
                    fontSize: 12,
                    fontFamily: 'DM Mono, monospace',
                    colorScheme: 'dark',
                  }}
                />
              </div>

              <button
                onClick={schedulePost}
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading ? 'rgba(255,107,255,0.3)' : '#FF6BFF',
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
                {loading ? 'SCHEDULING...' : 'SCHEDULE POST ◈'}
              </button>
            </div>
          </div>

          {/* Posts list */}
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 16 }}>
              SCHEDULED POSTS ({posts.length})
            </div>
            {posts.length === 0 ? (
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12,
                padding: 24,
                textAlign: 'center',
                color: 'rgba(255,255,255,0.2)',
                fontSize: 12,
              }}>
                No posts scheduled yet.<br />Schedule your first post above.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {posts.map((post, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 12,
                    padding: '16px 18px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <span style={{
                        fontSize: 10,
                        color: PLATFORM_COLORS[post.platform],
                        letterSpacing: '0.1em',
                        background: `${PLATFORM_COLORS[post.platform]}18`,
                        padding: '4px 10px',
                        borderRadius: 20,
                        border: `1px solid ${PLATFORM_COLORS[post.platform]}44`,
                      }}>
                        {post.platform.toUpperCase()}
                      </span>
                      <span style={{
                        fontSize: 10,
                        color: post.status === 'published' ? '#00FFB2' : '#FFD93D',
                        letterSpacing: '0.1em',
                      }}>
                        {post.status.toUpperCase()}
                      </span>
                    </div>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 12 }}>
                      {post.content.slice(0, 120)}...
                    </p>
                    {post.status === 'scheduled' && (
                      <button
                        onClick={() => publishPost(post.id)}
                        style={{
                          background: 'rgba(255,107,255,0.1)',
                          border: '1px solid rgba(255,107,255,0.3)',
                          borderRadius: 6,
                          padding: '8px 14px',
                          color: '#FF6BFF',
                          fontSize: 10,
                          fontFamily: 'DM Mono, monospace',
                          cursor: 'pointer',
                          letterSpacing: '0.06em',
                        }}
                      >
                        MARK AS PUBLISHED
                      </button>
                    )}
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