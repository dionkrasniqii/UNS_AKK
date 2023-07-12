import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  allowedRoles,
  authState,
  setAuthState,

  ...rest
}) => {
  const token = localStorage.getItem("akktoken");
  const navigate = useNavigate();
  const decodedToken = token && jwtDecode(token);
  const role = decodedToken?.role;
  const isAuthorized = role && allowedRoles.includes(role);
  useEffect(() => {
    if (token === null) {
      setAuthState(false);
      navigate("/");
    }
  }, [token]);

  return isAuthorized ? <Component {...rest} /> : <Navigate to={"/"} />;
};

export default PrivateRoute;
