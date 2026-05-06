// src/routes/content.js
// Aura — Content Engine Routes

import { Router } from 'express'
import { generateContent } from '../agents/Contentagent.js'

const router = Router()

// POST /api/content/generate
// Generates content for any brand
router.post('/generate', async (req, res) => {
  try {
    const { brandName, niche, tone, platform, request } = req.body

    if (!brandName || !niche || !tone || !platform || !request) {
      return res.status(400).json({
        error: 'Missing fields: brandName, niche, tone, platform, request'
      })
    }

    const content = await generateContent({
      brandName,
      niche,
      tone,
      platform,
      request
    })

    res.status(200).json({
      success: true,
      brand: brandName,
      platform,
      content
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router