/**
 * Shared domain types — the normalised museum item every service maps into.
 */

export type MuseumSource = 'harvard' | 'chicago';

export interface MuseumImage {
  baseimageurl: string;
  iiifbaseuri: string | null;
  alttext: string | null;
  width: number | null;
  height: number | null;
}

export interface MuseumItem {
  id: number;
  source: MuseumSource;
  title: string | null;
  artist: string | null;
  date: string | null;
  culture: string | null;
  medium: string | null;
  period: string | null;
  department: string | null;
  primaryimageurl: string | null;
  isPublicDomain: boolean | null;
  objectURL: string | null;
  dimensions: string | null;
  images: MuseumImage[];
}

export interface SearchResponse {
  results: MuseumItem[];
  failedSources: MuseumSource[];
}
