const UsersService = require('../services/UsersService');
const ScheduleService = require('../services/ScheduleService');
const usersService = new UsersService();
const scheduleService = new ScheduleService();


module.exports = {
    createSchedule: async (req, res) => {
        try {
            const { day, hour, subject, teacher, room } = req.body;
            const newSchedule = await scheduleService.createSchedule({
                day,
                hour,
                subject: { connect: { id: subject.id } },
                teacher: { connect: { id: teacher.id } },
                room: { connect: { id: room.id } },
            });
            res.status(201).json(newSchedule);
        } catch (error) {
            res.status(500).json({ error: error.message || 'Eroare la crearea orarului.' });
        }
    },

    getAllSchedule: async (req, res) => {
        try {
            const { id, role } = req.user;

            if (role === 'student') {
                const student = await usersService.getStudentByUserId(id);
                const schedule = await scheduleService.getScheduleByStudentId(student.id);
                return res.json(schedule);
            }

            const schedule = await scheduleService.getAllSchedule();
            res.json(schedule);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la obținerea orarului.' });
        }
    },

    getScheduleByStudentAndClass: async (req, res) => {
        try {
            const { id } = req.user;
            const student = await usersService.getStudentByUserId(id);
            const schedule = await scheduleService.getSchedulesByStudentAndClass(student.id, student.classId);
            res.json(schedule);
        } catch (error) {
            res.status(500).json({ error: 'Eroare la obținerea orarului.' });
        }
    }
};