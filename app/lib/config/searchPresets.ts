/**
 * Search presets offered in the preset dropdown, each mapped to a search term
 * sent to every museum.
 */

export interface SearchPreset {
  id: string;
  label: string;
  searchTerm: string;
}

export const SEARCH_PRESETS: SearchPreset[] = [
  { id: 'contemporary', label: 'Contemporary', searchTerm: 'contemporary' },
  { id: 'photography', label: 'Photography', searchTerm: 'photograph' },
  { id: 'painting', label: 'Paintings', searchTerm: 'painting' },
  { id: 'drawings', label: 'Drawings', searchTerm: 'drawing' },
  { id: 'sculpture', label: 'Sculpture', searchTerm: 'sculpture' },
];
