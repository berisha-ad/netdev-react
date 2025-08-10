import type { User } from '../../../types';
import { getProfileImageUrl } from '../../../utils/profileImage';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const UserAvatar = ({ user, size = 'md', className = '' }: UserAvatarProps) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  // Always try to show profile image, fallback to initials on error
  return (
    <img
      src={user.profile_image || getProfileImageUrl(user.id)}
      alt={`${user.first_name} ${user.last_name}`}
      className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
      title={`${user.first_name} ${user.last_name}`}
      onError={(e) => {
        // If image fails to load, replace with initials
        const parent = e.currentTarget.parentElement;
        if (parent) {
          parent.innerHTML = `
            <div class="${sizeClasses[size]} bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold ${className}" title="${user.first_name} ${user.last_name}">
              ${getInitials(user.first_name, user.last_name)}
            </div>
          `;
        }
      }}
    />
  );
};

export default UserAvatar; 