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
    config.harvardMuseum.apiKey || ''
  );

  const harvardData = await fetchHarvardApi.getInitialObjectsWithImages(50, 'rank');
  
  // Transform Harvard data to match MuseumItem interface
  const data = harvardData.map(item => ({
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
    images: (item.images || []).map(img => ({
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
      width: img.width
    }))
  }));

  return <SearchClient data={data} />;
}
