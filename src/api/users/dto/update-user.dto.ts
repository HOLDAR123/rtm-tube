import {RoleEnum} from "../../../types/interfaces/role.enum";

export interface messageBotSettingsType {
    text?: string;
    messageReceived: "text" | "audio" | "any";
    images?: string[];
    audios?: string[];
}

export interface UpdateUserDto {
    email?: string;
    name?: string;
    password?: string;
    role?: RoleEnum;
    messageBotSettings?:messageBotSettingsType;
    avatar?: string;
    isSubscribed?: boolean;
}