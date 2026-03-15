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
    canonicalPath: '/',
    pageTitle: 'Braxton Studios — Scotland\'s YouTube Production Company',
    pageDescription: 'Braxton Studios is a specialist YouTube production company based in Scotland. We pair cinematic production with data-driven strategy for creators, brands, and businesses.',
    ogImage: '/images/favicon.jpg',
    schema: businessSchema
  });
});

router.get('/campaigns', (req, res) => {
  res.render('campaigns', {
    ...defaults,
    canonicalPath: '/campaigns',
    pageTitle: 'Campaigns — Braxton Studios',
    pageDescription: 'Campaign work by Braxton Studios. Podcast production, artist campaigns, and brand partnerships.',
    ogImage: '/images/bba-podcast.jpg'
  });
});

router.get('/films', (req, res) => {
  res.render('films', {
    ...defaults,
    canonicalPath: '/films',
    pageTitle: 'Films — Braxton Studios',
    pageDescription: 'Films by Braxton Studios. Short films, feature films, and cinematic storytelling.',
    ogImage: '/images/the-flatwarming.jpg'
  });
});

router.get('/stories', (req, res) => {
  res.render('stories', {
    ...defaults,
    canonicalPath: '/stories',
    pageTitle: 'Stories — Braxton Studios',
    pageDescription: 'The latest news and stories from Braxton Studios.',
    ogImage: '/images/arran_bs_mobile.jpg'
  });
});

router.get('/campaigns/building-brand-advocacy', (req, res) => {
  res.render('case-study-bba', {
    ...defaults,
    canonicalPath: '/campaigns/building-brand-advocacy',
    pageTitle: 'Building Brand Advocacy — Braxton Studios',
    pageDescription: 'Braxton Studios produced the Building Brand Advocacy podcast for Archive House Agency. Post-production, editing, and YouTube strategy for a premium podcast series.',
    ogImage: '/images/bba-podcast.jpg'
  });
});

router.get('/campaigns/adum', (req, res) => {
  res.render('case-study-adum', {
    ...defaults,
    canonicalPath: '/campaigns/adum',
    pageTitle: 'Adum — Braxton Studios',
    pageDescription: 'Braxton Studios worked with London-based artist Adum to produce short-form content across TikTok, Instagram, and YouTube. 700K+ views on TikTok, 25K+ likes on Instagram.',
    ogImage: '/images/adum.jpg'
  });
});

router.get('/about/alasdair-braxton', (req, res) => {
  res.render('founder-ab', {
    ...defaults,
    canonicalPath: '/about/alasdair-braxton',
    pageTitle: 'Alasdair Braxton — Founder, Braxton Studios',
    pageDescription: 'Alasdair Braxton is the founder of Braxton Studios, a filmmaker and producer building a creator-led media network from Scotland.',
    ogImage: '/images/ab-easdale.jpg'
  });
});

router.get('/films/tedrad', (req, res) => {
  res.render('crew-call-tedrad', {
    ...defaults,
    canonicalPath: '/films/tedrad',
    pageTitle: 'Tedrad — Now Casting — Braxton Studios',
    pageDescription: 'Tedrad is a short film in development by Braxton Studios. Now casting crew for filming in Ayrshire and Glasgow, April–May 2026.',
    ogImage: '/images/favicon.jpg'
  });
});

router.get('/films/the-flatwarming', (req, res) => {
  res.render('the-flatwarming', {
    ...defaults,
    canonicalPath: '/films/the-flatwarming',
    pageTitle: 'The Flatwarming — Braxton Studios',
    pageDescription: 'The Flatwarming is a 13-minute short film created by Stephanie Elizabeth and produced by Braxton Studios. Shot on location in Cambuslang, Glasgow.',
    ogImage: '/images/the-flatwarming.jpg'
  });
});

