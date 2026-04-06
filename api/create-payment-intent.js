const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICES = {
  1: { amount: 1497, name: 'La tua persona ideale' },
  2: { amount: 1997, name: 'La tua relazione ideale' },
  3: { amount: 1997, name: 'I codici segreti della mente di LUI e LEI' },
  4: { amount: 2497, name: 'Guida al potere sociale COMPLETA' },
  5: { amount: 4997, name: 'Convincimi ULTIMATE' },
};

const UPSELL_AMOUNTS = { 1: 497, 2: 497, 3: 497, 4: 497, 5: 497 };

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { bookId, upsellId, email } = req.body;
    if (!bookId || !PRICES[bookId]) return res.status(400).json({ error: 'Libro non valido' });

    const mainBook = PRICES[bookId];
    let totalAmount = mainBook.amount;
    let description = mainBook.name;
    const metadata = { mainBookId: String(bookId) };
    if (email) metadata.customerEmail = email;

    if (upsellId && PRICES[upsellId]) {
      const upsellAmount = UPSELL_AMOUNTS[upsellId];
      totalAmount += upsellAmount;
      description += ' + ' + PRICES[upsellId].name + ' (-50%)';
      metadata.upsellBookId = String(upsellId);
      metadata.upsellAmount = String(upsellAmount);
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'eur',
      description: description,
      receipt_email: email || undefined,
      metadata: metadata,
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      amount: totalAmount,
      description: description,
    });
  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ error: error.message });
  }
};
