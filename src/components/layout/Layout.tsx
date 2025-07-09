import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { useFetchMyProfile } from 'hooks/query/useFetchMyProfile';
import { useAppSelector } from 'hooks/store';
import { RoleEnum } from 'types/interfaces/role.enum';
import Header from './Header';

export default function Layout() {
  const { token } = useAppSelector((state) => state.auth);
  const { user } = useFetchMyProfile();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme } = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (pathname === '/' && user?.role === RoleEnum.BLOGGER) {
      navigate('/settings');
    }
  }, [pathname, user?.role]);

  useEffect(() => {
    const checkPathname =
      pathname.includes('login') || pathname.includes('signup');

    if (!checkPathname && !token) {
      navigate('/login');
    }
  }, [pathname]);

  return (
    <div
      className={clsx('layout', {
        dark: theme === 'dark',
        layoutScroll: pathname.includes('settings')
      })}
    >
      <Header />
      <main id="main">
        <Outlet />
      </main>
    </div>
  );
}