router.get('/products', (req, res) => {
  res.render('products', {
    ...defaults,
    canonicalPath: '/products',
    pageTitle: 'Products — Braxton Studios',
    pageDescription: 'Tools and resources built from real production experience. YouTube audit templates, LUT packs, and more from Braxton Studios.',
    ogImage: '/images/favicon.jpg'
  });
});

router.get('/youtube-audit', (req, res) => {
  res.render('youtube-audit', {
    ...defaults,
    canonicalPath: '/youtube-audit',
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
    canonicalPath: '/stories/kings-trust',
    ogType: 'article',
    pageTitle: 'A New Chapter with The King\'s Trust — Braxton Studios',
    pageDescription: 'Braxton Studios is proud to be in development with the King\'s Trust, scaling operations and supporting established clients and partners in 2026.',
    ogImage: '/images/arran_bs_mobile.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: 'The Latest from Braxton Studios: A New Chapter with The King\'s Trust',
      description: 'Braxton Studios is proud to be in development with the King\'s Trust, scaling operations and supporting established clients and partners in 2026.',
      datePublished: '2026-03-10T00:00:00+00:00',
      dateModified: '2026-03-10T00:00:00+00:00',
      author: { '@type': 'Organization', name: 'Braxton Studios', url: 'https://braxtonstudios.com' },
      publisher: { '@type': 'Organization', name: 'Braxton Studios', logo: { '@type': 'ImageObject', url: 'https://braxtonstudios.com/images/BS_transparent_2026.png' } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://braxtonstudios.com/stories/kings-trust' },
      image: 'https://braxtonstudios.com/images/arran_bs_mobile.jpg'
    }
  });
});

router.get('/stories/shiny-list', (req, res) => {
  res.render('story-shiny-list', {
    ...defaults,
    canonicalPath: '/stories/shiny-list',
    ogType: 'article',
    pageTitle: 'Two Hearts Secures Shiny List Award — Braxton Studios',
    pageDescription: 'Alasdair Braxton\'s short film Two Hearts has been officially recognised on the prestigious Shiny List, celebrating emerging directorial talent.',
    ogImage: '/images/kenmore-6-2.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: 'Alasdair Braxton\'s Two Hearts Secures Shiny List Award',
      description: 'Alasdair Braxton\'s short film Two Hearts has been officially recognised on the prestigious Shiny List, celebrating emerging directorial talent.',
      datePublished: '2026-03-01T00:00:00+00:00',
      dateModified: '2026-03-01T00:00:00+00:00',
      author: { '@type': 'Organization', name: 'Braxton Studios', url: 'https://braxtonstudios.com' },
      publisher: { '@type': 'Organization', name: 'Braxton Studios', logo: { '@type': 'ImageObject', url: 'https://braxtonstudios.com/images/BS_transparent_2026.png' } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://braxtonstudios.com/stories/shiny-list' },
      image: 'https://braxtonstudios.com/images/al-banus.jpg'
    }
  });
});

router.get('/stories/flatwarming-screening', (req, res) => {
  res.render('story-flatwarming-screening', {
    ...defaults,
    canonicalPath: '/stories/flatwarming-screening',
    ogType: 'article',
    pageTitle: 'The Flatwarming Screening at Beautiful Sunday\'s Film Club — Braxton Studios',
    pageDescription: 'The Flatwarming secures an intimate screening at Beautiful Sunday\'s Film Club at the historic Old Toll Bar in Glasgow.',
    ogImage: '/images/flatwarming-18.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: 'The Flatwarming Secures Screening at Beautiful Sunday\'s Film Club',
      description: 'The Flatwarming secures an intimate screening at Beautiful Sunday\'s Film Club at the historic Old Toll Bar in Glasgow.',
      datePublished: '2025-09-01T00:00:00+00:00',
      dateModified: '2025-09-01T00:00:00+00:00',
      author: { '@type': 'Organization', name: 'Braxton Studios', url: 'https://braxtonstudios.com' },
      publisher: { '@type': 'Organization', name: 'Braxton Studios', logo: { '@type': 'ImageObject', url: 'https://braxtonstudios.com/images/BS_transparent_2026.png' } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://braxtonstudios.com/stories/flatwarming-screening' },
      image: 'https://braxtonstudios.com/images/flatwarming-18.jpg'
    }
  });
});

