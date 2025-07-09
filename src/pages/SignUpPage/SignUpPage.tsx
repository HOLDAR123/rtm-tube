import clsx from 'clsx';

import SignupForm from 'components/SignupForm';
import { useAppSelector } from 'hooks/store';

import styles from './SignUpPage.module.scss';

export default function SignUpPage() {
  const { theme } = useAppSelector((state) => state.theme);
  return (
    <div
      className={clsx(styles.signUp, {
        [styles.dark]: theme === 'dark',
      })}
    >
      <div className={styles.container}>
        <h2 className={styles.signUp__title}>Signup</h2>
        <SignupForm />
      </div>
    </div>
  );
}
