// src/pages/Settings.jsx
import { useState } from 'react'
import Header from '../components/Header'

const SOCIALS = [
  { name: 'Instagram', color: '#FF6BFF', icon: '📸', connected: false },
  { name: 'TikTok', color: '#00FFB2', icon: '🎵', connected: false },
  { name: 'Twitter / X', color: '#5BFFF8', icon: '𝕏', connected: false },
  { name: 'Facebook', color: '#4A90FF', icon: '📘', connected: false },
  { name: 'LinkedIn', color: '#0077B5', icon: '💼', connected: false },
  { name: 'Pinterest', color: '#FF4444', icon: '📌', connected: false },
  { name: 'Shopify', color: '#FFD93D', icon: '🛍️', connected: false },
  { name: 'WhatsApp', color: '#00FFB2', icon: '💬', connected: false },
]

const AGENTS = [
  { name: 'Content Engine', icon: '✦', color: '#00FFB2', desc: 'Auto-generates content for your brand' },
  { name: 'Order Manager', icon: '⬡', color: '#FFD93D', desc: 'Processes and tracks all orders' },
  { name: 'Customer AI', icon: '◎', color: '#5BFFF8', desc: 'Replies to customer messages 24/7' },
  { name: 'Social Scheduler', icon: '◈', color: '#FF6BFF', desc: 'Schedules posts to all platforms' },
  { name: 'Growth Analyst', icon: '⬟', color: '#FF8C42', desc: 'Tracks performance and growth' },
  { name: 'Delivery Coordinator', icon: '◉', color: '#AAAAAA', desc: 'Manages dispatch notifications' },
]

export default function Settings() {
  const [saved, setSaved] = useState(false)
  const [socials, setSocials] = useState(SOCIALS)
  const [agents, setAgents] = useState(AGENTS.map(a => ({ ...a, enabled: true })))
  const [brand, setBrand] = useState({
    brandName: '',
    niche: '',
    tone: '',
    audience: '',
    avoid: '',
  })

  const toggleSocial = (i) => {
    setSocials(prev => prev.map((s, idx) =>
      idx === i ? { ...s, connected: !s.connected } : s
    ))
  }

  const toggleAgent = (i) => {
    setAgents(prev => prev.map((a, idx) =>
      idx === i ? { ...a, enabled: !a.enabled } : a
    ))
  }

  const save = () => {
    localStorage.setItem('aura_brand', JSON.stringify(brand))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07080A' }}>
      <Header
        title="Settings"
        subtitle="Configure your brand and connect your platforms"
      />

      <div style={{ padding: '0 32px 32px', maxWidth: 800 }}>

        {/* Brand Config */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16,
          padding: 24,
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 20 }}>
            YOUR BRAND
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'BRAND NAME', key: 'brandName', placeholder: 'e.g. LUMIÈRE' },
              { label: 'NICHE / INDUSTRY', key: 'niche', placeholder: 'e.g. sustainable fashion' },
              { label: 'BRAND TONE', key: 'tone', placeholder: 'e.g. warm, aspirational, minimal' },
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
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={{ fontSize: 10, color: '#00FFB2', letterSpacing: '0.15em', display: 'block', marginBottom: 6 }}>
              WHAT TO AVOID
            </label>
            <textarea
              value={brand.avoid}
              onChange={e => setBrand(prev => ({ ...prev, avoid: e.target.value }))}
              placeholder="e.g. avoid exclamation marks, never use slang, don't mention competitors"
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
        </div>

        {/* Connect Platforms */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16,
          padding: 24,
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 20 }}>
            CONNECT YOUR PLATFORMS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {socials.map((social, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                background: social.connected ? `${social.color}0D` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${social.connected ? social.color + '44' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{social.icon}</span>
                  <span style={{ fontSize: 12, color: social.connected ? '#fff' : 'rgba(255,255,255,0.5)' }}>
                    {social.name}
                  </span>
                </div>
                <button
                  onClick={() => toggleSocial(i)}
                  style={{
                    background: social.connected ? social.color : 'rgba(255,255,255,0.06)',
                    color: social.connected ? '#07080A' : 'rgba(255,255,255,0.4)',
                    border: 'none',
                    borderRadius: 6,
                    padding: '6px 14px',
                    fontSize: 10,
                    fontFamily: 'DM Mono, monospace',
                    cursor: 'pointer',
                    letterSpacing: '0.06em',
                    fontWeight: 600,
                  }}
                >
                  {social.connected ? 'CONNECTED ✓' : 'CONNECT'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Toggles */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16,
          padding: 24,
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 20 }}>
            MANAGE AGENTS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {agents.map((agent, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 16, color: agent.color }}>{agent.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, color: '#fff', marginBottom: 2 }}>{agent.name}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{agent.desc}</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleAgent(i)}
                  style={{
                    background: agent.enabled ? agent.color : 'rgba(255,255,255,0.06)',
                    color: agent.enabled ? '#07080A' : 'rgba(255,255,255,0.4)',
                    border: 'none',
                    borderRadius: 20,
                    padding: '6px 16px',
                    fontSize: 10,
                    fontFamily: 'DM Mono, monospace',
                    cursor: 'pointer',
                    letterSpacing: '0.06em',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                >
                  {agent.enabled ? 'ON' : 'OFF'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save */}
        <button
          onClick={save}
          style={{
            width: '100%',
            background: saved ? '#00FFB2' : 'rgba(0,255,178,0.1)',
            color: saved ? '#07080A' : '#00FFB2',
            border: '1px solid #00FFB2',
            borderRadius: 10,
            padding: '15px',
            fontSize: 12,
            fontFamily: 'DM Mono, monospace',
            fontWeight: 600,
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
        >
          {saved ? '✓ SETTINGS SAVED' : 'SAVE SETTINGS'}
        </button>

      </div>
    </div>
  )
}