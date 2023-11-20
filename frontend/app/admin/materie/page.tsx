"use client";

import { useState, useEffect } from 'react';
import { fetchTeachers, fetchSubjects, addNewSubject } from '../../api';
import Sidebar from '../../sidebar';

const SubjectPage = () => {
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [subjectName, setSubjectName] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTeachers = await fetchTeachers();
            const fetchedSubjects = await fetchSubjects();
            setTeachers(fetchedTeachers);
            setSubjects(fetchedSubjects);
        };

        fetchData();
    }, []);
    console.log({ subjects, teachers });
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await addNewSubject({ name: subjectName, teacherId: selectedTeacher });

        setSubjectName('');
        setSelectedTeacher('');

        const fetchedSubjects = await fetchSubjects();
        setSubjects(fetchedSubjects);
    };
    
    return (
        <div className='flex'>
            <Sidebar role='ADMIN' />
            <div className="p-6  w-4/5">
                <div className='p-6 bg-white rounded-xl shadow-md'>
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Adauga Materie</h3>
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div className='pt-4'>
                            <label htmlFor="subjectName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nume Materie</label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                type="text"
                                id='className'
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)} />
                        </div>
                        <div className='pt-4'>
                            <label htmlFor="teacher" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profesor:</label>
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                value={selectedTeacher}
                                id='teacher'
                                onChange={(e) => setSelectedTeacher(e.target.value)}>
                                <option value=''>Selecteaza un profesor</option>
                                {teachers.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>{teacher.user.name + ' ' + teacher.user.surname }</option>
                                ))}
                            </select>
                        </div>
                        <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Adauga Clasa</button>
                    </form>
                </div>
                <div className='pt-9'>
                    <h2 className='w-full bg-slate-500 p-3 text-slate-200'>Toate clasele</h2>
                    <table className='min-w-full text-left text-sm'>
                        <thead className='border-b font-medium border-neutral-400'>
                            <tr>
                                <th className='px-6 py-4'>Nume Clasa</th>
                                <th className='px-6 py-4'>Profesor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((subjectItem) => (
                                <tr className='border-b border-neutral-400' key={subjectItem.id}>
                                    <td className='whitespace-nowrap px-6 py-4'>{subjectItem.name}</td>
                                    <td className='whitespace-nowrap px-6 py-4'>{subjectItem.teacher.user.name + ' ' + subjectItem.teacher.user.surname}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SubjectPage;
