/**
 * ChicagoMuseumService — searches the Art Institute of Chicago API and maps
 * artworks that have an image into normalised MuseumItems.
 */
import type { MuseumItem } from '@/app/lib/types';

interface ChicagoArtwork {
  id: number;
  title?: string | null;
  artist_display?: string | null;
  date_display?: string | null;
  image_id?: string | null;
  thumbnail?: {
    alt_text?: string | null;
    width?: number;
    height?: number;
  } | null;
  medium_display?: string | null;
  department_title?: string | null;
  dimensions?: string | null;
  is_public_domain?: boolean | null;
}

interface ChicagoSearchResponse {
  data?: ChicagoArtwork[];
}

const IIIF_BASE_URL = 'https://www.artic.edu/iiif/2';
const ARTWORK_PAGE_URL = 'https://www.artic.edu/artworks';
const SEARCH_FIELDS = [
  'id',
  'title',
  'artist_display',
  'date_display',
  'image_id',
  'thumbnail',
  'medium_display',
  'department_title',
  'dimensions',
  'is_public_domain',
].join(',');

export class ChicagoMuseumService {
  constructor(private readonly baseUrl: string) {}

  async searchObjects(query: string, limit = 50): Promise<MuseumItem[]> {
    const params = new URLSearchParams({
      q: query,
      size: String(limit),
      fields: SEARCH_FIELDS,
    });

    const response = await fetch(`${this.baseUrl}/artworks/search?${params}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(
        `Chicago request failed: ${response.status} ${response.statusText}`
      );
    }

    const data: ChicagoSearchResponse = await response.json();

    return (data.data ?? [])
      .filter((artwork) => !!artwork.image_id)
      .map((artwork) => this.toMuseumItem(artwork));
  }

  private getImageUrl(imageId: string, width = 400): string {
    return `${IIIF_BASE_URL}/${imageId}/full/${width},/0/default.jpg`;
  }

  private toMuseumItem(artwork: ChicagoArtwork): MuseumItem {
    const imageUrl = artwork.image_id
      ? this.getImageUrl(artwork.image_id)
      : null;

    return {
      id: artwork.id,
      source: 'chicago',
      title: artwork.title || null,
      artist: artwork.artist_display || null,
      date: artwork.date_display || null,
      culture: null,
      medium: artwork.medium_display || null,
      period: null,
      department: artwork.department_title || null,
      primaryimageurl: imageUrl,
      isPublicDomain: artwork.is_public_domain ?? null,
      objectURL: `${ARTWORK_PAGE_URL}/${artwork.id}`,
      dimensions: artwork.dimensions || null,
      images: imageUrl
        ? [
            {
              baseimageurl: imageUrl,
              iiifbaseuri: `${IIIF_BASE_URL}/${artwork.image_id}`,
              alttext: artwork.thumbnail?.alt_text ?? null,
              width: artwork.thumbnail?.width ?? null,
              height: artwork.thumbnail?.height ?? null,
            },
          ]
        : [],
    };
  }
}
