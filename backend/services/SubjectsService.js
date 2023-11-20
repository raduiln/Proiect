const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class SubjectsService {
    async createSubject(data) {
        try {
            if (typeof data.teacherId === 'string')  {
                data.teacherId = parseInt(data.teacherId);
            }
            const subject = await prisma.subject.create({ data });
            return subject;
        } catch (error) {
            throw new Error(error.message || 'Eroare la crearea materiei.');
        }
    }

    async getAllSubjects() {
        try {
            const subjects = await prisma.subject.findMany({
                select: {
                    id: true,
                    name: true,
                    teacher: { select: { user: true } }
                },
            });
            return subjects;
        } catch (error) {
            throw new Error('Eroare la obținerea materiei.');
        }
    }

    async getSubjectByTeacherId(teacherId) {
        try {
            const subjects = await prisma.subject.findUnique({
                where: {
                    teacherId: parseInt(teacherId),
                }
            });
            return subjects;
        } catch (error) {
            throw new Error('Eroare la obținerea materiei.');
        }
    }
    

    // Alte metode pentru actualizarea, ștergerea etc. materiilor.
}

module.exports = SubjectsService;
