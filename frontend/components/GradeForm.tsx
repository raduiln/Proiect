import React, { useState } from 'react';

interface GradeFormProps {
    onGradeSubmit: (studentId: string, grade: string) => void;
    onClose: () => void;
    students: any[];
    teacher: any[];
}

const GradeForm: React.FC<GradeFormProps> = ({ onGradeSubmit, onClose, students, teacher }) => {
    const [studentId, setStudentId] = useState('');
    const [grade, setGrade] = useState('');
    const [subjectId, setSubjectId] = useState('');

    const subjects = teacher.subjects || []; 

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onGradeSubmit(studentId, subjectId, grade);
        onClose();
    };

    return (
        <div id="authentication-modal" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center">
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Grade</h3>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="studentId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Elev</label>
                                <select name="studentId" id="studentId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={studentId} onChange={e => setStudentId(e.target.value)} required>
                                    <option value="">Selecteaza</option>
                                    {students.map(student => <option key={student.id} value={student.id}>{student.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="studentId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Materie</label>
                                <select name="studentId" id="studentId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={subjectId} onChange={e => setSubjectId(e.target.value)} required>
                                    <option value="">Selecteaza</option>
                                    {subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="grade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade</label>
                                <input type="number" min={1} max={10} name="grade" id="grade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={grade} onChange={e => setGrade(e.target.value)} required />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Grade</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GradeForm;
