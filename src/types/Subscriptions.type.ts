import { UserDto } from '../api/users/dto/user.dto';
import { PlanEnum } from './interfaces/plan.enum';

export interface SubscriptionsType {
  id: number;
  plan: PlanEnum;
  price: string;
  creator: UserDto;
}
