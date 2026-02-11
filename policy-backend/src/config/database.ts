import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/policydukan_v2');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
