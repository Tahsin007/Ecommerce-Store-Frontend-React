import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { useAuth } from '../../../hooks/useAuth';

export const ResetPasswordForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { resetPassword, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    resetPassword({ token, newPassword: password });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Reset Password</h2>
      <Input
        label="New Password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError('');
        }}
        placeholder="Enter new password"
      />
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setError('');
        }}
        error={error}
        placeholder="Confirm new password"
      />
      <Button type="submit" isLoading={isLoading}>
        Reset Password
      </Button>
    </form>
  );
};