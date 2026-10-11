/**
 * HarvardMuseumService — queries the Harvard Art Museums object API and maps
 * records with a usable image into normalised MuseumItems.
 */
import type { MuseumItem } from '@/app/lib/types';

interface HarvardImage {
  baseimageurl: string;
  iiifbaseuri: string;
  alttext?: string | null;
  height: number;
  width: number;
}

interface HarvardObject {
  id: number;
  title: string;
  people?: Array<{ name: string; role: string; displayname?: string }>;
  dated?: string;
  culture?: string;
  medium?: string;
  period?: string;
  department?: string;
  primaryimageurl?: string;
  images?: HarvardImage[];
  url?: string;
  dimensions?: string;
}

interface HarvardApiResponse {
  records?: HarvardObject[];
}

type HarvardSort = 'rank' | 'random' | 'datebegin';

const IMAGE_WIDTH = 400;
const INVALID_IMAGE_PATTERNS = [
  /placeholder/i,
  /not[_-]?found/i,
  /unavailable/i,
];

export class HarvardMuseumService {
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string
  ) {
    if (!apiKey) {
      throw new Error('HARVARD_MUSEUM_API_KEY is not set');
    }
  }

  async getObjectsWithImages(
    limit = 50,
    sort: HarvardSort = 'rank'
  ): Promise<MuseumItem[]> {
    return this.fetchObjects({ size: String(limit), sort, sortorder: 'asc' });
  }

  /**
   * The keyword parameter searches across title, artist, description,
   * classification, culture, worktype, medium, provenance, and creditline.
   */
  async searchObjects(query: string, limit = 50): Promise<MuseumItem[]> {
    const keyword = query.trim();
    if (!keyword) return [];
    return this.fetchObjects({ keyword, size: String(limit) });
  }

  private async fetchObjects(
    params: Record<string, string>
  ): Promise<MuseumItem[]> {
    const searchParams = new URLSearchParams({
      apikey: this.apiKey,
      hasimage: '1',
      page: '1',
      ...params,
    });

    const response = await fetch(`${this.baseUrl}/object?${searchParams}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(
        `Harvard request failed: ${response.status} ${response.statusText}`
      );
    }

    const data: HarvardApiResponse = await response.json();

    return (data.records ?? [])
      .map((record) => this.toMuseumItem(record))
      .filter((item): item is MuseumItem => item !== null);
  }

  private isValidImageUrl(url: string | undefined): url is string {
    return (
      !!url?.trim() &&
      !INVALID_IMAGE_PATTERNS.some((pattern) => pattern.test(url))
    );
  }

  private resizeImageUrl(url: string): string {
    return url.replace('/full/full/0/', `/full/${IMAGE_WIDTH},/0/`);
  }

  private toMuseumItem(record: HarvardObject): MuseumItem | null {
    const primaryImageUrl = this.isValidImageUrl(record.primaryimageurl)
      ? record.primaryimageurl
      : record.images?.find((img) => this.isValidImageUrl(img.baseimageurl))
          ?.baseimageurl;

    if (!primaryImageUrl) return null;

    const artist = record.people?.[0];

    return {
      id: record.id,
      source: 'harvard',
      title: record.title || null,
      artist: artist?.displayname || artist?.name || null,
      date: record.dated || null,
      culture: record.culture || null,
      medium: record.medium || null,
      period: record.period || null,
      department: record.department || null,
      primaryimageurl: this.resizeImageUrl(primaryImageUrl),
      isPublicDomain: null,
      objectURL: record.url || null,
      dimensions: record.dimensions || null,
      images: (record.images ?? []).map((img) => ({
        baseimageurl: this.resizeImageUrl(img.baseimageurl),
        iiifbaseuri: img.iiifbaseuri,
        alttext: img.alttext ?? null,
        width: img.width,
        height: img.height,
      })),
    };
  }
}
