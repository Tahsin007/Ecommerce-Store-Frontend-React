import React from 'react';
import { ForgotPasswordForm } from '../components/features/auth/ForgotPasswordForm';
import './AuthPages.css';

export const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};