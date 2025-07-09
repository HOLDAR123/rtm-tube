import {AxiosRequestConfig} from 'axios';

import {PlanEnum} from '../../types/interfaces/plan.enum';
import {SubscriptionsType} from '../../types/Subscriptions.type';
import Api from '../Api';
import {CreateSubscriptionPriceDto, CreateUsersSubscriptionsPlanDto} from './dto/create-users-subscriptions-plan.dto';
import {UpdateUsersSubscriptionsPlanDto} from './dto/update-users-subscriptions-plan.dto';
import {UsersSubscriptionsPlanDto} from './dto/users-subscriptions-plan.dto';
import {GetSubscriptionsByIdDto} from "./dto/getSubscriptionsById.dto";

class BloggerSubscriptionsMethods extends Api {
  async getSubscriptionByUserId(userId: number): Promise<GetSubscriptionsByIdDto[]> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    return await this.request<GetSubscriptionsByIdDto[]>(
      `/subscriptions/${userId}`,
      config,
    );
  }
  async getSubscriptionByBloggerId(bloggerId: number): Promise<GetSubscriptionsByIdDto[]> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    return await this.request<GetSubscriptionsByIdDto[]>(
      `/subscriptions/bloggersubscriptions/${bloggerId}`,
      config,
    );
  }

  async createSubscription(data: CreateUsersSubscriptionsPlanDto): Promise<{ url: string }> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      data: {
        data
      },
    };

    const response = await this.request<{ url: string }>(`/subscriptions`, config);

    return response;
  }

  async updateSubscription(
    userId: number,
    plan: PlanEnum,
  ): Promise<SubscriptionsType> {
    const config: AxiosRequestConfig = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      data: {
        plan,
      },
    };

    return await this.request<SubscriptionsType>(
      `/subscriptions/${userId}`,
      config,
    );
  }

  async deleteSubscription(userId: number, bloggerId: number): Promise<void> {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    await this.request<void>(`/subscriptions/${userId}/${bloggerId}`, config);
  }

  async getAllSubscriptions(): Promise<SubscriptionsType[]> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    return await this.request<SubscriptionsType[]>(`/bloggers-plans`, config);
  }

  async createBloggerSubscriptionPlan(
    createDto: CreateUsersSubscriptionsPlanDto,
  ): Promise<UsersSubscriptionsPlanDto> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      data: createDto,
    };

    return await this.request<UsersSubscriptionsPlanDto>(
      `/bloggers-plans`,
      config,
    );
  }

  async getPrices(bloggerId: number): Promise<{ success: boolean; data?: any; message?: string }> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    return await this.request(
        `/bloggers-plans/prices/${bloggerId}`,
        config,
    )
  }

  async createOrUpdatePrices(
      CreateSubscriptionPriceDto: CreateSubscriptionPriceDto,
  ): Promise<{ success: boolean; data?: any; message?: string }> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      data: CreateSubscriptionPriceDto,
    };

    return await this.request(
        `/bloggers-plans/prices/create`,
        config
    )
  }

  async getAllBloggerSubscriptionPlans(): Promise<UsersSubscriptionsPlanDto[]> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    return await this.request<UsersSubscriptionsPlanDto[]>(
      `/bloggers-plans`,
      config,
    );
  }

  async getBloggerSubscriptionPlanById(
    id: number,
  ): Promise<UsersSubscriptionsPlanDto> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    return await this.request<UsersSubscriptionsPlanDto>(
      `/bloggers-plans/${id}`,
      config,
    );
  }

  async updateBloggerSubscriptionPlan(
    id: number,
    updateDto: UpdateUsersSubscriptionsPlanDto,
  ): Promise<UsersSubscriptionsPlanDto> {
    const config: AxiosRequestConfig = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      data: updateDto,
    };

    return await this.request<UsersSubscriptionsPlanDto>(
      `/bloggers-plans/${id}`,
      config,
    );
  }

  async deleteBloggerSubscriptionPlan(id: number): Promise<void> {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    await this.request<void>(`/bloggers-plans/${id}`, config);
  }
}

export default new BloggerSubscriptionsMethods();
