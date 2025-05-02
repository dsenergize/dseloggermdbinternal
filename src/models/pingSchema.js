import mongoose from 'mongoose';

const pingSchema = new mongoose.Schema({
  imei: {
    type: String,
    required: true,
    index: true
  },
  signal: {
    type: Number,
    required: true
  },
  deviceTime: String,
  serverTime: {
    type: Date,
    default: Date.now
  },
  rawData: mongoose.Schema.Types.Mixed
}, { timestamps: true });

export default mongoose.model('Ping', pingSchema);