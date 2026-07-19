import type { Metadata } from 'next';

// Admin is private: never index, never follow.
export const metadata: Metadata = {
  title: 'Admin — ODOOVATIONS',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
