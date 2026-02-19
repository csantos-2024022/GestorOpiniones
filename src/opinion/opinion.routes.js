import { Router } from 'express';
import { isAdmin } from '../middlewares/is-admin.js';
import Opinion from './opinion.model.js';
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
router.get('/all', validateJWT, isAdmin, async (req, res) => {
  const opinions = await Opinion.find().populate('user', 'name email');

  res.json({
    message: 'All opinions (admin)',
    opinions
  });
});


export default router;
