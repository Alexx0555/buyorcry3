// =================================================================
// E-commerce Backend Server
// =================================================================

// -----------------------------------------------------------------
// Imports
// -----------------------------------------------------------------
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Route imports
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Middleware import
const fetchUser = require('./middleware/fetchUser');

// -----------------------------------------------------------------
// App Configuration
// -----------------------------------------------------------------
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json({ limit: '10mb' })); // Parses incoming JSON requests with a 10mb limit
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from this origin
})); // Enables Cross-Origin Resource Sharing

// -----------------------------------------------------------------
// Database Connection with MongoDB
// -----------------------------------------------------------------
const connectDB = require('./config/dbConn');
connectDB();

// -----------------------------------------------------------------
// API Endpoints - A simple test endpoint
// -----------------------------------------------------------------
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// -----------------------------------------------------------------
// Image Storage Engine (using Multer)
// -----------------------------------------------------------------
const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for images
app.use('/images', express.static('uploads/images'));
app.use('/admin', express.static(path.join(__dirname, '..', 'frontend', 'admin')));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// -----------------------------------------------------------------
// API Routes
// -----------------------------------------------------------------

// -- Routes --
app.use(productRoutes);
app.use(userRoutes);
app.use(cartRoutes);
app.use(stripeRoutes);
app.use(orderRoutes);

// -----------------------------------------------------------------
// Server Initialization
// -----------------------------------------------------------------
app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error : " + error);
    }
});
