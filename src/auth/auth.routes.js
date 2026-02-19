import { Router } from 'express';
import { register, login } from './auth.controller.js';
import { validateJWT } from '../middlewares/validate-jwt.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/private', validateJWT, (req, res) => {
  res.json({ message: 'Private route' });
});


export default router;