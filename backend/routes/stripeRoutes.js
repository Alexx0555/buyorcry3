const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
    console.log("Received items:", req.body.items);
    console.log("Received customer details:", req.body.customerDetails);
    const { items, customerDetails } = req.body;

    const line_items = items.map((item) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
                images: [item.image.startsWith('http://') || item.image.startsWith('https://') ? item.image.substring(0, 2000) : 'https://example.com/default-image.jpg'],
            },
            unit_amount: item.new_price * 100, 
        },
        quantity: item.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `https://buyorcry3.onrender.com/myorders`,
            cancel_url: `https://buyorcry3.onrender.com/cancel`,
            metadata: {
                customerName: customerDetails.name,
                customerAddress: customerDetails.address,
                customerPincode: customerDetails.pincode,
                customerPhoneNumber: customerDetails.phoneNumber,
                customerEmail: customerDetails.email,
            },
        });
         let userId;
         const token = req.header('auth-token');
         if (token) {
             try {
                 const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                 userId = decodedToken.user.id;
             } catch (err) {
                 console.error("Invalid token:", err.message);
                 return res.status(500).json({ error: "Could not create checkout session", details: "Invalid token" });
             }
         } else {
             console.error("Auth token missing");
             return res.status(500).json({ error: "Could not create checkout session", details: "Auth token missing" });
         }

        const order = new Order({
            userId: userId,
            items: items.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.new_price,
            })),
            totalPrice: items.reduce((total, item) => total + item.new_price * item.quantity, 0),
            status: 'pending',
            customerDetails: {
                name: customerDetails.name,
                address: customerDetails.address,
                pincode: customerDetails.pincode,
                phoneNumber: customerDetails.phoneNumber,
                email: customerDetails.email
            }
        });

        await order.save();

        console.log("Stripe session:", session);
        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe session creation error:", error);
        console.log("Stripe error:", error.message);
        console.log("Line items:", line_items);
        res.status(500).json({ error: "Could not create checkout session", details: error.message });
    }
});

module.exports = router;
