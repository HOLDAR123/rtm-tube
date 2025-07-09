import {RoleEnum} from "../../../types/interfaces/role.enum";
import {messageBotSettingsType} from "./update-user.dto";

export interface UserDto {
    id: number;
    email: string;
    name?: string;
    avatar?: string;
    role: RoleEnum;
    isSubscribed: boolean;
    created_at: Date;
    updated_at: Date;
    referralCode: string;
    referredBy?: UserDto;
    customerId?: string;
    password: string;
    description?: string;
    stripeId?: string;
    productId?: string;
    balance: number;
    messageBotSettings: messageBotSettingsType;
}