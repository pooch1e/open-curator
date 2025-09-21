import { config } from '@/config';
import MuseumClient from './MuseumClient';

export default async function MuseumPage() {
  const res = await fetch(
    config.ausMuseum.baseUrl + config.ausMuseum.objectEndpoint
  );

  if (!res.ok) throw new Error('Failed to fetch museum data');

  const data = await res.json();

  return <MuseumClient initialData={data.data} />;
}
