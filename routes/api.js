const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL || 'info@braxtonstudios.com',
    pass: process.env.ZOHO_PASSWORD
  }
});

// POST /api/contact
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    await transporter.sendMail({
      from: `"Braxton Studios Website" <${process.env.ZOHO_EMAIL || 'info@braxtonstudios.com'}>`,
      to: 'info@braxtonstudios.com',
      replyTo: email,
      subject: `New Enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Website Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    res.status(200).json({ success: true, message: 'Message sent. We\'ll be in touch!' });
  } catch (err) {
    console.error('Email send error:', err.message);
    res.status(500).json({ error: 'Failed to send message. Please email us directly.' });
  }
});

// POST /api/creucast-apply
router.post('/creucast-apply', async (req, res) => {
  const { fullName, youtubeLink, socialHandle, mainSkill, contentFocus, whyGrow, whyCollective, commitment } = req.body;

  if (!youtubeLink || !socialHandle) {
    return res.status(400).json({ error: 'YouTube channel link and Instagram/TikTok handle are required.' });
  }

  try {
    await transporter.sendMail({
      from: `"Braxton Studios Website" <${process.env.ZOHO_EMAIL || 'info@braxtonstudios.com'}>`,
      to: 'info@braxtonstudios.com',
      subject: `Creucast Application${fullName ? ' — ' + fullName : ''}`,
      text: `Full Name: ${fullName || 'N/A'}
YouTube Channel: ${youtubeLink}
Instagram/TikTok: ${socialHandle}
Main Skill or Role: ${mainSkill || 'N/A'}
Content Focus: ${contentFocus || 'N/A'}

Why grow personal brand now:
${whyGrow || 'N/A'}

Why this collective appeals:
${whyCollective || 'N/A'}

Can commit to 6-month structure: ${commitment || 'N/A'}`,
      html: `
        <h2>New Creucast Application</h2>
        <p><strong>Full Name:</strong> ${fullName || 'N/A'}</p>
        <p><strong>YouTube Channel:</strong> <a href="${youtubeLink}">${youtubeLink}</a></p>
        <p><strong>Instagram/TikTok:</strong> ${socialHandle}</p>
        <p><strong>Main Skill or Role:</strong> ${mainSkill || 'N/A'}</p>
        <p><strong>Content Focus:</strong> ${contentFocus || 'N/A'}</p>
        <p><strong>Why grow personal brand now:</strong><br>${(whyGrow || 'N/A').replace(/\n/g, '<br>')}</p>
        <p><strong>Why this collective appeals:</strong><br>${(whyCollective || 'N/A').replace(/\n/g, '<br>')}</p>
        <p><strong>Can commit to 6-month structure:</strong> ${commitment || 'N/A'}</p>
      `
    });

    res.status(200).json({ success: true, message: 'Application sent. We\'ll be in touch!' });
  } catch (err) {
    console.error('Creucast apply email error:', err.message);
    res.status(500).json({ error: 'Failed to send application. Please email us directly.' });
  }
});

// POST /api/subscribe
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    await transporter.sendMail({
      from: `"Braxton Studios Website" <${process.env.ZOHO_EMAIL || 'info@braxtonstudios.com'}>`,
      to: 'info@braxtonstudios.com',
      subject: `New Subscriber: ${email}`,
      text: `New email signup:\n\n${email}`,
      html: `
        <h2>New Email Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p style="color:#999;font-size:13px;">Signed up via the website mailing list.</p>
      `
    });

    res.status(200).json({ success: true, message: 'You\'re on the list!' });
  } catch (err) {
    console.error('Subscribe error:', err.message);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// GET /api/health
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
