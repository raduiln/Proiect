const express = require('express');
const router = express.Router();
const gradesController = require('../controllers/gradesController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta pentru crearea unei note noi
router.post('/', authMiddleware, gradesController.createGrade);

// Ruta pentru obținerea tuturor notelor
router.get('/', authMiddleware, gradesController.getGrades);

// Ruta pentru obținerea notelor unui student
router.get('/student/:studentId', authMiddleware, gradesController.getGradesByStudentId);

// Ruta stergerii unei note
router.delete('/:id', authMiddleware, gradesController.deleteGrade);

module.exports = router;
