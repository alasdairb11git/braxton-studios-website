const express = require('express');
const router = express.Router();

const defaults = {
  contactEmail: process.env.CONTACT_EMAIL || 'info@braxtonstudios.com',
  year: new Date().getFullYear()
};

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoProductionCompany',
  name: 'Braxton Studios',
  description: 'Specialist YouTube production company based in Scotland. Cinematic production paired with data-driven strategy.',
  foundingDate: '2023',
  founder: {
    '@type': 'Person',
    name: 'Alasdair Braxton'
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'GB',
    addressRegion: 'Scotland'
  },
  sameAs: [
    'https://www.youtube.com/@braxtonstudiosofficial',
    'https://www.instagram.com/braxtonstudios/',
    'https://www.linkedin.com/company/braxtonstudios'
  ]
};

router.get('/', (req, res) => {
  res.render('index', {
    ...defaults,
    pageTitle: 'Braxton Studios — Scotland\'s YouTube Production Company',
    pageDescription: 'Braxton Studios is a specialist YouTube production company based in Scotland. We pair cinematic production with data-driven strategy for creators, brands, and businesses.',
    ogImage: '/images/favicon.jpg',
    schema: businessSchema
  });
});

router.get('/campaigns/building-brand-advocacy', (req, res) => {
  res.render('case-study-bba', {
    ...defaults,
    pageTitle: 'Building Brand Advocacy — Braxton Studios',
    pageDescription: 'Braxton Studios produced the Building Brand Advocacy podcast for Archive House Agency. Post-production, editing, and YouTube strategy for a premium podcast series.',
    ogImage: '/images/bba-podcast.jpg'
  });
});

router.get('/campaigns/adum', (req, res) => {
  res.render('case-study-adum', {
    ...defaults,
    pageTitle: 'Adum — Braxton Studios',
    pageDescription: 'Braxton Studios worked with London-based artist Adum to produce short-form content across TikTok, Instagram, and YouTube. 700K+ views on TikTok, 25K+ likes on Instagram.',
    ogImage: '/images/adum.jpg'
  });
});

router.get('/about/alasdair-braxton', (req, res) => {
  res.render('founder-ab', {
    ...defaults,
    pageTitle: 'Alasdair Braxton — Founder, Braxton Studios',
    pageDescription: 'Alasdair Braxton is the founder of Braxton Studios, a filmmaker and producer building a creator-led media network from Scotland.',
    ogImage: '/images/ab-easdale.jpg'
  });
});

router.get('/films/tedrad', (req, res) => {
  res.render('crew-call-tedrad', {
    ...defaults,
    pageTitle: 'Tedrad — Now Casting — Braxton Studios',
    pageDescription: 'Tedrad is a short film in development by Braxton Studios. Now casting crew for filming in Ayrshire and Glasgow, April–May 2026.',
    ogImage: '/images/favicon.jpg'
  });
});

router.get('/films/the-flatwarming', (req, res) => {
  res.render('the-flatwarming', {
    ...defaults,
    pageTitle: 'The Flatwarming — Braxton Studios',
    pageDescription: 'The Flatwarming is a 13-minute short film created by Stephanie Elizabeth and produced by Braxton Studios. Shot on location in Cambuslang, Glasgow.',
    ogImage: '/images/the-flatwarming.jpg'
  });
});

router.get('/products', (req, res) => {
  res.render('products', {
    ...defaults,
    pageTitle: 'Products — Braxton Studios',
    pageDescription: 'Tools and resources built from real production experience. YouTube audit templates, LUT packs, and more from Braxton Studios.',
    ogImage: '/images/favicon.jpg'
  });
});

router.get('/youtube-audit', (req, res) => {
  res.render('youtube-audit', {
    ...defaults,
    pageTitle: 'YouTube Channel Audit — Braxton Studios',
    pageDescription: 'The Braxton Studios YouTube Channel Audit Template. A complete 8-section framework with 60+ checkpoints, score system, and 30/60/90 day action plan. Built by a studio with 2M+ organic views. £29.',
    ogImage: '/images/favicon.jpg'
  });
});

router.get('/the-transfer', (req, res) => {
  res.render('the-transfer', {
    ...defaults,
    pageTitle: 'The Transfer — Braxton Studios',
    pageDescription: 'The Transfer. A private partnership document by Braxton Studios.',
    ogImage: '/images/favicon.jpg',
    authorized: false,
    error: null
  });
});

router.post('/the-transfer', (req, res) => {
  const { password } = req.body;
  const correct = password === (process.env.TRANSFER_PASSWORD || 'transfer2026');
  res.render('the-transfer', {
    ...defaults,
    pageTitle: 'The Transfer — Braxton Studios',
    pageDescription: 'The Transfer. A private partnership document by Braxton Studios.',
    ogImage: '/images/favicon.jpg',
    authorized: correct,
    error: correct ? null : 'Incorrect access code. Please try again.'
  });
});

router.get('/stories/kings-trust', (req, res) => {
  res.render('story-kings-trust', {
    ...defaults,
    pageTitle: 'A New Chapter with The King\'s Trust — Braxton Studios',
    pageDescription: 'Braxton Studios is proud to be in development with the King\'s Trust, scaling operations and supporting established clients and partners in 2026.',
    ogImage: '/images/arran_bs_mobile.jpg'
  });
});

router.get('/stories/shiny-list', (req, res) => {
  res.render('story-shiny-list', {
    ...defaults,
    pageTitle: 'Two Hearts Secures Shiny List Award — Braxton Studios',
    pageDescription: 'Alasdair Braxton\'s short film Two Hearts has been officially recognised on the prestigious Shiny List, celebrating emerging directorial talent.',
    ogImage: '/images/kenmore-6-2.jpg'
  });
});

router.get('/stories/flatwarming-screening', (req, res) => {
  res.render('story-flatwarming-screening', {
    ...defaults,
    pageTitle: 'The Flatwarming Screening at Beautiful Sunday\'s Film Club — Braxton Studios',
    pageDescription: 'The Flatwarming secures an intimate screening at Beautiful Sunday\'s Film Club at the historic Old Toll Bar in Glasgow.',
    ogImage: '/images/flatwarming-18.jpg'
  });
});

router.get('/faqs', (req, res) => {
  res.render('faqs', {
    ...defaults,
    pageTitle: 'FAQs — Braxton Studios',
    pageDescription: 'Frequently asked questions about Braxton Studios. Learn about our YouTube production services, strategy, pricing, and how to work with us.'
  });
});

router.get('/privacy-policy', (req, res) => {
  res.render('privacy-policy', {
    ...defaults,
    pageTitle: 'Privacy Policy — Braxton Studios',
    pageDescription: 'Braxton Studios privacy policy. How we collect, use, and protect your personal information.'
  });
});

router.get('/cookie-policy', (req, res) => {
  res.render('cookie-policy', {
    ...defaults,
    pageTitle: 'Cookie Policy — Braxton Studios',
    pageDescription: 'Braxton Studios cookie policy. How we use cookies and similar technologies on our website.'
  });
});

module.exports = router;
