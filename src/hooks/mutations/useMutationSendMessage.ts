import { useMutation } from '@tanstack/react-query';

import ChatsMethods from 'api/chats/ChatsMethods';
import { ChatDto } from 'api/chats/dto/chat.dto';
import { SendMessageDto } from 'api/chats/dto/send-message.dto';

export function useMutationSendMessage() {
  const { mutateAsync: sendMessage } = useMutation({
    mutationKey: ['sendMessage'],
    mutationFn: async (body: SendMessageDto) =>
      await ChatsMethods.sendMessage(body),
  });

  return { sendMessage };
}
