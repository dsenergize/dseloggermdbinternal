import express from 'express';
import { connectDB } from './config/db.js';
import router from './routes/dataRoutes.js';
import { loadEnv } from './config/env.js';

// Load environment variables
loadEnv();

// Database connection
connectDB().then(() => {
  // Create Express app after successful DB connection
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/api/v1/solar', router);

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'OK',
      database: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED',
      uptime: process.uptime()
    });
  });

  // Error handling
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  });

  // Start server
  const PORT = process.env.PORT || 8000;
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📦 MongoDB connected to: ${process.env.MONGO_URI.split('@')[1]}`);
  });

  // Handle shutdown gracefully
  process.on('SIGINT', () => {
    server.close(() => {
      mongoose.connection.close(false, () => {
        console.log('🛑 Server and MongoDB connection closed');
        process.exit(0);
      });
    });
  });

}).catch(error => {
  console.error('🔥 Failed to initialize application:', error);
  process.exit(1);
});