import { NextResponse } from 'next/server'

export function createErrorResponse(message: string, status: number = 500) {
  return NextResponse.json(
    { error: message },
    { status }
  )
}

export const API_ERRORS = {
  MISSING_QUERY: 'Search query is required',
  INVALID_SERVICE: 'Invalid service specified',
  NETWORK_ERROR: 'Unable to connect to museum service',
  NOT_FOUND: 'Resource not found',
  INTERNAL_ERROR: 'Something went wrong on our end'
}