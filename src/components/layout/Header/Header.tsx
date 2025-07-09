import { Link, useLocation } from 'react-router-dom';

import { useFetchMyProfile } from 'hooks/query/useFetchMyProfile';
import { useHeaderRoutes } from 'hooks/useHeaderRoutes';
import LeftArrow from 'assets/icons/LeftArrow';
import LogoIcon from 'assets/icons/LogoIcon';

import styles from './Header.module.scss';

export default function Header() {
  const { pathname } = useLocation();

  const routes = useHeaderRoutes(pathname);

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <LogoIcon />
        <h3 className={styles.header__title}>Chatly.ai</h3>
      </div>
      {routes.isActive && (
        <Link to={routes.link}>
          <button className={styles.header__button}>
            {routes.isArrow && <LeftArrow />}
            {routes.title}
          </button>
        </Link>
      )}
    </header>
  );
}
