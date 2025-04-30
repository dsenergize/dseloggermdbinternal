import SolarData from '../models/SolarData.js';

export const ingestSolarData = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      parameters: {
        ...req.body.parameters,
        timestamp: new Date(req.body.parameters.timestamp)
      }
    };

    const solarRecord = new SolarData(payload);
    await solarRecord.save();

    res.status(201).json({
      success: true,
      message: 'Solar data ingested successfully',
      data: {
        recordId: solarRecord._id,
        deviceId: solarRecord.deviceId,
        timestamp: solarRecord.parameters.timestamp
      }
    });

  } catch (error) {
    console.error('Data ingestion error:', error);
    res.status(400).json({
      success: false,
      error: error.message,
      invalidFields: error.errors ? Object.keys(error.errors) : []
    });
  }
};

export const getSystemHealth = async (req, res) => {
  try {
    const latestRecords = await SolarData.aggregate([
      { $match: { siteId: req.params.siteId } },
      { $sort: { 'parameters.timestamp': -1 } },
      { $group: { 
        _id: "$deviceId",
        latestStatus: { $first: "$$ROOT" }
      }}
    ]);

    res.json({
      success: true,
      data: latestRecords.map(rec => ({
        deviceId: rec._id,
        status: rec.latestStatus.parameters.deviceStatus,
        lastUpdate: rec.latestStatus.parameters.timestamp
      }))
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve system health'
    });
  }
};