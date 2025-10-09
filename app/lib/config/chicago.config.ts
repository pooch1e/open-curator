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
    id: 'recent-acquisitions',
    label: 'Recent Acquisitions',
    sortField: 'date',
    description: 'Browse recently acquired artworks',
    searchTerm: 'contemporary',
    category: 'content',
  },
  {
    id: 'photography',
    label: 'Photography',
    sortField: 'medium',
    description: 'Browse photography collections',
    searchTerm: 'photograph',
    category: 'medium',
  },
  {
    id: 'painting',
    label: 'Paintings',
    sortField: 'medium',
    description: 'Browse painting collections',
    searchTerm: 'painting',
    category: 'medium',
  },
  {
    id: 'drawings',
    label: 'Drawings',
    sortField: 'medium',
    description: 'Browse drawings and sketches',
    searchTerm: 'drawing',
    category: 'medium',
  },
  {
    id: 'sculpture',
    label: 'Sculpture',
    sortField: 'medium',
    description: 'Browse sculptures',
    searchTerm: 'sculpture',
    category: 'medium',
  },
];
