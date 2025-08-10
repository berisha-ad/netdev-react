import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import PrimaryBtn from '../shared/PrimaryBtn';
import UserAvatar from '../shared/navbar/UserAvatar';

interface DashboardHeaderProps {
  onLogout: () => void;
  onDeleteAccount: () => void;
  skillsCount?: number;
  projectsCount?: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  onLogout, 
  onDeleteAccount,
  skillsCount = 0, 
  projectsCount = 0 
}) => {
  const { user, userInfo } = useAuth();

  return (
    <div className="mb-8">
      {/* Main Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <UserAvatar user={user!} size="lg" />
          <div>
            <h1 className="text-3xl font-bold source-code">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {user?.first_name}! Manage your profile and professional information
            </p>
            {userInfo?.status && (
              <div className="mt-2">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  userInfo.status === 'available' 
                    ? 'bg-green-100 text-green-800'
                    : userInfo.status === 'open to work'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {userInfo.status}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <PrimaryBtn onClick={onLogout}>Logout</PrimaryBtn>
          <button
            onClick={onDeleteAccount}
            className="px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md border border-red-200 hover:border-red-300 transition-colors duration-200"
            title="Delete Account"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Skills</p>
              <p className="text-2xl font-semibold text-gray-900">{skillsCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Projects</p>
              <p className="text-2xl font-semibold text-gray-900">{projectsCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-center">
            <div className="flex space-x-3">
              {userInfo?.github_link && (
                <a 
                  href={userInfo.github_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="GitHub Profile"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
              {userInfo?.linkedin_link && (
                <a 
                  href={userInfo.linkedin_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                  title="LinkedIn Profile"
                >
                  <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {userInfo?.portfolio_link && (
                <a 
                  href={userInfo.portfolio_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                  title="Portfolio Website"
                >
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0-9H3"/>
                  </svg>
                </a>
              )}
              {!userInfo?.github_link && !userInfo?.linkedin_link && !userInfo?.portfolio_link && (
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Social Links</p>
                  <p className="text-xs text-gray-400">Add links in profile</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader; 