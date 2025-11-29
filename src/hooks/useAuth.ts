import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { setCredentials, logout as logoutAction } from '../store/slices/authSlice';


import { toast } from 'react-toastify';
import { loginRequest, signupRequest, forgotPasswordRequest, resetPasswordRequest } from '../api/endpoints/auth.api';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      dispatch(
        setCredentials({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );
      toast.success('Login successful!');
      navigate('/');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });

  const signupMutation = useMutation({
    mutationFn: signupRequest,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate('/login');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Signup failed');
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPasswordRequest,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Request failed');
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPasswordRequest,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate('/login');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Reset failed');
    },
  });

  const logout = () => {
    dispatch(logoutAction());
    toast.info('Logged out successfully');
    navigate('/login');
  };

  return {
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    logout,
    isLoading:
      loginMutation.isPending ||
      signupMutation.isPending ||
      forgotPasswordMutation.isPending ||
      resetPasswordMutation.isPending,
  };
};