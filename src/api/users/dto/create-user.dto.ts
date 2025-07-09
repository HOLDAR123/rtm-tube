import {UserDto} from "./user.dto";

export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
  avatar?: File | null;
  description?: string;
  referredCode?: string | null;
}
