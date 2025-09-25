import { processInBatches } from '../utils/processBatches';

interface MuseumObject {
  id: number;
  title: string;
  artist: string;
  date: string;
  culture: string;
  medium: string;
  department: string;
  primaryImage: string;
  primaryImageSmall: string;
  additionalImages: string[];
  isPublicDomain: boolean;
  objectURL: string;
  dimensions: string;
}
export class MetMuseumService {
  baseUrl: string;

  private rateLimitDelay: number;
  private conCurrentRequests: number;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.rateLimitDelay = 100;
    this.conCurrentRequests = 5; //increased these while in development to stop fast refresh funny business
  }

  async getInitialObjectsWithImages(
    searchQuery = 'art',
    limit = 200
  ): Promise<MuseumObject> {
    try {
      const searchParams = new URLSearchParams({
        hasImages: 'true',
        q: searchQuery || 'art',
      });

      const searchUrl = this.baseUrl + '/search?' + searchParams;
      console.log(`fetching from ${searchUrl}`);

      const response = await fetch(searchUrl, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Search request failed: ${response.status} ${response.statusText}`,
          errorText
        );
        throw new Error(
          `Request failed: ${response.status} ${response.statusText}`
        );
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.error(
          'Expected JSON but received:',
          contentType,
          responseText.substring(0, 200)
        );
        throw new Error(`Expected JSON response but received ${contentType}`);
      }

      const data = await response.json();

      if (!data || !data.objectIDs || data.objectIDs.length === 0) {
        throw new Error('no objects found');
      }

      const objectIds = data.objectIDs.slice(0, limit);

      const objects = await processInBatches(objectIds, 20, 300, (id) => {
        return this.getObjectsById(id);
      });

      const filtered = objects.filter(Boolean);

      return filtered;
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  }

  async getObjectsById(objectId: number) {
    try {
      const response = await fetch(`${this.baseUrl}/objects/${objectId}`);
      const data = await response.json();
      if (data.primaryImage && data.primaryImage.length > 0) {
        return {
          id: data.objectID,
          title: data.title || 'Untitled',
          artist: data.artistDisplayName || 'Unknown Artist',
          date: data.objectDate || '',
          culture: data.culture || '',
          medium: data.medium || '',
          department: data.department || '',
          primaryImage: data.primaryImage,
          primaryImageSmall: data.primaryImageSmall,
          additionalImages: data.additionalImages || [],
          isPublicDomain: data.isPublicDomain,
          objectURL: data.objectsURL,
          dimensions: data.dimensions || '',
        };
      }

      return null;
    } catch (err) {
      return null;
    }
  }
}
