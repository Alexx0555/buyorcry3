const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const fetchUser = require('../middleware/fetchUser');
const isAdmin = require('../middleware/isAdmin');

router.get('/myorders', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId });

    // Manually populate product details since productId is a Number, not ObjectId
    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        const itemsWithProducts = await Promise.all(
          order.items.map(async (item) => {
            const product = await Product.findOne({ id: item.productId });
            return {
              ...item.toObject(),
              productId: product || { id: item.productId, name: 'Product not found' }
            };
          })
        );
        return {
          ...order.toObject(),
          items: itemsWithProducts
        };
      })
    );

    res.json(ordersWithProducts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Admin route to get all orders
router.get('/admin/allorders', fetchUser, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ orderDate: -1 });

    // Manually populate product details and user details
    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        const itemsWithProducts = await Promise.all(
          order.items.map(async (item) => {
            const product = await Product.findOne({ id: item.productId });
            return {
              ...item.toObject(),
              productId: product || { id: item.productId, name: 'Product not found' }
            };
          })
        );

        const user = await User.findById(order.userId);

        return {
          ...order.toObject(),
          items: itemsWithProducts,
          user: user ? { name: user.name, email: user.email } : { name: 'User not found', email: '' },
          // Ensure customerDetails exists for backward compatibility
          customerDetails: order.customerDetails || {
            name: user?.name || 'N/A',
            email: user?.email || 'N/A',
            phoneNumber: 'N/A',
            address: 'N/A',
            pincode: 'N/A'
          },
          // Ensure status exists for backward compatibility
          status: order.status || 'pending'
        };
      })
    );

    res.json(ordersWithDetails);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Admin route to update order status
router.post('/admin/update-order-status', fetchUser, isAdmin, async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!['pending', 'packaging', 'shipped', 'delivered'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    await Order.findByIdAndUpdate(orderId, { status: status });
    console.log(`Order ${orderId} status updated to: ${status}`);
    res.json({ success: true, message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
});

module.exports = router;