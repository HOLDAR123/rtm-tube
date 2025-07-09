import { useQuery } from '@tanstack/react-query';

import store from 'store/index';
import UsersMethods from 'api/users/UsersMethods';

export function useFetchBlogger(bloggerId : number  ) {
  const {
    auth: { token },
  } = store.getState();

  const { data: blogger, isLoading } = useQuery({
    queryKey: ['blogger'],
    queryFn: async () => {
      if (!token) {
        return undefined;
      }
      return await UsersMethods.getBlogger(bloggerId);
    },
    enabled: !!token,
  });

  return { blogger, isLoading };
}
