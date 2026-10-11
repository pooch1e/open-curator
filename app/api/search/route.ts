/**
 * GET /api/search — searches every museum in parallel and interleaves the
 * normalised results. Upstream responses are cached by Next's fetch cache
 * (see each service's `revalidate`), so this route holds no state itself.
 */
import { NextRequest, NextResponse } from 'next/server';
import { HarvardMuseumService } from '@/app/lib/services/HarvardMuseumService';
import { ChicagoMuseumService } from '@/app/lib/services/ChicagoMuseumService';
import { createErrorResponse, API_ERRORS } from '@/app/lib/utils/apiErrors';
import type { MuseumItem, MuseumSource, SearchResponse } from '@/app/lib/types';
import { config } from '@/config';

const DEFAULT_LIMIT_PER_SOURCE = 25;
const MAX_LIMIT_PER_SOURCE = 50;

const SEARCHERS: Record<
  MuseumSource,
  (query: string, limit: number) => Promise<MuseumItem[]>
> = {
  harvard: (query, limit) =>
    new HarvardMuseumService(
      config.harvardMuseum.baseUrl,
      config.harvardMuseum.apiKey
    ).searchObjects(query, limit),
  chicago: (query, limit) =>
    new ChicagoMuseumService(config.chicagoMuseum.baseUrl).searchObjects(
      query,
      limit
    ),
};

function parseLimit(raw: string | null): number {
  const parsed = Number.parseInt(raw ?? '', 10);
  if (Number.isNaN(parsed)) return DEFAULT_LIMIT_PER_SOURCE;
  return Math.min(Math.max(parsed, 1), MAX_LIMIT_PER_SOURCE);
}

function interleave<T>(lists: T[][]): T[] {
  const longest = Math.max(0, ...lists.map((list) => list.length));
  return Array.from({ length: longest }, (_, i) =>
    lists.flatMap((list) => (i < list.length ? [list[i]] : []))
  ).flat();
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.trim().toLowerCase();
  const limit = parseLimit(searchParams.get('limit'));

  if (!query) {
    return createErrorResponse(API_ERRORS.MISSING_QUERY, 400);
  }

  const sources = Object.keys(SEARCHERS) as MuseumSource[];
  const settled = await Promise.allSettled(
    sources.map((source) => SEARCHERS[source](query, limit))
  );

  const failedSources = sources.filter((source, i) => {
    const outcome = settled[i];
    if (outcome.status === 'fulfilled') return false;
    console.error(`[api/search] ${source} search failed`, outcome.reason);
    return true;
  });

  if (failedSources.length === sources.length) {
    return createErrorResponse(API_ERRORS.INTERNAL_ERROR, 502);
  }

  const results = interleave(
    settled.map((outcome) =>
      outcome.status === 'fulfilled' ? outcome.value : []
    )
  );

  return NextResponse.json<SearchResponse>({ results, failedSources });
}
