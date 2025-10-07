export class ChicagoMuseumService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getInitalObjectsWithImages(limit = 50, query: string): Promise<any> {
    try {
      const params = new URLSearchParams({
        q: query,
        size: limit.toString(),
        fields: 'id,title,artist_display,date_display,image_id,thumbnail',
      });
      const url = `${this.baseUrl}/artworks/search?${params}`;

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
      const data = await response.json();

      if (!data.records || data.records.length === 0) {
        console.log('Artworks found');
        return [];
      }

      const filteredArtworksWithImages = data.data.filter(
        (artwork: any) => artwork.image_id
      );

      return filteredArtworksWithImages;
    } catch (err: any) {
      console.error('Error fetching Chicago objects:', err);
      throw err;
    }
  }

  getImageUrl(imageId: string, size: string = '843'): string {
    return `https://www.artic.edu/iiif/2/${imageId}/full/${size},/0/default.jpg`;
  }
}
