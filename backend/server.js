// server.js — Node.js + Express backend for Anush G's Portfolio
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
app.use(cors({
  origin: [
    'https://anushg750-cmd.github.io',  // Replace with your GitHub Pages URL
    'http://localhost:5500',                    // VS Code Live Server
    'http://127.0.0.1:5500'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// ===== DATABASE CONNECTION =====
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// ===== CREATE TABLE ON START =====
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id        SERIAL PRIMARY KEY,
        name      VARCHAR(100) NOT NULL,
        email     VARCHAR(150) NOT NULL,
        subject   VARCHAR(200),
        message   TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    console.log('[+] Database table ready');
  } catch (err) {
    console.error('[!] DB init error:', err.message);
  }
}

initDB();

// ===== ROUTES =====

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Anush G Portfolio API is running 🚀' });
});

// POST /api/contact — Save contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO contacts (name, email, subject, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, created_at`,
      [name, email, subject || 'No subject', message]
    );

    console.log(`[+] New contact from ${name} (${email}) — ID: ${result.rows[0].id}`);

    res.status(201).json({
      success: true,
      message: 'Message received! Anush will get back to you soon.',
      id: result.rows[0].id
    });
  } catch (err) {
    console.error('[!] DB error:', err.message);
    res.status(500).json({ error: 'Failed to save message. Please try again.' });
  }
});

// GET /api/contacts — View all messages (protect this in production!)
app.get('/api/contacts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json({ count: result.rows.length, contacts: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`[+] Server running on port ${PORT}`);
  console.log(`[+] Environment: ${process.env.NODE_ENV || 'development'}`);
});
