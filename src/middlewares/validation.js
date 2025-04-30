export const validateSolarData = (req, res, next) => {
    const requiredFields = {
      STATUS: ['siteId', 'imei', 'devices'],
      ALERT: ['siteId', 'imei', 'systemAlerts'],
      EVENT: ['siteId', 'imei', 'metrics'],
      MAINTENANCE: ['siteId', 'imei', 'maintenanceLogs']
    };
  
    const msgType = req.body.msgType;
    
    if (!requiredFields[msgType]) {
      return res.status(400).json({ error: 'Invalid message type' });
    }
  
    for (const field of requiredFields[msgType]) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }
    
    next();
  };