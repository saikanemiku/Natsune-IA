/**
 * =========================================================================
 * NATSUNE IA - SERVIDOR BACKEND PROXY (server.js)
 * =========================================================================
 */

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

// Render asigna su propio puerto dinámicamente, debemos usar process.env.PORT obligatoriamente
const PORT = process.env.PORT || 10000;

const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model } = req.body;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model || 'llama-3.3-70b-versatile',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errData = await response.text();
      return res.status(response.status).json({ error: errData });
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Error en el servidor proxy:', error);
    res.status(500).json({ error: 'Error interno en el servidor de Natsune.' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor de Natsune IA corriendo en el puerto ${PORT}`);
});
