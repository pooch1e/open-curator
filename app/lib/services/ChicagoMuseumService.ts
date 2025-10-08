// ChicagoMuseumService.ts
export class ChicagoMuseumService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getInitialObjectsWithImages(limit = 50, query: string): Promise<any[]> {
    try {
      const params = new URLSearchParams({
        q: query,
        size: limit.toString(),
        fields:
          'id,title,artist_display,date_display,image_id,thumbnail,medium_display,department_title,dimensions,is_public_domain',
      });

      const url = `${this.baseUrl}/artworks/search?${params}`;
      console.log('Chicago API - Request URL:', url);

      const response = await fetch(url, {
        next: { revalidate: 3600 },
      });

      console.log('Chicago API - Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Chicago API - Request failed: ${response.status}`,
          errorText
        );
        throw new Error(
          `Request failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data.data || data.data.length === 0) {
        console.log('Chicago API - No artworks found');
        return [];
      }

      // Filter for artworks with images
      const filteredArtworksWithImages = data.data.filter((artwork: any) => {
        const hasImage = !!artwork.image_id;
        if (!hasImage) {
          console.log(
            'Chicago API - Artwork without image:',
            artwork.id,
            artwork.title
          );
        }
        return hasImage;
      });

      return filteredArtworksWithImages;
    } catch (err: any) {
      console.error('Chicago API - Error fetching objects:', err);
      throw err;
    }
  }

  /**
   * Get optimized image URL for Chicago Museum IIIF images
   * @param imageId - Chicago Museum image ID
   * @param size - Image size (default '400' for better performance)
   * @returns Optimized IIIF image URL
   */
  getImageUrl(imageId: string, size: string = '400'): string {
    return `https://www.artic.edu/iiif/2/${imageId}/full/${size},/0/default.jpg`;
  }

  /**
   * Get thumbnail image URL (smaller size for grid views)
   * @param imageId - Chicago Museum image ID
   * @returns Small thumbnail URL
   */
  getThumbnailUrl(imageId: string): string {
    return this.getImageUrl(imageId, '200');
  }

  transformToMuseumItem(chicagoItem: any): any {
    // console.log(
    //   'Transforming Chicago item:',
    //   chicagoItem.id,
    //   chicagoItem.title
    // );

    return {
      id: chicagoItem.id,
      title: chicagoItem.title || 'Untitled',
      artist: chicagoItem.artist_display || 'Unknown Artist',
      date: chicagoItem.date_display || null,
      culture: null,
      medium: chicagoItem.medium_display || null,
      department: chicagoItem.department_title || null,
      primaryimageurl: chicagoItem.image_id
        ? this.getImageUrl(chicagoItem.image_id)
        : null,
      additionalImages: [],
      isPublicDomain: chicagoItem.is_public_domain || false,
      objectURL: `https://www.artic.edu/artworks/${chicagoItem.id}`,
      dimensions: chicagoItem.dimensions || null,
      images: chicagoItem.image_id
        ? [
            {
              alttext: chicagoItem.thumbnail?.alt_text || null,
              baseimageurl: this.getImageUrl(chicagoItem.image_id),
              copyright: null,
              date: chicagoItem.date_display,
              description: null,
              displayorder: 0,
              format: 'jpg',
              height: chicagoItem.thumbnail?.height || null,
              idsid: null,
              iiifbaseuri: `https://www.artic.edu/iiif/2/${chicagoItem.image_id}`,
              imageid: chicagoItem.id,
              publiccaption: null,
              renditionnumber: null,
              technique: null,
              width: chicagoItem.thumbnail?.width || null,
            },
          ]
        : [],
    };
  }
}
