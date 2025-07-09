import { PlanEnum } from 'types/interfaces/plan.enum';

export interface UpdateUsersSubscriptionsPlanDto {
  plan?: PlanEnum;
  price?: number;
}
