// src/pages/Analytics.jsx
import { useState } from 'react'
import Header from '../components/Header'

const METRICS = [
  { label: 'Total Revenue', value: '£0.00', color: '#00FFB2', icon: '£' },
  { label: 'Total Orders', value: '0', color: '#FFD93D', icon: '⬡' },
  { label: 'Content Created', value: '0', color: '#FF6BFF', icon: '✦' },
  { label: 'Messages Replied', value: '0', color: '#5BFFF8', icon: '◎' },
  { label: 'Posts Published', value: '0', color: '#FF8C42', icon: '◈' },
  { label: 'Response Rate', value: '0%', color: '#B8A9FF', icon: '⬟' },
]

const WEEKLY = [
  { day: 'MON', orders: 3, content: 5, messages: 12 },
  { day: 'TUE', orders: 5, content: 8, messages: 20 },
  { day: 'WED', orders: 2, content: 4, messages: 8 },
  { day: 'THU', orders: 7, content: 10, messages: 25 },
  { day: 'FRI', orders: 9, content: 12, messages: 30 },
  { day: 'SAT', orders: 6, content: 7, messages: 18 },
  { day: 'SUN', orders: 4, content: 6, messages: 14 },
]

const MAX_ORDERS = Math.max(...WEEKLY.map(w => w.orders))

export default function Analytics() {
  const [brandName, setBrandName] = useState('')
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchReport = async () => {
    if (!brandName) return
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:3000/api/analytics/${brandName}`)
      const data = await res.json()
      if (data.success) setReport(data.report)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07080A' }}>
      <Header
        title="Growth Analyst"
        subtitle="Track performance, spot trends and grow automatically"
      />

      <div style={{ padding: '0 32px 32px' }}>

        {/* Brand search */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
          <input
            value={brandName}
            onChange={e => setBrandName(e.target.value)}
            placeholder="Enter brand name to pull report..."
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              padding: '12px 16px',
              color: '#fff',
              fontSize: 12,
              fontFamily: 'DM Mono, monospace',
            }}
          />
          <button
            onClick={fetchReport}
            disabled={loading}
            style={{
              background: loading ? 'rgba(255,140,66,0.3)' : '#FF8C42',
              color: '#07080A',
              border: 'none',
              borderRadius: 8,
              padding: '12px 24px',
              fontSize: 12,
              fontFamily: 'DM Mono, monospace',
              fontWeight: 600,
              letterSpacing: '0.1em',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'LOADING...' : 'PULL REPORT ⬟'}
          </button>
        </div>

        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          marginBottom: 32,
        }}>
          {METRICS.map((metric, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${metric.color}22`,
              borderRadius: 14,
              padding: '20px 22px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 18, color: metric.color }}>{metric.icon}</span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em' }}>
                  {metric.label.toUpperCase()}
                </span>
              </div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 300, color: '#fff' }}>
                {report ? (
                  i === 0 ? report.overview.totalRevenue :
                  i === 1 ? report.overview.totalOrders :
                  i === 2 ? report.overview.totalPosts || 0 :
                  i === 3 ? report.customer.replied :
                  i === 4 ? report.social?.published || 0 :
                  report.customer.responseRate
                ) : metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Chart */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16,
          padding: 24,
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 24 }}>
            WEEKLY ORDERS
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 120 }}>
            {WEEKLY.map((day, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 10, color: '#FFD93D' }}>{day.orders}</div>
                <div style={{
                  width: '100%',
                  height: `${(day.orders / MAX_ORDERS) * 80}px`,
                  background: 'linear-gradient(180deg, #FFD93D, rgba(255,217,61,0.3))',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease',
                }} />
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                  {day.day}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Performance */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16,
          padding: 24,
        }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 20 }}>
            AGENT PERFORMANCE THIS WEEK
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { name: 'Content Engine', tasks: 52, color: '#00FFB2', pct: 92 },
              { name: 'Order Manager', tasks: 36, color: '#FFD93D', pct: 100 },
              { name: 'Customer AI', tasks: 127, color: '#5BFFF8', pct: 98 },
              { name: 'Social Scheduler', tasks: 21, color: '#FF6BFF', pct: 85 },
              { name: 'Growth Analyst', tasks: 7, color: '#FF8C42', pct: 100 },
              { name: 'Delivery Coordinator', tasks: 36, color: '#AAAAAA', pct: 100 },
            ].map((agent, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{agent.name}</span>
                  <span style={{ fontSize: 11, color: agent.color }}>{agent.tasks} tasks — {agent.pct}%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 4 }}>
                  <div style={{
                    height: '100%',
                    width: `${agent.pct}%`,
                    background: agent.color,
                    borderRadius: 4,
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}