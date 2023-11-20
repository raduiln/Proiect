import React, { useState, useEffect} from 'react';
import UserAvatar from '../components/UserAvatar';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { UserDetails, getUserDetails } from '@/utils/globalFunctions';

interface SidebarProps {
  role: UserDetails['role'];
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const [user, setUser] = useState<UserDetails>();
  const router = useRouter();
  // Define the menu items based on the user's role
  const getMenuItems = () => {
    switch (role) {
      case 'STUDENT':
        return [
          { label: 'Note', link: '/elevi/note' },
          { label: 'Orar', link: '/elevi/orar' },
        ];
      case 'TEACHER':
        return [
          { label: 'Gestionare note', link: '/profesori/note' },
          { label: 'Orar', link: '/profesori/orar' },
        ];
      case 'ADMIN':
        return [
          { label: 'Dashboard', link: '/admin' },
          { label: 'Users', link: '/admin/users' },
          { label: 'Classes', link: '/admin/clase' },
          { label: 'Subjects', link: '/admin/materie' },
        ];
      default:
        return [];
    }
  };

  const removeToken = () => {
    Cookies.remove('access_token');
    router.push('/login');
  }

  useEffect(() => {
    const fetchData = async () => {
      const userDetails = await getUserDetails();
      setUser(userDetails);
    };

    fetchData();
  }, []);

  const menuItems = getMenuItems();

  return (
    <aside className={`sidebar bg-indigo-600 text-white w-64 min-h-screen p-6`}>
      <div className={`mb-6 border-b border-indigo-300 pb-4`}>
        <UserAvatar
          imageUrl="/images/avatar-svgrepo-com.svg"
          name={user?.name || ''} 
          className={user?.role === 'STUDENT' || user?.role === 'TEACHER' ? user?.class : ''}
        />
      </div>
      <nav className='h-4/6'>
        <ul>
          {menuItems.map((menuItem, index) => (
            <li key={index} className='py-2'>
              <a href={menuItem.link}>{menuItem.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`mt-auto pt-4 border-indigo-300 relative h-1/6`}>
        <button
          className={`absolute bottom-0 left-0 w-full text-left text-sm text-indigo-300 hover:text-white`}
          type='button' onClick={removeToken}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
