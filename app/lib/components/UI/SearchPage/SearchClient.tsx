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
import type { MuseumItem, SearchClientProps } from '../../../config/types';
import { Riple } from 'react-loading-indicators';
import { useApiSearch } from '@/app/lib/hooks/useApiSearch';
import { useSearchFilter } from '@/app/lib/hooks/useSearchFilter';

export default function SearchClient({ data }: SearchClientProps) {
  const [museumData, setMuseumData] = useState<MuseumItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isApiSearch, setIsApiSearch] = useState<boolean>(false);

  const apiSearch = useApiSearch();
  const filteredResults = useSearchFilter(
    museumData,
    isApiSearch ? '' : searchQuery
  );

  const [selectedPreset, setSelectedPreset] = useState<ChicagoPreset | null>(
    null
  );
  const [availablePresets, setAvailablePresets] =
    useState<ChicagoPreset[]>(CHICAGO_API_PRESET);

  useEffect(() => {
    setMuseumData(data);
  }, [data]);

  // handle preset search

  useEffect(() => {
    if (!selectedPreset) return;

    const executePresetSearch = async () => {
      setSearchQuery(selectedPreset.searchTerm);

      const results = await apiSearch.searchMuseumItems(
        selectedPreset.searchTerm,
        'chicago',
        50
      );

      if (results) {
        setMuseumData(results);
        setIsApiSearch(true);
      }
    };

    executePresetSearch();
  }, [selectedPreset]);

  // handle search bar stuff here
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsApiSearch(false);
    apiSearch.reset();
  };

  // handle click
  const handleClick = async () => {
    if (!searchQuery.trim()) return;

    const results = await apiSearch.searchMuseumItems(
      searchQuery,
      'chicago',
      50
    );
    if (results) {
      setMuseumData(results);
      setIsApiSearch(true);
      setSearchQuery('');
    }
  };

  return (
    <main>
      <div className="flex justify-center p-2 mt-8">
        <SearchBar
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onButtonClick={handleClick}
          isLoading={apiSearch.isLoading}
        />
      </div>
      <div className="flex justify-between">
        <div className="px-6 py-2">
          <ClearAllFavouritesButton />
        </div>
        <div className="px-6 py-2">
          <DropDown
            presets={availablePresets}
            onSelectPreset={setSelectedPreset}
          />
        </div>
      </div>

      {apiSearch.isError && (
        <div
          role="alert"
          aria-live="assertive"
          className="text-red-400 text-center p-4">
          Error loading museum data. Please try again.
        </div>
      )}

      {apiSearch.isLoading ? (
        <div
          role="status"
          aria-live="polite"
          aria-label="Loading search results"
          className="flex flex-col justify-center items-center p-8">
          <Riple color="#d0d1d0" size="medium" text="" textColor="" />
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm mb-2">Loading artworks...</p>
            <p className="text-gray-500 text-xs">
              Images will appear as they load
            </p>
          </div>
        </div>
      ) : filteredResults.length === 0 ? (
        <div className="flex flex-col justify-center items-center p-8 text-gray-400">
          <p className="text-xl mb-2">No artworks found</p>
          {searchQuery && (
            <p className="text-sm">Try a different search term</p>
          )}
        </div>
      ) : (
        <>
          <div
            aria-live="polite"
            aria-label="Search results"
            className="sr-only">
            {filteredResults.length > 0
              ? `Found ${filteredResults.length} artworks${
                  searchQuery ? ` matching "${searchQuery}"` : ''
                }`
              : searchQuery
              ? `No artworks found matching "${searchQuery}"`
              : ''}
          </div>

          <SearchGridContainer results={filteredResults} />
        </>
      )}
    </main>
  );
}
