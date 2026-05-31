import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import documentRoutes from './routes/documentRoutes';

// Load environmental variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/documents', documentRoutes);

// Health check endpoint
app.get('/api/status', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'PDFlow Edit Pro API Engine'
  });
});

// Root welcome message
app.get('/', (req: Request, res: Response) => {
  res.send('PDFlow Edit Pro Backend API is running.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`🚀 PDFlow Edit Pro server active!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`⚙️  Env: ${process.env.NODE_ENV || 'development'}`);
  console.log(`========================================`);
});
