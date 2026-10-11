/**
 * Helpers for working with normalised MuseumItems — identity across museums,
 * display fallbacks, and image selection.
 */
import type { MuseumItem } from '@/app/lib/types';

export const UNTITLED = 'Untitled';

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
