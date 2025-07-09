import { useMutation, useQueryClient } from '@tanstack/react-query';
import UsersMethods from "../../api/users/UsersMethods";
import {UpdateUserDto} from "../../api/users/dto/update-user.dto";

interface Props {
    userId: number;
    dto: UpdateUserDto;
}

export function useMutationUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser } = useMutation({
        mutationFn: ({ userId, dto }: Props) =>
            UsersMethods.updateByID(userId, dto),
        onSuccess: (userId) => {
            queryClient.invalidateQueries({ queryKey: ['user', userId] });
        },
    });

    return { updateUser };
}
