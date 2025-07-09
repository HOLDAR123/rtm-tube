import {PlanEnum} from "../../../types/interfaces/plan.enum";
import {UserDto} from "../../users/dto/user.dto";

export interface UsersSubscriptionsPlanDto {
    id: number;
    plan: PlanEnum;
    price: number;
    creator: UserDto;
}
