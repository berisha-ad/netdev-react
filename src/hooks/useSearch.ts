import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import type { User, Skill, Profession, Location } from '../types';

interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface SearchResponse {
  data: User[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Data state
  const [users, setUsers] = useState<User[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  
  // Pagination state
  const [pagination, setPagination] = useState<PaginationMeta>({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0
  });
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search filters
  const [searchText, setSearchText] = useState(searchParams.get('search') || '');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    searchParams.getAll('skills[]') || []
  );
  const [selectedProfession, setSelectedProfession] = useState(searchParams.get('profession') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || '');
  
  // Pagination filters
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [perPage, setPerPage] = useState(parseInt(searchParams.get('per_page') || '15'));

  // Perform search
  const performSearch = useCallback(async (page = currentPage) => {
    try {
      setIsLoading(true);
      setError(null);

      // Build search parameters
      const params = new URLSearchParams();
      
      if (searchText) params.append('search', searchText);
      if (selectedSkills.length > 0) {
        selectedSkills.forEach(skill => params.append('skills[]', skill));
      }
      if (selectedProfession) params.append('profession', selectedProfession);
      if (selectedLocation) params.append('location', selectedLocation);
      if (selectedCity) params.append('city', selectedCity);
      if (selectedCountry) params.append('country', selectedCountry);
      
      // Add pagination parameters
      params.append('page', page.toString());
      params.append('per_page', perPage.toString());

      const response = await api.get(`/api/users/search?${params.toString()}`);
      const responseData = response.data as SearchResponse;
      
      console.log('Search response:', responseData);
      setUsers(responseData.data || []);
      setPagination({
        current_page: responseData.current_page || 1,
        last_page: responseData.last_page || 1,
        per_page: responseData.per_page || 15,
        total: responseData.total || 0
      });
      console.log('Pagination set to:', {
        current_page: responseData.current_page || 1,
        last_page: responseData.last_page || 1,
        per_page: responseData.per_page || 15,
        total: responseData.total || 0
      });
      
      // Update URL with search parameters
      setSearchParams(params);
    } catch (error: any) {
      console.error('Error performing search:', error);
      setError(error.response?.data?.message || 'Failed to perform search');
    } finally {
      setIsLoading(false);
    }
  }, [searchText, selectedSkills, selectedProfession, selectedLocation, selectedCity, selectedCountry, currentPage, perPage, setSearchParams]);

  // Load filter options and perform initial search
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [skillsResponse, professionsResponse, locationsResponse] = await Promise.all([
          api.get('/api/skills'),
          api.get('/api/professions'),
          api.get('/api/locations')
        ]);

        setSkills(skillsResponse.data.data || skillsResponse.data || []);
        setProfessions(professionsResponse.data.data || professionsResponse.data || []);
        setLocations(locationsResponse.data.data || locationsResponse.data || []);
        
        // Perform initial search to show all users
        performSearch();
      } catch (error) {
        console.error('Error loading filter options:', error);
      }
    };

    loadFilterOptions();
  }, []);

  // Handle skill toggle
  const handleSkillToggle = (skillId: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    console.log('goToPage called with:', page, 'current pagination:', pagination);
    if (page >= 1 && page <= pagination.last_page) {
      setCurrentPage(page);
      performSearch(page);
    }
  };

  const changePerPage = (newPerPage: number) => {
    console.log('changePerPage called with:', newPerPage);
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing per page
    performSearch(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchText('');
    setSelectedSkills([]);
    setSelectedProfession('');
    setSelectedLocation('');
    setSelectedCity('');
    setSelectedCountry('');
    setCurrentPage(1);
    setPerPage(15);
    setSearchParams({});
  };

  return {
    // Data
    users,
    skills,
    professions,
    locations,
    
    // Pagination
    pagination,
    currentPage,
    perPage,
    
    // UI state
    isLoading,
    error,
    
    // Search filters
    searchText,
    selectedSkills,
    selectedProfession,
    selectedLocation,
    selectedCity,
    selectedCountry,
    
    // Actions
    setSearchText,
    setSelectedSkills,
    setSelectedProfession,
    setSelectedLocation,
    setSelectedCity,
    setSelectedCountry,
    handleSkillToggle,
    clearFilters,
    performSearch,
    setError,
    
    // Pagination actions
    goToPage,
    changePerPage
  };
}; 