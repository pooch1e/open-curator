import { ApiSearchState, MuseumItem } from '../config/types';
import { useState, useCallback } from 'react';
export function useApiSearch() {
  const [state, setState] = useState<ApiSearchState>({
    data: [],
    isLoading: false,
    isError: false,
  });

  const searchMuseumItems = useCallback(
    async (query: string, service: string = 'chicago', limit: number = 50) => {
      if (!query.trim()) return null;

      setState((prev) => ({ ...prev, isLoading: true, isError: false }));

      try {
        const res = await fetch(
          `/api/cache/?q=${encodeURIComponent(
            query
          )}&limit=${limit}&service=${service}`
        );

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`API request failed: ${res.status} - ${errorText}`);
        }

        const responseData = await res.json();

        // Check if the response has an error
        if (responseData.error) {
          throw new Error(responseData.error);
        }

        const { results } = responseData;

        if (!Array.isArray(results)) {
          throw new Error(
            'Invalid response format - expected results to be an array'
          );
        }

        const filtered = results.filter(
          (item: MuseumItem | null): item is MuseumItem => item !== null
        );

        setState({
          data: filtered,
          isLoading: false,
          isError: false,
        });

        return filtered;
      } catch (err) {
        setState({
          data: [],
          isLoading: false,
          isError: true,
        });
        return null;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({
      data: [],
      isLoading: false,
      isError: false,
    });
  }, []);

  return {
    data: state.data,
    isLoading: state.isLoading,
    isError: state.isError,
    searchMuseumItems,
    reset,
  };
}
