import express from 'express';
import {
  createData,
  getAllData,
  getDataById,
  updateData,
  deleteData,
} from '../controllers/dataController.js';


const router = express.Router();

router.post('/packets', createData); // Create data
router.get('/', getAllData); // Get all data
router.get('/:id', getDataById); // Get data by ID
router.put('/:id', updateData); // Update data by ID
router.delete('/:id', deleteData); // Delete data by ID

export default router;