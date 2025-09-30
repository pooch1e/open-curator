// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { HarvardApiService } from '@/app/lib/services/HarvardMusemService';
import { config } from '@/config';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const service = new HarvardApiService(
      config.harvardMuseum.baseUrl,
      config.harvardMuseum.apiKey
    );

    const results = await service.searchObjects(query, limit);

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search results' },
      { status: 500 }
    );
  }
}
