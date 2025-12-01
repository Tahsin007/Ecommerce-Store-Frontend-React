import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectIsAdmin } from '../store/slices/authSlice';

interface AdminRouteProps {
    children: React.ReactElement;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const isAdmin = useAppSelector(selectIsAdmin);
    const location = useLocation();

    if (!isAdmin) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};