import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UpdateUsersSubscriptionsPlanDto } from 'api/subscriptions/dto/update-users-subscriptions-plan.dto';
import SubscriptionsMethods from 'api/subscriptions/SubscriptionsMethods';

interface Props {
  userId: number;
  dto: UpdateUsersSubscriptionsPlanDto;
}

export function useMutationUpdateSubscription() {
  const queryClient = useQueryClient();

  const { mutate: updateSubscription } = useMutation({
    mutationFn: ({ userId, dto }: Props) =>
      SubscriptionsMethods.updateBloggerSubscriptionPlan(userId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });

  return { updateSubscription };
}
