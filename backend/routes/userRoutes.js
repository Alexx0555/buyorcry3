const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    const { email, password, username } = req.body;

    let check = await User.findOne({ email: email });
    if (check) {
        return res.status(400).json({ success: false, errors: "existing user found with same email address" });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    let isAdmin = false;
    if (email === "admin@buy.com" && password === "alex123") {
        isAdmin = true;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        name: username,
        email: email,
        password: hashedPassword,
        cartData: cart,
        isAdmin: isAdmin,
    });

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, token });
});

router.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        const passCompare = await bcrypt.compare(req.body.password, user.password);
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET);
            res.json({ success: true, token: token, isAdmin: user.isAdmin });
        } else {
            res.json({ success: false, errors: "Wrong Password", isAdmin: false });
        }
    } else {
        res.json({ success: false, errors: "Wrong Email Id", isAdmin: false });
    }
});

module.exports = router;