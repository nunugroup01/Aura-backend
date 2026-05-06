// src/agents/SocialAgent.js
// Aura — Social Scheduler (Agent 04)
// Schedules and manages social media posts

// In-memory post store
let posts = []
let postIdCounter = 1

// Schedule a post
export function schedulePost({ brandName, platform, content, scheduledFor }) {
  const post = {
    id: `POST-${String(postIdCounter++).padStart(4, '0')}`,
    brandName,
    platform,
    content,
    scheduledFor: scheduledFor || new Date().toISOString(),
    status: 'scheduled',
    publishedAt: null,
    createdAt: new Date().toISOString()
  }
  posts.push(post)
  console.log(`📱 Post scheduled for ${platform}: ${post.id}`)
  return post
}

// Get all posts
export function getAllPosts() {
  return posts
}

// Get posts by platform
export function getPostsByPlatform(platform) {
  return posts.filter(p => p.platform.toLowerCase() === platform.toLowerCase())
}

// Get scheduled posts
export function getScheduledPosts() {
  return posts.filter(p => p.status === 'scheduled')
}

// Get published posts
export function getPublishedPosts() {
  return posts.filter(p => p.status === 'published')
}

// Mark post as published
export function publishPost(id) {
  const post = posts.find(p => p.id === id)
  if (!post) return null
  post.status = 'published'
  post.publishedAt = new Date().toISOString()
  console.log(`✅ Post ${id} published on ${post.platform}`)
  return post
}

// Delete a post
export function deletePost(id) {
  const index = posts.findIndex(p => p.id === id)
  if (index === -1) return null
  const deleted = posts.splice(index, 1)
  return deleted[0]
}