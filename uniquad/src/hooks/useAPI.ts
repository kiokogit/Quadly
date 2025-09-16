
// src/hooks/useAPI.ts
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { apiClient } from '@/lib/api-client';

interface UseAPIState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAPIOptions {
  immediate?: boolean;
}

export function useAPI<T>(
  endpoint?: string,
  options: UseAPIOptions = { immediate: true }
): UseAPIState<T> & {
  execute: (endpoint?: string) => Promise<void>;
  refetch: () => Promise<void>;
} {
  const { data: session, status } = useSession();
  const [state, setState] = useState<UseAPIState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = async (apiEndpoint?: string) => {
    const targetEndpoint = apiEndpoint || endpoint;
    if (!targetEndpoint) {
      setState(prev => ({ ...prev, error: 'No endpoint provided' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await apiClient.get<T>(targetEndpoint);
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  const refetch = () => execute(endpoint);

  useEffect(() => {
    if (
      options.immediate &&
      endpoint &&
      session?.djangoAccessToken &&
      status === 'authenticated'
    ) {
      execute(endpoint);
    }
  }, [endpoint, session?.djangoAccessToken, status, options.immediate]);

  return {
    ...state,
    execute,
    refetch,
  };
}

// Custom hook for API mutations (POST, PUT, DELETE, etc.)
export function useAPIMutation<TData, TVariables = any>() {
  const [state, setState] = useState<{
    data: TData | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = async (
    endpoint: string,
    variables?: TVariables,
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST'
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      let result: TData;
      
      switch (method) {
        case 'POST':
          result = await apiClient.post<TData>(endpoint, variables);
          break;
        case 'PUT':
          result = await apiClient.put<TData>(endpoint, variables);
          break;
        case 'PATCH':
          result = await apiClient.patch<TData>(endpoint, variables);
          break;
        case 'DELETE':
          result = await apiClient.delete<TData>(endpoint);
          break;
      }

      setState({ data: result, loading: false, error: null });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  };

  return {
    ...state,
    mutate,
    reset: () => setState({ data: null, loading: false, error: null }),
  };
}
