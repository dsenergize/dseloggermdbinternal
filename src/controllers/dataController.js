import DataModel from '../models/dataSchema.js';

import Ping from '../models/pingSchema.js'; // Assuming you have a Ping model defined
export const createPing = async (req, res) => {
  try {
    const { imei, signal, time, ...rest } = req.body;

    // Validation
    if (!imei) {
      return res.status(400).json({
        status: 'error',
        message: 'IMEI is required'
      });
    }

    // Create new ping record
    const newPing = new Ping({
      imei,
      signal: Number(signal) || 0,
      deviceTime: time,
      rawData: rest
    });

    // Save to database
    await newPing.save();

    // Send response
    res.status(201).json({
      status: 'success',
      message: 'Ping recorded',
      data: {
        imei,
        serverTime: new Date().toISOString(),
        signalStrength: newPing.signal
      }
    });

  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create a new data entry
export const createData = async (req, res) => {
  try {
    const newData = new DataModel({ data: req.body });
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all data entries
export const getAllData = async (req, res) => {
  try {
    const data = await DataModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single data entry by ID
export const getDataById = async (req, res) => {
  try {
    const data = await DataModel.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a data entry by ID
export const updateData = async (req, res) => {
  try {
    const updatedData = await DataModel.findByIdAndUpdate(
      req.params.id,
      { data: req.body },
      { new: true }
    );
    if (!updatedData) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a data entry by ID
export const deleteData = async (req, res) => {
  try {
    const deletedData = await DataModel.findByIdAndDelete(req.params.id);
    if (!deletedData) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};