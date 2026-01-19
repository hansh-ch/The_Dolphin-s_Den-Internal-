import React, { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. Load user if authenticated
  const { user, isGettingUser, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isGettingUser) return navigate("/login");
    },
    [isAuthenticated, isGettingUser, navigate],
  );

  if (isGettingUser) return <Loader />;

  //2 If not authenticated , redirect to login

  //3 If authenticated , show children routes
  return children;
}
