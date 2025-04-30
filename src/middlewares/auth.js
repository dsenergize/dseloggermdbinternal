export const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    
    if (!apiKey) {
      return res.status(401).json({ 
        error: 'Authentication required. Provide API key in X-API-Key header' 
      });
    }
  
    if (apiKey !== process.env.API_SECRET) {
      return res.status(403).json({ 
        error: 'Invalid API key' 
      });
    }
  
    next();
  };
  
  export const validateSolarData = (req, res, next) => {
    const requiredFields = {
      INVERTER: ['acPower', 'dcVoltage', 'gridFrequency'],
      WEATHER_STATION: ['irradiance', 'temperature', 'humidity'],
      ACDB: ['acPower', 'powerFactor'],
      MFM: ['energyDaily']
    };
  
    const deviceType = req.body.deviceType;
    const parameters = req.body.parameters || {};
  
    if (!requiredFields[deviceType]) {
      return res.status(400).json({
        error: `Invalid device type: ${deviceType}`
      });
    }
  
    const missingParams = requiredFields[deviceType]
      .filter(param => !(param in parameters));
  
    if (missingParams.length > 0) {
      return res.status(400).json({
        error: `Missing required parameters for ${deviceType}: ${missingParams.join(', ')}`
      });
    }
  
    next();
  };