import { Route, Routes } from "react-router";
import Login from "../components/login/Login";

export default function PrivateRoutes(props) {
  return (
    <Routes>
      <Route
        path='/login'
        element={<Login setAuthState={props.setAuthState} />}
      />
    </Routes>
  );
}
