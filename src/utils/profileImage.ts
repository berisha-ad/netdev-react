/**
 * Constructs the profile image URL for a user using the new endpoint
 * @param userId - The user's ID
 * @returns The profile image URL
 */
export const getProfileImageUrl = (userId: number): string => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost/api';
  return `${baseUrl.replace('/api', '')}/api/users/${userId}/profile-image`;
}; 