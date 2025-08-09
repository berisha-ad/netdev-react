import { Link } from "react-router-dom";
import UserAvatar from "../shared/navbar/UserAvatar";
import type { User } from "../../types";

interface DeveloperCardProps {
  user: User;
}

const DeveloperCard = ({ user }: DeveloperCardProps) => {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <Link className="developer-card rounded-lg" to={`/profile/${user.username}`}>
      <div className="flex gap-4 justify-between bg-white custom-border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex-1">
          <h3 className="text-lg font-semibold source-code">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-gray-600 text-sm mb-1">@{user.username}</p>
          {user.user_info?.tagline && (
            <p className="text-blue-600 text-sm mb-2">{user.user_info.tagline}</p>
          )}
          
          {/* Status Badge */}
          {user.user_info?.status && (
            <div className="mb-2">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${
                user.user_info.status === 'available' 
                  ? 'bg-green-100 text-green-800'
                  : user.user_info.status === 'open to work'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {user.user_info.status}
              </span>
            </div>
          )}
          
          <div className="space-y-1 mb-2">
            {user.user_info?.profession && (
              <p className="text-sm text-gray-700">
                <strong>Profession:</strong> {user.user_info.profession.profession}
              </p>
            )}
            {user.user_info?.location && (
              <p className="text-sm text-gray-700">
                <strong>Location:</strong> {user.user_info.location.city}, {user.user_info.location.country}
              </p>
            )}
          </div>
          {user.user_info?.skills && user.user_info.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {user.user_info.skills.slice(0, 2).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                >
                  {skill.skill}
                </span>
              ))}
              {user.user_info.skills.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  +{user.user_info.skills.length - 2} more
                </span>
              )}
            </div>
          )}
          <span className="text-gray-500 text-xs">{formatTimeAgo(user.created_at)}</span>
        </div>
        <div className="flex-shrink-0">
          <UserAvatar 
            user={user} 
            size="lg" 
            className="h-12 w-12"
          />
        </div>
      </div>
    </Link>
  );
};

export default DeveloperCard;
