import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../cont/AuthContext";
import CapybaraLoader from "./CapybaraLoader";

export default function ProtectedRoute() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <CapybaraLoader />;
  }

  if (!user || role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
