'use client';

import { useState, useEffect } from 'react';
import { fetchClasses, fetchStudents, fetchTeachers } from '../api';
import Sidebar from '../sidebar';

const AdminDashboard = () => {
    const [students, setStudents] = useState(0);
    const [teachers, setTeachers] = useState(0);
    const [classes, setClasses] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const teachers = await fetchTeachers();
            const students = await fetchStudents();
            const classes = await fetchClasses();
            setStudents(students.length);
            setTeachers(teachers.length);
            setClasses(classes.length);
        };
        
        fetchData();
    }, []);

    return (
        <div className='flex'>
            <Sidebar role='ADMIN' />
            <div className="p-5">
                <h1 className="text-2xl text-gray-700 mb-5">Admin Dashboard</h1>
                <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <img className="h-12 w-12" src="/images/student-person-3-svgrepo-com.svg" alt="Students" />
                        </div>
                        <div>
                            <div className="text-xl font-medium text-black">Students</div>
                            <p className="text-gray-500">{students}</p>
                        </div>
                    </div>
                    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <img className="h-12 w-12" src="/images/teacher-svgrepo-com.svg" alt="Teachers" />
                        </div>
                        <div>
                            <div className="text-xl font-medium text-black">Teachers</div>
                            <p className="text-gray-500">{teachers}</p>
                        </div>
                    </div>
                    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <img className="h-12 w-12" src="/images/classroom-svgrepo-com.svg" alt="Classes" />
                        </div>
                        <div>
                            <div className="text-xl font-medium text-black">Classes</div>
                            <p className="text-gray-500">{classes}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
