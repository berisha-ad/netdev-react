// Authentication Types
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  email_verified_at?: string;
  profile_image?: string;
  created_at: string;
  updated_at: string;
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

export interface Profession {
  id: number;
  profession: string;
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: number;
  city: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
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
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  refreshUserInfo: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshAllUserData: () => Promise<void>;
} 