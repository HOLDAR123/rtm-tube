import { RoleEnum } from 'types/interfaces/role.enum';
import { useFetchMyProfile } from './query/useFetchMyProfile';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useHeaderRoutes = (pathname: string) => {
  const { user } = useFetchMyProfile();
  const [searchParams] = useSearchParams();

  const params = useMemo(() => {
    const entries = Array.from(searchParams.entries());
    return Object.fromEntries(entries);
  }, [searchParams]);

  const checkDynamicRouteCatalog = /^\/catalog\/([\w-]+)$/;
  const checkDynamicRouteSetting = /^\/settings\/([\w-]+)$/;
  const checkRootWithId = /^\/(\d+)$/;

  if (checkDynamicRouteCatalog.test(pathname)) {
    return {
      title: 'Chats',
      link: '/',
      isArrow: true,
      isActive: true,
      params,
    };
  }
  if (checkDynamicRouteSetting.test(pathname) || checkRootWithId.test(pathname)) {
    return {
      title: 'Settings',
      link: '/settings',
      isArrow: false,
      isActive: true,
      params,
    };
  }

  switch (pathname) {
    case '/':
      return {
        title: 'Settings',
        link: '/settings',
        isArrow: false,
        isActive: true,
        params,
      };
    case '/settings':
    case '/catalog':
      return {
        title: 'Chats',
        link: '/',
        isArrow: true,
        isActive: user?.role === RoleEnum.USER ? true : false,
        params,
      };

    default:
      return { title: '', link: '', isArrow: false, isActive: false, params };
  }
};