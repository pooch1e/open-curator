/**
 * Helpers for working with normalised MuseumItems — identity across museums,
 * display fallbacks, image selection, and the shared metadata field list.
 */
import type { MuseumItem, MuseumSource } from '@/app/lib/types';

export const UNTITLED = 'Untitled';

export const SOURCE_LABELS: Record<MuseumSource, string> = {
  harvard: 'Harvard Art Museums',
  chicago: 'Art Institute of Chicago',
};

export const SOURCE_SHORT_LABELS: Record<MuseumSource, string> = {
  harvard: 'Harvard',
  chicago: 'Chicago',
};

const DETAIL_FIELDS = [
  { key: 'artist', label: 'Artist' },
  { key: 'date', label: 'Date' },
  { key: 'culture', label: 'Culture' },
  { key: 'period', label: 'Period' },
  { key: 'medium', label: 'Medium' },
  { key: 'dimensions', label: 'Dimensions' },
  { key: 'department', label: 'Department' },
] as const;

export type DetailKey = (typeof DETAIL_FIELDS)[number]['key'];

export interface ArtworkDetail {
  key: DetailKey;
  label: string;
  value: string;
}

/**
 * Museum ids are only unique within a single museum, so identity must
 * include the source to avoid Harvard and Chicago items colliding.
 */
export function getItemKey(item: Pick<MuseumItem, 'source' | 'id'>): string {
  return `${item.source}:${item.id}`;
}

export function getDisplayTitle(item: MuseumItem): string {
  return item.title || UNTITLED;
}

export function getImageUrl(item: MuseumItem): string | null {
  return item.primaryimageurl || item.images[0]?.baseimageurl || null;
}

export function describeArtwork(item: MuseumItem): string {
  return item.artist
    ? `${getDisplayTitle(item)} by ${item.artist}`
    : getDisplayTitle(item);
}

export function getArtworkDetails(
  item: MuseumItem,
  keys: readonly DetailKey[] = DETAIL_FIELDS.map((field) => field.key)
): ArtworkDetail[] {
  return DETAIL_FIELDS.filter(
    (field) => keys.includes(field.key) && item[field.key]
  ).map((field) => ({ ...field, value: item[field.key] as string }));
}
