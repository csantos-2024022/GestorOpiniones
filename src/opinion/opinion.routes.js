import { Router } from 'express';
import { 
  createOpinion, 
  getMyOpinions, 
  updateOpinion, 
  deleteOpinion 
} from './opinion.controller.js';


import { validateJWT } from '../middlewares/validate-jwt.js';


const router = Router();

router.post('/', validateJWT, createOpinion);
router.get('/', validateJWT, getMyOpinions);
router.put('/:id', validateJWT, updateOpinion);
router.delete('/:id', validateJWT, deleteOpinion);


export default router;
