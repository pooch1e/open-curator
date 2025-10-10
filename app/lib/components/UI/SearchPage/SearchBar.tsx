interface searchBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onButtonClick: () => void;
  isLoading: boolean;
}

export default function SearchBar({
  onSearch,
  searchQuery,
  onButtonClick,
  isLoading = false,
}: searchBarProps) {
  const searchId = 'museum-search';
  const descriptionId = 'search-description';

  return (
    <div className="w-full max-w-xlg min-w-[200px]">
      <label htmlFor={searchId} className="sr-only">
        Search museum collections
      </label>
      <div className="relative" role="search">
        <input
          id={searchId}
          type="text"
          className="w-full h-36 bg-transparent font-serif placeholder:text-6xl placeholder:text-white text-white text-6xl border border-red-700 rounded-md pl-3 pr-28 py-4 transition duration-300 ease focus:outline-none focus:border-white hover:border-white shadow-sm focus:shadow "
          value={searchQuery}
          onChange={(e) => {
            onSearch(e.target.value);
          }}
          placeholder="Search our collections"
          aria-describedby={descriptionId}
          aria-label="Search museum collections by title, artist, or medium"
        />
        <div id={descriptionId} className="sr-only">
          Type your search terms and press the search button to find artworks
        </div>
        <button
          onClick={onButtonClick}
          disabled={isLoading}
          className="absolute h-34 top-1 right-1 flex items-center justify-center rounded w-1/6 py-3 px-3 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          aria-label={
            isLoading ? 'Searching collections' : 'Search collections'
          }>
          {isLoading ? (
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs">Searching...</span>
            </div>
          ) : (
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21L16.65 16.65" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
