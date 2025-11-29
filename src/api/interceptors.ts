import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import axiosInstance from './axios.config';
import type { AuthResponse } from '../types/auth.types';



let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                // No refresh token, redirect to login
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                const { data } = await refreshTokenRequest({ refreshToken });
                const { accessToken, refreshToken: newRefreshToken } = data;

                // Store new tokens
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                // Update the authorization header
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                }

                processQueue(null, accessToken);
                isRefreshing = false;

                // Retry the original request
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError as Error, null);
                isRefreshing = false;

                // Refresh failed, clear storage and redirect to login
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const setupInterceptors = () => {
    // Already set up above
};

function refreshTokenRequest(payload: {
    refreshToken: string;
}): Promise<AxiosResponse<AuthResponse>> {
    return axiosInstance.post('/auth/refresh', payload);
}
