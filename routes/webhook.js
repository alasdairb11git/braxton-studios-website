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

// Maps a Stripe Price ID to what gets delivered for it
const DELIVERABLES = {
  price_1T8oGZRlZROjUc9liV3rUfAD: {
    name: 'YouTube Channel Audit Template',
    filename: 'Braxton_Studios_YouTube_Channel_Audit.pdf',
    path: path.join(__dirname, '..', 'private', 'Braxton_Studios_YouTube_Channel_Audit.pdf')
  },
  price_1UBwjWRlZROjUc9lRYoD3ZgU: {
    name: 'iPhone Field Kit',
    filename: 'Braxton_Studios_iPhone_Field_Kit.zip',
    path: path.join(__dirname, '..', 'private', 'Braxton_Studios_iPhone_Field_Kit.zip')
  }
};

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
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price']
      });

      const purchased = lineItems.data
        .map((item) => DELIVERABLES[item.price?.id])
        .filter(Boolean);

      if (!purchased.length) {
        console.error('No known deliverables matched for session:', session.id);
        return res.status(200).json({ received: true });
      }

      const names = purchased.map((d) => d.name);
      const nameList = names.length > 1
        ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
        : names[0];

      await transporter.sendMail({
        from: `"Braxton Studios" <${process.env.ZOHO_EMAIL || 'info@braxtonstudios.com'}>`,
        to: customerEmail,
        subject: `Your order from Braxton Studios — ${nameList}`,
        text: `Thanks for your purchase!\n\nYour ${nameList} ${names.length > 1 ? 'are' : 'is'} attached to this email.\n\nIf you have any questions, reply to this email and we'll get back to you.\n\nBraxton Studios`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 0;">
            <h2 style="font-size: 20px; color: #0a0a0a; margin-bottom: 24px;">Thanks for your purchase!</h2>
            <p style="font-size: 16px; line-height: 1.7; color: #444;">Your ${nameList} ${names.length > 1 ? 'are' : 'is'} attached to this email.</p>
            <p style="font-size: 16px; line-height: 1.7; color: #444;">If you have any questions, just reply to this email and we'll get back to you.</p>
            <p style="font-size: 14px; color: #999; margin-top: 40px;">Braxton Studios</p>
          </div>
        `,
        attachments: purchased.map((d) => ({ filename: d.filename, path: d.path }))
      });

      console.log(`${nameList} sent to ${customerEmail} (session: ${session.id})`);
    } catch (err) {
      console.error('Failed to send order email:', err.message);
    }
  }

  res.status(200).json({ received: true });
}

module.exports = handleStripeWebhook;
