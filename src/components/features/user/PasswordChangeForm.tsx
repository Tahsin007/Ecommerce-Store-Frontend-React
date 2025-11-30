import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { changePassword } from '../../../api/endpoints/user.api';
import type { ChangePasswordRequest } from '../../../types/user.types';
import { toast } from 'react-toastify';
import './PasswordChangeForm.css';

export const PasswordChangeForm: React.FC = () => {
  const [formData, setFormData] = useState<ChangePasswordRequest>({
    currentPassword: '',
    newPassword: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Partial<ChangePasswordRequest & { confirmPassword: string }>>({});

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success(data.message);
      setFormData({ currentPassword: '', newPassword: '' });
      setConfirmPassword('');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to change password');
    },
  });

  const validate = (): boolean => {
    const newErrors: Partial<ChangePasswordRequest & { confirmPassword: string }> = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!formData.newPassword || formData.newPassword.length < 6) {
      newErrors.newPassword = 'New password must be at least 6 characters';
    }
    if (formData.newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      changePasswordMutation.mutate(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="password-change-form">
      <h3>Change Password</h3>
      <Input
        label="Current Password"
        name="currentPassword"
        type="password"
        value={formData.currentPassword}
        onChange={handleChange}
        error={errors.currentPassword}
        placeholder="Enter current password"
      />
      <Input
        label="New Password"
        name="newPassword"
        type="password"
        value={formData.newPassword}
        onChange={handleChange}
        error={errors.newPassword}
        placeholder="Enter new password"
      />
      <Input
        label="Confirm New Password"
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="Confirm new password"
      />
      <Button type="submit" isLoading={changePasswordMutation.isPending}>
        Change Password
      </Button>
    </form>
  );
};