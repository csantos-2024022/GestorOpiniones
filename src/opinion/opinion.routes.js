import { Router } from 'express';
import { createOpinion, getMyOpinions } from './opinion.controller.js';

import { validateJWT } from '../middlewares/validate-jwt.js';


const router = Router();

router.post('/', validateJWT, createOpinion);
router.get('/', validateJWT, getMyOpinions);


export default router;
