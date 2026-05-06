// src/pages/Orders.jsx
import { useState } from 'react'
import Header from '../components/Header'

const STATUS_COLORS = {
  confirmed: '#00FFB2',
  processing: '#FFD93D',
  ready: '#FF8C42',
  shipped: '#5BFFF8',
  delivered: '#FF6BFF',
}

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    product: '',
    quantity: '',
    price: '',
  })

  const createOrder = async () => {
    if (!form.customerName || !form.product || !form.price) return
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        setOrders(prev => [data.order, ...prev])
        setForm({ customerName: '', customerEmail: '', product: '', quantity: '', price: '' })
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:3000/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      const data = await res.json()
      if (data.success) {
        setOrders(prev => prev.map(o => o.id === id ? data.order : o))
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07080A' }}>
      <Header
        title="Order Manager"
        subtitle="All orders processed automatically — you only handle physical dispatch"
      />

      <div style={{ padding: '0 32px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          {/* Create Order Form */}
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 16 }}>
              NEW ORDER
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'CUSTOMER NAME', key: 'customerName', placeholder: 'John Doe' },
                { label: 'CUSTOMER EMAIL', key: 'customerEmail', placeholder: 'john@email.com' },
                { label: 'PRODUCT', key: 'product', placeholder: 'Linen Tote Bag' },
                { label: 'QUANTITY', key: 'quantity', placeholder: '1' },
                { label: 'PRICE (£)', key: 'price', placeholder: '45.00' },
              ].map((field, i) => (
                <div key={i}>
                  <label style={{ fontSize: 10, color: '#FFD93D', letterSpacing: '0.15em', display: 'block', marginBottom: 6 }}>
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

              <button
                onClick={createOrder}
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading ? 'rgba(255,217,61,0.3)' : '#FFD93D',
                  color: '#07080A',
                  border: 'none',
                  borderRadius: 8,
                  padding: '14px',
                  fontSize: 12,
                  fontFamily: 'DM Mono, monospace',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginTop: 8,
                }}
              >
                {loading ? 'PROCESSING...' : 'CREATE ORDER ⬡'}
              </button>
            </div>
          </div>

          {/* Orders List */}
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 16 }}>
              ALL ORDERS ({orders.length})
            </div>
            {orders.length === 0 ? (
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12,
                padding: 24,
                textAlign: 'center',
                color: 'rgba(255,255,255,0.2)',
                fontSize: 12,
              }}>
                No orders yet.<br />Create your first order above.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {orders.map((order, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 12,
                    padding: '16px 18px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <span style={{ fontSize: 12, color: '#fff', fontWeight: 500 }}>{order.id}</span>
                      <span style={{
                        fontSize: 10,
                        color: STATUS_COLORS[order.status],
                        letterSpacing: '0.1em',
                        background: `${STATUS_COLORS[order.status]}18`,
                        padding: '4px 10px',
                        borderRadius: 20,
                        border: `1px solid ${STATUS_COLORS[order.status]}44`,
                      }}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
                      {order.customerName} — {order.product} x{order.quantity}
                    </div>
                    <div style={{ fontSize: 11, color: '#FFD93D', marginBottom: 12 }}>
                      £{(parseFloat(order.price) * parseInt(order.quantity)).toFixed(2)}
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {['processing', 'ready', 'shipped', 'delivered'].map(status => (
                        <button
                          key={status}
                          onClick={() => updateStatus(order.id, status)}
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 6,
                            padding: '6px 10px',
                            color: 'rgba(255,255,255,0.4)',
                            fontSize: 9,
                            fontFamily: 'DM Mono, monospace',
                            cursor: 'pointer',
                            letterSpacing: '0.06em',
                          }}
                        >
                          {status.toUpperCase()}
                        </button>
                      ))}
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