const ClassService = require('../services/classService');
const classService = new ClassService();

module.exports = {
    createClass: async (req, res) => {
        try {
            const { name, teacherId } = req.body;
            const newClass = await classService.createClass({
                name: name,
                teacherId: teacherId,
            });
            res.status(201).json(newClass);
        } catch (error) {
            res.status(500).json({ error: error.message || 'Eroare la crearea clasei.'  });
        }
    },

    getAllClasses: async (req, res) => {
        try {
            const classes = await classService.getAllClasses();
            res.json(classes);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la obținerea claselor.' });
        }
    },
    
};
