const nodemailer = require('nodemailer');
const path = require('path');

const stripe = process.env.STRIPE_SECRET_KEY
  ? require('stripe')(process.env.STRIPE_SECRET_KEY)
  : null;

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL || 'info@braxtonstudios.com',
    pass: process.env.ZOHO_PASSWORD
  }
});

const PDF_PATH = path.join(__dirname, '..', 'private', 'Braxton_Studios_YouTube_Channel_Audit.pdf');

async function handleStripeWebhook(req, res) {
  if (!stripe) {
    console.error('Stripe not configured — missing STRIPE_SECRET_KEY');
    return res.status(500).send('Stripe not configured');
  }

  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email || session.customer_email;

    if (!customerEmail) {
      console.error('No customer email found in session:', session.id);
      return res.status(200).json({ received: true });
    }

    try {
      await transporter.sendMail({
        from: `"Braxton Studios" <${process.env.ZOHO_EMAIL || 'info@braxtonstudios.com'}>`,
        to: customerEmail,
        subject: 'Your YouTube Channel Audit Template — Braxton Studios',
        text: `Thanks for your purchase!\n\nYour YouTube Channel Audit Template is attached to this email.\n\nIf you have any questions, reply to this email and we'll get back to you.\n\nBraxton Studios`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 0;">
            <h2 style="font-size: 20px; color: #0a0a0a; margin-bottom: 24px;">Thanks for your purchase!</h2>
            <p style="font-size: 16px; line-height: 1.7; color: #444;">Your YouTube Channel Audit Template is attached to this email.</p>
            <p style="font-size: 16px; line-height: 1.7; color: #444;">If you have any questions, just reply to this email and we'll get back to you.</p>
            <p style="font-size: 14px; color: #999; margin-top: 40px;">Braxton Studios</p>
          </div>
        `,
        attachments: [
          {
            filename: 'Braxton_Studios_YouTube_Channel_Audit.pdf',
            path: PDF_PATH
          }
        ]
      });

      console.log(`Audit PDF sent to ${customerEmail} (session: ${session.id})`);
    } catch (err) {
      console.error('Failed to send audit PDF:', err.message);
    }
  }

  res.status(200).json({ received: true });
}

module.exports = handleStripeWebhook;
