// config.ts
interface AusMuseumConfig {
  baseUrl: string;
  objectEndpointStart: string;
  imageEndpoint: string;
  objectAndMediaEndpoint: string;
  apiKey: string;
}

interface MetMuseumConfig {
  baseUrl: string;
  searchUrl: string;
}

interface HarvardMuseumConfig {
  baseUrl: string;
  urlEndsInObject: string;
  apiKey: string | null;
}

interface Config {
  ausMuseum: AusMuseumConfig;
  metMuseum: MetMuseumConfig;
  harvardMuseum: HarvardMuseumConfig;
}

// !!!add pagination and offset to start
// !Todo use different api

//note harvard museum requires key .env
export const config: Config = {
  ausMuseum: {
    baseUrl: 'https://data.nma.gov.au/',
    objectEndpointStart: '/object?offset=0&limit=50',
    imageEndpoint: '/media?id=*',
    objectAndMediaEndpoint: 'object?media=*&offset=0&limit=50',
    apiKey: process.env.MUSEUM_API_KEY ?? '',
  },
  metMuseum: {
    baseUrl: 'https://collectionapi.metmuseum.org/public/collection/v1',
    searchUrl:
      'https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=',
  },
  harvardMuseum: {
    baseUrl: 'https://api.harvardartmuseums.org',
    urlEndsInObject: 'https:/api.harvardartmuseums.org/object',
    apiKey: process.env.HARVARD_MUSEUM_API_KEY || '',
  },
};
