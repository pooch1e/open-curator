import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-crimson font-semibold mb-4">404</h1>
        <h2 className="text-2xl font-crimson font-medium mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 font-crimson font-light">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg inline-block transition-colors font-crimson font-medium">
          Go Home
        </Link>
      </div>
    </div>
  );
}