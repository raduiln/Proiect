const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const authMiddleware = require('../middleware/authMiddleware');


// Ruta pentru crearea unui orar nou
router.post('/', authMiddleware, scheduleController.createSchedule);

// Ruta pentru obținerea tuturor orarelor
router.get('/', authMiddleware, scheduleController.getAllSchedule);

// Ruta pentru obținerea orarului unui student
router.get('/student', authMiddleware, scheduleController.getScheduleByStudentAndClass);



module.exports = router;