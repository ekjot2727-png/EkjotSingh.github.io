import express from 'express';
import { 
  getGynecologists, 
  getGynecologistById, 
  searchGynecologists 
} from '../controllers/gynecologist.controller.js';

const router = express.Router();

router.get('/', getGynecologists);
router.get('/search', searchGynecologists);
router.get('/:id', getGynecologistById);

export default router;
