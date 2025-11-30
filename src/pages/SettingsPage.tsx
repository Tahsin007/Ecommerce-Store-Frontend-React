import React from 'react';
import { ProfileForm } from '../components/features/user/ProfileForm';
import { PasswordChangeForm } from '../components/features/user/PasswordChangeForm';
import styles from './SettingsPage.module.css';

export const SettingsPage: React.FC = () => {
  return (
    <div className={styles.settingsPage}>
      <h1>Settings</h1>
      <div className={styles.settingsContent}>
        <div className={styles.settingsSection}>
          <ProfileForm />
        </div>
        <div className={styles.settingsSection}>
          <PasswordChangeForm />
        </div>
      </div>
    </div>
  );
};