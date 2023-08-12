const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createPayment = async(req,res)=>{
 console.log("create payment");
  try {
    console.log("creating session");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Subscription'
            },
            unit_amount: 99900,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.BASE_URL}/subscription/success`,
      cancel_url: `${process.env.BASE_URL}/subscription/cancel`,
    });
    
    console.log("session created");
    return res.status(200).json({paymentUrl:session.url})
  } catch (error) {
    return res.status(500).json({success:false,message:"server adichu poyi"})
  }

   
}

module.exports = createPayment