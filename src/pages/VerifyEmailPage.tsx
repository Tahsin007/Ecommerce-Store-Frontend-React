import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { verifyEmailRequest } from '../api/endpoints/auth.api';
import { Loader } from '../components/common/Loader/Loader';
import { toast } from 'react-toastify';
import './VerifyEmailPage.css';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const verifyMutation = useMutation({
    mutationFn: verifyEmailRequest,
    onSuccess: (data) => {
      toast.success(data.message);
      setTimeout(() => navigate('/login'), 2000);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Verification failed');
      setTimeout(() => navigate('/login'), 3000);
    },
  });

  useEffect(() => {
    if (token) {
      verifyMutation.mutate({ token });
    }
  }, [token]);

  return (
    <div className="verify-email-page">
      <div className="verify-email-container">
        {verifyMutation.isPending && (
          <>
            <Loader />
            <p>Verifying your email...</p>
          </>
        )}
        {verifyMutation.isSuccess && (
          <div className="success-message">
            <h2>✓ Email Verified!</h2>
            <p>Redirecting to login...</p>
          </div>
        )}
        {verifyMutation.isError && (
          <div className="error-message">
            <h2>✗ Verification Failed</h2>
            <p>Redirecting to login...</p>
          </div>
        )}
      </div>
    </div>
  );
};