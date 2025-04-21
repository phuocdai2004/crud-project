const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB Atlas:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
