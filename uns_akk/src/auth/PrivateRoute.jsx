import jwtDecode from "jwt-decode";
import { Routes, Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const role = decodedToken?.role;
  const isAuthorized = role && allowedRoles.includes(role);
  return isAuthorized ? <Component {...rest} /> : <Navigate to='/' />;
};
export default PrivateRoute;
