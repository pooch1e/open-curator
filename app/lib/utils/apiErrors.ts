/**
 * Shared JSON error responses for API route handlers.
 */
import { NextResponse } from 'next/server';

export function createErrorResponse(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export const API_ERRORS = {
  MISSING_QUERY: 'Query parameter "q" is required',
  INVALID_SERVICE: 'Service must be one of: harvard, chicago',
  INTERNAL_ERROR: 'Something went wrong on our end',
};
