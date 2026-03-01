const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    contactEmail: process.env.CONTACT_EMAIL || 'hello@braxtonstudios.co.uk',
    year: new Date().getFullYear()
  });
});

module.exports = router;
