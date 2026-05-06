// src/routes/customer.js
// Aura — Customer AI Routes

import { Router } from 'express'
import {
  replyToCustomer,
  getAllMessages,
  getMessage
} from '../agents/Customeragent.js'

const router = Router()

// POST /api/customer/reply
// Send customer message — Aura replies automatically
router.post('/reply', async (req, res) => {
  try {
    const { brandName, tone, niche, customerName, customerMessage } = req.body

    if (!brandName || !tone || !niche || !customerName || !customerMessage) {
      return res.status(400).json({
        error: 'Missing fields: brandName, tone, niche, customerName, customerMessage'
      })
    }

    const record = await replyToCustomer({
      brandName,
      tone,
      niche,
      customerName,
      customerMessage
    })

    res.status(200).json({ success: true, message: record })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/customer/messages
// Get all customer messages and replies
router.get('/messages', (req, res) => {
  const msgs = getAllMessages()
  res.status(200).json({
    success: true,
    count: msgs.length,
    messages: msgs
  })
})

// GET /api/customer/messages/:id
// Get single message
router.get('/messages/:id', (req, res) => {
  const msg = getMessage(req.params.id)
  if (!msg) return res.status(404).json({ error: 'Message not found' })
  res.status(200).json({ success: true, message: msg })
})

export default router