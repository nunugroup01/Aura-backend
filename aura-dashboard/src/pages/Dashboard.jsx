// src/pages/Dashboard.jsx
import Header from '../components/Header'

const AGENTS = [
  { name: 'Content Engine', icon: '✦', color: '#00FFB2', desc: 'Generates brand content automatically', status: 'online' },
  { name: 'Order Manager', icon: '⬡', color: '#FFD93D', desc: 'Processes orders hands-free', status: 'online' },
  { name: 'Customer AI', icon: '◎', color: '#5BFFF8', desc: 'Replies to customers 24/7', status: 'online' },
  { name: 'Social Scheduler', icon: '◈', color: '#FF6BFF', desc: 'Posts to all platforms automatically', status: 'online' },
  { name: 'Growth Analyst', icon: '⬟', color: '#FF8C42', desc: 'Tracks performance & growth', status: 'online' },
  { name: 'Delivery Coordinator', icon: '◉', color: '#AAAAAA', desc: 'Your only job — physical dispatch', status: 'online' },
]

const STATS = [
  { label: 'Revenue Today', value: '£0.00', delta: 'live' },
  { label: 'Orders', value: '0', delta: 'processed' },
  { label: 'Content Created', value: '0', delta: 'pieces' },
  { label: 'Messages Handled', value: '0', delta: 'auto' },
]

const FEED = [
  { time: '09:14', agent: 'Content Engine', msg: 'Generated 3 Instagram posts for Summer Drop', color: '#00FFB2' },
  { time: '09:10', agent: 'Social Scheduler', msg: 'Published reel to TikTok — 1.2k views in 8 mins', color: '#FF6BFF' },
  { time: '09:07', agent: 'Order Manager', msg: 'Order #001 confirmed — customer notified', color: '#FFD93D' },
  { time: '09:03', agent: 'Customer AI', msg: 'Replied to customer query — rated 5★', color: '#5BFFF8' },
  { time: '08:58', agent: 'Growth Analyst', msg: 'Weekly report generated — revenue up 18%', color: '#FF8C42' },
]

export default function Dashboard() {
  return (
    <div style={{ minHeight: '100vh', background: '#07080A' }}>
      <Header
        title="Good morning. Aura is running."
        subtitle="All 6 agents are working autonomously. Your only job today is physical delivery."
      />

      <div style={{ padding: '0 32px 32px' }}>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 32,
        }}>
          {STATS.map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14,
              padding: '18px 20px',
            }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', marginBottom: 10 }}>
                {stat.label.toUpperCase()}
              </div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 300, color: '#fff', marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 11, color: '#00FFB2' }}>{stat.delta}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>

          {/* Agents Grid */}
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 16 }}>
              ACTIVE AGENTS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {AGENTS.map((agent, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${agent.color}33`,
                  borderRadius: 16,
                  padding: '20px 22px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 20, color: agent.color }}>{agent.icon}</span>
                    <span style={{ fontSize: 12, color: '#fff', fontWeight: 500, letterSpacing: '0.04em' }}>
                      {agent.name.toUpperCase()}
                    </span>
                    <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: agent.color, display: 'inline-block' }} />
                      <span style={{ fontSize: 9, color: agent.color, letterSpacing: '0.08em' }}>LIVE</span>
                    </span>
                  </div>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.6 }}>
                    {agent.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Live Feed */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
            padding: 22,
          }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 18 }}>
              LIVE ACTIVITY FEED
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {FEED.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  opacity: Math.max(0.2, 1 - i * 0.15),
                }}>
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', minWidth: 36, paddingTop: 2 }}>
                    {item.time}
                  </span>
                  <div>
                    <div style={{ fontSize: 9, color: item.color, letterSpacing: '0.1em', marginBottom: 3 }}>
                      {item.agent.toUpperCase()}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
                      {item.msg}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}