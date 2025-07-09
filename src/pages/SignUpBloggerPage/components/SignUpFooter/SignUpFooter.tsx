import { Link } from 'react-router-dom';

import Button from 'components/UI/Button';

import styles from './SignUpFooter.module.scss';

interface SignUpFooterProps {
  onClick: () => void;
  text?: string
}

export default function SignUpFooter({ onClick, text = 'Next' }: SignUpFooterProps) {
  return (
    <div className={styles.actions}>
      <Button className={styles.button} variants="filled" onClick={onClick}>
        {text}
      </Button>
      <Link to="/settings" className={styles.link}>
        I'll do it later
      </Link>
    </div>
  );
}
