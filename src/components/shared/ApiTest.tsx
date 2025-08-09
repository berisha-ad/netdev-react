import { useState } from 'react';
import { api } from '../../api';

const ApiTest = () => {
  const [testData, setTestData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testEndpoints = async () => {
    setLoading(true);
    try {
      // Test search endpoint
      const searchResponse = await api.get('/api/users/search');
      console.log('Search response:', searchResponse.data);

      // Test professions endpoint
      const professionsResponse = await api.get('/api/professions');
      console.log('Professions response:', professionsResponse.data);

      // Test locations endpoint
      const locationsResponse = await api.get('/api/locations');
      console.log('Locations response:', locationsResponse.data);

      // Test skills endpoint
      const skillsResponse = await api.get('/api/skills');
      console.log('Skills response:', skillsResponse.data);

      setTestData({
        search: searchResponse.data,
        professions: professionsResponse.data,
        locations: locationsResponse.data,
        skills: skillsResponse.data
      });
    } catch (error) {
      console.error('API test error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={testEndpoints}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Testing...' : 'Test API Endpoints'}
      </button>
      
      {testData && (
        <div className="mt-4">
          <h3>API Test Results:</h3>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
            {JSON.stringify(testData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest; 