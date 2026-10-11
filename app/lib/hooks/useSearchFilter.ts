/**
 * useSearchFilter — client-side filter of museum items by title, artist,
 * medium, or culture.
 */
import { useMemo } from 'react';
import type { MuseumItem } from '@/app/lib/types';

const SEARCHABLE_FIELDS = ['title', 'artist', 'medium', 'culture'] as const;

export function useSearchFilter(data: MuseumItem[], query: string) {
  return useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return data;

    return data.filter((item) =>
      SEARCHABLE_FIELDS.some((field) =>
        item[field]?.toLowerCase().includes(needle)
      )
    );
  }, [data, query]);
}
