export interface ChicagoPreset {
  id: string;
  label: string;
  sortField: string;
  description: string | null;
  searchTerm: string;
  category: 'sort' | 'content' | 'department' | 'medium';
}

export const CHICAGO_API_PRESET: ChicagoPreset[] = [
  {
    id: 'by-title',
    label: 'Title',
    sortField: 'title',
    description: 'Browse artworks by title',
    searchTerm: '*',
    category: 'sort',
  },
  {
    id: 'by-artist',
    label: 'Artist',
    sortField: 'artist',
    description: 'Browse artworks by artist',
    searchTerm: '*',
    category: 'sort',
  },
  {
    id: 'photography',
    label: 'Photography',
    sortField: 'photography',
    description: 'Browse photography',
    searchTerm: '*',
    category: 'sort',
  },
  {
    id: 'painting',
    label: 'Painting',
    sortField: 'painting',
    description: 'Browse painting',
    searchTerm: '*',
    category: 'sort',
  },
  {
    id: 'drawings',
    label: 'Drawings',
    sortField: 'Drawings',
    description: 'Browse Drawings',
    searchTerm: '*',
    category: 'sort',
  },
];
