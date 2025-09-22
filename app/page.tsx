import SearchClient from './lib/components/UI/SearchPage/SearchClient';

import { config } from '@/config';

export default async function Page() {
  try {
    const res = await fetch(
      config.ausMuseum.baseUrl + config.ausMuseum.objectEndpoint
    );

    if (!res.ok) throw new Error('Failed to fetch museum data');

    const data = await res.json();
    console.log(data.data, 'data in server comp');
    return <SearchClient data={data.data} />;
  } catch (err: any) {
    return Response.json({ status: 400, error: err.message });
  }
}
