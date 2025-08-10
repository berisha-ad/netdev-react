import { useState, useCallback } from 'react';
import { api, getCsrfToken } from '../api';

interface UseFileUploadOptions {
  type: 'profile-picture' | 'resume' | 'general';
  onSuccess?: (fileUrl: string, fileName: string) => void;
  onError?: (error: string) => void;
}

interface UseFileUploadReturn {
  upload: (file: File) => Promise<void>;
  isUploading: boolean;
  error: string | null;
  reset: () => void;
}

export function useFileUpload(options: UseFileUploadOptions): UseFileUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((file: File): string | null => {
    const getMaxSize = () => {
      switch (options.type) {
        case 'profile-picture':
          return 2; // 2MB for images
        case 'resume':
          return 10; // 10MB for resumes
        default:
          return 5; // 5MB default
      }
    };

    // Check file size
    if (file.size > getMaxSize() * 1024 * 1024) {
      return `File size must be less than ${getMaxSize()}MB`;
    }

    // Check file type for profile pictures
    if (options.type === 'profile-picture' && !file.type.startsWith('image/')) {
      return 'Please select an image file';
    }

    return null;
  }, [options.type]);

  const upload = useCallback(async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      options.onError?.(validationError);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      console.log('Starting file upload:', { fileName: file.name, fileSize: file.size, fileType: file.type });
      
      // Get fresh CSRF token
      await api.get('/sanctum/csrf-cookie');
      const csrfToken = await getCsrfToken();
      console.log('CSRF token obtained:', csrfToken ? 'Yes' : 'No');
      
      const formData = new FormData();
      
      // Use different field names based on upload type
      switch (options.type) {
        case 'profile-picture':
          formData.append('profile_image', file);
          break;
        case 'resume':
          formData.append('resume', file);
          break;
        default:
          formData.append('file', file);
      }

      let endpoint = '/api/upload';
      switch (options.type) {
        case 'profile-picture':
          endpoint = '/api/user/profile-image';
          break;
        case 'resume':
          endpoint = '/api/user/resume';
          break;
      }

      console.log('Uploading to endpoint:', endpoint);
      console.log('FormData contents:', Array.from(formData.entries()));

      const response = await api.post(endpoint, formData, {
        headers: {
          'X-XSRF-TOKEN': csrfToken || '',
          Accept: 'application/json',
        },
      });

      console.log('Upload response:', response.data);

      // Handle different response formats
      let fileUrl = response.data.url || response.data.data?.url || response.data.data?.profile_image || response.data.profile_image;
      const fileName = file.name;

      console.log('Extracted file URL:', fileUrl);

      // For profile images, we'll use the response URL directly
      // The backend should return the correct URL
      if (!fileUrl) {
        throw new Error('No file URL received from server');
      }

      // For profile images, also update the user's profile with the new image path
      if (options.type === 'profile-picture') {
        try {
          const updateResponse = await api.put('/api/user', {
            profile_image: fileUrl
          }, {
            headers: {
              'X-XSRF-TOKEN': csrfToken || '',
              'Content-Type': 'application/json',
            },
          });
        } catch (updateError: any) {
          console.error('Failed to update user profile with new image:', updateError);
          console.error('Update error response:', updateError.response?.data);
          console.error('Update error status:', updateError.response?.status);
        }
      }

      options.onSuccess?.(fileUrl, fileName);
    } catch (err: any) {
      console.error('Upload error:', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Upload failed';
      setError(errorMessage);
      options.onError?.(errorMessage);
    } finally {
      setIsUploading(false);
    }
  }, [options, validateFile]);

  const reset = useCallback(() => {
    setError(null);
    setIsUploading(false);
  }, []);

  return { upload, isUploading, error, reset };
} 