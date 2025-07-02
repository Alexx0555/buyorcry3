const mongoose = require('mongoose');

const Order = mongoose.model('Order', {
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: Number, required: true }, // Changed from ObjectId to Number to match Product.id
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'packaging', 'shipped', 'delivered'], default: 'pending' },
  customerDetails: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true }
  }
});

module.exports = Order;