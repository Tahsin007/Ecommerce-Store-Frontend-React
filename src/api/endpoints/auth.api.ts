// src/api/endpoints/auth.api.ts
import type { LoginRequest, AuthResponse, SignupRequest, RefreshTokenRequest, ForgotPasswordRequest, ResetPasswordRequest, VerifyEmailRequest } from '../../types/auth.types';
import type { MessageResponse } from '../../types/common.types';
import axiosInstance from '../axios.config';

export const loginRequest = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const signupRequest = async (data: SignupRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>('/auth/signup', data);
  return response.data;
};

export const refreshTokenRequest = async (data: RefreshTokenRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/refresh-token', data);
  return response.data;
};

export const forgotPasswordRequest = async (data: ForgotPasswordRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>('/auth/forgot-password', data);
  return response.data;
};

export const resetPasswordRequest = async (data: ResetPasswordRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>('/auth/reset-password', data);
  return response.data;
};

export const verifyEmailRequest = async (data: VerifyEmailRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>('/auth/verify-email', data);
  return response.data;
};