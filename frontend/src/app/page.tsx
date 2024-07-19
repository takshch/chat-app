'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoading = useMemo(() => status === 'loading', [status]);
  const isLoggedIn = useMemo(() => status === 'authenticated', [status]);

  useEffect(() => {
    if (isLoading) return;
    if (isLoggedIn) return;

    router.push('/signin');
  }, [isLoading, isLoggedIn, router]);

  return (
    <div className="w-screen h-screen text-black bg-white flex justify-center">
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>{isLoggedIn ? <div>User is logged in</div> : <></>}</>
      )}
    </div>
  );
}
