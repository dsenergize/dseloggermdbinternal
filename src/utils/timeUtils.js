export const formatSolarTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
      iso: date.toISOString(),
      local: date.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: false
      }),
      unix: Math.floor(date.getTime() / 1000)
    };
  };
  
  export const validateTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const maxFuture = new Date(now.getTime() + 60000); // 1 minute future tolerance
    
    return date instanceof Date && 
           !isNaN(date) && 
           date <= maxFuture && 
           date > new Date('2020-01-01');
  };