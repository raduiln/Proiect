const express = require('express');
const router = express.Router();
const absencesController = require('../controllers/absencesController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta pentru crearea unei absențe noi
router.post('/', authMiddleware, absencesController.createAbsence);

// Ruta pentru obținerea tuturor absențelor
router.get('/', authMiddleware, absencesController.getAllAbsences);

// Ruta pentru obținerea absențelor unui student
router.get('/student/:studentId', authMiddleware, absencesController.getAbsencesByStudentId);


// Alte rute pentru actualizarea, ștergerea etc. absențelor

module.exports = router;
