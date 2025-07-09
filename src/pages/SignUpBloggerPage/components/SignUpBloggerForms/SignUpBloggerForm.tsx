import { ChangeEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';

import Button from 'components/UI/Button';
import { SignUpTabsType } from 'pages/SignUpBloggerPage/SignUpBloggerPage';
import { setAuthInitialization, setToken } from 'store/slices/authSlice';
import AuthMethods from 'api/auth/AuthMethods';
import { useAppDispatch } from 'hooks/store';
import AttachIcon from 'assets/icons/AttachIcon';

import styles from './SignUpBloggerForm.module.scss';

type FormData = {
  email: string;
  password: string;
  repeatPassword: string;
  description: string;
  name: string;
};

interface SignUpBloggerFormProps {
  setTabs: (value: SignUpTabsType) => void;
}

export default function SignUpBloggerForm({ setTabs }: SignUpBloggerFormProps) {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        console.log(data);

        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('repeatPassword', data.repeatPassword);
        formData.append('description', data.description);
        formData.append('name', data.name);

        if (file) {
            formData.append('avatar', file);
        }

        const { access_token } = await AuthMethods.bloggerRegister(formData);
        dispatch(setToken(access_token));
        dispatch(setAuthInitialization(true));
        setTabs('study');
    };

  console.log(file)

  const handleChangeFile = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setFile(event.target.files[0]);
      }
    },
    [setFile],
  );

  return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
              type="text"
              placeholder="Email"
              autoComplete="off"
              className={styles.form__input}
              {...register('email', {required: true})}
          />
          <input
              type="text"
              placeholder="Name"
              autoComplete="off"
              className={styles.form__input}
              {...register('name')}
          />
          <textarea
              className={clsx(styles.form__textarea, styles.form__input)}
              placeholder="Tell us a little about yourself"
              {...register('description')}
          />
          <input
              type="password"
              placeholder="Create a password"
              autoComplete="off"
              className={styles.form__input}
              {...register('password', {required: true, minLength: 6})}
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
          <label className={styles.form__file}>
              <AttachIcon width={18} height={18}/>
              {file ? file.name : 'Upload an avatar'}
              <input type="file" accept="image/png, image/gif, image/jpeg"  onChange={handleChangeFile}/>
          </label>
          {errors.repeatPassword && (
              <span className={styles.error}>{errors.repeatPassword.message}</span>
          )}
          <Button type="submit" variants="filled" className={styles.form__submit}>
              Signup
          </Button>
          <div className={styles.form__redirect}>
              Already have an account?{' '}
              <Link className={styles.form__link} to="/">
                  Login
              </Link>
          </div>
      </form>
  );
}
