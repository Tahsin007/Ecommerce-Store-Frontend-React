import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { useAuth } from '../../../hooks/useAuth';
import type { SignupRequest } from '../../../types/auth.types';

export const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupRequest>({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState<Partial<SignupRequest>>({});
  const { signup, isLoading } = useAuth();

  const validate = (): boolean => {
    const newErrors: Partial<SignupRequest> = {};
    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      signup(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign Up</h2>
      <Input
        label="Username"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        placeholder="Choose a username"
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter your email"
      />
      <Input
        label="First Name"
        name="firstName"
        type="text"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Enter first name (optional)"
      />
      <Input
        label="Last Name"
        name="lastName"
        type="text"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Enter last name (optional)"
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Choose a password"
      />
      <Button type="submit" isLoading={isLoading}>
        Sign Up
      </Button>
      <p className="form-footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};