const UserService = require('../services/UsersService');
const usersService = new UserService();

module.exports = {
    createUser: async (req, res) => {
        try {
            const { username, password, role, name, surname, email, phone, classId } = req.body;
            const newUser = await usersService.createUser({ username, password, role, name, surname, email, phone, classId });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la crearea utilizatorului.' });
        }
    },

    createStudent: async (req, res) => {
        try {
            const { userId, classId } = req.body;
            const newStudent = await usersService.createStudent({ userId, classId });
            res.status(201).json(newStudent);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la crearea studentului.' });
        }
    },

    createTeacher: async (req, res) => {
        try {
            const { userId } = req.body;
            const newTeacher = await usersService.createTeacher({ userId });
            res.status(201).json(newTeacher);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la crearea profesorului.' });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await usersService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la obținerea utilizatorilor.' });
        }
    },

    getUserDetails: async (req, res) => {
        try {
            const { id, role } = req.user;
            if (role === 'student') {
                const studentDetails = await usersService.getStudentDetails(id);
                return res.json(studentDetails);
            }
            if (role === 'teacher') {
                const teacher = await usersService.getTeacherDetails(id);
                return res.json(teacher);
            }
            res.json({ message: 'Utilizatorul nu este nici student, nici profesor.' });
        } catch (error) {
            res.status(500).json({ error: 'Eroare la obținerea utilizatorului.' });
        }
    },

    getAllStudents: async (req, res) => {
        try {
            const students = await usersService.getAllStudents();
            res.json(students);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la obținerea studenților.' });
        }
    },

    getTeacher: async (req, res) => {
        try {
            const { userId } = req.params;
            const teacher = await usersService.getTeacherByUserId(userId);
            res.json(teacher);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la obținerea profesorului.' });
        }
    },

    getAllTeachers: async (req, res) => {
        try {
            const teachers = await usersService.getAllTeachers();
            res.json(teachers);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la obținerea profesorilor.' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await usersService.deleteUser(userId);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la ștergerea utilizatorului.' });
        }
    },
};
