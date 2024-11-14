'use client';

import useAuth from '@/hooks/useGetToken';

export default function ClientComponent({ children }: { children: React.ReactNode }) {
  useAuth();

  return <>{children}</>;
}
