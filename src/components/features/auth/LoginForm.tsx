import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { useAuth } from '../../../hooks/useAuth';
import type { LoginRequest } from '../../../types/auth.types';

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    usernameOrEmail: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginRequest>>({});
  const { login, isLoading } = useAuth();

  const validate = (): boolean => {
    const newErrors: Partial<LoginRequest> = {};
    if (!formData.usernameOrEmail) {
      newErrors.usernameOrEmail = 'Username or email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      login(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      <Input
        label="Username or Email"
        name="usernameOrEmail"
        type="text"
        value={formData.usernameOrEmail}
        onChange={handleChange}
        error={errors.usernameOrEmail}
        placeholder="Enter username or email"
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Enter password"
      />
      <div className="form-links">
        <Link to="/forgot-password" className="link">
          Forgot Password?
        </Link>
      </div>
      <Button type="submit" isLoading={isLoading}>
        Login
      </Button>
      <p className="form-footer">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </form>
  );
};