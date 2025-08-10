import { useCallback } from 'react';
import { api, getCsrfToken } from '../api';
import type { EditProfileForm, UserInfo } from '../types';

export const useDashboardActions = (
  setError: (error: string | null) => void,
  refreshUserInfo: () => Promise<void>,
  refreshSkills: () => Promise<void>,
  refreshProjects: () => Promise<void>,
  refreshProfessions?: () => Promise<void>,
  refreshLocations?: () => Promise<void>,
  refreshAllSkills?: () => Promise<void>,
  currentUserInfo?: UserInfo | null
) => {
  const ensureIntegerSkillId = (skillId: any): number => {
    const parsedId = parseInt(skillId);
    if (isNaN(parsedId)) {
      throw new Error(`Invalid skill ID: ${skillId}`);
    }
    return parsedId;
  };
  const handleSaveProfile = useCallback(async (formData: EditProfileForm) => {
    try {
      setError(null);

      const dataToSend: any = {};
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== '') {
          if (key === 'profession_id' || key === 'location_id') {
            dataToSend[key] = parseInt(value as string);
          } else {
            dataToSend[key] = value;
          }
        }
      });

      await api.get('/sanctum/csrf-cookie');
      const csrfToken = await getCsrfToken();

      await api.post('/api/user/info', dataToSend, {
        headers: {
          'X-XSRF-TOKEN': csrfToken || '',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      await refreshUserInfo();
    } catch (error: any) {
      console.error('Error saving profile:', error);
      setError(error.response?.data?.message || 'Failed to save profile');
    }
  }, [setError, refreshUserInfo, refreshSkills, refreshProjects]);

  const handleAddSkill = useCallback(async (skillData: { skill: string; isNewSkill: boolean }) => {
    try {
      setError(null);
      console.log('Adding skill with data:', skillData);

      await api.get('/sanctum/csrf-cookie');
      const csrfToken = await getCsrfToken();

      if (skillData.isNewSkill) {
        console.log('Creating new skill:', skillData.skill);
        
        try {
          const createResponse = await api.post('/api/skills', { skill: skillData.skill }, {
            headers: {
              'X-XSRF-TOKEN': csrfToken || '',
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });

          console.log('Skill creation response:', createResponse.data);
          const newSkillId = parseInt(createResponse.data.data?.id || createResponse.data.id);
          console.log('New skill ID:', newSkillId, 'Type:', typeof newSkillId);
          
          const validatedSkillId = ensureIntegerSkillId(newSkillId);
          await api.post('/api/user/skills/attach', { skill_ids: [validatedSkillId] }, {
            headers: {
              'X-XSRF-TOKEN': csrfToken || '',
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });
        } catch (createError: any) {
          if (createError.response?.status === 422 && createError.response?.data?.message?.includes('already been taken')) {
            console.log('Skill already exists, trying to find and attach it');
            
            try {
              const skillsResponse = await api.get('/api/skills');
              const allSkills = skillsResponse.data.data || skillsResponse.data;
              const existingSkill = allSkills.find((s: any) => 
                s.skill.toLowerCase() === skillData.skill.toLowerCase()
              );
              
              if (existingSkill) {
                console.log('Found existing skill:', existingSkill);
                const existingSkillId = parseInt(existingSkill.id);
                console.log('Existing skill ID:', existingSkillId, 'Type:', typeof existingSkillId);
                
                const validatedSkillId = ensureIntegerSkillId(existingSkillId);
                await api.post('/api/user/skills/attach', { skill_ids: [validatedSkillId] }, {
                  headers: {
                    'X-XSRF-TOKEN': csrfToken || '',
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                  },
                });
              } else {
                throw new Error('Skill not found after creation attempt');
              }
            } catch (findError: any) {
              console.error('Error finding existing skill:', findError);
              throw new Error('Failed to find or attach existing skill');
            }
          } else {
            throw createError;
          }
        }
      } else {
        // For existing skills, skillData.skill contains the skill ID
        console.log('Attaching existing skill with ID:', skillData.skill);
        const skillId = parseInt(skillData.skill);
        
        if (isNaN(skillId) || skillId <= 0) {
          throw new Error('Invalid skill ID provided');
        }
        
        console.log('Existing skill ID:', skillId, 'Type:', typeof skillId);
        
        const validatedSkillId = ensureIntegerSkillId(skillId);
        await api.post('/api/user/skills/attach', { skill_ids: [validatedSkillId] }, {
          headers: {
            'X-XSRF-TOKEN': csrfToken || '',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
      }
      
      // Refresh user skills after adding
      await refreshSkills();
      
      // Refresh all skills to include newly created ones
      if (refreshAllSkills) {
        await refreshAllSkills();
      }
    } catch (error: any) {
      console.error('Error adding skill:', error);
      setError(error.response?.data?.message || error.message || 'Failed to add skill');
    }
  }, [setError, refreshSkills, refreshAllSkills]);

  const handleRemoveSkill = useCallback(async (skillId: number) => {
    try {
      setError(null);

      await api.get('/sanctum/csrf-cookie');
      const csrfToken = await getCsrfToken();

      await api.post('/api/user/skills/detach', { skill_ids: [skillId] }, {
        headers: {
          'X-XSRF-TOKEN': csrfToken || '',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      
      await refreshSkills();
    } catch (error: any) {
      console.error('Error removing skill:', error);
      setError(error.response?.data?.message || 'Failed to remove skill');
    }
  }, [setError, refreshSkills]);

  const handleAddProject = useCallback(async (projectData: any) => {
    try {
      setError(null);

      await api.get('/sanctum/csrf-cookie');
      const csrfToken = await getCsrfToken();

      const projectToSend = {
        name: projectData.name,
        description: projectData.description,
        date: projectData.date,
        link: projectData.link || null,
        skill_ids: projectData.skill_ids || []
      };

      await api.post('/api/user/projects', projectToSend, {
        headers: {
          'X-XSRF-TOKEN': csrfToken || '',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      
      await refreshProjects();
    } catch (error: any) {
      console.error('Error adding project:', error);
      setError(error.response?.data?.message || 'Failed to add project');
    }
  }, [setError, refreshProjects]);

  const handleRemoveProject = useCallback(async (projectId: number) => {
    try {
      setError(null);

      await api.get('/sanctum/csrf-cookie');
      const csrfToken = await getCsrfToken();

      await api.delete(`/api/user/projects/${projectId}`, {
        headers: {
          'X-XSRF-TOKEN': csrfToken || '',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      
      // Refresh projects after removing
      await refreshProjects();
    } catch (error: any) {
      console.error('Error removing project:', error);
      setError(error.response?.data?.message || 'Failed to remove project');
    }
  }, [setError, refreshProjects]);

  const handleAddProfession = useCallback(async (professionData: { profession: string; isNewProfession: boolean }) => {
    try {
      setError(null);

      await api.get('/sanctum/csrf-cookie');
      const csrfToken = await getCsrfToken();

      let professionId: number;

      if (professionData.isNewProfession) {
        // Create new profession first
        console.log('Creating new profession:', professionData.profession);
        const createResponse = await api.post('/api/professions', { profession: professionData.profession }, {
          headers: {
            'X-XSRF-TOKEN': csrfToken || '',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        console.log('Profession creation response:', createResponse.data);
        professionId = createResponse.data.data?.id || createResponse.data.id;
      } else {
        // Find existing profession
        const professionsResponse = await api.get('/api/professions');
        const professions = professionsResponse.data.data || professionsResponse.data;
        const existingProfession = professions.find((p: any) => p.profession === professionData.profession);
        
        if (!existingProfession) {
          throw new Error('Profession not found');
        }
        
        professionId = existingProfession.id;
      }
      
      // Get current user info first
      let currentUserInfo = {};
      try {
        const userInfoResponse = await api.get('/api/user/info');
        currentUserInfo = userInfoResponse.data.data || userInfoResponse.data || {};
      } catch (infoError) {
        // User info doesn't exist yet, that's okay
        console.log('No existing user info found, creating new');
      }

      // Update user info with profession_id as integer, preserving existing data
      console.log('Updating user info with profession_id:', professionId);
      const updateData = {
        ...currentUserInfo,
        profession_id: professionId
      };
      console.log('Sending update data:', updateData);
      
      await api.post('/api/user/info', updateData, {
        headers: {
          'X-XSRF-TOKEN': csrfToken || '',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      
      // Refresh user info after adding profession
      await refreshUserInfo();
      
      // Refresh professions to include newly created ones
      if (refreshProfessions) {
        await refreshProfessions();
      }
    } catch (error: any) {
      console.error('Error adding profession:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      setError(error.response?.data?.message || 'Failed to add profession');
    }
  }, [setError, refreshUserInfo, refreshProfessions]);

  const handleAddLocation = useCallback(async (locationData: { city: string; country: string; isNewLocation: boolean }) => {
    try {
      setError(null);
      console.log('Adding location with data:', locationData);

      await api.get('/sanctum/csrf-cookie');
      const csrfToken = await getCsrfToken();

      let locationId: number;

      if (locationData.isNewLocation) {
        console.log('Creating new location:', locationData.city, locationData.country);
        
        const createResponse = await api.post('/api/locations', { 
          city: locationData.city, 
          country: locationData.country 
        }, {
          headers: {
            'X-XSRF-TOKEN': csrfToken || '',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        console.log('Location creation response:', createResponse.data);
        locationId = parseInt(createResponse.data.data?.id || createResponse.data.id);
      } else {
        // For existing locations, find the location by city and country
        console.log('Finding existing location by city and country:', locationData.city, locationData.country);
        
        const locationsResponse = await api.get('/api/locations');
        const allLocations = locationsResponse.data.data || locationsResponse.data;
        
        const existingLocation = allLocations.find((l: any) => 
          l.city.toLowerCase() === locationData.city.toLowerCase() && 
          l.country.toLowerCase() === locationData.country.toLowerCase()
        );
        
        if (!existingLocation) {
          throw new Error('Selected location not found');
        }
        
        locationId = parseInt(existingLocation.id);
      }

      console.log('Location ID to set:', locationId, 'Type:', typeof locationId);
      
      // Prepare update data with existing user info to avoid validation errors
      const updateData: any = { location_id: locationId };
      
      // Include existing user info fields to satisfy validation requirements
      if (currentUserInfo) {
        if (currentUserInfo.tagline) updateData.tagline = currentUserInfo.tagline;
        if (currentUserInfo.description) updateData.description = currentUserInfo.description;
        if (currentUserInfo.status) updateData.status = currentUserInfo.status;
        if (currentUserInfo.profession_id) updateData.profession_id = currentUserInfo.profession_id;
        if (currentUserInfo.github_link) updateData.github_link = currentUserInfo.github_link;
        if (currentUserInfo.linkedin_link) updateData.linkedin_link = currentUserInfo.linkedin_link;
        if (currentUserInfo.portfolio_link) updateData.portfolio_link = currentUserInfo.portfolio_link;
        if (currentUserInfo.started_date) updateData.started_date = currentUserInfo.started_date;
      }
      
      // Update user info with the new location and existing data
      await api.post('/api/user/info', updateData, {
        headers: {
          'X-XSRF-TOKEN': csrfToken || '',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      console.log('User info updated successfully with location ID:', locationId);
      
      // Refresh data
      await refreshUserInfo();
      if (refreshLocations) {
        await refreshLocations();
      }
    } catch (error: any) {
      console.error('Error adding location:', error);
      setError(error.response?.data?.message || error.message || 'Failed to add location');
      throw error; // Re-throw to allow the calling component to handle it
    }
  }, [setError, refreshUserInfo, refreshLocations]);

  return {
    handleSaveProfile,
    handleAddSkill,
    handleRemoveSkill,
    handleAddProject,
    handleRemoveProject,
    handleAddProfession,
    handleAddLocation
  };
}; 