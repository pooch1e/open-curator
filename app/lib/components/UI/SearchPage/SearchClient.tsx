'use client';
import { useState, useEffect, useMemo } from 'react';
import SearchBar from './SearchBar';
import SearchGridContainer from './SearchGridContainer';
import ClearAllFavouritesButton from '../ClearAllFavouritesButton';
import {
  CHICAGO_API_PRESET,
  ChicagoPreset,
} from '@/app/lib/config/chicago.config';
import DropDown from '../PresetSelector/DropDown';
interface Image {
  alttext: string | null;
  baseimageurl: string;
  copyright: string | null;
  date: string | null;
  description: string | null;
  displayorder: number;
  format: string | null;
  height: number | null;
  idsid: number | null;
  iiifbaseuri: string | null;
  imageid: number;
  publiccaption: string | null;
  renditionnumber: string | null;
  technique: string | null;
  width: number | null;
}
interface MuseumItem {
  id: number;
  title: string | null;
  artist: string | null;
  date: string | null;
  culture: string | null;
  medium: string | null;
  department: string | null;
  primaryimageurl: string | null;
  additionalImages: string[];
  isPublicDomain: boolean | null;
  objectURL: string | null;
  dimensions: string | null;
  images: Image[];
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
  const [selectedPreset, setSelectedPreset] = useState<ChicagoPreset | null>(
    null
  );
  const [availablePresets, setAvailablePresets] =
    useState<ChicagoPreset[]>(CHICAGO_API_PRESET);

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

  // handle search preset
  useEffect(() => {
    if (!selectedPreset) return;

    const executePresetSearch = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        // Build query based on preset
        const query = selectedPreset.searchTerm;
        setSearchQuery(query); // Update search bar to show what's being searched

        const res = await fetch(
          `/api/cache/?q=${encodeURIComponent(
            query
          )}&limit=50&service=chicago`
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
          throw new Error('Invalid response format - expected results to be an array');
        }

        const filtered = results.filter(
          (item: MuseumItem | null): item is MuseumItem => item !== null
        );

        setMuseumData(filtered);
        setIsApiSearch(true);
      } catch (err) {
        console.error('Preset search error:', err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    executePresetSearch();
  }, [selectedPreset]);

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
      const res = await fetch(
        `/api/cache/?q=${encodeURIComponent(
          searchQuery
        )}&limit=50&service=chicago`
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API request failed: ${res.status} - ${errorText}`);
      }

      const { results } = await res.json();

      // Check if response is an error object
      if (results.error) {
        throw new Error(results.error);
      }

      // Check if data is an array
      if (!Array.isArray(results)) {
        throw new Error('Invalid response format - expected array');
      }
      const filtered = results.filter(
        (item: MuseumItem | null): item is MuseumItem => item !== null
      );

      setMuseumData(filtered);
      setIsApiSearch(true);
      console.log(results, 'results from search button api request');
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div role="status" aria-live="polite" aria-label="Loading search results">
        <span className="sr-only">Loading museum collections...</span>
        Loading...
      </div>
    );
  if (isError)
    return (
      <div role="alert" aria-live="assertive" className="text-red-400">
        <span className="sr-only">Error occurred</span>
        Error loading museum data. Please try again.
      </div>
    );

  return (
    <main>
      <div className="flex justify-center p-2">
        <SearchBar
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onButtonClick={handleClick}
          isLoading={isLoading}
        />
      </div>
      <div className="flex justify-between">
        <div className="p-2">
          <ClearAllFavouritesButton />
        </div>
        <div className="p-2">
          <DropDown presets={availablePresets} onSelectPreset={setSelectedPreset} />
        </div>
      </div>
      <div aria-live="polite" aria-label="Search results" className="sr-only">
        {filterResults.length > 0
          ? `Found ${filterResults.length} artworks${
              searchQuery ? ` matching "${searchQuery}"` : ''
            }`
          : searchQuery
          ? `No artworks found matching "${searchQuery}"`
          : ''}
      </div>
      <SearchGridContainer results={filterResults} />
    </main>
  );
}
