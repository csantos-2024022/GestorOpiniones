import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGO);
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};