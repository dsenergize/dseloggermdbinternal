export const mapModbusRegisters = (deviceType, registers) => {
    const mappings = {
      INVERTER: {
        40001: 'acPower',
        40003: 'dcVoltage',
        40005: 'gridFrequency',
        40007: 'temperature',
        40009: 'faultCode'
      },
      WEATHER_STATION: {
        40101: 'irradiance',
        40103: 'temperature',
        40105: 'windSpeed',
        40107: 'humidity'
      },
      ACDB: {
        40201: 'acPower',
        40203: 'powerFactor',
        40205: 'gridFrequency'
      }
    };
  
    return Object.entries(registers).reduce((acc, [register, value]) => {
      const paramName = mappings[deviceType]?.[register];
      if (paramName) {
        acc[paramName] = applyScaling(deviceType, paramName, value);
      }
      return acc;
    }, {});
  };
  
  const applyScaling = (deviceType, param, value) => {
    const scalingFactors = {
      INVERTER: {
        acPower: 0.1,    // 0.1 kW per unit
        dcVoltage: 0.1,  // 0.1 V per unit
        temperature: 0.1
      },
      WEATHER_STATION: {
        irradiance: 0.01,
        windSpeed: 0.1
      }
    };
  
    return value * (scalingFactors[deviceType]?.[param] || 1);
  };