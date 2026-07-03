import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRBAC } from './context/RBACContext';
import SkeletonLoader from './SkeletonLoader';
import ForbiddenPage from './ForbiddenPage';

/**
 * Route Guard Component protecting dashboards and settings pages.
 * Validates session status and inspects user roles to grant access.
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  
  // Custom Hook to load current user context state from global RBAC Context
  const { currentUser, isLoggedIn, loading } = useRBAC();

  // 1. Render branded skeleton screen while authentication is in progress
  if (loading) {
    return <SkeletonLoader />;
  }

  // 2. If not logged in, redirect to login page with state for redirect fallback
  if (!isLoggedIn || !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Inspect if the user's role is allowed to view this specific view
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    console.error(`⛔ Access Denied: Role "${currentUser.role}" is unauthorized to view: ${location.pathname}`);
    
    // Render the dedicated 403 Forbidden page instead of silent redirect
    return <ForbiddenPage />;
  }

  // 3. Render child component once auth state is verified
  return children;
}
