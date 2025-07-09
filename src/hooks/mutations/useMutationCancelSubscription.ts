import { useMutation, useQueryClient } from '@tanstack/react-query';
import SubscriptionsMethods from 'api/subscriptions/SubscriptionsMethods';

export function useMutationCancelSubscription() {
    const queryClient = useQueryClient();

    const { mutate: cancelSubscription } = useMutation({
        mutationFn: ({ userId, bloggerId }: { userId: number; bloggerId: number }) =>
            SubscriptionsMethods.deleteSubscription(userId, bloggerId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`subscriptions-${variables.userId}`] });
        },
    });

    return { cancelSubscription };
}