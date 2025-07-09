import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variants?: 'filled' | 'red' | 'transparent';
}

export default function Button({
  className,
  type = 'button',
  children,
  variants,
  ...props
}: ButtonProps) {
  const classNames = clsx(
    styles.button,
    className !== '' && className,
    variants === 'filled' && styles.filled,
    variants === 'transparent' && styles.transparent,
    variants === 'red' && styles.red,
  );

  return (
    <button type={type} className={classNames} {...props}>
      {children}
    </button>
  );
}
