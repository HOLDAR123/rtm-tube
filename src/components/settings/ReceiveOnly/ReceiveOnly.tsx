import {useEffect, useState} from 'react';

import { useAppDispatch } from 'hooks/store';
import { RECEIVEONLYLIST } from 'constants/setting';
import SettingItem from '../SettingItem';
import {useMutationUpdateMessageBot} from "../../../hooks/mutations/useMutationUpdateMessageBot";
import {useFetchMyProfile} from "../../../hooks/query/useFetchMyProfile";
import {useFetchBotSettingsByUserId} from "../../../hooks/query/useFetchBotSettingsByUserId";

export type ReceiveOnlyValueType = 'text' | 'audio' | 'any';

export default function ReceiveOnly() {
  const [receiveOnlyValue, setReceiveOnlyValue] =
    useState<ReceiveOnlyValueType>('text');

  const { updateMessageBotSettings } = useMutationUpdateMessageBot();
  const { user } = useFetchMyProfile();
  const {messageBotSettingsData} = useFetchBotSettingsByUserId(user?.id ?? -1);

  useEffect(() => {
    if( messageBotSettingsData) {
      setReceiveOnlyValue(messageBotSettingsData.messageReceived)
    }
  },[messageBotSettingsData, setReceiveOnlyValue])

  const handleChangeReceiveOnly = (value: ReceiveOnlyValueType) => {
    if(user) {
      updateMessageBotSettings({userId: user.id, dto: {messageReceived: value}});
      setReceiveOnlyValue(value);
    }
  };

  return (
    <SettingItem
      list={RECEIVEONLYLIST}
      title="Receive only:"
      checkedValue={receiveOnlyValue}
      handleReceiveOnly={handleChangeReceiveOnly}
    />
  );
}
