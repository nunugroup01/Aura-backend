// src/pages/Delivery.jsx
import { useState } from 'react'
import Header from '../components/Header'

export default function Delivery() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [trackingInputs, setTrackingInputs] = useState({})

  const fetchPending = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/api/delivery/pending')
      const data = await res.json()
      if (data.success) setOrders(data.orders)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const dispatch = async (orderId) => {
    const trackingNumber = trackingInputs[orderId] || ''
    try {
      const res = await fetch(`http://localhost:3000/api/delivery/${orderId}/dispatch`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingNumber })
      })
      const data = await res.json()
      if (data.success) {
        setOrders(prev => prev.filter(o => o.id !== orderId))
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07080A' }}>
      <Header
        title="Delivery Coordinator"
        subtitle="Your only job — pack and dispatch these orders physically"
      />

      <div style={{ padding: '0 32px 32px' }}>

        {/* Your only job banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,140,66,0.12), rgba(255,140,66,0.06))',
          border: '1px solid rgba(255,140,66,0.35)',
          borderRadius: 16,
          padding: '20px 24px',
          marginBottom: 32,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <span style={{ fontSize: 32 }}>◉</span>
          <div>
            <div style={{ fontSize: 12, color: '#FF8C42', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 6 }}>
              YOUR ONLY JOB IN AURA
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
              Aura handles everything else automatically. Your one task is to physically
              pack and hand these orders to your courier. That's it.
            </div>
          </div>
        </div>

        {/* Fetch button */}
        <button
          onClick={fetchPending}
          disabled={loading}
          style={{
            background: loading ? 'rgba(255,140,66,0.3)' : '#FF8C42',
            color: '#07080A',
            border: 'none',
            borderRadius: 8,
            padding: '14px 28px',
            fontSize: 12,
            fontFamily: 'DM Mono, monospace',
            fontWeight: 600,
            letterSpacing: '0.1em',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: 24,
          }}
        >
          {loading ? 'LOADING...' : 'FETCH PENDING ORDERS ◉'}
        </button>

        {/* Orders */}
        {orders.length === 0 ? (
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12,
            padding: 32,
            textAlign: 'center',
            color: 'rgba(255,255,255,0.2)',
            fontSize: 12,
            lineHeight: 1.8,
          }}>
            No orders pending dispatch.<br />
            Click "Fetch Pending Orders" to check.<br />
            Create orders from the Orders page first.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {orders.map((order, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,140,66,0.25)',
                borderRadius: 12,
                padding: '20px 22px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, color: '#FF8C42', fontWeight: 500 }}>{order.id}</span>
                  <span style={{
                    fontSize: 10,
                    color: '#FFD93D',
                    background: 'rgba(255,217,61,0.1)',
                    padding: '4px 10px',
                    borderRadius: 20,
                    border: '1px solid rgba(255,217,61,0.3)',
                    letterSpacing: '0.1em',
                  }}>
                    AWAITING DISPATCH
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: '#fff' }}>{order.customerName}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{order.customerEmail}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
                    {order.product} × {order.quantity}
                  </div>
                  <div style={{ fontSize: 12, color: '#FFD93D' }}>
                    £{(parseFloat(order.price) * parseInt(order.quantity)).toFixed(2)}
                  </div>
                </div>

                <input
                  placeholder="Tracking number (optional)"
                  value={trackingInputs[order.id] || ''}
                  onChange={e => setTrackingInputs(prev => ({ ...prev, [order.id]: e.target.value }))}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: 11,
                    fontFamily: 'DM Mono, monospace',
                    marginBottom: 10,
                  }}
                />

                <button
                  onClick={() => dispatch(order.id)}
                  style={{
                    width: '100%',
                    background: '#FF8C42',
                    color: '#07080A',
                    border: 'none',
                    borderRadius: 8,
                    padding: '12px',
                    fontSize: 11,
                    fontFamily: 'DM Mono, monospace',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                  }}
                >
                  MARK AS DISPATCHED ✓
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}