import { useState, useEffect } from "react";
import { api } from "../../api";
import DeveloperCard from "./DeveloperCard";
import LoadingSpinner from "../shared/LoadingSpinner";
import type { User } from "../../types";

const DeveloperGrid = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        setIsLoading(true);
        // Use the dedicated recent users endpoint
        const response = await api.get('/api/users/recent');
        setUsers(response.data.data || response.data || []);
      } catch (error: any) {
        console.error('Error fetching recent users:', error);
        setError(error.response?.data?.message || 'Failed to load recent users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <p className="text-gray-600">Unable to load recently joined developers.</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No developers have joined yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {users.map((user) => (
        <DeveloperCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default DeveloperGrid;
