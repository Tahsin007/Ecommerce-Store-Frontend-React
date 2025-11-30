import type { MessageResponse } from '../../types/common.types';
import type { UserResponse, UpdateProfileRequest, ChangePasswordRequest } from '../../types/user.types';
import axiosInstance from '../axios.config';

export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await axiosInstance.get<UserResponse>('/users/me');
  return response.data;
};

export const updateProfile = async (data: UpdateProfileRequest): Promise<UserResponse> => {
  const response = await axiosInstance.put<UserResponse>('/users/profile', data);
  return response.data;
};

export const changePassword = async (data: ChangePasswordRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>('/users/change-password', data);
  return response.data;
};