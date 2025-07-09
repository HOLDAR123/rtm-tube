import { PlanEnum } from 'types/interfaces/plan.enum';

export interface CreateUsersSubscriptionsPlanDto {
  userId: number,
  toUserId: number,
  planId: number,
}


export interface CreateSubscriptionPriceDto {
  bloggerId: number;
  prices: {
    plan: PlanEnum;
    price: number;
  }[];
}
export interface Price {
  createdAt: string;
  id: number;
  plan: PlanEnum;
  price: string;
  priceId: string;
  stripeId: string | null;
  updatedAt: string;
}