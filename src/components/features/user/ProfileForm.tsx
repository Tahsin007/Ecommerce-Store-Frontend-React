import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { getCurrentUser, updateProfile } from '../../../api/endpoints/user.api';
import type { UpdateProfileRequest } from '../../../types/user.types';
import { useAppDispatch } from '../../../store/hooks';
import { updateUser } from '../../../store/slices/authSlice';
import { toast } from 'react-toastify';
import './ProfileForm.css';

export const ProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  const [formData, setFormData] = useState<UpdateProfileRequest>({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      });
    }
  }, [user]);

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      dispatch(updateUser(data));
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h3>Profile Information</h3>
      <Input
        label="Username"
        name="username"
        type="text"
        value={user?.username || ''}
        disabled
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={user?.email || ''}
        disabled
      />
      <Input
        label="First Name"
        name="firstName"
        type="text"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Enter first name"
      />
      <Input
        label="Last Name"
        name="lastName"
        type="text"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Enter last name"
      />
      <Button type="submit" isLoading={updateProfileMutation.isPending}>
        Update Profile
      </Button>
    </form>
  );
};