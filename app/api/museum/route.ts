import { config } from '@/config';
export async function GET() {
  try {
    const key = process.env.MUSEUM_API_KEY;
    const res = await fetch(
      config.ausMuseum.baseUrl + config.ausMuseum.objectEndpoint,
      {
        headers: { apikey: key } as HeadersInit,
      }
    );
    const data = await res.json();

    return Response.json(data);
  } catch (err: any) {
    return Response.json({ status: 400, error: err.message });
  }
}
