import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  // If not authenticated or user isn't admin, redirect to login
  if (!isAuthenticated || !user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
