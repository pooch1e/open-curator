// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { HarvardApiService } from '@/app/lib/services/HarvardMusemService';
import { config } from '@/config';
import { createErrorResponse, API_ERRORS } from '@/app/lib/utils/apiErrors';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!query) {
      return createErrorResponse(API_ERRORS.MISSING_QUERY, 400);
    }

    const service = new HarvardApiService(
      config.harvardMuseum.baseUrl,
      config.harvardMuseum.apiKey || ''
    );

    const results = await service.searchObjects(query, limit);

    return NextResponse.json(results);
  } catch (error) {
    console.error('Harvard Search API error:', error);
    return createErrorResponse(API_ERRORS.INTERNAL_ERROR, 500);
  }
}
