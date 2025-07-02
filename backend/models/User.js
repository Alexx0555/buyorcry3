const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    date: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false },
});

module.exports = User;