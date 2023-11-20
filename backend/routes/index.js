const express = require('express');
const router = express.Router();

// Importăm rutele pentru fiecare funcționalitate
const gradesRouter = require('./gradesRouter');
const absencesRouter = require('./absencesRouter');
const usersRouter = require('./usersRouter');
const authRouter = require('./authRouter');
const scheduleRouter = require('./scheduleRouter');
const subjectsRouter = require('./subjectsRouter');
const classRouter = require('./classRouter');

// Folosim rutele corespunzătoare pentru fiecare funcționalitate
router.use('/grades', gradesRouter);
router.use('/absences', absencesRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/schedule', scheduleRouter);
router.use('/subjects', subjectsRouter);
router.use('/classes', classRouter);


module.exports = router;
