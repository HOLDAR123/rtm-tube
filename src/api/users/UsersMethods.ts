import { AxiosRequestConfig } from 'axios';

import Api from '../Api';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

class UsersMethods extends Api {
  async getUser(): Promise<UserDto> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    const data = await this.request<UserDto>(`/profile`, config);
    return data;
  }

  async getByID(id: number): Promise<UserDto> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    const data = await this.request<UserDto>(`/users/${id}`, config);
    return data;
  }
  async getReferralsByID(userId: number): Promise<UserDto[]> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    const data = await this.request<UserDto[]>(`/users/referrals/${userId}`, config);
    return data;
  }

  getBlogger(bloggerId: number): Promise<UserDto> {
    return this.getByID(bloggerId);
  }

  async create(body: CreateUserDto): Promise<UserDto> {
    const config: AxiosRequestConfig<CreateUserDto> = {
      method: 'POST',
      data: body,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    const data = await this.request<UserDto>('/users', config);
    return data;
  }

  async updateByID(id: number, body: UpdateUserDto): Promise<UserDto> {
    const config: AxiosRequestConfig<UpdateUserDto> = {
      method: 'PUT',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    };

    const data = await this.request<UserDto>(`/users/${id}`, config);
    return data;
  }

  async removeByID(id: number): Promise<void> {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    await this.request<void>(`/users/${id}`, config);
  }
}

export default new UsersMethods();
