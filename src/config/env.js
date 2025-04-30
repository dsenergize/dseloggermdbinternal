import dotenv from 'dotenv';
import path from 'path';

export function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  dotenv.config({ path: envPath });
  
  // Validate required environment variables
  const requiredVars = ['MONGO_URI', 'API_SECRET', 'PORT'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}