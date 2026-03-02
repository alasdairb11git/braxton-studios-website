const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    contactEmail: process.env.CONTACT_EMAIL || 'info@braxtonstudios.com',
    year: new Date().getFullYear()
  });
});

router.get('/campaigns/building-brand-advocacy', (req, res) => {
  res.render('case-study-bba', {
    contactEmail: process.env.CONTACT_EMAIL || 'info@braxtonstudios.com',
    year: new Date().getFullYear()
  });
});

router.get('/films/tedrad', (req, res) => {
  res.render('crew-call-tedrad', {
    contactEmail: process.env.CONTACT_EMAIL || 'info@braxtonstudios.com',
    year: new Date().getFullYear()
  });
});

module.exports = router;
