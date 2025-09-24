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
    const searchParams = new URLSearchParams({
      hasImages: 'true',
      ...(searchQuery ? { q: 'art' } : { isHighlight: 'true' }),
    });

    const searchUrl = this.baseUrl + '/search?' + searchParams;
    console.log(`fetching from ${searchUrl}`);

    const response = await fetch(searchUrl);
    const data = await response.json();
    console.log(data, 'fetched data');

    return data;
  }
}
