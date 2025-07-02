const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 30000,
    }).then(()=> {
        console.log("MongoDB connected successfully");
    })
}

module.exports = connectDB;