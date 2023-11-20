"use client"

import React, { useState, useEffect } from "react";
import { UserDetails } from "@/utils/globalFunctions";
import { deleteGrade } from "./api"


interface TableColumn {
    key: string;
    label: string;
}

interface TableProps {
    data: any[];
    columns: TableColumn[];
    itemsPerPage: number;
    userRole: UserDetails['role'];
}

const Table: React.FC<TableProps> = ({ data, columns, itemsPerPage, userRole}) => {
    const [grades, setGrades] = useState<any[]>(data);
    console.log({grades});

    const handleDelete = async (id: number) => {
        await deleteGrade(id);
        setGrades(grades.filter((grade) => grade.Id !== id));
    }

    return (
        <div className='pt-12'>
            <table className="min-w-full text-left text-sm">
                <thead className='border-b font-medium border-neutral-400'>
                    <tr>
                        {columns.map((column) => (
                            <th scope='col' className='px-6 py-4' key={column.key}>{column.label}</th>
                        ))}
                        {userRole === 'TEACHER' && <th scope='col' className='px-6 py-4'>Actiuni</th>}
                    </tr>
                </thead>
                <tbody>
                    {grades.map((item, index) => (
                        <tr className='border-b border-neutral-400' key={index}>
                            {columns.map((column) => (
                                <td className='whitespace-nowrap px-6 py-4' key={column.key}>{item[column.key]}</td>
                            ))}
                            {userRole === 'TEACHER' && <td className='whitespace-nowrap px-6 py-4'>
                                <button className='text-white bg-red-500 hover:bg-red-600 rounded-lg px-3 py-1.5' onClick={() => handleDelete(item.Id)}>Sterge</button>
                            </td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
