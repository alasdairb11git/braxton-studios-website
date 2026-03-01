const express = require('express');
const router = express.Router();

// POST /api/contact
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  // Log for now — integrate nodemailer or a service later
  console.log('Contact form submission:', { name, email, message, timestamp: new Date().toISOString() });

  res.status(200).json({ success: true, message: 'Message received. We\'ll be in touch!' });
});

// GET /api/health
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
