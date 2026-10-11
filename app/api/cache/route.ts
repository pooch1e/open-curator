/**
 * GET /api/cache — searches a museum service and memoises the normalised
 * results in a bounded, time-limited in-memory cache.
 */
import { NextRequest, NextResponse } from 'next/server';
import { HarvardMuseumService } from '@/app/lib/services/HarvardMuseumService';
import { ChicagoMuseumService } from '@/app/lib/services/ChicagoMuseumService';
import { createErrorResponse, API_ERRORS } from '@/app/lib/utils/apiErrors';
import type { MuseumItem, MuseumSource } from '@/app/lib/types';
import { config } from '@/config';

interface CachedSearch {
  results: MuseumItem[];
  timestamp: number;
}

const CACHE_DURATION_MS = 60 * 60 * 1000;
const MAX_CACHE_ENTRIES = 200;
const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;
const SERVICES: MuseumSource[] = ['harvard', 'chicago'];

/**
 * Per-instance cache: on serverless deploys each instance has its own copy,
 * so this only smooths out repeat queries rather than guaranteeing hits.
 */
const cache = new Map<string, CachedSearch>();

function isMuseumSource(value: string | undefined): value is MuseumSource {
  return SERVICES.includes(value as MuseumSource);
}

function parseLimit(raw: string | null): number {
  const parsed = Number.parseInt(raw ?? '', 10);
  if (Number.isNaN(parsed)) return DEFAULT_LIMIT;
  return Math.min(Math.max(parsed, 1), MAX_LIMIT);
}

function readCache(key: string): CachedSearch | undefined {
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (Date.now() - entry.timestamp >= CACHE_DURATION_MS) {
    cache.delete(key);
    return undefined;
  }
  return entry;
}

function writeCache(key: string, results: MuseumItem[]) {
  // Map preserves insertion order, so the first key is the oldest entry.
  if (cache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey !== undefined) cache.delete(oldestKey);
  }
  cache.set(key, { results, timestamp: Date.now() });
}

function searchService(
  service: MuseumSource,
  query: string,
  limit: number
): Promise<MuseumItem[]> {
  if (service === 'harvard') {
    return new HarvardMuseumService(
      config.harvardMuseum.baseUrl,
      config.harvardMuseum.apiKey
    ).searchObjects(query, limit);
  }
  return new ChicagoMuseumService(config.chicagoMuseum.baseUrl).searchObjects(
    query,
    limit
  );
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.trim().toLowerCase();
  const service = searchParams.get('service')?.toLowerCase();
  const limit = parseLimit(searchParams.get('limit'));

  if (!query) {
    return createErrorResponse(API_ERRORS.MISSING_QUERY, 400);
  }

  if (!isMuseumSource(service)) {
    return createErrorResponse(API_ERRORS.INVALID_SERVICE, 400);
  }

  const cacheKey = `${service}:${query}:${limit}`;
  const cached = readCache(cacheKey);
  if (cached) {
    return NextResponse.json({
      results: cached.results,
      count: cached.results.length,
      service,
      cached: true,
      cacheAge: Math.floor((Date.now() - cached.timestamp) / 1000),
    });
  }

  try {
    const results = await searchService(service, query, limit);
    writeCache(cacheKey, results);
    return NextResponse.json({
      results,
      count: results.length,
      service,
      cached: false,
    });
  } catch (err) {
    console.error(`[api/cache] ${service} search failed`, err);
    return createErrorResponse(API_ERRORS.INTERNAL_ERROR, 500);
  }
}
