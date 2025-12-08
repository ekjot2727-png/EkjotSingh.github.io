import express from 'express';
import { 
  getPeriodLogs, 
  createPeriodLog, 
  updatePeriodLog, 
  deletePeriodLog 
} from '../controllers/periodLog.controller.js';

const router = express.Router();

router.get('/', getPeriodLogs);
router.post('/', createPeriodLog);
router.put('/:id', updatePeriodLog);
router.delete('/:id', deletePeriodLog);

export default router;