router.get('/faqs', (req, res) => {
  res.render('faqs', {
    ...defaults,
    canonicalPath: '/faqs',
    pageTitle: 'FAQs — Braxton Studios',
    pageDescription: 'Frequently asked questions about Braxton Studios. Learn about our YouTube production services, strategy, pricing, and how to work with us.'
  });
});

router.get('/privacy-policy', (req, res) => {
  res.render('privacy-policy', {
    ...defaults,
    canonicalPath: '/privacy-policy',
    pageTitle: 'Privacy Policy — Braxton Studios',
    pageDescription: 'Braxton Studios privacy policy. How we collect, use, and protect your personal information.'
  });
});

router.get('/cookie-policy', (req, res) => {
  res.render('cookie-policy', {
    ...defaults,
    canonicalPath: '/cookie-policy',
    pageTitle: 'Cookie Policy — Braxton Studios',
    pageDescription: 'Braxton Studios cookie policy. How we use cookies and similar technologies on our website.'
  });
});

router.get('/sitemap.xml', (req, res) => {
  const pages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/campaigns', priority: '0.8', changefreq: 'monthly' },
    { loc: '/films', priority: '0.8', changefreq: 'monthly' },
    { loc: '/stories', priority: '0.8', changefreq: 'weekly' },
    { loc: '/products', priority: '0.7', changefreq: 'monthly' },
    { loc: '/youtube-audit', priority: '0.8', changefreq: 'monthly' },
    { loc: '/campaigns/building-brand-advocacy', priority: '0.6', changefreq: 'yearly' },
    { loc: '/campaigns/adum', priority: '0.6', changefreq: 'yearly' },
    { loc: '/films/the-flatwarming', priority: '0.6', changefreq: 'yearly' },
    { loc: '/films/tedrad', priority: '0.6', changefreq: 'monthly' },
    { loc: '/about/alasdair-braxton', priority: '0.5', changefreq: 'yearly' },
    { loc: '/stories/kings-trust', priority: '0.7', changefreq: 'yearly' },
    { loc: '/stories/shiny-list', priority: '0.7', changefreq: 'yearly' },
    { loc: '/stories/flatwarming-screening', priority: '0.7', changefreq: 'yearly' },
    { loc: '/faqs', priority: '0.4', changefreq: 'yearly' },
    { loc: '/privacy-policy', priority: '0.2', changefreq: 'yearly' },
    { loc: '/cookie-policy', priority: '0.2', changefreq: 'yearly' }
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>https://braxtonstudios.com${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  res.set('Content-Type', 'application/xml');
  res.send(xml);
});

router.get('/news-sitemap.xml', (req, res) => {
  const stories = [
    {
      loc: '/stories/kings-trust',
      title: 'The Latest from Braxton Studios: A New Chapter with The King\'s Trust',
      date: '2026-03-10T00:00:00+00:00'
    },
    {
      loc: '/stories/shiny-list',
      title: 'Alasdair Braxton\'s Two Hearts Secures Shiny List Award',
      date: '2026-03-01T00:00:00+00:00'
    },
    {
      loc: '/stories/flatwarming-screening',
      title: 'The Flatwarming Secures Screening at Beautiful Sunday\'s Film Club',
      date: '2025-09-01T00:00:00+00:00'
    }
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${stories.map(s => `  <url>
    <loc>https://braxtonstudios.com${s.loc}</loc>
    <news:news>
      <news:publication>
        <news:name>Braxton Studios</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${s.date}</news:publication_date>
      <news:title>${s.title}</news:title>
    </news:news>
  </url>`).join('\n')}
</urlset>`;
  res.set('Content-Type', 'application/xml');
  res.send(xml);
});

module.exports = router;
