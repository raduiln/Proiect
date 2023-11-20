const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

class UsersService {
    async createUser(data) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 12);
            data.password = hashedPassword;
            let classId = null;
            if (data.classId !== undefined && data.classId !== null) {
                if (typeof data.classId === 'string')  {
                    classId = parseInt(data.classId);
                }
                // unset classId from data
                delete data.classId;
            }
            const user = await prisma.user.create({ data });

            if (data.role === 'STUDENT' && classId !== null) {
                await this.createStudent({ userId: user.id, classId: classId });
            }

            if (data.role === 'TEACHER') {
                await this.createTeacher({ userId: user.id });
            }

            return user;
        } catch (error) {
            throw new Error('Eroare la crearea utilizatorului.');
        }
    }

    async createStudent(data) {
        try {
            const student = await prisma.student.create({ data });
            return student;
        } catch (error) {
            throw new Error('Eroare la crearea studentului.');
        }
    }

    async createTeacher(data) {
        try {
            const teacher = await prisma.teacher.create({ data });
            return teacher;
        } catch (error) {
            throw new Error('Eroare la crearea profesorului.');
        }
    }

    async findUserByUsername(username) {
        try {
            const user = await prisma.user.findUnique({ where: { username } });
            return user;
        } catch (error) {
            throw new Error('Eroare la găsirea utilizatorului.');
        }
    }

    async getAllUsers() {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            throw new Error('Eroare la obținerea utilizatorilor.');
        }
    }

    async getAllStudents() {
        try {
            const students = await prisma.student.findMany({
                select: {
                    id: true,
                    classes: { select: { name: true } },
                    user: true,
                },
            }).catch(error => {
                console.log(error);
            });
            students.forEach(student => {
                student.name = `${student.user.name} ${student.user.surname}`;
            });
            return students;
        } catch (error) {
            throw new Error('Eroare la obținerea studenților.');
        }
    }

    // get student by user auth token
    async getStudentByUserId(id) {
        try {
            const student = await prisma.student.findUnique({ where: { userId: parseInt(id) } });
            return student;
        } catch (error) {
            throw new Error('Eroare la obținerea studentului.');
        }
    }
    

    async getStudentDetails(id) {
        try {
            const student = await prisma.student.findUnique({ 
                where: { userId: parseInt(id) },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    class: { select: { name: true } },
                    user: { select: { 
                        id: true, 
                        role: true,
                    } },
                },
            });
            return student;
        } catch (error) {
            throw new Error('Eroare la obținerea utilizatorului.');
        }
    }

    async getTeacherDetails(id) {
        try {
            const user = await prisma.teacher.findUnique({ 
                where: { userId: parseInt(id) },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    user: { select: { 
                        id: true, 
                        role: true,
                    } },
                },
            });
            return user;
        } catch (error) {
            throw new Error('Eroare la obținerea utilizatorului.');
        }
    }

    async getTeacherByUserId(id) {
        try {
            const teacher = await prisma.teacher.findUnique({ 
                where: { userId: parseInt(id) },
                include: {
                    class: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    subjects: true
                }
            });
            return teacher;
        } catch (error) {
            throw new Error('Eroare la obținerea profesorului.');
        }
    }

    async getAllTeachers() {
        try {
            const teachers = await prisma.teacher.findMany({
                select: {
                    id: true,
                    user: true,
                },
            });
            return teachers;
        } catch (error) {
            throw new Error('Eroare la obținerea profesorilor.');
        }
    }

    // delete user with related objects
    async deleteUser(id) {
        try {
            const user = await prisma.user.delete({
                where: { id: parseInt(id) }
            });
            return user;
        } catch (error) {
            throw new Error('Eroare la ștergerea utilizatorului.');
        }
    }
}

module.exports = UsersService;
