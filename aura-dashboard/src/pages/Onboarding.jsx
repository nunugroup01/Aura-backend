// src/pages/Onboarding.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STEPS = [
  { id: 1, title: 'Welcome to Aura', subtitle: 'Let\'s set up your brand in 3 simple steps' },
  { id: 2, title: 'Your Brand', subtitle: 'Tell Aura about your brand so it can work for you' },
  { id: 3, title: 'Your Platforms', subtitle: 'Connect the platforms you want Aura to manage' },
  { id: 4, title: 'You\'re all set!', subtitle: 'Aura is ready to run your brand autonomously' },
]

const PLATFORMS = [
  { name: 'Instagram', icon: '📸', color: '#FF6BFF' },
  { name: 'TikTok', icon: '🎵', color: '#00FFB2' },
  { name: 'Twitter / X', icon: '𝕏', color: '#5BFFF8' },
  { name: 'Facebook', icon: '📘', color: '#4A90FF' },
  { name: 'LinkedIn', icon: '💼', color: '#0077B5' },
  { name: 'Pinterest', icon: '📌', color: '#FF4444' },
  { name: 'Shopify', icon: '🛍️', color: '#FFD93D' },
  { name: 'WhatsApp', icon: '💬', color: '#00FFB2' },
]

const NICHES = [
  'Fashion & Apparel', 'Food & Restaurant', 'Health & Fitness',
  'Beauty & Skincare', 'Technology', 'Real Estate',
  'Education', 'Music & Entertainment', 'Travel',
  'Home & Lifestyle', 'Finance', 'Other'
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState([])
  const [brand, setBrand] = useState({
    brandName: '',
    niche: '',
    tone: '',
    audience: '',
  })

  const togglePlatform = (name) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]
    )
  }

  const next = () => {
    if (step < 4) setStep(step + 1)
    else navigate('/dashboard')
  }

  const back = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#07080A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'DM Mono, monospace',
      padding: 24,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,200&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>

      <div style={{ maxWidth: 560, width: '100%', animation: 'fadeUp 0.5s ease both' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 32, color: '#00FFB2', marginBottom: 8 }}>◎</div>
          <span style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 20,
            fontWeight: 300,
            color: '#fff',
            letterSpacing: '0.1em',
          }}>
            AURA
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: step >= s.id ? '#00FFB2' : 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, color: step >= s.id ? '#07080A' : 'rgba(255,255,255,0.3)',
                  fontWeight: 600, transition: 'all 0.3s',
                }}>
                  {step > s.id ? '✓' : s.id}
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{
                    width: 80, height: 1,
                    background: step > s.id ? '#00FFB2' : 'rgba(255,255,255,0.08)',
                    transition: 'background 0.3s',
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20,
          padding: 32,
          marginBottom: 20,
        }}>
          <h2 style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 26,
            fontWeight: 300,
            color: '#fff',
            marginBottom: 8,
            letterSpacing: '-0.02em',
          }}>
            {STEPS[step - 1].title}
          </h2>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 28, lineHeight: 1.7 }}>
            {STEPS[step - 1].subtitle}
          </p>

          {/* Step 1 — Welcome */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: '✦', color: '#00FFB2', title: 'Content Engine', desc: 'Generates posts, emails, ads in your brand voice automatically' },
                { icon: '⬡', color: '#FFD93D', title: 'Order Manager', desc: 'Processes every order and notifies customers hands-free' },
                { icon: '◎', color: '#5BFFF8', title: 'Customer AI', desc: 'Replies to every DM and email 24/7 in your tone' },
                { icon: '◈', color: '#FF6BFF', title: 'Social Scheduler', desc: 'Posts to all your platforms at the best times automatically' },
                { icon: '⬟', color: '#FF8C42', title: 'Growth Analyst', desc: 'Tracks your performance and adjusts strategy automatically' },
                { icon: '◉', color: '#AAAAAA', title: 'Delivery Coordinator', desc: 'Your only job — physically pack and dispatch orders' },
              ].map((agent, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <span style={{ fontSize: 18, color: agent.color, marginTop: 2 }}>{agent.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, color: '#fff', marginBottom: 4, fontWeight: 500 }}>{agent.title}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{agent.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2 — Brand Info */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'BRAND NAME', key: 'brandName', placeholder: 'e.g. LUMIÈRE' },
                { label: 'TONE OF VOICE', key: 'tone', placeholder: 'e.g. warm, aspirational, minimal' },
                { label: 'TARGET AUDIENCE', key: 'audience', placeholder: 'e.g. women 25-40, eco-conscious' },
              ].map((field, i) => (
                <div key={i}>
                  <label style={{ fontSize: 10, color: '#00FFB2', letterSpacing: '0.15em', display: 'block', marginBottom: 6 }}>
                    {field.label}
                  </label>
                  <input
                    value={brand[field.key]}
                    onChange={e => setBrand(prev => ({ ...prev, [field.key]: e.target.value }))}
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
                <label style={{ fontSize: 10, color: '#00FFB2', letterSpacing: '0.15em', display: 'block', marginBottom: 8 }}>
                  INDUSTRY / NICHE
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {NICHES.map((niche, i) => (
                    <button
                      key={i}
                      onClick={() => setBrand(prev => ({ ...prev, niche }))}
                      style={{
                        background: brand.niche === niche ? '#00FFB2' : 'rgba(255,255,255,0.04)',
                        color: brand.niche === niche ? '#07080A' : 'rgba(255,255,255,0.5)',
                        border: `1px solid ${brand.niche === niche ? '#00FFB2' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: 20,
                        padding: '8px 14px',
                        fontSize: 11,
                        fontFamily: 'DM Mono, monospace',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {niche}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Platforms */}
          {step === 3 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {PLATFORMS.map((platform, i) => (
                <div
                  key={i}
                  onClick={() => togglePlatform(platform.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 16px',
                    background: selected.includes(platform.name) ? `${platform.color}0D` : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${selected.includes(platform.name) ? platform.color + '44' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 10,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: 20 }}>{platform.icon}</span>
                  <span style={{ fontSize: 12, color: selected.includes(platform.name) ? '#fff' : 'rgba(255,255,255,0.5)' }}>
                    {platform.name}
                  </span>
                  {selected.includes(platform.name) && (
                    <span style={{ marginLeft: 'auto', color: platform.color, fontSize: 14 }}>✓</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Step 4 — Done */}
          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
              <h3 style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 24,
                fontWeight: 300,
                color: '#00FFB2',
                marginBottom: 16,
              }}>
                {brand.brandName || 'Your brand'} is ready!
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 24 }}>
                Aura's 6 agents are now configured for your brand.<br />
                They will work autonomously 24/7.<br />
                Your only job is physical delivery.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  '✦ Content Engine — ready',
                  '⬡ Order Manager — ready',
                  '◎ Customer AI — ready',
                  '◈ Social Scheduler — ready',
                  '⬟ Growth Analyst — ready',
                  '◉ Delivery Coordinator — ready',
                ].map((item, i) => (
                  <div key={i} style={{ fontSize: 12, color: '#00FFB2', letterSpacing: '0.06em' }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          {step > 1 && (
            <button
              onClick={back}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                padding: '14px',
                fontSize: 12,
                fontFamily: 'DM Mono, monospace',
                cursor: 'pointer',
                letterSpacing: '0.1em',
              }}
            >
              ← BACK
            </button>
          )}
          <button
            onClick={next}
            style={{
              flex: 2,
              background: '#00FFB2',
              color: '#07080A',
              border: 'none',
              borderRadius: 10,
              padding: '14px',
              fontSize: 12,
              fontFamily: 'DM Mono, monospace',
              fontWeight: 600,
              letterSpacing: '0.1em',
              cursor: 'pointer',
            }}
          >
            {step === 4 ? 'LAUNCH AURA →' : 'CONTINUE →'}
          </button>
        </div>

        {step === 1 && (
          <p
            onClick={() => navigate('/login')}
            style={{
              textAlign: 'center',
              fontSize: 11,
              color: 'rgba(255,255,255,0.25)',
              marginTop: 16,
              cursor: 'pointer',
            }}
          >
            Already have an account? Sign in →
          </p>
        )}
      </div>
    </div>
  )
}