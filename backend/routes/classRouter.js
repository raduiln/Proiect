const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta pentru crearea unei clase noi
router.post('/', authMiddleware, classController.createClass);

// Ruta pentru obținerea tuturor claselor
router.get('/', authMiddleware, classController.getAllClasses);


module.exports = router;