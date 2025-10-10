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
          type="search"
          className="w-full bg-transparent placeholder:text-white text-white text-sm border border-red-700 rounded-md pl-3 pr-28 py-4 transition duration-300 ease focus:outline-none focus:border-white hover:border-white shadow-sm focus:shadow "
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
          className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-3 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          aria-label={isLoading ? 'Searching collections' : 'Search collections'}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  );
}
