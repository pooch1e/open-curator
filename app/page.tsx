import SearchClient from './lib/components/UI/SearchPage/SearchClient';

import { config } from '@/config';
import { MetMuseumService } from './lib/services/MetMuseumService';

export default async function Page() {
  const metMuseumFetcher = new MetMuseumService(config.metMuseum.baseUrl);

  const data = await metMuseumFetcher.getInitialObjectsWithImages();

  return <SearchClient data={data} />;
}
