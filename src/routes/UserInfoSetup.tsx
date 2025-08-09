import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api, getCsrfToken } from '../api';
import Container from '../components/shared/Container';
import Section from '../components/shared/Section';
import BorderBox from '../components/shared/BorderBox';
import PrimaryBtn from '../components/shared/PrimaryBtn';
import Input from '../components/shared/Input';
import Select from '../components/shared/Select';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const UserInfoSetup = () => {
  const { user, refreshUserInfo } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    profession_id: '',
    tagline: '',
    description: '',
    location_id: '',
    status: 'available' as 'available' | 'open to work' | 'not available',
    github_link: '',
    linkedin_link: '',
    portfolio_link: '',
    started_date: '',
  });

  const [professions, setProfessions] = useState<Array<{ id: number; profession: string }>>([]);
  const [locations, setLocations] = useState<Array<{ id: number; city: string; country: string }>>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);



  // Load professions and locations on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsDataLoading(true);
        
        // Get CSRF token first
        await getCsrfToken();
        
        const [professionsResponse, locationsResponse] = await Promise.all([
          api.get('/api/professions'),
          api.get('/api/locations')
        ]);
        
        // Set professions and locations - API returns data directly as array
        const professionsData = professionsResponse.data || [];
        const locationsData = locationsResponse.data || [];
        
        setProfessions(professionsData);
        setLocations(locationsData);
      } catch (error) {
        console.error('Error loading data:', error);
        // Set empty arrays on error to prevent crashes

        setProfessions([
          { id: 1, profession: 'Frontend Developer' },
          { id: 2, profession: 'Backend Developer' },
          { id: 3, profession: 'Full Stack Developer' },
          { id: 4, profession: 'DevOps Engineer' },
          { id: 5, profession: 'UI/UX Designer' }
        ]);
        setLocations([
          { id: 1, city: 'Vienna', country: 'Austria' },
          { id: 2, city: 'Berlin', country: 'Germany' },
          { id: 3, city: 'Amsterdam', country: 'Netherlands' },
          { id: 4, city: 'London', country: 'United Kingdom' },
          { id: 5, city: 'Paris', country: 'France' }
        ]);
      } finally {
        setIsDataLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Get fresh CSRF token
      const csrfToken = await getCsrfToken();

      // Filter out empty values and prepare data for many-to-many relationships
      const dataToSend: any = {};
      
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== '') {
          // Handle profession and location IDs for many-to-many relationships
          if (key === 'profession_id' || key === 'location_id') {
            dataToSend[key] = parseInt(value as string);
          } else {
            dataToSend[key] = value;
          }
        }
      });



      await api.post('/api/user/info', dataToSend, {
        headers: {
          'X-XSRF-TOKEN': csrfToken || '',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      
      // Refresh user info to get the new data
      await refreshUserInfo();
      
      // Redirect to dashboard
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      console.error('Error creating user info:', error);
      setError(error.response?.data?.message || 'Failed to create user info');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section>
      <Container>
        <div className="max-w-2xl mx-auto">
          <BorderBox>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold source-code mb-4">Complete Your Profile</h1>
              <p className="text-gray-600">
                Welcome, {user?.first_name}! Let's set up your professional profile to help you connect with other developers.
              </p>
            </div>

            {isDataLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="mt-4 text-gray-600">Loading form data...</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Profession"
                    name="profession_id"
                    value={formData.profession_id}
                    onChange={handleSelectChange}
                    options={professions.map(p => ({ value: p.id, label: p.profession }))}
                    placeholder="Select your profession"
                  />
                  
                  <Select
                    label="Location"
                    name="location_id"
                    value={formData.location_id}
                    onChange={handleSelectChange}
                    options={locations.map(l => ({ value: l.id, label: `${l.city}, ${l.country}` }))}
                    placeholder="Select your location"
                  />
                </div>

              <Input
                label="Professional Tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
                placeholder="e.g., Full Stack Developer passionate about React and Node.js"
              />

              <div>
                <label className="label block mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="custom-border py-2 px-3 rounded-md w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your experience, skills, and what you're looking for..."
                />
              </div>

              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleSelectChange}
                options={[
                  { value: 'available', label: 'Available for work' },
                  { value: 'open to work', label: 'Open to opportunities' },
                  { value: 'not available', label: 'Not available' }
                ]}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="GitHub Profile"
                  name="github_link"
                  value={formData.github_link}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username"
                />
                
                <Input
                  label="LinkedIn Profile"
                  name="linkedin_link"
                  value={formData.linkedin_link}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <Input
                label="Portfolio Website"
                name="portfolio_link"
                value={formData.portfolio_link}
                onChange={handleInputChange}
                placeholder="https://your-portfolio.com"
              />

              <Input
                label="Started Date"
                name="started_date"
                type="date"
                value={formData.started_date}
                onChange={handleInputChange}
              />

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600">
                  {error}
                </div>
              )}

              <div className="flex justify-center pt-4">
                <PrimaryBtn type="submit" disabled={isLoading}>
                  {isLoading ? <LoadingSpinner size="sm" /> : 'Complete Profile'}
                </PrimaryBtn>
              </div>
            </form>
            )}
          </BorderBox>
        </div>
      </Container>
    </Section>
  );
};

export default UserInfoSetup; 