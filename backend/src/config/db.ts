import mongoose from 'mongoose';

export async function connectDB(uri: string) {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Пробрасываем ошибку наверх — там включим фолбэк на in-memory MongoDB
    throw err;
  }
}
