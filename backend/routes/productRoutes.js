const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const fetchUser = require('../middleware/fetchUser');
const isAdmin = require('../middleware/isAdmin');

router.post('/addproduct', async (req, res) => {
    console.log("Add product request body:", req.body);
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log("New product:", product);
    await product.save();
    console.log("Product saved");
    res.json({ success: true, name: req.body.name });
});

router.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({ success: true, name: req.body.name });
});

router.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
});

router.post('/admin/addproduct', fetchUser, isAdmin, async (req, res) => {
    console.log("Admin add product request body:", req.body);
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log("New admin product:", product);
    await product.save();
    console.log("Admin product saved");
    res.json({ success: true, name: req.body.name });
});

router.post('/admin/removeproduct', fetchUser, isAdmin, async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Admin removed product");
    res.json({ success: true, name: req.body.name });
});

router.get('/admin/allproducts', fetchUser, isAdmin, async (req, res) => {
    let products = await Product.find({});
    console.log("Admin - All Products Fetched");
    res.send(products);
});

router.post('/admin/toggle-stock', fetchUser, isAdmin, async (req, res) => {
    try {
        const { productId, outOfStock } = req.body;
        await Product.findOneAndUpdate({ id: productId }, { outOfStock: outOfStock });
        console.log(`Product ${productId} stock status updated to: ${outOfStock ? 'Out of Stock' : 'In Stock'}`);
        res.json({ success: true, message: 'Stock status updated successfully' });
    } catch (error) {
        console.error('Error updating stock status:', error);
        res.status(500).json({ success: false, message: 'Failed to update stock status' });
    }
});

module.exports = router;