import React, { useState } from 'react';
import { User, UserInfo, EditProfileForm, Profession, Location } from '../../types';
import BorderBox from '../shared/BorderBox';
import SecondaryBtn from '../shared/SecondaryBtn';
import ProfilePictureUpload from '../shared/ProfilePictureUpload';

interface ProfileSectionProps {
  user: User | null;
  userInfo: UserInfo | null;
  profileImage: string | null;
  onEditProfile: () => void;
  onProfileImageUpload: (fileUrl: string, fileName: string) => void;
  onProfileImageError: (error: string) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  user,
  userInfo,
  profileImage,
  onEditProfile,
  onProfileImageUpload,
  onProfileImageError,
}) => {
  return (
    <BorderBox>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <SecondaryBtn onClick={onEditProfile}>Edit Profile</SecondaryBtn>
      </div>

      {/* Profile Picture Upload */}
      <div className="mb-6">
        <ProfilePictureUpload
          onUploadSuccess={onProfileImageUpload}
          onUploadError={onProfileImageError}
          currentImage={profileImage || undefined}
        />
      </div>

      {/* Basic Information */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Basic Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Name</span>
              <p className="font-medium text-gray-900">{user?.first_name} {user?.last_name}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Username</span>
              <p className="font-medium text-gray-900">@{user?.username}</p>
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-500">Email</span>
            <p className="font-medium text-gray-900 break-all">{user?.email}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Member Since</span>
            <p className="font-medium text-gray-900">{new Date(user?.created_at || '').toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Professional Information */}
      {userInfo && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Professional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Tagline</span>
              <p className="font-medium text-gray-900">{userInfo.tagline || 'Not set'}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Status</span>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${
                userInfo.status === 'available' 
                  ? 'bg-green-100 text-green-800'
                  : userInfo.status === 'open to work'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {userInfo.status || 'Not set'}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Started Date</span>
              <p className="font-medium text-gray-900">
                {userInfo.started_date ? new Date(userInfo.started_date).toLocaleDateString() : 'Not set'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      {userInfo?.description && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">About</h3>
          <p className="text-gray-700">{userInfo.description}</p>
        </div>
      )}

      {/* Social Links */}
      {(userInfo?.github_link || userInfo?.linkedin_link || userInfo?.portfolio_link) && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Social Links</h3>
          <div className="space-y-2">
            {userInfo.github_link && (
              <div>
                <a href={userInfo.github_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  GitHub Profile
                </a>
              </div>
            )}
            {userInfo.linkedin_link && (
              <div>
                <a href={userInfo.linkedin_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  LinkedIn Profile
                </a>
              </div>
            )}
            {userInfo.portfolio_link && (
              <div>
                <a href={userInfo.portfolio_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Portfolio Website
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </BorderBox>
  );
};

export default ProfileSection; 