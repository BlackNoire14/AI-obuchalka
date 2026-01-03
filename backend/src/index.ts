import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import progressRoutes from './routes/progress';
import aiRoutes from './routes/ai';

// Load environment variables
dotenv.config();
// nodemon restart trigger (env updated)

const app: Application = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// CORS configuration - support multiple origins
const allowedOrigins = FRONTEND_URL.split(',').map(url => url.trim());
app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }, 
  credentials: true 
}));
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Добро пожаловать в API Code Tutor' });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/ai', aiRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Произошла внутренняя ошибка сервера' });
});

// Start server after DB connection
async function start() {
  const uri = process.env.MONGODB_URI;
  try {
    if (!uri) throw new Error('MONGODB_URI not provided');
    await connectDB(uri);
  } catch (e) {
    console.warn('Переходим на in-memory MongoDB (mongodb-memory-server)...');
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const mem = await MongoMemoryServer.create();
    const memUri = mem.getUri();
    await connectDB(memUri);
  }
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
}

start();

export default app;
