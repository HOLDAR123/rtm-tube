import {AxiosRequestConfig} from "axios";
import Api from "../Api";
import {UpdateMessageBotSettingsDto} from "./dto/update-messageBot.dto";
import {messageBotSettingsType} from "../users/dto/update-user.dto";

class MessageBotMethods extends Api {
    async updateByID(
        userId: number,
        body: UpdateMessageBotSettingsDto,
        images?: (File | string)[] | null,
        audios?: (File | string)[] | null
    ) {
        const formData = new FormData();
        console.log(audios)
        if (body) {
            Object.entries(body).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });
        }

        images?.forEach((file) => formData.append("images", file));
        audios?.forEach((audio) => formData.append("audios", audio));

        console.log("Отправляемые данные:", Array.from(formData.entries()));

        return this.request(`/messagebot/settings/${userId}`, {
            method: "PUT",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${this.token}`,
            },
        });
    }

    async getByID(id: number): Promise<messageBotSettingsType> {
        const config: AxiosRequestConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        };

        const data = await this.request<messageBotSettingsType>(`/messagebot/settings/${id}`, config);
        return data;
    }
}

export default new MessageBotMethods();