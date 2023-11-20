"use client"

import React, { useEffect, useState, useCallback} from 'react';
import { fetchTeacher, fetchStudents, fetchGrades, postGrade } from "../../api";
import Table from "../../table";
import Sidebar from '../../sidebar';
import DropdownFilter from "@/components/DropdownFilter";
import GradeForm from "@/components/GradeForm";
import { getUserDetails, UserDetails } from '@/utils/globalFunctions';

const headers = [
    { key: 'Materie', label: 'Materie' },
    { key: 'Data', label: 'Data' },
    { key: 'Nota', label: 'Nota' },
    { key: 'Student', label: 'Student' },
];

interface Grades {
    Materie: string;
    Professor?: string;
    Student?: string;
    Data: string;
    Nota: number;
}

interface FilterData {
    Subjects?: Filter[];
    Students?: Filter[];
}

interface Filter {
    id: number;
    name: string;
}


const Grades = () => {
    const [user, setUser] = useState<UserDetails>();
    const [filterData, setFilterData] = useState<FilterData>({});
    const [grades, setGrades] = useState<Grades[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [showGradeForm, setShowGradeForm] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
    const [teacher, setTecher] = useState();

    const fetchAndSetUserDetails = useCallback(async () => {
        const det = await getUserDetails();
        setUser(det);
    }, []);

    const fetchAndSetData = useCallback(async () => {
        if (!user) return;
        setLoading(true);

        let fetchedGrades = [];
        try {
            const studentsData = await fetchStudents();
            const teacherData = await fetchTeacher(user.id);
            setFilterData({ 'Students': studentsData });
            setTecher(teacherData);
            const gradesData = await fetchGrades({
                studentId: selectedStudent,
                subjectId: null,
                userId: user?.id,
            });
            
            fetchedGrades = gradesData.map((grade: any) => ({
                Id: grade.id,
                Materie: grade.subject?.name || 'Unknown Subject',
                Data: new Date(grade.date).toLocaleDateString(),
                Nota: grade.value,
                ...{Student: `${grade.student?.user.name || 'Unknown'} ${grade.student?.user.surname || 'Unknown'}` },
            }));
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setGrades(fetchedGrades);
            setLoading(false);
        }
    }, [user, selectedStudent]);

    const handleFormSubmit = async (studentId: string, subjectId: string, grade: string) => {
        try {
            const data = {
                studentId,
                subjectId: subjectId,
                teacherId: teacher.id || null,
                grade,
            };
            const newGrade = await postGrade(data);
            setGrades((grades) => [...grades, {
                Materie: newGrade.subject?.name || 'Unknown Subject',
                Data: new Date(newGrade.date).toLocaleDateString(),
                Nota: newGrade.value,
                Student: `${newGrade.student?.user.name || 'Unknown'} ${newGrade.student?.user.surname || 'Unknown'}`,
            }]);
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
    }

    useEffect(() => {
        fetchAndSetUserDetails();
    }, [fetchAndSetUserDetails]);

    useEffect(() => {
        if (user) {
            fetchAndSetData();
        }
    }, [user, fetchAndSetData]);


    if (isLoading) return <p>Loading...</p>;
    if (!user) return <p>Not logged in</p>;
    return (
        <div className={`flex`}>
            <Sidebar role={user.role} />
            <div className={`pl-6 pt-6 w-3/4`}>
                <h1 className="text-2xl">Note</h1>
                <>
                    <div className="filter flex pb-5 justify-between pt-6">
                        <div className='pt-6'>
                            {!showGradeForm && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowGradeForm(true)}>Adauga nota</button>}
                            {showGradeForm && (<GradeForm onGradeSubmit={(studentId, subjectId, grade) => handleFormSubmit(studentId, subjectId, grade)} onClose={() => setShowGradeForm(false)} students={filterData.Students || []} teacher={teacher || []}/>)}
                        </div>
                        <div className=''><DropdownFilter
                            options={filterData.Students ?? []}
                            onChange={e => setSelectedStudent(e.target.value)}
                            value={selectedStudent}
                            emptyStateMessage="No students"
                            label="Filtru studenti:" /></div>
                    </div>
                </>
                <Table
                    data={grades}
                    columns={headers}
                    itemsPerPage={5}
                    filterData={filterData}
                    userRole={user.role} />
            </div>
        </div>
    );
};

export default Grades;
