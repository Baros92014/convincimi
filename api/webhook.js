const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

const BOOKS = {
  1: {
    name: 'La tua persona ideale',
    link: 'https://drive.google.com/drive/folders/1MQ3K4iMgJfIkq6wmgcBkpGegbs5d984W?usp=drive_link',
  },
  2: {
    name: 'La tua relazione ideale',
    link: 'https://drive.google.com/drive/folders/1Br9y1-KWtf-2gTX9yRIHp5Kzj4r_iUsl?usp=drive_link',
  },
  3: {
    name: 'I codici segreti della mente di LUI e LEI',
    link: 'https://drive.google.com/drive/folders/1psdkeVOs5rHiBXAG-9niDdiaO1OWQAsi?usp=drive_link',
  },
  4: {
    name: 'Guida al potere sociale COMPLETA',
    link: 'https://drive.google.com/drive/folders/1kt6cVUHvLtx5rNeBUrb-Q5_K-I_00agp?usp=drive_link',
  },
  5: {
    name: 'Convincimi ULTIMATE',
    link: 'https://drive.google.com/drive/folders/1NaVdDIJx0bgboh0iPtFpW6BFU8XPysB8?usp=drive_link',
  },
};

async function sendEmail(to, subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Convincimi <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error('Resend error: ' + err);
  }
}

function buildEmailHtml(books) {
  const bookRows = books.map(b => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #E0D8CC;">
        <p style="margin:0 0 6px;font-size:15px;font-weight:700;color:#1A1208;">${b.name}</p>
        <a href="${b.link}"
           style="display:inline-block;padding:10px 20px;background:#7B3D1E;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:700;">
          Scarica il libro →
        </a>
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="it">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#fbf6f0;font-family:'Helvetica Neue',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fbf6f0;padding:40px 20px;">
        <tr><td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(24,18,16,0.08);">
            
            <!-- Header -->
            <tr>
              <td style="background:#1A1208;padding:28px 32px;text-align:center;">
                <h1 style="margin:0;font-size:22px;font-weight:700;color:#C9A84C;letter-spacing:-0.5px;">Convincimi</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 8px;font-size:18px;font-weight:700;color:#1A1208;">Acquisto completato! 🎉</p>
                <p style="margin:0 0 24px;font-size:14px;color:#7A6F60;line-height:1.6;">
                  Grazie per il tuo acquisto. Qui sotto trovi il link per scaricare il tuo libro digitale.
                  Clicca sul bottone per accedere al file su Google Drive.
                </p>

                <table width="100%" cellpadding="0" cellspacing="0">
                  ${bookRows}
                </table>

                <p style="margin:24px 0 0;font-size:12px;color:#7A6F60;line-height:1.6;">
                  Hai problemi con il download? Rispondi a questa email e ti aiutiamo subito.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#F2F0EB;padding:18px 32px;text-align:center;">
                <p style="margin:0;font-size:11px;color:#7A6F60;">
                  © Convincimi — Psicologia delle relazioni
                </p>
              </td>
            </tr>

          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // req.body must be raw buffer — Vercel passes it as buffer when bodyParser is disabled
    event = stripe.webhooks.constructEvent(req.body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object;
    const metadata = intent.metadata || {};
    const email = metadata.customerEmail || intent.receipt_email;

    if (!email) {
      console.error('No customer email found in payment intent');
      return res.status(200).json({ received: true });
    }

    // Build list of purchased books
    const purchasedBooks = [];
    const mainBookId = parseInt(metadata.mainBookId);
    if (mainBookId && BOOKS[mainBookId]) purchasedBooks.push(BOOKS[mainBookId]);

    const upsellBookId = parseInt(metadata.upsellBookId);
    if (upsellBookId && BOOKS[upsellBookId]) purchasedBooks.push(BOOKS[upsellBookId]);

    if (purchasedBooks.length === 0) {
      console.error('No books found for bookId:', mainBookId);
      return res.status(200).json({ received: true });
    }

    const bookNames = purchasedBooks.map(b => b.name).join(' + ');

    try {
      await sendEmail(
        email,
        `Il tuo acquisto: ${bookNames}`,
        buildEmailHtml(purchasedBooks)
      );
      console.log(`Email sent to ${email} for: ${bookNames}`);
    } catch (err) {
      console.error('Email send error:', err.message);
    }
  }

  return res.status(200).json({ received: true });
};
