import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import Button from 'components/UI/Button';
import { useFetchMyProfile } from 'hooks/query/useFetchMyProfile';
import { RoleEnum } from 'types/interfaces/role.enum';
import { checkRole } from 'utils/checkRole';

import styles from './SettingPage.module.scss';
import { useFetchSubscriptionsByBloggerId } from '../../hooks/query/useFetchSubscriptionsByBloggerId';

export default function SettingPage() {
  const { user } = useFetchMyProfile();
  const { bloggerSubscriptionsChatData, refetch } = useFetchSubscriptionsByBloggerId(user?.id ?? 7);
  const { pathname } = useLocation();

  console.log(bloggerSubscriptionsChatData);

  useEffect(() => {
    if (user?.id) {
      refetch();
    }
  }, [user?.id, refetch]);

  const isBalance = pathname === '/settings' || pathname === '/settings/referral';

  return (
      <section className={styles.setting}>
        <div className={clsx('container', styles.container)}>
          {checkRole(user?.role!, RoleEnum.BLOGGER) && isBalance && (
              <div className={styles.top}>
                <div className={styles.info}>
                  <h3 className={styles.info__title}>Balance:</h3>
                  <h4 className={styles.info__value}>
                    {user?.balance || 0} $
                  </h4>
                  <Button variants="filled" className={styles.info__button}>
                    Bring out
                  </Button>
                </div>
                {pathname !== '/settings/referral' && (
                    <div className={styles.info}>
                      <h3 className={styles.info__title}>Subscribers:</h3>
                      <div className={styles.info__content}>
                        <h4 className={clsx(styles.info__value, styles.big)}>{bloggerSubscriptionsChatData?.length}</h4>
                      </div>
                    </div>
                )}
              </div>
          )}
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </section>
  );
}