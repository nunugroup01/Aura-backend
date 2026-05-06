// src/server.js
// Aura — Autonomous AI Brand Operating System
// All 6 agents online

import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import express from 'express'
import connectDB from './db/connect.js'
import contentRoutes from './routes/content.js'
import orderRoutes from './routes/orders.js'
import customerRoutes from './routes/customer.js'
import socialRoutes from './routes/social.js'
import analyticsRoutes from './routes/analytics.js'
import deliveryRoutes from './routes/delivery.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '../.env') })

connectDB()

const app = express()
app.use(express.json())

// All 6 Aura Agent Routes
app.use('/api/content', contentRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/customer', customerRoutes)
app.use('/api/social', socialRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/delivery', deliveryRoutes)

// Home route
app.get('/', (req, res) => {
  res.json({
    name: 'Aura',
    status: 'online',
    message: 'Aura is running — Autonomous AI Brand Operating System',
    version: '1.0.0',
    agents: {
      content: 'online',
      orders: 'online',
      customer: 'online',
      social: 'online',
      analytics: 'online',
      delivery: 'online'
    }
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`✨ Aura is running on port ${PORT}`)
  console.log(`🤖 All 6 Aura agents are online`)
})