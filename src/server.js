import express from 'express';

import { connectDB } from './config/db.js';
import dataRoutes from './routes/dataRoutes.js';
import 'dotenv/config';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', dataRoutes);

// Database connection
connectDB();

// Start server
 const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📦 MongoDB: ${process.env.MONGO_URI.split('@')[1]}`);
});