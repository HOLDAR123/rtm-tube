import { useQuery } from '@tanstack/react-query';

import SubscriptionsMethods from 'api/subscriptions/SubscriptionsMethods';

export function useFetchSubscriptions() {
  const { data: subscriptionsData, isLoading } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => SubscriptionsMethods.getAllSubscriptions(),
  });

  return { subscriptionsData, isLoading };
}
