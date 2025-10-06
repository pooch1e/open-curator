import { NextRequest, NextResponse } from 'next/server';
import { HarvardApiService } from '@/app/lib/services/HarvardMusemService';
import { config } from '@/config';

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '100');
    const service = searchParams.get('service');

    // will accept method from either Harvard or other API and cache results - may need two seperate caches?

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }

    if (!service || !['harvard', 'chicago'].includes(service)) {
      //chicago for the moment
      return NextResponse.json(
        { error: 'Service parameter must be valid api' },
        { status: 400 }
      );
    }

    const cacheKey = `${service}:${query}:${limit}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        ...cached.data,
        cached: true,
        cacheAge: Math.floor((Date.now() - cached.timestamp) / 1000),
        service,
      });
    }

    //fetch from services
    // init services
    const harvardService = new HarvardApiService(
      config.harvardMuseum.baseUrl,
      config.harvardMuseum.apiKey
    );

    let results;
    if (service === 'Harvard') {
      results = await harvardService.searchObjects(query, limit);
    }

    cache.set(cacheKey, {
      data: results,
      timestamp: Date.now(),
    });

    return NextResponse.json({
      ...results,
      cached: false,
      service,
    });
  } catch (err: any) {
    return NextResponse.json({ status: 500, err: err.message });
  }
}
