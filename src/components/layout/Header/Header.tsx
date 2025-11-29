import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { useAuth } from '../../../hooks/useAuth';
import './Header.module.css';

export const Header: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Online Storefront
        </Link>

        <nav className="nav">
          {isAuthenticated ? (
            <>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/settings" className="nav-link">
                Settings
              </Link>
              <div className="user-menu">
                <span className="user-name">
                  {user?.firstName || user?.username}
                </span>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link btn-signup">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};