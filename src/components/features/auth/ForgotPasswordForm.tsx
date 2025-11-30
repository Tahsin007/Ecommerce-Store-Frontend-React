import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { useAuth } from '../../../hooks/useAuth';
import type { ForgotPasswordRequest } from '../../../types/auth.types';

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { forgotPassword, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Valid email is required');
      return;
    }
    forgotPassword({ email });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Forgot Password</h2>
      <p className="form-description">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <Input
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError('');
        }}
        error={error}
        placeholder="Enter your email"
      />
      <Button type="submit" isLoading={isLoading}>
        Send Reset Link
      </Button>
      <p className="form-footer">
        Remember your password? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};