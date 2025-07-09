import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import Button from 'components/UI/Button';
import { setAuthInitialization, setToken } from 'store/slices/authSlice';
import AuthMethods from 'api/auth/AuthMethods';
import { LoginUsersDto } from 'api/auth/dto/login-users.dto';
import { useAppDispatch } from 'hooks/store';

import styles from './LoginForm.module.scss';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<LoginUsersDto>();

  const onSubmit = async (data: LoginUsersDto) => {
    const { access_token } = await AuthMethods.login({
      email: data.email,
      password: data.password,
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
        placeholder="Password"
        autoComplete="off"
        className={styles.form__input}
        {...register('password', { required: true })}
      />
      <div className={styles.form__buttons}>
        <Button type="submit" variants="filled" className={styles.form__submit}>
          Login
        </Button>
        <button type="button" className={styles.form__forgotPassword}>
          Forgot password?
        </button>
      </div>
      <div className={styles.form__redirect}>
        Don`t have an account?{' '}
        <Link className={styles.form__link} to="/signup">
          Signup
        </Link>
      </div>
    </form>
  );
}
