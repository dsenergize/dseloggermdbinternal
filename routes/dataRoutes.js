import express from 'express';
import { 
  ingestSolarData, 
  getSystemHealth 
} from '../controllers/dataController.js';
import { 
  authenticate, 
  validateSolarData 
} from '../middlewares/auth.js';

const router = express.Router();

// Data ingestion endpoint
router.post('/ingest',
  authenticate,
  validateSolarData,
  ingestSolarData
);

// Monitoring endpoint
router.get('/health/:siteId',
  authenticate,
  getSystemHealth
);

export default router;