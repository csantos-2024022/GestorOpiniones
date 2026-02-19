const express = require('express');
const router = express.Router();

const { createOpinion } = require('../controllers/opinionController');
const authMiddleware = require('../middlewares/validate-jwt');

// Crear opinión (protegida)
router.post('/', authMiddleware, createOpinion);

module.exports = router;