import React from 'react';
import './Loader.module.css';

export const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};