import SearchClient from './lib/components/UI/SearchPage/SearchClient';

import { config } from '@/config';
import { extractMuseumData } from './lib/utils/extractMuseumData';
import { extractData } from './lib/utils/extractData';

export default async function Page() {
  try {
    // note - this is just getting museum objects
    const res = await fetch(
      config.ausMuseum.baseUrl + config.ausMuseum.objectAndMediaEndpoint
    );

    if (!res.ok) throw new Error('Failed to fetch museum data');

    const data = await res.json();

    //validate + filter data
    const result = data.data;
    console.log(result, 'data');

    // need func to extract data here
    const extracted = extractData(result);
    console.log(extracted);

    return <SearchClient data={result} />;
  } catch (err: any) {
    return Response.json({ status: 400, error: err.message });
  }
}
