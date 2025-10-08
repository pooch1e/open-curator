interface HarvardObject {
  id: number;
  objectid?: number;
  title: string;
  objectnumber?: string;
  people?: Array<{
    name: string;
    role: string;
    displayname?: string;
  }>;
  dated?: string;
  culture?: string;
  medium?: string;
  department?: string;
  division?: string;
  primaryimageurl?: string;
  images?: Array<{
    baseimageurl: string;
    iiifbaseuri: string;
    height: number;
    width: number;
  }>;
  url?: string;
  dimensions?: string;
  classification?: string;
  period?: string;
  century?: string;
  colors?: Array<{
    color: string;
    percent: number;
    hue: string;
  }>;
}

interface HarvardApiResponse {
  info: {
    totalrecords: number;
    totalrecordsperquery: number;
    pages: number;
    page: number;
    next?: string;
    prev?: string;
  };
  records: HarvardObject[];
}

export class HarvardApiService {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  /**
   * Optimize IIIF image URL for better performance
   * @param imageUrl - Original image URL
   * @param maxWidth - Maximum width for the image (default 400)
   * @param quality - Image quality (default 'default')
   * @returns Optimized image URL
   */
  private optimizeImageUrl(
    imageUrl: string, 
    maxWidth = 400, 
    quality: 'default' | 'gray' | 'bitonal' | 'color' = 'default'
  ): string {
    if (!imageUrl) return imageUrl;
    
    // Check if it's an IIIF URL that can be optimized
    if (imageUrl.includes('nrs.harvard.edu') || imageUrl.includes('hvrd.art')) {
      // Harvard IIIF URL format: .../full/full/0/default.jpg
      // Optimize to: .../full/400,/0/default.jpg (400px wide, maintain aspect ratio)
      if (imageUrl.includes('/full/full/0/')) {
        return imageUrl.replace('/full/full/0/', `/full/${maxWidth},/0/`);
      }
      // If already optimized or different format, return as-is
      return imageUrl;
    }
    
    return imageUrl;
  }

  /**
   * Process Harvard object to optimize image URLs
   */
  private optimizeHarvardObject(obj: HarvardObject): HarvardObject {
    return {
      ...obj,
      primaryimageurl: obj.primaryimageurl ? this.optimizeImageUrl(obj.primaryimageurl, 400) : obj.primaryimageurl,
      images: obj.images?.map(img => ({
        ...img,
        baseimageurl: this.optimizeImageUrl(img.baseimageurl, 400),
        // Keep iiifbaseuri for potential full-size viewing
        iiifbaseuri: img.iiifbaseuri
      }))
    };
  }

  /**
   * Get initial objects with images
   * @param limit - default 50
   * @param sort -
   */
  async getInitialObjectsWithImages(
    limit = 50,
    sort: 'rank' | 'random' | 'datebegin' = 'rank'
  ): Promise<HarvardObject[]> {
    try {
      const params = new URLSearchParams({
        apikey: this.apiKey,
        hasimage: '1',
        size: limit.toString(),
        page: '1',
        sort: sort,
        sortorder: 'asc',
      });

      const url = `${this.baseUrl}/object?${params}`;
      console.log(`Fetching from ${url}`);

      const response = await fetch(url, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Request failed: ${response.status}`, errorText);
        throw new Error(
          `Request failed: ${response.status} ${response.statusText}`
        );
      }

      const data: HarvardApiResponse = await response.json();

      if (!data.records || data.records.length === 0) {
        console.log('No objects found');
        return [];
      }

      console.log(`Found ${data.records.length} objects`);
      return data.records.map(obj => this.optimizeHarvardObject(obj));
    } catch (err) {
      console.error('Error fetching Harvard objects:', err);
      throw err;
    }
  }

  //single id
  async getObjectById(objectId: number): Promise<HarvardObject | null> {
    try {
      const params = new URLSearchParams({
        apikey: this.apiKey,
      });

      const response = await fetch(
        `${this.baseUrl}/object/${objectId}?${params}`,
        { next: { revalidate: 3600 } }
      );

      if (!response.ok) {
        console.error(`Object ${objectId} not found`);
        return null;
      }

      const data: HarvardObject = await response.json();
      return this.optimizeHarvardObject(data);
    } catch (err) {
      console.error(`Error fetching object ${objectId}:`, err);
      return null;
    }
  }

  /**
   * Search objects by keyword
   * The keyword parameter searches across title, artist, description, classification,
   * culture, worktype, medium, provenance, and creditline
   */
  async searchObjects(
    searchQuery: string,
    limit = 50
  ): Promise<HarvardObject[]> {
    try {
      if (!searchQuery || searchQuery.trim().length === 0) {
        console.log('Empty search query');
        return [];
      }

      const params = new URLSearchParams({
        apikey: this.apiKey,
        hasimage: '1',
        keyword: searchQuery.trim(),
        size: limit.toString(),
        page: '1',
      });

      const url = `${this.baseUrl}/object?${params}`;
      console.log(`Searching for: "${searchQuery}" at ${url}`);

      const response = await fetch(url, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data: HarvardApiResponse = await response.json();

      console.log(`Search returned ${data.records?.length || 0} results`);
      return (data.records || []).map(obj => this.optimizeHarvardObject(obj));
    } catch (err) {
      console.error('Search error:', err);
      throw err;
    }
  }

  /**
   * Search by specific field
   */
  async searchByField(
    field: 'title' | 'culture' | 'classification' | 'period' | 'century',
    value: string,
    limit = 50
  ): Promise<HarvardObject[]> {
    try {
      const params = new URLSearchParams({
        apikey: this.apiKey,
        hasimage: '1',
        [field]: value,
        size: limit.toString(),
        page: '1',
      });

      const response = await fetch(`${this.baseUrl}/object?${params}`, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data: HarvardApiResponse = await response.json();
      return (data.records || []).map(obj => this.optimizeHarvardObject(obj));
    } catch (err) {
      console.error('Search error:', err);
      throw err;
    }
  }

  async searchByCulture(culture: string, limit = 50): Promise<HarvardObject[]> {
    return this.searchByField('culture', culture, limit);
  }

  //medium
  async searchByClassification(
    classification: string,
    limit = 50
  ): Promise<HarvardObject[]> {
    return this.searchByField('classification', classification, limit);
  }

  // get random
  async getRandomObjects(limit = 50): Promise<HarvardObject[]> {
    return this.getInitialObjectsWithImages(limit, 'random');
  }
}
