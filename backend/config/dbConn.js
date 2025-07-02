const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    }).then(()=> {
        console.log("MongoDB connected successfully");
    })
}

module.exports = connectDB;