const GradesService = require('../services/GradesService');
const SubjectsService = require('../services/SubjectsService');
const subjectsService = new SubjectsService();
const gradesService = new GradesService();

module.exports = {
    createGrade: async (req, res) => {
        try {
            const { grade, studentId, teacherId, subjectId } = req.body;
            const newGrade = await gradesService.createGrade({
                value: parseInt(grade),
                studentId: parseInt(studentId),
                teacherId: parseInt(teacherId),
                subjectId: parseInt(subjectId),
            });
            res.status(201).json(newGrade);
        } catch (error) {
            res.status(500).json({ error: error.message || 'Eroare la crearea notei.'  });
        }
    },

    getAllGrades: async (req, res) => {
        try {
            const grades = await gradesService.getAllGrades();
            res.json(grades);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la obținerea notelor.' });
        }
    },

    getGradesByStudentId: async (req, res) => {
        try {
            const { studentId } = req.params;
            const grades = await gradesService.getGradesByStudentId(studentId);
            res.json(grades);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la obținerea notelor.' });
        }
    },

    getGrades: async (req, res) => {
        try {
            const { studentId, subjectId, userId } = req.query;

            const gradeQuery =  {
                where: {
                    studentId: studentId ? parseInt(studentId) : undefined,
                    subjectId: subjectId ? parseInt(subjectId) : undefined,
                    userId: userId ? parseInt(userId) : undefined,
                },
            };

            const grades = await gradesService.getGrades(gradeQuery);
            res.json(grades);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la obținerea notelor.' });
        }
    },

    deleteGrade : async (req, res) => {
        try {
            const { id } = req.params;
            const deletedGrade = await gradesService.deleteGrade(id);
            res.json(deletedGrade);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la ștergerea notei.' });
        }
    },
};
