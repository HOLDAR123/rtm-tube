import MessageBotMethods from "../../api/messageBot/MessageBotMethods";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {UpdateMessageBotSettingsDto} from "../../api/messageBot/dto/update-messageBot.dto";

interface Props {
    userId: number;
    dto: UpdateMessageBotSettingsDto;
    images?: (File | string)[] | null;
    audios?: (File | string)[] | null;
}

export function useMutationUpdateMessageBot() {
    const queryClient = useQueryClient();

    const { mutate: updateMessageBotSettings } = useMutation({
        mutationFn: ({ userId, dto, images, audios }: Props) =>
            MessageBotMethods.updateByID(userId, dto, images, audios),
        onSuccess: (userId) => {
            queryClient.invalidateQueries({ queryKey: ['messagebot', userId] });
        },
    });

    return { updateMessageBotSettings };
}