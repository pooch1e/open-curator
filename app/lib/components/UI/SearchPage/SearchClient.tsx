'use client';
import { useState, useEffect, useMemo } from 'react';
import SearchBar from './SearchBar';
import SearchGridContainer from './SearchGridContainer';
import { MetMuseumService } from '@/app/lib/services/MetMuseumService';
import { config } from '@/config';

interface MuseumItem {
  id: number;
  title: string | null;
  artist: string | null;
  date: string | null;
  culture: string | null;
  medium: string | null;
  department: string | null;
  primaryImage: string | null;
  primaryImageSmall: string | null;
  additionalImages: string[];
  isPublicDomain: boolean | null;
  objectURL: string | null;
  dimensions: string | null;
}

interface SearchClientProps {
  data: MuseumItem[];
  onApiSearch?: (query: string) => Promise<MuseumItem[]>;
}

export default function SearchClient({ data }: SearchClientProps) {
  const [museumData, setMuseumData] = useState<MuseumItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isApiSearch, setIsApiSearch] = useState<boolean>(false);

  // handle use effect stuff here?

  useEffect(() => {
    try {
      setMuseumData(data);

      setIsLoading(false);
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [data]);
  // handle search button click api request

  const filterResults = useMemo(() => {
    if (!searchQuery.trim()) return museumData;

    return museumData.filter((item) => {
      const searchLower = searchQuery.toLowerCase();

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
  }, [museumData, searchQuery, isApiSearch]);

  // handle search bar stuff here?
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsApiSearch(false);
    setIsError(false);
  };

  const handleClick = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const apiSearch = new MetMuseumService(config.metMuseum.baseUrl);
      const results = await apiSearch.getObjectsByName(searchQuery);

      if (!results) throw new Error('failed to fetch api objects');

      const filtered = results.filter(
        (item): item is MuseumItem => item !== null
      );

      setMuseumData(filtered);
      console.log(results, 'results from search button api request');
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading museum data</div>;

  return (
    <>
      <div className="flex justify-center p-2">
        <SearchBar
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onButtonClick={handleClick}
          isLoading={isLoading}
        />
      </div>
      <SearchGridContainer results={filterResults} />
    </>
  );
}
