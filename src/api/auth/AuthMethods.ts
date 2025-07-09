import Api from '../Api';
import { LoginUsersDto } from './dto/login-users.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

class AuthMethods extends Api {
  async login(dto: LoginUsersDto): Promise<{ access_token: string }> {
    const config = {
      method: 'POST',
      data: dto,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    const data = await this.request<{ access_token: string }>('/auth/user/login', config);
    return data;
  }

  async userRegister(dto: CreateUserDto): Promise<{ access_token: string }> {
    const config = {
      method: 'POST',
      data: dto,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    const data = await this.request<{ access_token: string }>('/auth/user/register', config);
    return data;
  }

  async bloggerRegister(formData: FormData): Promise<{ access_token: string }> {
    const config = {
      method: 'POST',
      data: formData,
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    return await this.request<{ access_token: string }>('/auth/blogger/register', config);
  }
}

export default new AuthMethods();
