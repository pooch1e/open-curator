import { processInBatches } from '../utils/processBatches';
import { delay } from '../utils/delay';

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
  private lastRequestTime: number = 0;
  private requestCount: number = 0;
  private static readonly MIN_REQUEST_INTERVAL = 1000; // 1 second between requests

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.rateLimitDelay = 1000; // Increased to 1 second
    this.conCurrentRequests = 2; // Reduced to 2 concurrent requests
  }

  private async respectRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < MetMuseumService.MIN_REQUEST_INTERVAL) {
      const waitTime =
        MetMuseumService.MIN_REQUEST_INTERVAL - timeSinceLastRequest;
      console.log(`Rate limiting: waiting ${waitTime}ms`);
      await delay(waitTime);
    }

    this.lastRequestTime = Date.now();
    this.requestCount++;
  }

  private getRandomUserAgent() {
    const userAgents = [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ];
    return userAgents[Math.floor(Math.random() * userAgents.length)];
  }

  private async makeRequest(url: string, options: RequestInit = {}) {
    await this.respectRateLimit();

    const defaultOptions: RequestInit = {
      headers: {
        'User-Agent': this.getRandomUserAgent(),
        Accept:
          'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        DNT: '1',
        Connection: 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0',
        ...options.headers,
      },
      ...options,
    };

    let retries = 3;
    while (retries > 0) {
      try {
        console.log(`Making request to: ${url} (attempt ${4 - retries})`);
        const response = await fetch(url, defaultOptions);

        if (response.status === 403) {
          console.warn(
            `403 Forbidden - waiting before retry. Attempts left: ${
              retries - 1
            }`
          );
          if (retries > 1) {
            await delay(Math.pow(2, 4 - retries) * 1000); // Exponential backoff
            retries--;
            continue;
          }
        }

        if (response.status === 429) {
          console.warn(
            `429 Rate Limited - waiting before retry. Attempts left: ${
              retries - 1
            }`
          );
          if (retries > 1) {
            await delay(5000); // Wait 5 seconds for rate limit
            retries--;
            continue;
          }
        }

        return response;
      } catch (error) {
        console.error(`Request failed:`, error);
        if (retries > 1) {
          await delay(1000 * (4 - retries));
          retries--;
        } else {
          throw error;
        }
      }
    }

    throw new Error('Max retries exceeded');
  }

  async getInitialObjectsWithImages(
    searchQuery = 'art',
    limit = 200
  ): Promise<MuseumObject[]> {
    try {
      const searchParams = new URLSearchParams({
        hasImages: 'true',
        q: searchQuery || 'art',
      });

      const searchUrl = this.baseUrl + '/search?' + searchParams;
      console.log(`fetching from ${searchUrl}`);

      const response = await this.makeRequest(searchUrl, {
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

      // Very conservative batching to avoid 403 errors
      const objects = await processInBatches(objectIds, 5, 2000, (id) => {
        return this.getObjectsById(id);
      });

      const filtered = objects.filter(
        (obj): obj is MuseumObject => obj !== null
      );

      return filtered;
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  }

  async getObjectsById(objectId: number) {
    try {
      const response = await this.makeRequest(
        `${this.baseUrl}/objects/${objectId}`,
        {
          next: { revalidate: 86400 }, // Cache individual objects for 24 hours
        }
      );

      if (!response.ok) {
        console.warn(
          `Failed to fetch object ${objectId}: ${response.status} ${response.statusText}`
        );
        return null;
      }

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
      console.warn(`Error fetching object ${objectId}:`, err);
      return null;
    }
  }

  async getObjectsByName(searchQuery: string, limit = 50) {
    try {
      const searchParams = new URLSearchParams({
        hasImages: 'true',
        q: searchQuery,
      });
      const searchUrl = `${this.baseUrl}/search?${searchParams}`;
      console.log(`Searching for: ${searchQuery} at ${searchUrl}`);

      // Cache for an hour with robust request handling
      const response = await this.makeRequest(searchUrl, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Met Museum search failed: ${response.status} ${response.statusText}`,
          errorText
        );
        throw new Error(
          `Met Museum API error: ${response.status} ${response.statusText}`
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
      console.log(`Search response for "${searchQuery}":`, {
        total: data.total || 0,
        objectIDs_length: data.objectIDs?.length || 0,
      });

      if (!data || !data.objectIDs || data.objectIDs.length === 0) {
        console.log(`No objects found for query: ${searchQuery}`);
        return [];
      }

      const objectIds = data.objectIDs.slice(0, limit);
      console.log(`Fetching details for ${objectIds.length} objects`);

      // Use very conservative batches and delays to avoid 403 errors
      const objects = await processInBatches(objectIds, 3, 3000, (id) => {
        return this.getObjectsById(id);
      });

      const filtered = objects.filter(Boolean);
      console.log(`Returning ${filtered.length} objects with images`);

      return filtered;
    } catch (err: any) {
      console.error('getObjectsByName error:', err.message);
      throw new Error(`Failed to search museum: ${err.message}`);
    }
  }
}
