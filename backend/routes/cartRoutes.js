const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetchUser = require('../middleware/fetchUser');

router.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId, "Size:", req.body.size);
    let userData = await User.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] = {
        quantity: (userData.cartData[req.body.itemId]?.quantity || 0) + 1,
        size: req.body.size
    };
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added");
});

router.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    let userData = await User.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
});

router.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
});

router.post('/updatecart', fetchUser, async (req, res) => {
    console.log("Update Cart", req.body.itemId, "Count:", req.body.count);
    let userData = await User.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] = {
        quantity: req.body.count,
        size: req.body.size
    };
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Updated");
});

module.exports = router;