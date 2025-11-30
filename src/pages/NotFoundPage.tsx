import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button/Button';
import './NotFoundPage.css';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Button onClick={() => navigate('/')}>Go Home</Button>
    </div>
  );
};