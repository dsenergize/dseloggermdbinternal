import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import pushloggerData from './routes/pushloggerData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/your_db_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1', pushloggerData);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  