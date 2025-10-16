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

interface MuseumItem {
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
  images: Array<{
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
   
   * @param imageUrl 
   * @param maxWidth
   * @param quality 
   * @returns 
   */
  private optimizeImageUrl(
    imageUrl: string,
    maxWidth = 400,
    quality: 'default' | 'gray' | 'bitonal' | 'color' = 'default'
  ): string {
    if (!imageUrl) return imageUrl;

    if (imageUrl.includes('nrs.harvard.edu') || imageUrl.includes('hvrd.art')) {
      if (imageUrl.includes('/full/full/0/')) {
        return imageUrl.replace('/full/full/0/', `/full/${maxWidth},/0/`);
      }
    }

    return imageUrl;
  }

  /**
   * Validates if an image URL is accessible and not broken
   */
  private isValidImageUrl(url: string): boolean {
    if (!url || url.trim() === '') return false;

    const invalidPatterns = [
      /\/full\/0\//,
      /\/0\/default\.jpg$/,
      /placeholder/i,
      /not[_-]?found/i,
      /unavailable/i,
    ];

    return !invalidPatterns.some((pattern) => pattern.test(url));
  }

  /**
   * Process Harvard object to optimize image URLs and ensure valid primary image
   */
  private optimizeHarvardObject(obj: HarvardObject): HarvardObject | null {
    let primaryImageUrl = obj.primaryimageurl;

    if (!primaryImageUrl || !this.isValidImageUrl(primaryImageUrl)) {
      if (obj.images && obj.images.length > 0) {
        const validImage = obj.images.find(
          (img) => img.baseimageurl && this.isValidImageUrl(img.baseimageurl)
        );

        if (validImage) {
          primaryImageUrl = validImage.baseimageurl;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }

    return {
      ...obj,
      primaryimageurl: this.optimizeImageUrl(primaryImageUrl, 400),
      images: obj.images?.map((img) => ({
        ...img,
        baseimageurl: this.optimizeImageUrl(img.baseimageurl, 400),
        iiifbaseuri: img.iiifbaseuri,
      })),
    };
  }

  /**
   *
   * @param limit
   * @param sort
   */
  async getInitialObjectsWithImages(
    limit = 80,
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

      const response = await fetch(url, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed: ${response.status} ${response.statusText}`
        );
      }

      const data: HarvardApiResponse = await response.json();

      if (!data.records || data.records.length === 0) {
        return [];
      }

      const optimizedObjects = data.records
        .map((obj) => this.optimizeHarvardObject(obj))
        .filter((obj): obj is HarvardObject => obj !== null);

      return optimizedObjects;
    } catch (err) {
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
        return null;
      }

      const data: HarvardObject = await response.json();
      return this.optimizeHarvardObject(data);
    } catch (err) {
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

      const response = await fetch(url, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data: HarvardApiResponse = await response.json();

      const optimizedResults = (data.records || [])
        .map((obj) => this.optimizeHarvardObject(obj))
        .filter((obj): obj is HarvardObject => obj !== null);

      return optimizedResults;
    } catch (err) {
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
      const optimizedResults = (data.records || [])
        .map((obj) => this.optimizeHarvardObject(obj))
        .filter((obj): obj is HarvardObject => obj !== null);

      return optimizedResults;
    } catch (err) {
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

  transformToMuseumItem(harvardDataObject: HarvardObject[]): MuseumItem[] {
    return harvardDataObject.map((item) => ({
      id: item.id,
      title: item.title,
      artist: item.people?.[0]?.displayname || item.people?.[0]?.name || null,
      date: item.dated || null,
      culture: item.culture || null,
      medium: item.medium || null,
      department: item.department || null,
      primaryimageurl: item.primaryimageurl || null,
      additionalImages: [],
      isPublicDomain: true, // Harvard data is typically public domain
      objectURL: item.url || null,
      dimensions: item.dimensions || null,
      images: (item.images || []).map((img) => ({
        alttext: null,
        baseimageurl: img.baseimageurl,
        copyright: null,
        date: null,
        description: null,
        displayorder: 0,
        format: null,
        height: img.height,
        idsid: null,
        iiifbaseuri: img.iiifbaseuri,
        imageid: 0,
        publiccaption: null,
        renditionnumber: null,
        technique: null,
        width: img.width,
      })),
    }));
  }
}
