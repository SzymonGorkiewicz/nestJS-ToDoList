// _components/auth.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const user = localStorage.getItem('user');

      if (!user) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return <div>Checking Authentication...</div>; 
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
