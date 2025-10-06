export class ChicagoMuseumService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getInitalObjectsWithImages(limit = 50, query: string): Promise<[]> {
    try {
      const params = new URLSearchParams({
        q: query,
        size: limit.toString(),
        page: '1',
      });
      const url = `${this.baseUrl}/https://api.artic.edu/api/v1/artworks?${params}`;
    } catch (err: any) {}
  }
}
