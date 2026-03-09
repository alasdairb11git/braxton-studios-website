require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Stripe webhook needs raw body — must come BEFORE express.json()
app.post('/api/webhook/stripe', express.raw({ type: 'application/json' }), require('./routes/webhook'));

// JSON parsing for everything else
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

// 404 fallback — serve homepage
app.use((req, res) => {
  res.status(404).render('index', {
    contactEmail: process.env.CONTACT_EMAIL || 'info@braxtonstudios.com',
    year: new Date().getFullYear()
  });
});

app.listen(PORT, () => {
  console.log(`Braxton Studios running on http://localhost:${PORT}`);
});
