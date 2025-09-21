// config.ts
interface MuseumConfig {
  baseUrl: string;
  objectEndpoint: string;
  imageEndpoint: string;
  apiKey: string;
}

interface Config {
  ausMuseum: MuseumConfig;
}

export const config: Config = {
  ausMuseum: {
    baseUrl: 'https://data.nma.gov.au/',
    objectEndpoint: '/object?title=*',
    imageEndpoint: '/media?id=*',
    apiKey: process.env.MUSEUM_API_KEY ?? '',
  },
};
