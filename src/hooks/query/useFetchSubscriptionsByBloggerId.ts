import { useQuery } from '@tanstack/react-query';

import SubscriptionsMethods from 'api/subscriptions/SubscriptionsMethods';

export function useFetchSubscriptionsByBloggerId(bloggerId: number) {
    const { data: bloggerSubscriptionsChatData, isLoading , refetch} = useQuery({
        queryKey: [`subscriptionsBlogger-${bloggerId}`],
        queryFn: () => SubscriptionsMethods.getSubscriptionByBloggerId(bloggerId),
    });

    return { bloggerSubscriptionsChatData, isLoading , refetch};
}
