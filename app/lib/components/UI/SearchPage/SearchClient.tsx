'use client';
import { useState, useEffect, useMemo } from 'react';
import SearchBar from './SearchBar';
import SearchGridContainer from './SearchGridContainer';

interface MuseumItem {
  id: number;
  type: string;
  title: string;
}

interface SearchClientProps {
  data: MuseumItem[];
}

export default function SearchClient({ data }: SearchClientProps) {
  const [museumData, setMuseumData] = useState<MuseumItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

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

  console.log(museumData, 'data in client side');

  const filterResults = useMemo(() => {
    if (!searchQuery.trim()) return museumData;

    return museumData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      // Add other searchable fields as needed
    );
  }, [museumData, searchQuery]);

  // handle search bar stuff here?
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading museum data</div>;

  return (
    <>
      <div className="flex justify-center p-2">
        <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
      </div>
      <SearchGridContainer results={filterResults} />
    </>
  );
}
