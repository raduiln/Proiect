import { getToken } from '../utils/globalFunctions';


interface GradesRequestParams {
    studentId: number | null;
    subjectId: string | null;
    userId: number | null;
}

export const login = async (data: any) => {
    try {
        const response = await fetch('http://127.0.0.1:3300/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Login failed");

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export const fetchUserDetails = async () => {
    const token = getToken();
    const userDetails = await fetch('http://127.0.0.1:3300/users/details', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    return await userDetails.json();
}

export const fetchStudentSchedule = async () => {
    const token = getToken();
    const schedule = await fetch('http://127.0.0.1:3300/schedule/student', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })

    return await schedule.json();
}

export const fetchGrades = async (params: GradesRequestParams) => {
    const token = getToken();
    const { studentId, subjectId, userId } = params;
    const requestParams = new URLSearchParams({
        studentId: studentId ? studentId.toString() : '',
        subjectId: subjectId ? subjectId.toString() : '',
        userId: userId ? userId.toString() : '',
    }).toString();
    const url = `http://127.0.0.1:3300/grades?${requestParams}`;
    const grades = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })

    return await grades.json();
}

export const fetchSubjects = async () => {
    const token = getToken();
    const subjects = await fetch('http://127.0.0.1:3300/subjects', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })

    return await subjects.json() || [];
}

export const fetchStudents = async () => {
    const token = getToken();
    const students = await fetch('http://127.0.0.1:3300/users/students', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })

    return await students.json() || [];
}

export const postGrade = async (data: any) => {
    const token = getToken();
    const students = await fetch('http://127.0.0.1:3300/grades', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })

    return await students.json() || [];
}

export const fetchTeacher = async (userId: number) => {
    const token = getToken();
    const teacher = await fetch(`http://127.0.0.1:3300/users/teacher/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })

    return await teacher.json() || [];
}

export const fetchClasses = async () => {
    const token = getToken();
    const classes = await fetch('http://127.0.0.1:3300/classes', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    return await classes.json() || [];
}

export const fetchTeachers = async () => {
    const token = getToken();
    const teachers = await fetch('http://127.0.0.1:3300/users/teachers', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })

    return await teachers.json() || [];
}

export const fetchUsers = async () => {
    const token = getToken();
    const users = await fetch('http://127.0.0.1:3300/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })

    return await users.json() || [];
}

export const addUser = async (data: any) => {
    const token = getToken();
    const user = await fetch('http://127.0.0.1:3300/users', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })

    return await user.json() || [];
}

export const addNewClass = async (data: any) => {
    const token = getToken();
    const user = await fetch('http://127.0.0.1:3300/classes', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })

    return await user.json() || [];
}

export const addNewSubject = async (data: any) => {
    const token = getToken();
    const user = await fetch('http://127.0.0.1:3300/subjects', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })

    return await user.json() || [];
}

export const deleteUser = async (id: number) => {
    const token = getToken();
    const user = await fetch(`http://127.0.0.1:3300/users/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    return await user.json() || [];
}

export const deleteGrade = async (id: number) => {
    const token = getToken();
    const user = await fetch(`http://127.0.0.1:3300/grades/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    return await user.json() || [];
}
