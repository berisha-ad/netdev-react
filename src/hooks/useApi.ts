import { useState, useEffect, useCallback } from 'react';
import { api, getCsrfToken } from '../api';

interface UseApiOptions<T> {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  headers?: Record<string, string>;
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (params?: any) => Promise<void>;
  reset: () => void;
}

export function useApi<T>(options: UseApiOptions<T>): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (params?: any) => {
    setLoading(true);
    setError(null);

    try {
      // Get CSRF token for non-GET requests
      if (options.method && options.method !== 'GET') {
        await api.get('/sanctum/csrf-cookie');
        const csrfToken = await getCsrfToken();
        
        if (!options.headers) {
          options.headers = {};
        }
        options.headers['X-XSRF-TOKEN'] = csrfToken || '';
        options.headers['Accept'] = 'application/json';
      }

      let response;
      const requestData = params || options.data;

      switch (options.method || 'GET') {
        case 'GET':
          response = await api.get(options.url, { params: requestData });
          break;
        case 'POST':
          response = await api.post(options.url, requestData, { headers: options.headers });
          break;
        case 'PUT':
          response = await api.put(options.url, requestData, { headers: options.headers });
          break;
        case 'DELETE':
          response = await api.delete(options.url, { headers: options.headers });
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${options.method}`);
      }

      const responseData = response.data.data || response.data;
      setData(responseData);
      options.onSuccess?.(responseData);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'An error occurred';
      setError(errorMessage);
      options.onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [options.url, options.method, options.data, options.headers, options.onSuccess, options.onError]);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    if (options.immediate !== false) {
      execute();
    }
  }, [execute, options.immediate]);

  return { data, loading, error, execute, reset };
} 