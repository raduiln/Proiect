const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta pentru obținerea tuturor utilizatorilor
router.get('/', authMiddleware, usersController.getAllUsers);

// Ruta pentru crearea unui utilizator nou
router.post('/', authMiddleware, usersController.createUser);

// Ruta pentru crearea unui student nou
router.post('/student', usersController.createStudent);

// Ruta pentru crearea unui profesor nou
router.post('/teacher', usersController.createTeacher);

// Ruta pentru obținerea profesorului
router.get('/teacher/:userId', authMiddleware, usersController.getTeacher);

// Ruta pentru obținerea tuturor studenților
router.get('/students', authMiddleware, usersController.getAllStudents);

router.get('/details', authMiddleware, usersController.getUserDetails);

router.get('/teachers', authMiddleware, usersController.getAllTeachers);

// delete user
router.delete('/:userId', authMiddleware, usersController.deleteUser);



module.exports = router;
