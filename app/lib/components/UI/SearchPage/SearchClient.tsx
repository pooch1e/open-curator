'use client';
import { useState, useEffect, useMemo } from 'react';
import SearchBar from './SearchBar';
import SearchGridContainer from './SearchGridContainer';

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
  additionalImages: string | [];
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
  const [searchRequest, setSearchRequest] = useState<string>('');
  const [isApiSearch, setIsApiSearch] = useState<Boolean>(false);

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

    try {
      const apiResults = await onApiSearch(searchQuery);
      setMuseumData(apiResults);
      console.log(apiResults.length || null);
    } catch (err) {
      setIsError(true);
      setIsApiSearch(false);
    } finally {
      setIsLoading(false)
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
        />
      </div>
      <SearchGridContainer results={filterResults} />
    </>
  );
}
