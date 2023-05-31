import { Route, Routes } from "react-router";
import Login from "../components/login/Login";

export default function PublicRoutes(props) {
  return (
    <Routes>
      <Route path='/' element={<Login setAuthState={props.setAuthState} />} />
    </Routes>
  );
}
