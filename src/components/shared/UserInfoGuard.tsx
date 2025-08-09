import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

type Props = {
  children: React.ReactNode;
};

const UserInfoGuard = ({ children }: Props) => {
  const { isAuthenticated, userInfo, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated but doesn't have user info, redirect to setup
  if (!userInfo) {
    return <Navigate to="/user-info-setup" replace />;
  }

  // User is authenticated and has user info, show the protected content
  return <>{children}</>;
};

export default UserInfoGuard; 