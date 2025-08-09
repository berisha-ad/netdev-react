import React, { useState } from 'react';
import FileUpload from './FileUpload';

interface ProfilePictureUploadProps {
  onUploadSuccess: (fileUrl: string, fileName: string) => void;
  onUploadError?: (error: string) => void;
  currentImage?: string;
  className?: string;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  onUploadSuccess,
  onUploadError,
  currentImage,
  className = ""
}) => {
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUploadSuccess = (fileUrl: string, fileName: string) => {
    setUploadError(null);
    onUploadSuccess(fileUrl, fileName);
  };

  const handleUploadError = (error: string) => {
    setUploadError(error);
    onUploadError?.(error);
  };

  return (
    <div className={className}>
      <FileUpload
        type="profile-picture"
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
        currentFile={currentImage}
        label="Profile Picture"
      />
      
      {uploadError && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{uploadError}</p>
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-500">
        <p>• Recommended size: 400x400 pixels</p>
        <p>• Supported formats: JPG, PNG, GIF</p>
        <p>• Maximum file size: 2MB</p>
      </div>
    </div>
  );
};

export default ProfilePictureUpload; 