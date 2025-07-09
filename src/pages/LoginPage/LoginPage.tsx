import clsx from 'clsx';

import LoginForm from 'components/LoginForm';
import { useAppSelector } from 'hooks/store';

import styles from './LoginPage.module.scss';

export default function LoginPage() {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div
      className={clsx(styles.login, {
        [styles.dark]: theme === 'dark',
      })}
    >
      <div className={styles.container}>
        <h2 className={styles.login__title}>Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}
