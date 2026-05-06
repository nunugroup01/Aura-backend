// src/routes/delivery.js
// Aura — Delivery Coordinator Routes

import { Router } from 'express'
import {
  getPendingDispatch,
  markDispatched,
  getDeliverySummary
} from '../agents/DeliveryAgent.js'

const router = Router()

// GET /api/delivery/pending
// Get all orders waiting for YOUR physical dispatch
router.get('/pending', (req, res) => {
  const orders = getPendingDispatch()
  res.status(200).json({
    success: true,
    message: 'These orders need your physical dispatch',
    count: orders.length,
    orders
  })
})

// GET /api/delivery/summary
// Get full delivery summary
router.get('/summary', (req, res) => {
  const summary = getDeliverySummary()
  res.status(200).json({ success: true, summary })
})

// PATCH /api/delivery/:orderId/dispatch
// Mark an order as dispatched after YOU ship it
router.patch('/:orderId/dispatch', (req, res) => {
  try {
    const { trackingNumber } = req.body
    const order = markDispatched(req.params.orderId, trackingNumber)
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.status(200).json({
      success: true,
      message: 'Order marked as dispatched',
      order
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router