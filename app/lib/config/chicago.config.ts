/**
 * Search presets offered in the preset dropdown, each mapped to a Chicago
 * Art Institute search term.
 */

export interface ChicagoPreset {
  id: string;
  label: string;
  searchTerm: string;
}

export const CHICAGO_API_PRESETS: ChicagoPreset[] = [
  { id: 'contemporary', label: 'Contemporary', searchTerm: 'contemporary' },
  { id: 'photography', label: 'Photography', searchTerm: 'photograph' },
  { id: 'painting', label: 'Paintings', searchTerm: 'painting' },
  { id: 'drawings', label: 'Drawings', searchTerm: 'drawing' },
  { id: 'sculpture', label: 'Sculpture', searchTerm: 'sculpture' },
];
