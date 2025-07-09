import { useQuery } from '@tanstack/react-query';

import SubscriptionsMethods from 'api/subscriptions/SubscriptionsMethods';
import MessageBotMethods from "../../api/messageBot/MessageBotMethods";

export function useFetchBotSettingsByUserId(userId: number) {
    const { data: messageBotSettingsData, isLoading } = useQuery({
        queryKey: [`messageBotSettings-${userId}`],
        queryFn: () => MessageBotMethods.getByID(userId),
    });

    return { messageBotSettingsData, isLoading };
}
