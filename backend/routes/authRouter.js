const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta pentru înregistrare (sign-up)
router.post('/signup', authController.signUp);

// Ruta pentru autentificare (login)
router.post('/login', authController.login);

module.exports = router;
