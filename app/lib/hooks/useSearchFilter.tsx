import { useMemo } from 'react';
import { MuseumItem } from '../config/types';

export function useSearchFilter(data: MuseumItem[], query: string) {
  return useMemo(() => {
    if (!query.trim) return data;

    return data.filter((item) => {
      const searchLower = query.toLowerCase();

      // Search in title
      if (item.title && item.title.toLowerCase().includes(searchLower)) {
        return true;
      }

      // Search in artist
      if (item.artist && item.artist.toLowerCase().includes(searchLower)) {
        return true;
      }

      //Search in Medium
      if (item.medium && item.medium.toLowerCase().includes(searchLower)) {
        return true;
      }

      return false;
    });
  }, [data, query]);
}
