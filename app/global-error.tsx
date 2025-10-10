'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="bg-black text-white">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-4xl font-crimson font-semibold mb-4">Something went wrong!</h1>
            <p className="text-gray-400 mb-8 font-crimson font-light">
              We encountered an unexpected error. Please try again.
            </p>
            <button
              onClick={() => reset()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-crimson font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}