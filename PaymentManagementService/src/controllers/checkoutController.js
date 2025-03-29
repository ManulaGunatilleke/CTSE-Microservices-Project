const stripe = require('stripe')(process.env.SECRET_KEY);
const authenticateRole = require('../middleware/authenticateRole');

const createCheckoutSession = async (req, res) => {
    const { product } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.name,
                            images: [product.image],
                        },
                        unit_amount: product.price * 100,
                    },
                    quantity: product.quantity,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/confirmationPage?courseId=${product.courseId}`,
            cancel_url: `http://localhost:3000/order-summary?courseId=${product.courseId}`,
        });

        res.json({ id: session.id, session: session });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
};

module.exports = {
    createCheckoutSession,
};