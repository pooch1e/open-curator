// config.ts
interface MuseumConfig {
  baseUrl: string;
  objectEndpointStart: string;
  imageEndpoint: string;
  objectAndMediaEndpoint: string;
  apiKey: string;
}

interface Config {
  ausMuseum: MuseumConfig;
}

//add pagination and offset to start
export const config: Config = {
  ausMuseum: {
    baseUrl: 'https://data.nma.gov.au/',
    objectEndpointStart: '/object?title=A',
    imageEndpoint: '/media?id=*',
    objectAndMediaEndpoint: 'object?media=*',
    apiKey: process.env.MUSEUM_API_KEY ?? '',
  },
};
