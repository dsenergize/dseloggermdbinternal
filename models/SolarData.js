import mongoose from 'mongoose';

const deviceParameterSchema = new mongoose.Schema({
  // Common parameters
  timestamp: { type: Date, required: true },
  deviceStatus: { type: Number, min: 0, max: 2 }, // 0=Offline, 1=Online, 2=Degraded
  
  // Solar-specific parameters
  acPower: { type: Number },          // kW
  dcVoltage: { type: Number },        // V
  gridFrequency: { type: Number },    // Hz
  energyDaily: { type: Number },      // kWh
  temperature: { type: Number },      // °C
  irradiance: { type: Number },       // W/m²
  windSpeed: { type: Number },        // m/s
  humidity: { type: Number },         // %
  powerFactor: { type: Number },      // 0-1
  faultCode: { type: String }
}, { _id: false, strict: false });

const solarDataSchema = new mongoose.Schema({
  siteId: { 
    type: String, 
    required: true,
    index: true,
    match: /^SOLAR_FARM_\d{3}$/ 
  },
  deviceType: {
    type: String,
    required: true,
    enum: ['INVERTER', 'ACDB', 'MFM', 'WEATHER_STATION', 'TRANSFORMER']
  },
  deviceId: { type: String, required: true },
  parameters: deviceParameterSchema,
  alerts: [{
    code: String,
    severity: { type: String, enum: ['CRITICAL', 'WARNING', 'INFO'] },
    description: String,
    timestamp: Date
  }],
  metadata: {
    signalStrength: { type: Number, min: 0, max: 31 },
    packetSequence: { type: Number, index: true },
    firmwareVersion: String
  }
}, { timestamps: true });

// Indexes for common query patterns
solarDataSchema.index({ siteId: 1, deviceType: 1 });
solarDataSchema.index({ 'parameters.timestamp': -1 });

export default mongoose.model('SolarData', solarDataSchema);