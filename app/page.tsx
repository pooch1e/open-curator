// @refresh reset
import SearchClient from './lib/components/UI/SearchPage/SearchClient';

import { config } from '@/config';
import { HarvardApiService } from './lib/services/HarvardMusemService';
// import { MetMuseumService } from './lib/services/MetMuseumService';

export default async function Page() {
  // const metMuseumFetcher = new MetMuseumService(config.metMuseum.baseUrl);

  // const data = await metMuseumFetcher.getInitialObjectsWithImages();
  // console.log(config.harvardMuseum.apiKey, 'is api key undefined');
  //refactor to use Harvard Api first - then use metmuseum
  const fetchHarvardApi = new HarvardApiService(
    config.harvardMuseum.baseUrl,
    config.harvardMuseum.apiKey
  );

  const data = await fetchHarvardApi.getInitialObjectsWithImages(50, 'rank');
  console.log(data)
  
  
  return <SearchClient data={data} />;
}
