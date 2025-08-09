import { useState, useEffect } from 'react';
import { api } from '../api';
import type { User, UserInfo, Skill, Project } from '../types';

export const useProfile = (username: string | undefined) => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!username) return;

      try {
        setIsLoading(true);
        setError(null);

        // First, get user data from search endpoint to find the user ID
        // The search endpoint may include user_info with skills, but we'll also try the dedicated skills endpoint
        let userData = null;
        let skillsFromSearch: Skill[] = [];
        
        try {
          const searchResponse = await api.get('/api/users/search');
          const searchUsers = searchResponse.data.data || searchResponse.data || [];
          const userWithSkills = searchUsers.find((u: any) => u.username === username);
          
          if (userWithSkills) {
            userData = userWithSkills;
            if (userWithSkills.user_info?.skills) {
              skillsFromSearch = userWithSkills.user_info.skills;
              setSkills(userWithSkills.user_info.skills);
            }
          }
        } catch (searchError) {
          console.warn('Could not fetch user from search endpoint');
        }

        // If we found the user, fetch additional data using the user ID
        if (userData) {
          try {
            const [infoResponse, projectsResponse, professionResponse, locationResponse] = await Promise.all([
              api.get(`/api/users/${userData.id}/info`),
              api.get(`/api/users/${userData.id}/projects`),
              api.get(`/api/users/${userData.id}/profession`).catch(() => ({ data: null })),
              api.get(`/api/users/${userData.id}/location`).catch(() => ({ data: null }))
            ]);

            const userInfoData = infoResponse.data.data || infoResponse.data;
            const projectsData = projectsResponse.data.data || projectsResponse.data || [];
            const professionData = professionResponse.data.data || professionResponse.data;
            const locationData = locationResponse.data.data || locationResponse.data;

            // Combine user info with profession and location data
            const enrichedUserInfo = {
              ...userInfoData,
              profession: professionData,
              location: locationData
            };

            setUser(userData);
            setUserInfo(enrichedUserInfo);
            setProjects(projectsData);

            // Skills fetching priority:
            // 1. Search endpoint (if available)
            // 2. Dedicated skills endpoint (new public endpoint)
            // 3. User info endpoint (fallback)
            if (skillsFromSearch.length === 0) {
              try {
                console.log('Fetching skills from dedicated endpoint for user ID:', userData.id);
                const skillsResponse = await api.get(`/api/users/${userData.id}/skills`);
                const skillsData = skillsResponse.data.data || skillsResponse.data || [];
                console.log('Skills fetched from dedicated endpoint:', skillsData);
                setSkills(skillsData);
              } catch (skillsError) {
                console.warn('Could not fetch skills from dedicated endpoint:', skillsError);
                // Fallback: try to get skills from user info
                if (userInfoData && userInfoData.skills) {
                  console.log('Getting skills from user info as fallback:', userInfoData.skills);
                  setSkills(userInfoData.skills);
                }
              }
            }
          } catch (error) {
            console.warn('Could not fetch additional user data');
            // Still set the user data we got from search
            setUser(userData);
          }
        } else {
          throw new Error('User not found');
        }

        // Log skills status
        if (skillsFromSearch.length > 0) {
          console.log('Skills already available from search:', skillsFromSearch);
        }

        // Note: Profession and location are now fetched using dedicated endpoints above
      } catch (error: any) {
        console.error('Error fetching user profile:', error);
        setError(error.response?.data?.message || 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  return {
    user,
    userInfo,
    skills,
    projects,
    isLoading,
    error
  };
}; 