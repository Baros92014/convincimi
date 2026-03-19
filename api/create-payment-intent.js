 }
 
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'eur',
      description: description,
      metadata: metadata,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      },
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
