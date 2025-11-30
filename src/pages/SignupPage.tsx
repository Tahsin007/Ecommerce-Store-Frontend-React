import React from 'react';
import { SignupForm } from '../components/features/auth/SignupForm';
import './AuthPages.css';

export const SignupPage: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <SignupForm />
      </div>
    </div>
  );
};