'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axiosInstance from '@/lib/api-client';
import { User, UserProvider, useUser } from '@/app/userProvider';


export default function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loggedInUser, setLoggedInUser] = useState<any>({});

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get(`/users/profile/me`);
      setLoggedInUser(res.data);
    } catch {
      console.warn('User fetch failed');
    }
  };

  useEffect(() => {
  fetchUser();
  }, [pathname]);


  return <UserProvider>
    <Initializer user={loggedInUser} />
    {children}
    </UserProvider>;
}

const Initializer = ({ user }: { user: User }) => {
  const { setUser } = useUser();


  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
};

