// @refresh reset
import SearchClient from './lib/components/UI/SearchPage/SearchClient';

import { config } from '@/config';
import { HarvardApiService } from './lib/services/HarvardMusemService';


export default async function Page() {

  const fetchHarvardApi = new HarvardApiService(
    config.harvardMuseum.baseUrl,
    config.harvardMuseum.apiKey || ''
  );

  const harvardData = await fetchHarvardApi.getInitialObjectsWithImages(
    50,
    'rank'
  );

  // Transform Harvard data to match MuseumItem interface
  const data = fetchHarvardApi.transformToMuseumItem(harvardData);

  return <SearchClient data={data} />;
}
