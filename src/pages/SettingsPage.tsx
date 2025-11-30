import React from 'react';
import { ProfileForm } from '../components/features/user/ProfileForm';
import { PasswordChangeForm } from '../components/features/user/PasswordChangeForm';
import './SettingsPage.css';

export const SettingsPage: React.FC = () => {
  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="settings-content">
        <div className="settings-section">
          <ProfileForm />
        </div>
        <div className="settings-section">
          <PasswordChangeForm />
        </div>
      </div>
    </div>
  );
};