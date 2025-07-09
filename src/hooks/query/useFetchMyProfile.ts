import { useQuery } from '@tanstack/react-query';

import store from 'store/index';
import { UserDto } from 'api/users/dto/user.dto';
import UsersMethods from 'api/users/UsersMethods';

export function useFetchMyProfile(): {
  user: UserDto | undefined;
  isLoading: boolean;
} {
  const {
    auth: { token },
  } = store.getState();

  const { data: user, isLoading } = useQuery({
    queryKey: ['myProfile'],
    queryFn: () => UsersMethods.getUser(),
    enabled: !!token,
  });

  return { user, isLoading };
}
