// ===== Core Domain Types =====

/**
 * Represents an image associated with a museum item
 */
export interface MuseumImage {
  alttext: string | null;
  baseimageurl: string;
  copyright: string | null;
  date: string | null;
  description: string | null;
  displayorder: number;
  format: string | null;
  height: number | null;
  idsid: number | null;
  iiifbaseuri: string | null;
  imageid: number;
  publiccaption: string | null;
  renditionnumber: string | null;
  technique: string | null;
  width: number | null;
}

/**
 * Core museum item type - consolidated from Artwork, MuseumItem, and CollectionItem
 *
 */
export interface MuseumItem {
  id: number;
  title: string | null;
  artist: string | null;
  date: string | null;
  culture: string | null;
  medium: string | null;
  department: string | null;
  primaryimageurl: string | null;
  additionalImages: string[];
  isPublicDomain: boolean | null;
  objectURL: string | null;
  dimensions: string | null;
  images: MuseumImage[];
}

/**
 * Alias for backwards compatibility with favourites context
 * @deprecated Use MuseumItem instead
 */
export type Artwork = MuseumItem;

/**
 * Alias for backwards compatibility with collection components
 * @deprecated Use MuseumItem instead
 */
export type CollectionItem = MuseumItem;

// ===== Component Props Types =====

export interface SearchClientProps {
  data: MuseumItem[];
  onApiSearch?: (query: string) => Promise<MuseumItem[]>;
}

/**
 * Props for SearchGridItem - simplified to use single item prop
 */
export interface SearchGridItemProps {
  item: MuseumItem;
  /** Additional fields not in core MuseumItem */
  period?: string;
  description?: string;
}

export interface CollectionItemProps {
  item: MuseumItem;
}

export interface FavouriteButtonProps {
  item: MuseumItem;
}

// ===== Preset/Configuration Types =====

export interface ChicagoPreset {
  id: string;
  label: string;
  sortField: string;
  description: string | null;
  searchTerm: string;
  category: 'sort' | 'content' | 'department' | 'medium';
}

export interface DropDownProps {
  presets: ChicagoPreset[];
  onSelectPreset: (preset: ChicagoPreset) => void;
}

// ===== Context Types =====

export interface FavouritesContextType {
  favourites: MuseumItem[];
  addFavourite: (item: MuseumItem) => void;
  removeFavourite: (id: number) => void;
  clearAllFavourites: () => void;
}

export interface FavouritesProviderProps {
  children: React.ReactNode;
}

// ===== Hook State Types =====

export interface ApiSearchState {
  data: MuseumItem[];
  isLoading: boolean;
  isError: boolean;
}

// ===== Hook Types =====
export interface ApiSearchState {
  data: [];
  isLoading: boolean;
  isError: boolean;
}
