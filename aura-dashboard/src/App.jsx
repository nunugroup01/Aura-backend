import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Content from './pages/Content'
import Orders from './pages/Orders'
import Customer from './pages/Customer'
import Social from './pages/Social'
import Analytics from './pages/Analytics'
import Delivery from './pages/Delivery'
import Settings from './pages/Settings'
import Sidebar from './components/Sidebar'
import './index.css'

function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#07080A' }}>
      <style>{`
        @keyframes pulseRing {
          0%,100%{transform:scale(1);opacity:0.4}
          50%{transform:scale(1.8);opacity:0}
        }
      `}</style>
      <Sidebar />
      <div style={{ marginLeft: 220, flex: 1 }}>
        {children}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/content" element={<Layout><Content /></Layout>} />
        <Route path="/orders" element={<Layout><Orders /></Layout>} />
        <Route path="/customer" element={<Layout><Customer /></Layout>} />
        <Route path="/social" element={<Layout><Social /></Layout>} />
        <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
        <Route path="/delivery" element={<Layout><Delivery /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}