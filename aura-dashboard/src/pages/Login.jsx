// src/pages/Login.jsx
// Aura — Login Page

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    if (email && password) {
      navigate('/dashboard')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#07080A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'DM Mono, monospace',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,200&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>

      <div style={{ maxWidth: 420, width: '100%', padding: 24, animation: 'fadeUp 0.6s ease both' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 16, color: '#00FFB2' }}>◎</div>
          <h1 style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 32,
            fontWeight: 300,
            color: '#fff',
            marginBottom: 8,
            letterSpacing: '-0.02em',
          }}>
            Welcome to Aura
          </h1>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
            Your autonomous AI brand operating system
          </p>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 10, color: '#00FFB2', letterSpacing: '0.15em', display: 'block', marginBottom: 8 }}>
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                padding: '14px 16px',
                color: '#fff',
                fontSize: 13,
                fontFamily: 'DM Mono, monospace',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 10, color: '#00FFB2', letterSpacing: '0.15em', display: 'block', marginBottom: 8 }}>
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                padding: '14px 16px',
                color: '#fff',
                fontSize: 13,
                fontFamily: 'DM Mono, monospace',
                outline: 'none',
              }}
            />
          </div>

          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              background: '#00FFB2',
              color: '#07080A',
              border: 'none',
              borderRadius: 10,
              padding: '15px',
              fontSize: 12,
              fontFamily: 'DM Mono, monospace',
              fontWeight: 600,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              marginTop: 8,
            }}
          >
            ENTER AURA →
          </button>

          <p
            onClick={() => navigate('/onboarding')}
            style={{
              textAlign: 'center',
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              marginTop: 8,
            }}
          >
            New brand? Set up your account →
          </p>
        </div>
      </div>
    </div>
  )
}