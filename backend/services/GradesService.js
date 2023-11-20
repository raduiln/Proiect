const { PrismaClient } = require('@prisma/client');
const e = require('express');
const prisma = new PrismaClient();

class GradesService {
    async createGrade(data) {
        try {
            if (!data.teacherId) throw new Error('Nu a fost furnizat id-ul profesorului.');
            if (!data.studentId) throw new Error('Nu a fost furnizat id-ul studentului.');
            if (!data.subjectId) throw new Error('Nu a fost furnizat id-ul materiei.');
            const classId = await prisma.student.findUnique({ where: { id: data.studentId }, select: { classId: true } });
            const grade = await prisma.grade.create({ 
                data: {
                    value: data.value,
                    date: new Date().toISOString(),
                    student: { connect: { id: data.studentId } },
                    subject: { connect: { id: data.subjectId } },
                    teacher: { connect: { id: data.teacherId } },
                    class: { connect: { id: classId.classId } },
                },
                include: { 
                    student: {
                        select: {
                            user: {
                                select: {
                                    name: true,
                                    surname: true,
                                }
                            }
                        },
                    }, 
                    subject: true, 
                    teacher: true 
                },
            });
            return grade;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllGrades() {
        try {
            const grades = await prisma.grade.findMany();
            return grades;
        } catch (error) {
            throw new Error('Eroare la obținerea notelor.');
        }
    }

    async getGradesByStudentId(studentId) {
        let studentIdNumber = Number(studentId);
        try {
            const grades = await prisma.grade.findMany({
                where: { studentId: studentIdNumber },
                include: { student: true, subject: true, teacher: true },
            });
            return grades;
        } catch (error) {
            throw new Error('Eroare la obținerea notelor.');
        }
    }

    async getGrades(query) {
        try {
            const teacher = await prisma.teacher.findUnique({ where: { userId: query.where.userId } });
            if (teacher) {
                query.where.teacherId = teacher.id;
                delete query.where.userId;
            } else {
                const student = await prisma.student.findUnique({ where: { userId: query.where.userId } });
                if (student) {
                    query.where.studentId = student.id;
                    delete query.where.userId;
                }
            }
            

            const grades = await prisma.grade.findMany({
                where: query.where,
                include: { 
                    student: {
                        select: {
                            user: {
                                select: {
                                    name: true,
                                    surname: true,
                                }
                            }
                        },
                    }, 
                    subject: true, 
                    teacher: {
                        select: {
                            user: {
                                select: {
                                    name: true,
                                    surname: true,
                                }
                            }
                        },
                    }
                },
            });
            return grades;
        } catch (error) {
            throw new Error('Eroare la obținerea notelor.');
        }
    }

    async deleteGrade(id) {
        try {
            const grade = await prisma.grade.delete({ where: { id: parseInt(id) } });
            return grade;
        } catch (error) {
            throw new Error('Eroare la ștergerea notei.');
        }
    }
}

module.exports = GradesService;
