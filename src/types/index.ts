// User Types
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  created_at: string;
  profile_image?: string;
  user_info?: {
    tagline?: string;
    status?: string;
    profession?: {
      profession: string;
    };
    location?: {
      city: string;
      country: string;
    };
    skills?: Array<{
      skill: string;
    }>;
  };
}

export interface UserInfo {
  id: number;
  user_id: number;
  profession_id?: number;
  tagline?: string;
  description?: string;
  location_id?: number;
  status?: 'available' | 'open to work' | 'not available';
  github_link?: string;
  linkedin_link?: string;
  portfolio_link?: string;
  started_date?: string;
  created_at: string;
  updated_at: string;
  profession?: Profession;
  location?: Location;
}

// Skill Types
export interface Skill {
  id: number;
  skill: string;
}

// Project Types
export interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  link?: string;
  skills?: Array<{ id: number; skill: string }>;
}

// Location & Profession Types
export interface Location {
  id: number;
  city: string;
  country: string;
}

export interface Profession {
  id: number;
  profession: string;
}

// Form Types
export interface EditProfileForm {
  tagline: string;
  description: string;
  status: string;
  profession_id: string;
  location_id: string;
  github_link: string;
  linkedin_link: string;
  portfolio_link: string;
  started_date: string;
}

export interface SkillForm {
  skill: string;
  isNewSkill: boolean;
}

export interface ProjectForm {
  name: string;
  description: string;
  date: string;
  link: string;
  skill_ids: number[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Search Types
export interface SearchFilters {
  search?: string;
  skills?: string[];
  profession?: string;
  location?: string;
  city?: string;
  country?: string;
}

// File Upload Types
export interface FileUploadResponse {
  url: string;
  filename: string;
  path: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}

export interface AuthState {
  user: User | null;
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean }>;
  register: (data: RegisterData) => Promise<{ success: boolean }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  refreshUserInfo: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshAllUserData: () => Promise<void>;
} 