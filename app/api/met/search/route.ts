import { MetMuseumService } from '@/app/lib/services/MetMuseumService';
import { unstable_cache } from 'next/cache';
import { config } from '@/config';
import { NextRequest, NextResponse } from 'next/server';

const getCachedResults = unstable_cache(
  async (query: string, limit: number) => {
    const metMuseumService = new MetMuseumService(config.metMuseum.baseUrl);
    return await metMuseumService.getObjectsByName(query, limit);
  },
  ['museum search'],
  { revalidate: 3600 } //1 hour
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const limit = Number(searchParams.get('limit') || 50);
    
    console.log(`Search API called with query: "${query}", limit: ${limit}`);
    
    if (!query.trim()) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }
    
    const results = await getCachedResults(query, limit);
    console.log(`Search API returning ${results.length} results`);
    
    return NextResponse.json(results);
  } catch (err: any) {
    console.error('API /api/search error:', err);
    console.error('Error stack:', err.stack);
    
    return NextResponse.json(
      { error: 'Failed to search museum collection', details: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
