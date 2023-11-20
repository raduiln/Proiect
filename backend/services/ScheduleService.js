const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ScheduleService {
    async createSchedule(data) {
        try {
            const schedule = await prisma.schedule.create({ data });
            return schedule;
        } catch (error) {
            throw new Error(error.message || 'Eroare la crearea orarului.');
        }
    }

    async getAllSchedules() {
        try {
            const schedules = await prisma.schedule.findMany();
            return schedules;
        } catch (error) {
            throw new Error('Eroare la obținerea orarului.');
        }
    }

    async getSchedulesByStudentAndClass(studentId, classId) {
        try {
            const schedules = await prisma.schedule.findMany({
                where: { 
                    studentId: parseInt(studentId) ,
                    classId: parseInt(classId),
                },
                select: {
                    id: true,
                    day: true,
                    startHour: true,
                    endHour: true,
                    subject: { select: { id: true, name: true} },
                    teacher: { select: { id: true, firstName: true, lastName: true } },
                },
            });
            return schedules;
        } catch (error) {
            throw new Error('Eroare la obținerea orarului.');
        }
    }
}

module.exports = ScheduleService;