import SearchClient from './lib/components/UI/SearchPage/SearchClient';

import { config } from '@/config';

export default async function Page() {
  try {
    // note - this is just getting museum objects
    const res = await fetch(
      config.ausMuseum.baseUrl + config.ausMuseum.objectEndpoint
    );

    if (!res.ok) throw new Error('Failed to fetch museum data');

    const data = await res.json();
    
    return <SearchClient data={data.data} />;
  } catch (err: any) {
    return Response.json({ status: 400, error: err.message });
  }
}
