/**
 * Home page — server-fetches a starter set of Harvard artworks and hands
 * them to the interactive search client.
 */
import SearchClient from '@/app/lib/components/UI/SearchPage/SearchClient';
import { HarvardMuseumService } from '@/app/lib/services/HarvardMuseumService';
import { config } from '@/config';

export const revalidate = 3600;

export default async function Page() {
  try {
    const harvard = new HarvardMuseumService(
      config.harvardMuseum.baseUrl,
      config.harvardMuseum.apiKey
    );
    const data = await harvard.getObjectsWithImages(50, 'rank');
    return <SearchClient initialData={data} />;
  } catch (err) {
    console.error('Failed to load initial Harvard artworks', err);
    return <SearchClient initialData={[]} initialLoadFailed />;
  }
}
