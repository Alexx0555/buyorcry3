require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const orderRoutes = require('./routes/orderRoutes');

const fetchUser = require('./middleware/fetchUser');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: '10mb' })); 
app.use(cors()); 

const connectDB = require('./config/dbConn');
connectDB();

app.get("/", (req, res) => {
    res.send("Express App is Running");
});

const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

app.use('/images', express.static('uploads/images'));
app.use('/admin', express.static(path.join(__dirname, '..', 'frontend', 'admin')));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

app.use(productRoutes);
app.use(userRoutes);
app.use(cartRoutes);
app.use(stripeRoutes);
app.use(orderRoutes);

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error : " + error);
    }
});
