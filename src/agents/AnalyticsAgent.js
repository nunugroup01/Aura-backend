// src/agents/AnalyticsAgent.js
// Aura — Growth Analyst (Agent 05)
// Tracks performance across all agents

import { getAllOrders } from './OrderAgent.js'
import { getAllPosts } from './SocialAgent.js'
import { getAllMessages } from './CustomerAgent.js'

// Get full analytics report
export function getAnalytics(brandName) {
  const orders = getAllOrders()
  const posts = getAllPosts()
  const messages = getAllMessages()

  // Order stats
  const totalOrders = orders.length
  const shippedOrders = orders.filter(o => o.status === 'shipped').length
  const pendingOrders = orders.filter(o => o.status === 'confirmed').length
  const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.price) * o.quantity), 0)

  // Social stats
  const totalPosts = posts.length
  const publishedPosts = posts.filter(p => p.status === 'published').length
  const scheduledPosts = posts.filter(p => p.status === 'scheduled').length
  const platformBreakdown = posts.reduce((acc, p) => {
    acc[p.platform] = (acc[p.platform] || 0) + 1
    return acc
  }, {})

  // Customer stats
  const totalMessages = messages.length
  const repliedMessages = messages.filter(m => m.status === 'replied').length

  return {
    brand: brandName,
    generatedAt: new Date().toISOString(),
    overview: {
      totalRevenue: `£${totalRevenue.toFixed(2)}`,
      totalOrders,
      totalPosts,
      totalMessages,
    },
    orders: {
      total: totalOrders,
      shipped: shippedOrders,
      pending: pendingOrders,
    },
    social: {
      total: totalPosts,
      published: publishedPosts,
      scheduled: scheduledPosts,
      byPlatform: platformBreakdown,
    },
    customer: {
      total: totalMessages,
      replied: repliedMessages,
      responseRate: totalMessages > 0
        ? `${Math.round((repliedMessages / totalMessages) * 100)}%`
        : '0%'
    }
  }
}