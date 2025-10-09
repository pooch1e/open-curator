import { NextRequest, NextResponse } from 'next/server';
import { HarvardApiService } from '@/app/lib/services/HarvardMusemService';
import { ChicagoMuseumService } from '@/app/lib/services/ChicagoMuseumService';
import { config } from '@/config';

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '100');
    const service = searchParams.get('service')?.toLowerCase();

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
      config.harvardMuseum.apiKey || ''
    );

    const chicagoService = new ChicagoMuseumService(
      'https://api.artic.edu/api/v1'
    );

    let results;
    if (service === 'harvard') {
      results = await harvardService.searchObjects(query, limit);
    }
    if (service === 'chicago') {
      const rawResults = await chicagoService.getInitialObjectsWithImages(
        limit,
        query
      );

      results = rawResults.map((item: any) => {
        return chicagoService.transformToMuseumItem(item);
      });
    }

    // Ensure results is always an array
    if (!Array.isArray(results)) {
      results = [];
    }

    const responseData = {
      results,
      cached: false,
      service,
      count: results.length,
    };

    cache.set(cacheKey, {
      data: responseData,
      timestamp: Date.now(),
    });

    return NextResponse.json(responseData);
  } catch (err: any) {
    console.error('Cache API error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
