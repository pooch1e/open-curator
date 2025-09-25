export class MetMuseumService {
  baseUrl: string;

  private rateLimitDelay: number;
  private conCurrentRequests: number;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.rateLimitDelay = 56;
    this.conCurrentRequests = 10;
  }

  async getInitialObjectsWithImages(searchQuery = 'art', limit = 200) {
    try {
      const searchParams = new URLSearchParams({
        hasImages: 'true',
        q: searchQuery || 'art',
      });

      const searchUrl = this.baseUrl + '/search?' + searchParams;
      console.log(`fetching from ${searchUrl}`);

      const response = await fetch(searchUrl);
      const data = await response.json();
      // console.log(data, 'fetched data');

      if (!data || !data.objectIDs || data.objectIDs.length === 0) {
        throw new Error('no objects found');
      }

      //get first 200 objects
      const objectIds = data.objectIDs.slice(0, limit);
      // console.log(objectIds);

      // fire off requests
      const objects = await Promise.all(
        objectIds.map((id: number) => {
          return this.getObjectsById(id);
        })
      );
      // console.log(objects, 'found objects unfiltered');
      const filtered = objects.filter(Boolean);
      console.log(filtered, 'final shape');
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
    } catch (err) {}
  }
}
