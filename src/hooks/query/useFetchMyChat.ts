import { useQuery } from '@tanstack/react-query';

import ChatsMethods from 'api/chats/ChatsMethods';
import { IMessage } from 'types/Chat.type';

const useFetchMyChat = (recipientId: number) => {
  return useQuery<IMessage[]>({
    queryKey: ['chat', recipientId],
    queryFn: async () => {
      return ChatsMethods.getChat(recipientId);
    },
    enabled: !!recipientId,
  });
};

export default useFetchMyChat;
