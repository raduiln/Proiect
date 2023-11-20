const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AbsencesService {
    async createAbsence(data) {
        try {
            const absence = await prisma.absence.create({ data });
            return absence;
        } catch (error) {
            throw new Error(error.message || 'Eroare la crearea absenței.');
        }
    }

    async getAllAbsences() {
        try {
            const absences = await prisma.absence.findMany();
            return absences;
        } catch (error) {
            throw new Error('Eroare la obținerea absențelor.');
        }
    }

    async getAbsencesByStudentId(id) {
        try {
            const absences = await prisma.absence.findMany({
                where: { studentId: parseInt(id) },
                select: {
                    id: true,
                    reason: true,
                    date: true,
                    status: true,
                    student: { select: { id: true, firstName: true, lastName: true } },
                    subject: { select: { id: true, name: true} },
                },
            });
            return absences;
        } catch (error) {
            throw new Error('Eroare la obținerea absențelor.');
        }
    }
}

module.exports = AbsencesService;
