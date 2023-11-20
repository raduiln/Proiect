// pages/student-profile.tsx
import React from 'react';
import Profile from '../../components/Profile';
import Sidebar from '../sidebar'

const StudentProfilePage: React.FC = () => {
  const student = {
    imageUrl: 'https://avatars.githubusercontent.com/u/183812?v=4', // Replace with the student's avatar image URL
    name: 'John Doe', // Replace with the student's name
    role: 'Student',
    bio: 'A student pursuing excellence in academics.', // Replace with the student's bio
    // Add other user-related information as needed
  };

  const userRole = 'Elevs';

  return (
    <div className={`flex`}>
        <Sidebar role={userRole} />
        <div className={`pl-6 pt-24 w-3/4`}>
            <Profile {...student} />
        </div>
    </div>
)
};

export default StudentProfilePage;
