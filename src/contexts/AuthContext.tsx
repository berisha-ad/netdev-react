import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { api, getCsrfToken } from '../api';
import type { User, UserInfo, LoginCredentials, RegisterData, AuthState, AuthContextType } from '../types';

const initialState: AuthState = {
  user: null,
  userInfo: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; userInfo?: UserInfo } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_USER_INFO'; payload: UserInfo };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        userInfo: action.payload.userInfo || null,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        userInfo: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        userInfo: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'UPDATE_USER_INFO':
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const checkAuth = useCallback(async () => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      await getCsrfToken();
      
      const userResponse = await api.get('/api/user');
      
      let userInfo = null;
      try {
        const userInfoResponse = await api.get('/api/user/info');
        userInfo = userInfoResponse.data.data || userInfoResponse.data;
      } catch (infoError) {
      }
      
      const userData = userResponse.data.data || userResponse.data;
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: userData,
          userInfo: userInfo,
        },
      });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: '' });
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const csrfToken = await getCsrfToken();
      
      await api.post('/api/login', credentials, {
        headers: {
          'X-XSRF-TOKEN': csrfToken || '',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const userResponse = await api.get('/api/user');
      
      let userInfo = null;
      try {
        const userInfoResponse = await api.get('/api/user/info');
        userInfo = userInfoResponse.data.data || userInfoResponse.data;
      } catch (infoError) {
      }
      
      const userData = userResponse.data.data || userResponse.data;
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: userData,
          userInfo: userInfo,
        },
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw new Error(errorMessage);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const csrfToken = await getCsrfToken();
      
      await api.post('/api/register', data, {
        headers: {
          'X-XSRF-TOKEN': csrfToken || '',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      dispatch({ type: 'AUTH_FAILURE', payload: '' });
      
      return { success: true };
    } catch (error: any) {
      if (error.response?.status === 422) {
        dispatch({ type: 'AUTH_FAILURE', payload: '' });
        throw error;
      }
      
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      dispatch({ type: 'AUTH_LOGOUT' });
      
      const csrfToken = await getCsrfToken();
      await api.post('/api/logout', {}, {
        headers: {
          'X-XSRF-TOKEN': csrfToken || '',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const refreshUserInfo = useCallback(async () => {
    try {
      const userInfoResponse = await api.get('/api/user/info');
      const userInfo = userInfoResponse.data.data || userInfoResponse.data;
      dispatch({ type: 'UPDATE_USER_INFO', payload: userInfo });
    } catch (error) {
      console.error('Error refreshing user info:', error);
    }
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    checkAuth,
    clearError,
    refreshUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 