const mongoose = require('mongoose');

const connectDB = async () => {
    if (mongoose.connection.readyState === 0) { // Kiểm tra trạng thái kết nối
        try {
            await mongoose.connect("mongodb://localhost:27017/crud_project", {
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
            });
            console.log("MongoDB connected");
        } catch (error) {
            console.error("MongoDB connection failed:", error);
            process.exit(1);
        }
    } else {
        console.log("MongoDB connection already active");
    }
};

module.exports = connectDB;
