import { UserDto } from 'api/users/dto/user.dto';

export interface IMessage {
  id: number;
  sender: UserDto;
  recipient: UserDto;
  text: string;
  audio?: string;
  status: 'pending' | 'success';
  created_at: Date;
  updated_at: Date;
}
