import { useQuery } from '@tanstack/react-query';

import store from 'store/index';
import UsersMethods from 'api/users/UsersMethods';

export function useFetchReferrals(userId : number  ) {
  const {
    auth: { token },
  } = store.getState();

  const { data: referrals, isLoading } = useQuery({
    queryKey: ['referrals', userId],
    queryFn: async () => {
      if (!token) {
        return undefined;
      }
      return await UsersMethods.getReferralsByID(userId);
    },
    enabled: !!token,
  });

  return { referrals, isLoading };
}
