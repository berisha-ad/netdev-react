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
      // Get fresh CSRF token
      await api.get('/sanctum/csrf-cookie');
      const csrfToken = await getCsrfToken();
      
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

      const response = await api.post(endpoint, formData, {
        headers: {
          'X-XSRF-TOKEN': csrfToken || '',
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });

      // Handle different response formats
      let fileUrl = response.data.url || response.data.data?.url || response.data.data?.profile_image || response.data.profile_image;
      const fileName = file.name;

      // If we have a relative path, construct the full URL
      if (fileUrl && !fileUrl.startsWith('http')) {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost/api';
        if (fileUrl.includes('profile_images/')) {
          fileUrl = `${baseUrl.replace('/api', '')}/storage/${fileUrl}`;
        } else {
          fileUrl = `${baseUrl}/storage/${fileUrl}`;
        }
      }

      options.onSuccess?.(fileUrl, fileName);
    } catch (err: any) {
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