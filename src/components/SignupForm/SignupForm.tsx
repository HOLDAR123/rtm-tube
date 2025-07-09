import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Button from 'components/UI/Button';
import { setAuthInitialization, setToken } from 'store/slices/authSlice';
import { useAppDispatch } from 'hooks/store';
import AuthMethods from '../../api/auth/AuthMethods';

import styles from './SignupForm.module.scss';

type FormData = {
  email: string;
  password: string;
  repeatPassword: string;
  description: string;
};

export default function SignupForm() {
  const dispatch = useAppDispatch();

  const { code } = useParams<{ code: string }>();

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {

      const { access_token } = await AuthMethods.userRegister({
      ...data,
      referredCode: code,
    });
    dispatch(setToken(access_token));
    dispatch(setAuthInitialization(true));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        type="text"
        placeholder="Email"
        autoComplete="off"
        className={styles.form__input}
        {...register('email', { required: true })}
      />
      <input
        type="password"
        placeholder="Create a password"
        autoComplete="off"
        className={styles.form__input}
        {...register('password', { required: true, minLength: 6 })}
      />
      <input
        type="password"
        placeholder="Confirm the password"
        autoComplete="off"
        className={styles.form__input}
        {...register('repeatPassword', {
          required: true,
          validate: (value: string) => {
            if (watch('password') !== value) {
              return 'Пароли не совпадают!';
            }
          },
        })}
      />
      {errors.repeatPassword && (
        <span className={styles.error}>{errors.repeatPassword.message}</span>
      )}
      <Button type="submit" variants="filled" className={styles.form__submit}>
        Signup
      </Button>
      <div className={styles.form__redirect}>
        Already have an account?{' '}
        <Link className={styles.form__link} to="/token">
          Login
        </Link>
      </div>
    </form>
  );
}
