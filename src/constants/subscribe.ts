import { PlanEnum } from '../types/interfaces/plan.enum';

export const paymentList = [
  {
    id: 1,
    price: '800',
    period: 'week',
    plan: PlanEnum.WEEKLY,
  },
  {
    id: 2,
    price: '3 200',
    period: 'month',
    plan: PlanEnum.MONTHLY,
  },
  {
    id: 3,
    price: '38 400',
    period: 'year',
    plan: PlanEnum.YEARLY,
  },
];
