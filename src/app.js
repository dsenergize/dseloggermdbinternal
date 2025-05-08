import express from 'express';
import dotenv from 'dotenv';
import { connectToMongoDB } from './db/mongoClient.js';
import webhookRoutes from './routes/webhookRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.raw({ type: '*/*', limit: '2mb' }));
app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

// Routes
app.use('/api', webhookRoutes);

// Init & Start Server
connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
