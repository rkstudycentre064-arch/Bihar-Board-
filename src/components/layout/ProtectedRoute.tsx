import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { FullPageLoader } from '../ui/FullPageLoader';

export const ProtectedRoute = ({ 
  children,
  allowedRoles 
}: { 
  children: React.ReactNode,
  allowedRoles?: string[]
}) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
