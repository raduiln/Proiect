// components/Profile.tsx
import React from 'react';
import Image from 'next/image';

interface ProfileProps {
    imageUrl: string;
    name: string;
    role: string;
    bio: string;
    // Add any other user-related information here
}

const Profile: React.FC<ProfileProps> = ({ imageUrl, name, role, bio }) => {
    return (
        <div className="flex flex-col items-center">
            <Image
                width={100}
                height={100}
                src={imageUrl}
                alt={name}
                className="w-12 h-12 rounded-full object-cover mr-2"
            />
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-gray-600 mb-2">{role}</p>
            <p className="text-gray-700">{bio}</p>
            {/* Display other user-related information as needed */}
        </div>
    );
};

export default Profile;
