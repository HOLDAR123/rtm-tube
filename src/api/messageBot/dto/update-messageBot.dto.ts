export interface UpdateMessageBotSettingsDto {
    text?: string;
    images?: File[] | null;
    audios?: File[] | null;
    messageReceived?: 'text' | 'audio' | 'any';
}