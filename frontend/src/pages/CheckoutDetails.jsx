import React, { useState, useContext, useEffect } from 'react';
import './CheckoutDetails.css';
import { ShopContext } from '../context/ShopContext';
import getStripe from '../utils/stripe';

console.log("Stripe Public Key:", process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutDetails = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const { all_product, cartItems } = useContext(ShopContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const items = all_product
            .filter(e => cartItems[e.id] && cartItems[e.id].quantity > 0)
            .map(e => ({
                id: e.id,
                name: e.name,
                image: e.image,
                new_price: e.new_price,
                quantity: cartItems[e.id].quantity
            }));

        const customerDetails = {
            name: name,
            address: address,
            pincode: pincode,
            phoneNumber: phoneNumber,
            email: email
        };

        try {
            const response = await fetch('http://localhost:4000/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({ items, customerDetails })
            });

            const data = await response.json();
            if (data.id) {
              const stripe = await getStripe();
              stripe.redirectToCheckout({ sessionId: data.id });
            } else {
                console.error("Stripe session ID is missing:", data);
                alert("Could not proceed to payment. Please try again.");
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
        }
    };

    return (
        <div className="checkout-details">
            <h2>Enter Your Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pincode">Pincode:</label>
                    <input
                        type="text"
                        id="pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Go to Payment</button>
            </form>
        </div>
    );
};

export default CheckoutDetails;