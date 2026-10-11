/**
 * Server-side configuration for the museum APIs the app talks to.
 */

interface MuseumApiConfig {
  baseUrl: string;
}

interface HarvardMuseumConfig extends MuseumApiConfig {
  apiKey: string;
}

interface Config {
  harvardMuseum: HarvardMuseumConfig;
  chicagoMuseum: MuseumApiConfig;
}

export const config: Config = {
  harvardMuseum: {
    baseUrl: 'https://api.harvardartmuseums.org',
    apiKey: process.env.HARVARD_MUSEUM_API_KEY ?? '',
  },
  chicagoMuseum: {
    baseUrl: 'https://api.artic.edu/api/v1',
  },
};
