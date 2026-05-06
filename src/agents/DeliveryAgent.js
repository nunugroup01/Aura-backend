// src/agents/DeliveryAgent.js
// Aura — Delivery Coordinator (Agent 06)
// Coordinates physical delivery — the only human task

import { getAllOrders, updateOrderStatus } from './OrderAgent.js'

// Get all orders waiting for dispatch
export function getPendingDispatch() {
  const orders = getAllOrders()
  return orders.filter(o =>
    o.status === 'confirmed' || o.status === 'processing'
  )
}

// Mark order as dispatched
export function markDispatched(orderId, trackingNumber) {
  const order = updateOrderStatus(orderId, 'shipped')
  if (!order) return null
  order.trackingNumber = trackingNumber || 'PENDING'
  order.dispatchedAt = new Date().toISOString()
  console.log(`🚚 Order ${orderId} dispatched — tracking: ${trackingNumber}`)
  return order
}

// Get delivery summary
export function getDeliverySummary() {
  const orders = getAllOrders()
  return {
    generatedAt: new Date().toISOString(),
    awaitingDispatch: orders.filter(o => o.status === 'confirmed').length,
    inTransit: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    orders: {
      toDispatch: orders.filter(o => o.status === 'confirmed'),
      inTransit: orders.filter(o => o.status === 'shipped'),
      delivered: orders.filter(o => o.status === 'delivered'),
    }
  }
}