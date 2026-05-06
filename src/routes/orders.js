// src/routes/orders.js
// Aura — Order Manager Routes

import { Router } from 'express'
import {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  getDispatchOrders
} from '../agents/OrderAgent.js'

const router = Router()

// POST /api/orders
// Create a new order
router.post('/', (req, res) => {
  try {
    const { customerName, customerEmail, product, quantity, price } = req.body

    if (!customerName || !customerEmail || !product || !quantity || !price) {
      return res.status(400).json({
        error: 'Missing fields: customerName, customerEmail, product, quantity, price'
      })
    }

    const order = createOrder({ customerName, customerEmail, product, quantity, price })
    res.status(201).json({ success: true, order })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/orders
// Get all orders
router.get('/', (req, res) => {
  const orders = getAllOrders()
  res.status(200).json({ success: true, count: orders.length, orders })
})

// GET /api/orders/dispatch
// Get orders ready for physical dispatch
router.get('/dispatch', (req, res) => {
  const orders = getDispatchOrders()
  res.status(200).json({
    success: true,
    message: 'These orders need your physical dispatch',
    count: orders.length,
    orders
  })
})

// GET /api/orders/:id
// Get single order
router.get('/:id', (req, res) => {
  const order = getOrder(req.params.id)
  if (!order) return res.status(404).json({ error: 'Order not found' })
  res.status(200).json({ success: true, order })
})

// PATCH /api/orders/:id/status
// Update order status
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body
    const validStatuses = ['confirmed', 'processing', 'ready', 'shipped', 'delivered']

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      })
    }

    const order = updateOrderStatus(req.params.id, status)
    if (!order) return res.status(404).json({ error: 'Order not found' })

    res.status(200).json({ success: true, order })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router