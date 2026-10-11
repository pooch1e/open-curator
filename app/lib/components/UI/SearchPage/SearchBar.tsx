/**
 * SearchBar — the large serif search input shared by the search and
 * collection pages, with an optional submit button and loading state.
 */
'use client';
import { useId } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  label: string;
  placeholder: string;
  description?: string;
  onSubmit?: () => void;
  isLoading?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  label,
  placeholder,
  description,
  onSubmit,
  isLoading = false,
}: SearchBarProps) {
  const inputId = useId();
  const descriptionId = useId();

  return (
    <form
      role="search"
      className="relative w-full min-w-[200px]"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        className={`w-full h-36 bg-transparent font-serif placeholder:text-6xl placeholder:text-white/80 text-white text-6xl border border-red-700 rounded-md pl-3 py-4 transition duration-300 ease focus:border-white hover:border-white shadow-sm focus:shadow ${
          onSubmit ? 'pr-28' : 'pr-3'
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-describedby={description ? descriptionId : undefined}
        autoComplete="off"
      />
      {description && (
        <p id={descriptionId} className="sr-only">
          {description}
        </p>
      )}
      {onSubmit && (
        <button
          type="submit"
          disabled={isLoading}
          className="absolute h-34 top-1 right-1 flex items-center justify-center rounded w-1/6 py-3 px-3 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          aria-label={isLoading ? 'Searching' : 'Search'}>
          {isLoading ? (
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
              aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21L16.65 16.65" />
            </svg>
          )}
        </button>
      )}
    </form>
  );
}
