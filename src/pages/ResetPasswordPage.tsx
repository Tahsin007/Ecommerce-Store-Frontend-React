import React from 'react';
import { ResetPasswordForm } from '../components/features/auth/ResetPasswordForm';
import './AuthPages.css';

export const ResetPasswordPage: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <ResetPasswordForm />
      </div>
    </div>
  );
};