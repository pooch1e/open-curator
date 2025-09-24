// config.ts
interface ausMuseumConfig {
  baseUrl: string;
  objectEndpointStart: string;
  imageEndpoint: string;
  objectAndMediaEndpoint: string;
  apiKey: string;
}

interface metMuseumConfig {
  baseUrl: string;
}

interface Config {
  ausMuseum: ausMuseumConfig;
  metMuseum: metMuseumConfig;
}

// !!!add pagination and offset to start
// !Todo use different api
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
  },
};
