/**
 * CollectionLayout — sets the page title for the favourites collection route.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Collection',
};

export default function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
