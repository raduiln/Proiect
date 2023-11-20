const SubjectsService = require('../services/SubjectsService');
const subjectsService = new SubjectsService();

module.exports = {
    createSubject: async (req, res) => {
        try {
            const { name, teacherId } = req.body;
            const newSubject = await subjectsService.createSubject({
                name: name,
                teacherId: teacherId,
            });
            res.status(201).json(newSubject);
        } catch (error) {
            res.status(500).json({ error: error.message || 'Eroare la crearea materiei.' });
        }
    },

    getAllSubjects: async (req, res) => {
        try {
            const subjects = await subjectsService.getAllSubjects();
            res.json(subjects);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la obținerea materiilor.' });
        }
    },
};
