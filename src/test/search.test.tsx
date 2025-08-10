import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../components/home/SearchBar';

// Mock the useSearch hook
const mockUseSearch = vi.fn();

// Mock the api module
vi.mock('../api', () => ({
  api: {
    get: vi.fn(),
  },
}));

// Mock the useSearch hook
vi.mock('../hooks/useSearch', () => ({
  useSearch: () => mockUseSearch(),
}));

// Mock the useAuth hook
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
  }),
}));

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Search Logic Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  // Test 1: SearchBar form submission with valid query
  it('should navigate to search page with search query when form is submitted', async () => {
    renderWithRouter(<SearchBar />);
    
    const searchInput = screen.getByPlaceholderText('Search for developers...');
    const searchButton = screen.getByText('Search');
    
    // Type in search query
    fireEvent.change(searchInput, { target: { value: 'React Developer' } });
    
    // Submit form
    fireEvent.click(searchButton);
    
    // Check if navigate was called with correct URL
    expect(mockNavigate).toHaveBeenCalledWith('/search?search=React%20Developer');
  });

  // Test 2: SearchBar form submission with empty query
  it('should navigate to search page without search parameter when query is empty', async () => {
    renderWithRouter(<SearchBar />);
    
    const searchButton = screen.getByText('Search');
    
    // Submit form without typing anything
    fireEvent.click(searchButton);
    
    // Check if navigate was called with correct URL
    expect(mockNavigate).toHaveBeenCalledWith('/search');
  });

  // Test 3: SearchBar trims whitespace from search query
  it('should trim whitespace from search query before navigation', async () => {
    renderWithRouter(<SearchBar />);
    
    const searchInput = screen.getByPlaceholderText('Search for developers...');
    const searchButton = screen.getByText('Search');
    
    // Type in search query with leading/trailing whitespace
    fireEvent.change(searchInput, { target: { value: '  JavaScript Developer  ' } });
    
    // Submit form
    fireEvent.click(searchButton);
    
    // Check if navigate was called with trimmed query
    expect(mockNavigate).toHaveBeenCalledWith('/search?search=JavaScript%20Developer');
  });

  // Test 4: SearchBar handles special characters in search query
  it('should properly encode special characters in search query', async () => {
    renderWithRouter(<SearchBar />);
    
    const searchInput = screen.getByPlaceholderText('Search for developers...');
    const searchButton = screen.getByText('Search');
    
    // Type in search query with special characters
    fireEvent.change(searchInput, { target: { value: 'C# & .NET Developer' } });
    
    // Submit form
    fireEvent.click(searchButton);
    
    // Check if navigate was called with properly encoded query
    expect(mockNavigate).toHaveBeenCalledWith('/search?search=C%23%20%26%20.NET%20Developer');
  });
}); 