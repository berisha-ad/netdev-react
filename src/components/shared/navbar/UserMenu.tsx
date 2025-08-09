import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import UserAvatar from './UserAvatar';
import DropdownMenu from './DropdownMenu';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setIsOpen(false); // Close dropdown immediately
      await logout();
    } catch (error) {
      console.error('UserMenu: Logout failed:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        aria-label="User menu"
      >
        <UserAvatar user={user} />
        <span className="hidden md:block text-sm font-medium text-gray-700">
          {user.first_name}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <DropdownMenu
          items={[
            {
              label: 'Dashboard',
              href: '/dashboard',
              icon: 'dashboard',
            },
            {
              label: 'Profile',
              href: `/profile/${user.username}`,
              icon: 'profile',
            },
            {
              label: 'Logout',
              onClick: handleLogout,
              icon: 'logout',
            },
          ]}
        />
      )}
    </div>
  );
};

export default UserMenu; 