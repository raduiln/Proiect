const express = require('express');
const router = express.Router();
const subjectsController = require('../controllers/subjectsController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta pentru crearea unei materii noi
router.post('/', authMiddleware, subjectsController.createSubject);

// Ruta pentru obținerea tuturor materiilor
router.get('/', authMiddleware, subjectsController.getAllSubjects);


module.exports = router;