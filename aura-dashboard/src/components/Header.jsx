// src/components/Header.jsx
// Aura Dashboard — Top Header

export default function Header({ title, subtitle }) {
  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '20px 32px',
      marginBottom: 32,
    }}>
      <h1 style={{
        fontFamily: 'Fraunces, serif',
        fontSize: 28,
        fontWeight: 300,
        color: '#fff',
        letterSpacing: '-0.02em',
        marginBottom: 4,
      }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}