import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CreateUsersSubscriptionsPlanDto } from 'api/subscriptions/dto/create-users-subscriptions-plan.dto';
import SubscriptionsMethods from 'api/subscriptions/SubscriptionsMethods';

export function useMutationCreateSubscription() {
  const queryClient = useQueryClient();

  const { mutate: createSubscription } = useMutation({
    mutationFn: (dto: CreateUsersSubscriptionsPlanDto) =>
      SubscriptionsMethods.createSubscription(dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['create-subscriptions'] });
      if (data?.url) {
        window.location.href = data.url;
      }
    },
  });

  return { createSubscription };
}
