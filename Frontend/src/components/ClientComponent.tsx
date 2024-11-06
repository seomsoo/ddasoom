'use client';

import useAuth from '@/hooks/useGetToken';

export default function ClientComponent({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  console.log('토큰 :', token);

  return <>{children}</>;
}
