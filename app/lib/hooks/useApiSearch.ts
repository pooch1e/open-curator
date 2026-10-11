/**
 * useApiSearch — fetches merged museum search results through /api/search,
 * tracking loading/error state and discarding superseded requests.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MuseumSource, SearchResponse } from '@/app/lib/types';

interface ApiSearchState {
  isLoading: boolean;
  isError: boolean;
  failedSources: MuseumSource[];
}

const IDLE_STATE: ApiSearchState = {
  isLoading: false,
  isError: false,
  failedSources: [],
};

export function useApiSearch() {
  const [state, setState] = useState<ApiSearchState>(IDLE_STATE);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const search = useCallback(
    async (query: string): Promise<SearchResponse | null> => {
      if (!query.trim()) return null;

      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setState({ ...IDLE_STATE, isLoading: true });

      try {
        const res = await fetch(
          `/api/search?${new URLSearchParams({ q: query })}`,
          { signal: controller.signal }
        );
        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.error ?? `Request failed: ${res.status}`);
        }
        if (!Array.isArray(body.results)) {
          throw new Error('Invalid response: expected results array');
        }

        const response = body as SearchResponse;
        setState({ ...IDLE_STATE, failedSources: response.failedSources });
        return response;
      } catch (err) {
        if (controller.signal.aborted) return null;
        console.error('Museum search failed', err);
        setState({ ...IDLE_STATE, isError: true });
        return null;
      }
    },
    []
  );

  const reset = useCallback(() => {
    controllerRef.current?.abort();
    setState(IDLE_STATE);
  }, []);

  return { ...state, search, reset };
}
