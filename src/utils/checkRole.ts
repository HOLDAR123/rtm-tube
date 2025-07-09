import { RoleEnum } from 'types/interfaces/role.enum';

export const checkRole = (userRole: RoleEnum, roleToCheck: RoleEnum | null) => {
  if (!roleToCheck) return true;

  if (userRole === RoleEnum.ADMIN) return true;

  return userRole === roleToCheck;
};
