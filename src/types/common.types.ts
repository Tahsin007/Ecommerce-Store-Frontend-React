export interface MessageResponse {
  message: string;
}

export interface ErrorResponse {
  status: number;
  message: string;
  timestamp: string;
  path: string;
}

export interface ValidationError {
  [field: string]: string;
}

export interface ApiError {
  message: string;
  errors?: ValidationError;
}