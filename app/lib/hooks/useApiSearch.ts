/**
 * useApiSearch — fetches museum search results through /api/cache, tracking
 * loading/error state and discarding responses from superseded requests.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MuseumItem, MuseumSource } from '@/app/lib/types';

interface ApiSearchState {
  isLoading: boolean;
  isError: boolean;
}

const IDLE_STATE: ApiSearchState = { isLoading: false, isError: false };

export function useApiSearch() {
  const [state, setState] = useState<ApiSearchState>(IDLE_STATE);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const search = useCallback(
    async (
      query: string,
      service: MuseumSource = 'chicago',
      limit = 50
    ): Promise<MuseumItem[] | null> => {
      if (!query.trim()) return null;

      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setState({ isLoading: true, isError: false });

      try {
        const params = new URLSearchParams({
          q: query,
          service,
          limit: String(limit),
        });
        const res = await fetch(`/api/cache?${params}`, {
          signal: controller.signal,
        });
        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.error ?? `Request failed: ${res.status}`);
        }
        if (!Array.isArray(body.results)) {
          throw new Error('Invalid response: expected results array');
        }

        setState(IDLE_STATE);
        return body.results as MuseumItem[];
      } catch (err) {
        if (controller.signal.aborted) return null;
        console.error('Museum search failed', err);
        setState({ isLoading: false, isError: true });
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
