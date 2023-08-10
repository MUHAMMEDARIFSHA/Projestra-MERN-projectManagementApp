const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createPayment = async(req,res)=>{
    try {
        const { amount, currency, paymentMethodId } = req.body;
    
        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency,
          payment_method: paymentMethodId,
          confirm: true,
        });
    
        // Handle successful payment
        res.status(200).json({ success: true, clientSecret: paymentIntent.client_secret });
      } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ success: false, error: error.message });
      }
}

module.exports = createPayment