const mongoose = require('mongoose');

// Correctly formatted MongoDB Atlas URI as a string
const MONGO_URI = 'mongodb+srv://shivammanitripathishiv:9N4rFYR4AIydzYfD@cluster0.9herh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Stop the server if there's an error
    }
};

module.exports = connectDB;


//password=9N4rFYR4AIydzYfD;
//username=shivammanitripathishiv