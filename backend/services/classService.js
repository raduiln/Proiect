const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ClassService {
    async createClass(data) {
        try {
            if (typeof data.teacherId === 'string')  {
                data.teacherId = parseInt(data.teacherId);
            }
            const newClass = await prisma.class.create({ data });
            return newClass;
        } catch (error) {
            throw new Error('Eroare la crearea clasei.');
        }
    }

    async getAllClasses() {
        try {
            const classes = await prisma.class.findMany({
                select: {
                    id: true,
                    name: true,
                    teacher: { select: { user: true } },
                    students: { select: { user: true } },
                },
            });
            return classes;
        } catch (error) {
            throw new Error('Eroare la obținerea claselor.');
        }
    }
}

module.exports = ClassService;
