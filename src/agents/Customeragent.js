// src/agents/CustomerAgent.js
// Aura — Customer AI (Agent 03)
// Handles all customer messages automatically

import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
})
// In-memory message store
let messages = []
let messageIdCounter = 

// Generate AI reply to customer message
export async function replyToCustomer({ brandName, tone, niche, customerName, customerMessage }) {
  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 512,
    system: `You are the customer service AI for ${brandName}, a ${niche} brand.
Tone: ${tone}
Your job is to reply to customer messages professionally and helpfully.
Always be polite, empathetic and solution-focused.
Never mention you are an AI.
Keep replies concise and friendly.`,
    messages: [
      {
        role: 'user',
        content: `Customer name: ${customerName}
Customer message: ${customerMessage}

Write a reply to this customer.`
      }
    ]
  })

  const reply = message.content[0].text

  // Save to memory
  const record = {
    id: `MSG-${String(messageIdCounter++).padStart(4, '0')}`,
    customerName,
    customerMessage,
    auraReply: reply,
    status: 'replied',
    createdAt: new Date().toISOString()
  }
  messages.push(record)

  return record
}

// Get all messages
export function getAllMessages() {
  return messages
}

// Get single message
export function getMessage(id) {
  return messages.find(m => m.id === id)
}