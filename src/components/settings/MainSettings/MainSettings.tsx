import { useNavigate } from 'react-router-dom';

import { removeToken } from 'store/slices/authSlice';
import { useAppDispatch } from 'hooks/store';
import { AccountList } from 'constants/setting';
import SettingItem from '../SettingItem';

import styles from './MainSettings.module.scss';

export default function MainSettings() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ACCOUNTLIST, GENERALLIST } = AccountList();

  return (
    <div className={styles.settings}>
      <SettingItem
        title="Account"
        list={ACCOUNTLIST}
        handleLogout={() => {
          dispatch(removeToken());
          navigate('/login');
        }}
      />
      <SettingItem title="General" list={GENERALLIST} />
    </div>
  );
}
