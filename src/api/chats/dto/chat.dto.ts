import { UserDto } from 'api/users/dto/user.dto';

export interface ChatDto {
  id: number;
  sender: UserDto;
  recipient: UserDto;
  text: string;
  created_at: Date;
  updated_at: Date;
}
