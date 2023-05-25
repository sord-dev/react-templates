import mongoose from 'mongoose';
import { Gut } from './models-mongo';

// MongoDB connection setup
const connectMongo = async () => {
    try {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL, options);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

const disconnectMongo = async () => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
};

// Function to save component guts to the MongoDB collection
const saveComponentGuts = async ({ code, css }) => {
    try {
        const savedCode = await Gut.create({ code, css });

        return savedCode._id.toString();
    } catch (error) {
        console.error('Error saving code:', error);
        throw error;
    }
};

export { saveComponentGuts, connectMongo, disconnectMongo };
