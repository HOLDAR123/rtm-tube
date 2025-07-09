import { useFetchMyProfile } from 'hooks/query/useFetchMyProfile';
import { PlanEnum } from 'types/interfaces/plan.enum';
import { RoleEnum } from 'types/interfaces/role.enum';
import InfoIcon from 'assets/icons/InfoIcon';
import LogoutIcon from 'assets/icons/LogoutIcon';
import ReceiveIcon from 'assets/icons/ReceiveIcon';
import ReferralIcon from 'assets/icons/ReferralIcon';
import StarsIcon from 'assets/icons/StarsIcon';
import UserIcon from 'assets/icons/UserIcon';

export interface IList {
  id: number;
  icon: JSX.Element | null;
  title: string;
  value?: string;
  caption: string;
  isLinked: boolean;
  isChecked?: boolean;
  link: string;
  role: RoleEnum | null;
}

export const AccountList = () => {
  const { user } = useFetchMyProfile();

  const ACCOUNTLIST = [
    {
      id: 1,
      icon: <UserIcon />,
      title: user?.email || '',
      caption: '',
      isLinked: false,
      link: '',
      role: null,
    },
    {
      id: 2,
      icon: <StarsIcon />,
      title: 'My subscription',
      caption: '',
      isLinked: true,
      link: '/settings/subscriptions',
      role: RoleEnum.USER,
    },
    {
      id: 3,
      icon: <ReceiveIcon />,
      title: 'Receive only',
      caption: '',
      isLinked: true,
      link: '/settings/receive-only',
      role: RoleEnum.USER,
    },
    {
      id: 4,
      icon: <ReferralIcon />,
      title: 'Referral program',
      caption: '',
      isLinked: true,
      link: '/settings/referral',
      role: null,
    },
    {
      id: 5,
      icon: <InfoIcon />,
      title: 'Edit subscription',
      caption: '',
      isLinked: true,
      link: '/settings/edit-subscription',
      role: RoleEnum.BLOGGER,
    },
    {
      id: 6,
      icon: <InfoIcon />,
      title: 'Edit AI Model',
      caption: '',
      isLinked: true,
      link: '/settings/edit-ai-model',
      role: RoleEnum.BLOGGER,
    },
    {
      id: 7,
      icon: <LogoutIcon />,
      title: 'Logout',
      caption: '',
      isLinked: false,
      link: '',
      role: null,
    },
  ];

  const GENERALLIST = [
    {
      id: 1,
      icon: <UserIcon />,
      title: 'Theme',
      caption: 'theme',
      isLinked: true,
      link: '/settings/theme',
      role: null,
    },
    {
      id: 2,
      icon: <InfoIcon />,
      title: 'Privacy policy',
      caption: '',
      isLinked: true,
      link: '/settings/privacy',
      role: null,
    },
  ];

  return { ACCOUNTLIST, GENERALLIST };
};

export interface ThemeList {
  id: number;
  title: string;
  value: string;
}

export const THEMELIST = [
  {
    id: 1,
    icon: null,
    title: 'Light',
    value: 'light',
    caption: '',
    isChecked: true,
    isLinked: false,
    link: '',
    role: null,
  },
  {
    id: 2,
    icon: null,
    title: 'Dark',
    value: 'dark',
    caption: '',
    isChecked: true,
    isLinked: false,
    link: '',
    role: null,
  },
];

export const RECEIVEONLYLIST = [
  {
    id: 1,
    icon: null,
    title: 'Voice messages only',
    value: 'audio',
    caption: '',
    isChecked: true,
    isLinked: false,
    link: '',
    role: null,
  },
  {
    id: 2,
    icon: null,
    title: 'Text messages only messages only',
    value: 'text',
    caption: '',
    isChecked: true,
    isLinked: false,
    link: '',
    role: null,
  },
  {
    id: 3,
    icon: null,
    title: 'Any',
    value: 'any',
    caption: '',
    isChecked: true,
    isLinked: false,
    link: '',
    role: null,
  },
];

export const SUBSCRIPTIONLIST = [
  {
    id: 1,
    price: '',
    plan: PlanEnum.WEEKLY,
  },
  {
    id: 2,
    price: '',
    plan: PlanEnum.MONTHLY,
  },
  {
    id: 3,
    price: '',
    plan: PlanEnum.YEARLY,
  },
];

export const subscriptionTitle = {
  [PlanEnum.WEEKLY]: 'Week',
  [PlanEnum.MONTHLY]: 'Month',
  [PlanEnum.YEARLY]: 'Year',
};
