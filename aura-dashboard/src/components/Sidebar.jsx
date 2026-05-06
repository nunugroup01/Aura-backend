// src/components/Sidebar.jsx
// Aura Dashboard — Sidebar Navigation

import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/dashboard', icon: '◎', label: 'Dashboard', color: '#00FFB2' },
  { path: '/content', icon: '✦', label: 'Content', color: '#00FFB2' },
  { path: '/orders', icon: '⬡', label: 'Orders', color: '#FFD93D' },
  { path: '/customer', icon: '◎', label: 'Customer', color: '#5BFFF8' },
  { path: '/social', icon: '◈', label: 'Social', color: '#FF6BFF' },
  { path: '/analytics', icon: '⬟', label: 'Analytics', color: '#FF8C42' },
  { path: '/delivery', icon: '◉', label: 'Delivery', color: '#AAAAAA' },
  { path: '/settings', icon: '⚙', label: 'Settings', color: '#ffffff' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div style={{
      width: 220,
      minHeight: '100vh',
      background: 'rgba(255,255,255,0.02)',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      padding: '24px 0',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Logo */}
      <div style={{
        padding: '0 24px 32px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18, color: '#00FFB2' }}>◎</span>
          <span style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 20,
            fontWeight: 300,
            color: '#fff',
            letterSpacing: '0.1em'
          }}>
            AURA
          </span>
        </div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', marginTop: 6 }}>
          AUTONOMOUS BRAND OS
        </div>
      </div>

      {/* Nav Items */}
      <div style={{ flex: 1, padding: '0 12px' }}>
        {NAV_ITEMS.map(item => {
          const isActive = location.pathname === item.path
          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                borderRadius: 10,
                cursor: 'pointer',
                marginBottom: 4,
                background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                borderLeft: isActive ? `2px solid ${item.color}` : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 14, color: isActive ? item.color : 'rgba(255,255,255,0.4)' }}>
                {item.icon}
              </span>
              <span style={{
                fontSize: 12,
                color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                letterSpacing: '0.06em',
                fontWeight: isActive ? 500 : 300,
              }}>
                {item.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Bottom status */}
      <div style={{
        padding: '16px 24px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ position: 'relative', display: 'inline-block', width: 8, height: 8 }}>
            <span style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: '#00FFB2', opacity: 0.4,
              animation: 'pulseRing 1.6s ease-out infinite',
            }} />
            <span style={{ position: 'absolute', inset: 1, borderRadius: '50%', background: '#00FFB2' }} />
          </span>
          <span style={{ fontSize: 10, color: '#00FFB2', letterSpacing: '0.1em' }}>6 AGENTS ONLINE</span>
        </div>
      </div>
    </div>
  )
}