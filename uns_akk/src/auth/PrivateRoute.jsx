import jwtDecode from "jwt-decode";
import { Routes, Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const role = localStorage.getItem("role");
  const isAuthorized = role && allowedRoles.includes(role);
  return isAuthorized ? <Component {...rest} /> : <Navigate to='/' />;
};
export default PrivateRoute;
