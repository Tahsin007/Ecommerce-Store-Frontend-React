import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { useAuth } from '../../../hooks/useAuth';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logo}>
          Online Storefront
        </Link>

        <nav className={styles.nav}>
          {isAuthenticated ? (
            <>
              <Link to="/" className={styles.navLink}>
                Home
              </Link>
              <Link to="/settings" className={styles.navLink}>
                Settings
              </Link>
              <div className={styles.userMenu}>
                <span className={styles.userName}>
                  {user?.firstName || user?.username}
                </span>
                <button className={styles.logoutBtn} onClick={logout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.navLink}>
                Login
              </Link>
              <Link to="/signup" className={`${styles.navLink} ${styles.btnSignup}`}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};