import { useQuery } from '@tanstack/react-query';

import SubscriptionsMethods from 'api/subscriptions/SubscriptionsMethods';

export function useFetchSubscriptionsByUserId(userId: number) {
    const { data: subscriptionsChatData, isLoading } = useQuery({
        queryKey: [`subscriptions-${userId}`],
        queryFn: () => SubscriptionsMethods.getSubscriptionByUserId(userId),
    });

    return { subscriptionsChatData, isLoading };
}
