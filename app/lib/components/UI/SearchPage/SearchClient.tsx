/**
 * SearchClient — interactive search page. Typing filters the artworks on
 * screen; submitting (or choosing a preset) searches the Chicago API, and
 * clearing the box returns to the initial Harvard selection.
 */
'use client';
import { useState } from 'react';
import SearchBar from './SearchBar';
import SearchGridContainer from './SearchGridContainer';
import ClearAllFavouritesButton from '../ClearAllFavouritesButton';
import DropDown from '../PresetSelector/DropDown';
import {
  CHICAGO_API_PRESETS,
  type ChicagoPreset,
} from '@/app/lib/config/chicago.config';
import type { MuseumItem } from '@/app/lib/types';
import { useApiSearch } from '@/app/lib/hooks/useApiSearch';
import { useSearchFilter } from '@/app/lib/hooks/useSearchFilter';

interface SearchClientProps {
  initialData: MuseumItem[];
  initialLoadFailed?: boolean;
}

export default function SearchClient({
  initialData,
  initialLoadFailed = false,
}: SearchClientProps) {
  const [museumData, setMuseumData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);

  const apiSearch = useApiSearch();
  const isShowingSubmittedResults = submittedQuery === searchQuery;
  const filteredResults = useSearchFilter(
    museumData,
    isShowingSubmittedResults ? '' : searchQuery
  );

  const runApiSearch = async (query: string) => {
    setSearchQuery(query);
    const results = await apiSearch.search(query);
    if (results) {
      setMuseumData(results);
      setSubmittedQuery(query);
    }
  };

  const handleQueryChange = (query: string) => {
    setSearchQuery(query);
    apiSearch.reset();
    if (!query.trim()) {
      setMuseumData(initialData);
      setSubmittedQuery(null);
    }
  };

  const handleSubmit = () => {
    if (searchQuery.trim()) runApiSearch(searchQuery);
  };

  const handleSelectPreset = (preset: ChicagoPreset) => {
    runApiSearch(preset.searchTerm);
  };

  const showInitialLoadError =
    initialLoadFailed && submittedQuery === null && !apiSearch.isLoading;

  return (
    <div>
      <h1 className="sr-only">Search museum collections</h1>
      <div className="flex justify-center p-2 mt-8">
        <SearchBar
          searchQuery={searchQuery}
          onQueryChange={handleQueryChange}
          onSubmit={handleSubmit}
          isLoading={apiSearch.isLoading}
        />
      </div>
      <div className="flex justify-between">
        <div className="px-6 py-2">
          <ClearAllFavouritesButton />
        </div>
        <div className="px-6 py-2">
          <DropDown
            presets={CHICAGO_API_PRESETS}
            onSelectPreset={handleSelectPreset}
          />
        </div>
      </div>

      {(apiSearch.isError || showInitialLoadError) && (
        <div role="alert" className="text-red-400 text-center p-4">
          Error loading museum data. Please try again.
        </div>
      )}

      {apiSearch.isLoading ? (
        <div
          role="status"
          className="flex flex-col justify-center items-center p-8">
          <div className="w-10 h-10 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-400 text-sm">Loading artworks...</p>
        </div>
      ) : filteredResults.length === 0 ? (
        <div
          role="status"
          className="flex flex-col justify-center items-center p-8 text-gray-400">
          <p className="text-xl mb-2">No artworks found</p>
          {searchQuery && (
            <p className="text-sm">
              Try a different search term, or press Enter to search the
              collection
            </p>
          )}
        </div>
      ) : (
        <>
          <div role="status" className="sr-only">
            {`Found ${filteredResults.length} artworks${
              searchQuery ? ` matching "${searchQuery}"` : ''
            }`}
          </div>
          <SearchGridContainer results={filteredResults} />
        </>
      )}
    </div>
  );
}
