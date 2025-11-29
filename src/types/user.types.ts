export interface UserResponse {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isEmailVerified: boolean;
  roles: string[];
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}