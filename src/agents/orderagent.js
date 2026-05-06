// src/agents/OrderAgent.js
// Aura — Order Manager (Agent 02)
// Handles all orders automatically

// In-memory order store (MongoDB connects later)
let orders = []
let orderIdCounter = 1

// Create a new order
export function createOrder({ customerName, customerEmail, product, quantity, price }) {
  const order = {
    id: `ORD-${String(orderIdCounter++).padStart(4, '0')}`,
    customerName,
    customerEmail,
    product,
    quantity,
    price,
    status: 'confirmed',
    dispatchReady: false,
    createdAt: new Date().toISOString()
  }
  orders.push(order)
  console.log(`📦 New order created: ${order.id} for ${customerName}`)
  return order
}

// Get all orders
export function getAllOrders() {
  return orders
}

// Get single order
export function getOrder(id) {
  return orders.find(o => o.id === id)
}

// Update order status
export function updateOrderStatus(id, status) {
  const order = orders.find(o => o.id === id)
  if (!order) return null
  order.status = status
  if (status === 'ready') order.dispatchReady = true
  console.log(`📦 Order ${id} updated to: ${status}`)
  return order
}

// Get orders ready for dispatch
export function getDispatchOrders() {
  return orders.filter(o => o.dispatchReady && o.status !== 'shipped')
}