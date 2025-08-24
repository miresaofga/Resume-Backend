const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Create Stripe Checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'your_stripe_secret_key_here') {
      // Simulate Stripe in development: return a fake URL
      return res.json({ url: req.body.success_url || 'http://localhost:3000/subscription?success=1&simulated=1' });
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Resume/Letter Download' },
            unit_amount: 500, // $5.00
          },
          quantity: 1,
        },
      ],
      success_url: req.body.success_url,
      cancel_url: req.body.cancel_url,
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: 'Stripe session failed', details: err.message });
  }
});


// Record a one-time payment and reset download count
const { sendPaymentEmail, sendAdminPaymentNotification } = require('../utils/email');
router.post('/payment-success', async (req, res) => {
  const { userId, stripeSessionId, amount } = req.body;
  if (!userId || !stripeSessionId) {
    return res.status(400).json({ error: 'Missing userId or stripeSessionId' });
  }
  try {
    const prisma = require('../../backend/server').prisma || require('prisma/prisma-client');
    // Create a payment record
    await prisma.payment.create({
      data: {
        userId: Number(userId),
        stripeId: stripeSessionId,
        amount: amount || 500,
      },
    });
    // Reset downloadCount to 0 for new payment
    await prisma.user.update({ where: { id: Number(userId) }, data: { downloadCount: 0 } });
    // Send payment confirmation email (non-blocking)
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (user && user.email) {
      sendPaymentEmail(user.email, user.name).catch(console.error);
      // Notify admin
      sendAdminPaymentNotification(user.email, user.name).catch(console.error);
    }
    // Redirect to AI generator (frontend route)
    return res.json({ redirect: '/resume' });
  } catch (err) {
    return res.status(500).json({ error: 'Payment failed', details: err.message });
  }
});

module.exports = router;
