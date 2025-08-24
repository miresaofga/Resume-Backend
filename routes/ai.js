

const express = require('express');
const OpenAI = require('openai');
const router = express.Router();

// Initialize OpenAI with API key from environment
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// POST /api/ai/generate
router.post('/generate', async (req, res) => {
  console.log('SIMULATE_AI value:', process.env.SIMULATE_AI);
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt required' });
  }

  // SIMULATION MODE: return a fake response for testing
  if (process.env.SIMULATE_AI === 'true') {
    return res.json({ result: `Simulated AI response for prompt: ${prompt}` });
  }

  try {
    // Compose a system prompt for professional resume writing
    const messages = [
      { role: 'system', content: 'You are a professional resume writer. Generate a modern, ATS-friendly resume based on the user input.' },
      { role: 'user', content: prompt }
    ];
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 800,
      temperature: 0.7
    });
    const text = completion.choices?.[0]?.message?.content;
    if (!text) {
      return res.status(502).json({ error: 'No response from AI model.' });
    }
    res.json({ result: text });
  } catch (err) {
    console.error('AI generation error:', err);
    res.status(500).json({ error: 'AI generation failed', details: err.message || err });
  }
});

module.exports = router;
