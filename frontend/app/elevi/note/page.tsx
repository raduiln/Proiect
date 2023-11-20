"use client"

import React, { useEffect, useState, useCallback, use } from 'react';
import { fetchUserDetails, fetchSubjects, fetchStudents, fetchGrades, postGrade } from "../../api";
import Table from "../../table";
import Sidebar from '../../sidebar';
import DropdownFilter from "@/components/DropdownFilter";
import { getUserDetails, UserDetails } from '@/utils/globalFunctions';

const headers = [
    { key: 'Materie', label: 'Materie' },
    { key: 'Data', label: 'Data' },
    { key: 'Nota', label: 'Nota' },
    { key: 'Profesor', label: 'Profesor' },
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
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

    

    const fetchAndSetUserDetails = useCallback(async () => {
        const det = await getUserDetails();
        setUser(det);
    }, []);

    const fetchAndSetData = useCallback(async () => {
        if (!user) return;
        setLoading(true);

        let fetchedGrades = [];
        try {
            // Fetch subjects for student
            const subjectsData = await fetchSubjects();
            setFilterData({ 'Subjects': subjectsData });
            const gradesData = await fetchGrades({
                studentId: null,
                subjectId: selectedSubject,
                userId:  user.id,
            });

            console.log(gradesData);
            
            fetchedGrades = gradesData.map((grade: any) => ({
                Materie: grade.subject?.name || 'Unknown Subject',
                Data: new Date(grade.date).toLocaleDateString(),
                Nota: grade.value,
                ...{ Profesor: `${grade.teacher?.user.name || 'Unknown'} ${grade.teacher?.user.surname || 'Unknown'}` }
            }));
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setGrades(fetchedGrades);
            setLoading(false);
        }
    }, [user, selectedSubject]);

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
                {filterData.Subjects && (
                    <div className="filter justify-end flex pb-5">
                        <DropdownFilter
                            options={filterData.Subjects}
                            onChange={e => setSelectedSubject(e.target.value)}
                            value={selectedSubject}
                            label="Filtru materii" />
                    </div>
                )}
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
