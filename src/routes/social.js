// src/routes/social.js
// Aura — Social Scheduler Routes

import { Router } from 'express'
import {
  schedulePost,
  getAllPosts,
  getPostsByPlatform,
  getScheduledPosts,
  getPublishedPosts,
  publishPost,
  deletePost
} from '../agents/SocialAgent.js'

const router = Router()

// POST /api/social/schedule
// Schedule a new post
router.post('/schedule', (req, res) => {
  try {
    const { brandName, platform, content, scheduledFor } = req.body

    if (!brandName || !platform || !content) {
      return res.status(400).json({
        error: 'Missing fields: brandName, platform, content'
      })
    }

    const validPlatforms = ['instagram', 'tiktok', 'twitter', 'facebook', 'linkedin', 'pinterest', 'threads']
    if (!validPlatforms.includes(platform.toLowerCase())) {
      return res.status(400).json({
        error: `Invalid platform. Must be one of: ${validPlatforms.join(', ')}`
      })
    }

    const post = schedulePost({ brandName, platform, content, scheduledFor })
    res.status(201).json({ success: true, post })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/social/posts
// Get all posts
router.get('/posts', (req, res) => {
  const posts = getAllPosts()
  res.status(200).json({ success: true, count: posts.length, posts })
})

// GET /api/social/posts/scheduled
// Get scheduled posts
router.get('/posts/scheduled', (req, res) => {
  const posts = getScheduledPosts()
  res.status(200).json({ success: true, count: posts.length, posts })
})

// GET /api/social/posts/published
// Get published posts
router.get('/posts/published', (req, res) => {
  const posts = getPublishedPosts()
  res.status(200).json({ success: true, count: posts.length, posts })
})

// GET /api/social/posts/:platform
// Get posts by platform
router.get('/posts/:platform', (req, res) => {
  const posts = getPostsByPlatform(req.params.platform)
  res.status(200).json({ success: true, count: posts.length, posts })
})

// PATCH /api/social/posts/:id/publish
// Mark post as published
router.patch('/posts/:id/publish', (req, res) => {
  const post = publishPost(req.params.id)
  if (!post) return res.status(404).json({ error: 'Post not found' })
  res.status(200).json({ success: true, post })
})

// DELETE /api/social/posts/:id
// Delete a post
router.delete('/posts/:id', (req, res) => {
  const post = deletePost(req.params.id)
  if (!post) return res.status(404).json({ error: 'Post not found' })
  res.status(200).json({ success: true, message: 'Post deleted', post })
})

export default router