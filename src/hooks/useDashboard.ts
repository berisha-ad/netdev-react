import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api, getCsrfToken } from '../api';
import type { Skill, Project, Profession, Location, EditProfileForm } from '../types';
import { getProfileImageUrl } from '../utils/profileImage';

export const useDashboard = () => {
  const { userInfo, refreshUserInfo } = useAuth();
  
  // State
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Data state
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  
  // Loading states
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userInfo) return;

      // Fetch user skills
      setIsLoadingSkills(true);
      try {
        const response = await api.get('/api/user/skills');
        const data = response.data.data || response.data || [];
        setUserSkills(data);
      } catch (error) {
        console.error('Error fetching user skills:', error);
        setUserSkills([]);
      } finally {
        setIsLoadingSkills(false);
      }

      // Fetch user projects
      setIsLoadingProjects(true);
      try {
        const response = await api.get('/api/user/projects');
        const data = response.data.data || response.data || [];
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchUserData();
  }, [userInfo]);

  // Fetch static data
  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const [skillsResponse, professionsResponse, locationsResponse] = await Promise.all([
          api.get('/api/skills'),
          api.get('/api/professions'),
          api.get('/api/locations')
        ]);

        setAllSkills(skillsResponse.data.data || skillsResponse.data || []);
        setProfessions(professionsResponse.data.data || professionsResponse.data || []);
        setLocations(locationsResponse.data.data || locationsResponse.data || []);
      } catch (error) {
        console.error('Error fetching static data:', error);
      }
    };

    fetchStaticData();
  }, []);

  // Set profile image URL
  useEffect(() => {
    if (!userInfo) {
      setProfileImage(null);
      return;
    }
    
    // Set the profile image URL directly - the browser will handle 404s gracefully
    setProfileImage(getProfileImageUrl(userInfo.user_id));
  }, [userInfo]);

  // Refresh functions
  const refreshSkills = async () => {
    if (!userInfo) return;
    
    setIsLoadingSkills(true);
    try {
      const response = await api.get('/api/user/skills');
      const data = response.data.data || response.data || [];
      setUserSkills(data);
    } catch (error) {
      console.error('Error fetching user skills:', error);
      setUserSkills([]);
    } finally {
      setIsLoadingSkills(false);
    }
  };

  const refreshProjects = async () => {
    if (!userInfo) return;
    
    setIsLoadingProjects(true);
    try {
      const response = await api.get('/api/user/projects');
      const data = response.data.data || response.data || [];
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  return {
    // State
    profileImage,
    error,
    userSkills,
    allSkills,
    projects,
    professions,
    locations,
    isLoadingSkills,
    isLoadingProjects,
    
    // Actions
    setError,
    setProfileImage,
    refreshUserInfo,
    refreshSkills,
    refreshProjects
  };
}; 