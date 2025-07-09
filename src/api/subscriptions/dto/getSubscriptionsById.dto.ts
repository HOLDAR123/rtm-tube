import {PlanEnum} from "../../../types/interfaces/plan.enum";
import {UserDto} from "../../users/dto/user.dto";

export interface GetSubscriptionsByIdDto {
    id: number;
    isPaid: boolean;
    plan: {
        createdAt: Date

        id: number

        plan: PlanEnum

        price: string

        priceId: string

        stripeId: string | null

        updatedAt: Date
    };
    stripeId: string;
    toUser: UserDto;
    user: UserDto;
    expirationAt: Date;
    createdAt: Date;
    updatedAt: Date;
}