import { Link } from 'react-router-dom';

import { useFetchMyProfile } from 'hooks/query/useFetchMyProfile';
import { useAppSelector } from 'hooks/store';
import { checkRole } from 'utils/checkRole';
import ArrowIcon from 'assets/icons/ArrowIcon';
import CheckIcon from 'assets/icons/CheckIcon';
import { IList } from 'constants/setting';
import { ReceiveOnlyValueType } from '../ReceiveOnly/ReceiveOnly';

import styles from './SettingItem.module.scss';

interface SettingItemProps {
  title: string;
  list: IList[];
  checkedValue?: string;
  handleChangeTheme?: (value: string) => void;
  handleReceiveOnly?: (value: ReceiveOnlyValueType) => void;
  handleLogout?: (() => void) | null;
}

export default function SettingItem({
  title,
  list,
  checkedValue,
  handleChangeTheme = undefined,
  handleReceiveOnly = undefined,
  handleLogout = null,
}: SettingItemProps) {
  const { user } = useFetchMyProfile();
  const { theme } = useAppSelector((theme) => theme.theme);

  return (
    <div className={styles.setting}>
      <h3 className={styles.setting__title}>{title}</h3>
      <ul className={styles.list}>
        {list.map((elem) => {
          const onClick = () => {
            if (elem.value && handleChangeTheme) {
              handleChangeTheme(elem.value);
            }
            if (elem.title === 'Logout' && handleLogout) {
              handleLogout();
            }
            if (elem.value && handleReceiveOnly) {
              handleReceiveOnly(elem.value as ReceiveOnlyValueType);
            }
          };

          return (
            checkRole(user?.role!, elem.role) && (
              <li key={elem.id} className={styles.item} onClick={onClick}>
                <div className={styles.item__left}>
                  {elem.icon && elem.icon}
                  <h5 className={styles.item__title}>{elem.title}</h5>
                </div>
                <div className={styles.item__right}>
                  {elem.caption !== '' && (
                    <span className={styles.item__caption}>
                      {elem.caption === 'theme' ? theme : elem.caption}
                    </span>
                  )}
                  {!elem.isChecked ? (
                    <ArrowIcon />
                  ) : elem.value === checkedValue ? (
                    <CheckIcon />
                  ) : null}
                </div>
                {'isLinked' in elem && elem.isLinked && (
                  <Link to={elem.link} className="link" />
                )}
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
}
