// src/agents/ContentAgent.js
// Aura — Content Engine (Agent 01)
// Generates content for any brand, any platform

import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
})

export async function generateContent({ brandName, niche, tone, platform, request }) {
  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    system: `You are the AI content engine for ${brandName}, a ${niche} brand.
Tone: ${tone}
Platform: ${platform}
Write ready-to-publish content only. No explanations. No preamble.
Always write in the brand voice. Never mention you are an AI.`,
    messages: [
      { role: 'user', content: request }
    ]
  })

  return message.content[0].text
}