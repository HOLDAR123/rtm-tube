import {useQuery} from '@tanstack/react-query';

import store from 'store/index';
import SubscriptionsMethods from "../../api/subscriptions/SubscriptionsMethods";

export function useFetchBloggerPrices(bloggerId : number) {
    const {
        auth: { token },
    } = store.getState();

    const { data: prices, isLoading } = useQuery({
        queryKey: [`blogger-prices-${bloggerId}`],
        queryFn: async () => {
            if (!token) {
                return undefined;
            }
            return await SubscriptionsMethods.getPrices(bloggerId);
        },
        enabled: !!token,
    });

    return { prices, isLoading };
}
