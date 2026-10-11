/**
 * SearchClient — interactive search page. While the initial Harvard selection
 * is shown, typing filters it; submitting (or choosing a preset) searches
 * every museum, and clearing the box returns to the initial selection.
 */
'use client';
import { useState } from 'react';
import SearchBar from './SearchBar';
import SearchGridContainer from './SearchGridContainer';
import DropDown from '../PresetSelector/DropDown';
import {
  SEARCH_PRESETS,
  type SearchPreset,
} from '@/app/lib/config/searchPresets';
import type { MuseumItem } from '@/app/lib/types';
import { useApiSearch } from '@/app/lib/hooks/useApiSearch';
import { useSearchFilter } from '@/app/lib/hooks/useSearchFilter';
import { SOURCE_LABELS } from '@/app/lib/utils/museumItem';

interface SearchClientProps {
  initialData: MuseumItem[];
  initialLoadFailed?: boolean;
}

interface SubmittedSearch {
  query: string;
  presetId: string | null;
  results: MuseumItem[];
}

export default function SearchClient({
  initialData,
  initialLoadFailed = false,
}: SearchClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [submitted, setSubmitted] = useState<SubmittedSearch | null>(null);
  const apiSearch = useApiSearch();

  const museumData = submitted?.results ?? initialData;
  const filteredResults = useSearchFilter(
    museumData,
    submitted ? '' : searchQuery
  );

  const runApiSearch = async (query: string, presetId: string | null) => {
    const response = await apiSearch.search(query);
    if (!response) return;
    setSearchQuery(query);
    setSubmitted({ query, presetId, results: response.results });
  };

  const handleQueryChange = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      apiSearch.reset();
      setSubmitted(null);
    }
  };

  const handleSubmit = () => {
    const query = searchQuery.trim();
    if (query && query !== submitted?.query) runApiSearch(query, null);
  };

  const handleSelectPreset = (preset: SearchPreset) => {
    runApiSearch(preset.searchTerm, preset.id);
  };

  const showInitialLoadError =
    initialLoadFailed && !submitted && !apiSearch.isLoading;
  const isEditingSubmittedQuery =
    submitted !== null && searchQuery.trim() !== submitted.query;

  return (
    <div>
      <h1 className="sr-only">Search museum collections</h1>
      <div className="flex justify-center p-2 mt-8">
        <SearchBar
          value={searchQuery}
          onChange={handleQueryChange}
          onSubmit={handleSubmit}
          isLoading={apiSearch.isLoading}
          label="Search museum collections"
          placeholder="Search Art"
          description="Typing filters the artworks shown. Press Enter or the search button to search every museum."
        />
      </div>
      <div className="flex justify-end px-6 py-2">
        <DropDown
          presets={SEARCH_PRESETS}
          activePresetId={submitted?.presetId ?? null}
          onSelectPreset={handleSelectPreset}
        />
      </div>

      {(apiSearch.isError || showInitialLoadError) && (
        <p role="alert" className="text-red-400 text-center p-4">
          Error loading museum data. Please try again.
        </p>
      )}

      {apiSearch.failedSources.length > 0 && (
        <p role="status" className="text-gray-300 text-center p-2 text-sm">
          Results from{' '}
          {apiSearch.failedSources
            .map((source) => SOURCE_LABELS[source])
            .join(' and ')}{' '}
          are unavailable right now.
        </p>
      )}

      {isEditingSubmittedQuery && !apiSearch.isLoading && (
        <p className="text-gray-300 text-center p-2 text-sm">
          Showing results for &ldquo;{submitted.query}&rdquo; — press Enter to
          search for &ldquo;{searchQuery.trim()}&rdquo;.
        </p>
      )}

      {apiSearch.isLoading ? (
        <div
          role="status"
          className="flex flex-col justify-center items-center p-8">
          <div className="w-10 h-10 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-300 text-sm">Loading artworks...</p>
        </div>
      ) : filteredResults.length === 0 ? (
        <div
          role="status"
          className="flex flex-col justify-center items-center p-8 text-gray-300">
          <p className="text-xl mb-2">No artworks found</p>
          {searchQuery && !submitted && (
            <p className="text-sm">
              Press Enter to search every museum for &ldquo;
              {searchQuery.trim()}&rdquo;.
            </p>
          )}
        </div>
      ) : (
        <>
          <p role="status" className="sr-only">
            {submitted
              ? `Found ${filteredResults.length} artworks for "${submitted.query}"`
              : `Showing ${filteredResults.length} artworks`}
          </p>
          <SearchGridContainer results={filteredResults} />
        </>
      )}
    </div>
  );
}
