import Api from 'api/Api';
import { ChatDto } from './dto/chat.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { IMessage } from "../../types/Chat.type";
import { AxiosRequestConfig } from "axios";

class ChatsMethods extends Api {
  async getChat(recipientId: number): Promise<IMessage[]> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    const data = await this.request<IMessage[]>(`/messages/chat/${recipientId}`, config);
    return data;
  }

  async sendMessage(body: SendMessageDto): Promise<ChatDto> {
    const config: AxiosRequestConfig<SendMessageDto> = {
      method: 'POST',
      data: body,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    const data = await this.request<ChatDto>(`/messages`, config);
    return data;
  }

  async updateMessage(id: number, body: UpdateMessageDto): Promise<UpdateMessageDto> {
    const config: AxiosRequestConfig<UpdateMessageDto> = {
      method: 'PATCH',
      data: body,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    const data = await this.request<UpdateMessageDto>(`/messages/${id}`, config);
    return data;
  }

  async removeMessage(id: number): Promise<void> {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    await this.request<void>(`/messages/${id}`, config);
  }
}

export default new ChatsMethods();
