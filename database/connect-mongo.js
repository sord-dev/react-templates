import mongoose from 'mongoose';
import { CSS, Code} from './models-mongo';

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

// Function to save code to the MongoDB collection
const saveComponentCode = async (code) => {
  try {
    const savedCode = await Code.create({ code });
    return savedCode._id.toString();
  } catch (error) {
    console.error('Error saving code:', error);
    throw error;
  }
};

// Function to save CSS to the MongoDB collection
const saveComponentCSS = async (css) => {
  try {
    const savedCSS = await CSS.create({ css });
    return savedCSS._id.toString();
  } catch (error) {
    console.error('Error saving CSS:', error);
    throw error;
  }
};

export { saveComponentCode, saveComponentCSS, connectMongo, disconnectMongo };
