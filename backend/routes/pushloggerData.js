import express from 'express';
import mongoose from 'mongoose';
import DeviceData from '../models/DeviceData.js';

const router = express.Router();

router.post('/futr-logger', async (req, res) => {
  try {
    const data = req.body;
    console.log(data,"data")

    if (!data || !data.response || !data.response.imei) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const newEntry = new DeviceData({
      id: new mongoose.Types.ObjectId(),
      response: data.response,
      insertiontime: new Date(),
      updationtime: new Date()
    });

    await newEntry.save();
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
