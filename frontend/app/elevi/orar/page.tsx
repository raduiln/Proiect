import Table from "../table"
import Sidebar from '../sidebar'
import { fetchUserDetails, fetchStudentSchedule } from "../api";


const headers = [
    { key: 'Materie', label: 'Materie' },
    { key: 'Professor', label: 'Professor' },
    { key: 'Zi', label: 'Zi' },
    { key: 'Ora', label: 'Ora' },
];

interface Schedule {
    Materie: string;
    Professor: string;
    Zi: string;
    Ora: string;
    Class: string;
}



const Schedule = async () => {
    const studentSchedule = await fetchStudentSchedule();

    if ( studentSchedule.error ) { return <p>{studentSchedule.error}</p> }

    const schedule: Schedule[] = studentSchedule.map((item:any) => ({
        Materie: item.subject?.name || 'Unknown Subject',
        Professor: `${item.teacher?.firstName || 'Unknown'} ${item.teacher?.lastName || 'Unknown'}`,
        Zi: item.day,
        Ora: item.startHour + ' - ' + item.endHour,
        Class: item.class?.name
    }))

    const userRole = 'Elevs';
    return (
        <div className={`flex`}>
            <Sidebar role={userRole} />
            <div className={`pl-6 pt-6 w-3/4`}>
                <h1 className="text-2xl">Orar</h1>
                <Table data={schedule} columns={headers} itemsPerPage={5} />
            </div>
        </div>
    )
}

export default Schedule;