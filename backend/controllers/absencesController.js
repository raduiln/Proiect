const AbsencesService = require('../services/AbsencesService');
const UsersService = require('../services/UsersService');
const absencesService = new AbsencesService();
const usersService = new UsersService();

module.exports = {
    createAbsence: async (req, res) => {
        try {
            const { reason, date, student, subject } = req.body;
            const newAbsence = await absencesService.createAbsence({
                reason,
                date,
                student: { connect: { id: student.id } },
                subject: { connect: { id: subject.id } },
            });
            res.status(201).json(newAbsence);
        } catch (error) {
            res.status(500).json({ error: error.message || 'Eroare la crearea absenței.' });
        }
    },

    getAllAbsences: async (req, res) => {
        try {
            const { id, role } = req.user;

            if (role === 'student') {
                const student = await usersService.getStudentByUserId(id);
                const absences = await absencesService.getAbsencesByStudentId(student.id);
                return res.json(absences);
            }

            const absences = await absencesService.getAllAbsences();
            res.json(absences);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la obținerea absențelor.' });
        }
    },

    getAbsencesByStudentId: async (req, res) => {
        try {
            const { id } = req.params;
            const absence = await absencesService.getAbsencesByStudentId(id);
            res.json(absence);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la obținerea absenței.' });
        }
    },

    getAbsencesByStudent: async (req, res) => {
        try {
            const { userId, role } = req.user;
            const absences = await absencesService.getAbsencesByStudent(userId);
            res.json(absences);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la obținerea absențelor.' });
        }
    }
};
