// components/UserAvatar.tsx
import React from 'react';
import Image from 'next/image';

interface UserAvatarProps {
    imageUrl: string;
    name: string;
    className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ imageUrl, name, className }) => {
    return (
        <div className="flex items-center">
            <Image
                width={100}
                height={100}
                src={imageUrl}
                alt={name}
                className="w-12 h-12 rounded-full object-cover mr-2"
            />
            <p className='leading-none'>
                <span className="text-indigo-100 text-lg font-semibold">{name}</span><br />
                <span className='text-xs text-indigo-300'>{className}</span>
            </p>
        </div>
    );
};

export default UserAvatar;
