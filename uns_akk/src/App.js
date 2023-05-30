import logo from "./logo.svg";
import "./App.css";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const path = useLocation();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
  });
  const navigate = useNavigate();

  return (
    <div className='App'>
      <ToastContainer
        position='top-right'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        style={{ fontSize: "14px" }}
      />
      {/* <AppRoutes
        loginFunction={handleLogin}
        isAuth={authState}
        isComponentToConfirm={isComponentToConfirm}
      /> */}
    </div>
  );
}

export default App;
