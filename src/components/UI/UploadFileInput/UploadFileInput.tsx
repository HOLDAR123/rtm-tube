import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import AddIcon from 'assets/icons/AddIcon';
import UploadFiles from 'assets/icons/UploadFiles';

import styles from './UploadFileInput.module.scss';

interface UploadFileInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function UploadFileInput({
  className,
  ...props
}: UploadFileInputProps) {
  return (
    <label className={clsx(styles.upload, className)}>
      <AddIcon width={32} height={32} />
      <input type="file" className={styles.input} {...props} />
    </label>
  );
}
