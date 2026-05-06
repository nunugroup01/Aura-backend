// src/routes/analytics.js
// Aura — Analytics Routes

import { Router } from 'express'
import { getAnalytics } from '../agents/AnalyticsAgent.js'

const router = Router()

// GET /api/analytics/:brandName
// Get full analytics report for a brand
router.get('/:brandName', (req, res) => {
  try {
    const report = getAnalytics(req.params.brandName)
    res.status(200).json({ success: true, report })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router