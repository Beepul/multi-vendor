import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loading, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const location = useLocation();

  if (loading !== "pending") {
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  }
};

export default ProtectedRoute;