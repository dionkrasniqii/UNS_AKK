import React, { useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/app.min.css";
import "./assets/css/icons.min.css";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AppRoutes } from "./routes/routes";
import Sidebar from "./components/home/Sidebar";
import Footer from "./components/home/Footer";
import Navbar from "./components/home/Navbar";
import jwtDecode from "jwt-decode";
import { removeToken } from "./store/actions";
import NavbarLanding from "./components/home/NavbarLanding";
import Loading from "./components/loading/Loading";
import PublicFooter from "./components/home/PublicFooter";

function App() {
  const dispatch = useDispatch();
  const [oldSession, setOldSession] = useState(
    localStorage.getItem("akktoken")
  );
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    if (oldSession !== null) {
      const decodedToken = jwtDecode(oldSession);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        navigate("/");
        const hasShownToast = localStorage.getItem("hasShownToast");
        if (!hasShownToast) {
          toast.info("Seanca ka mbaruar qasuni perseri");
          localStorage.setItem("hasShownToast", true);
        }
        dispatch(removeToken());
        localStorage.removeItem("akktoken");
        localStorage.removeItem("hasShownToast");
        setOldSession(null);
        setAuthState(false);
      } else {
        setAuthState(true);
      }
    } else {
      setAuthState(false);
      dispatch(removeToken());
      localStorage.removeItem("akktoken");
    }
  }, [oldSession]);

  useEffect(() => {
    localStorage.setItem("i18nextLng", "1");
  }, []);
  if (authState === null) {
    return <Loading />;
  }

  return (
    <>
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

      {authState !== null && authState ? (
        <>
          <Navbar authState={authState} setAuthState={setAuthState} />
          <Sidebar />
        </>
      ) : (
        <NavbarLanding />
      )}
      <AppRoutes authState={authState} setAuthState={setAuthState} />
      {authState ? <Footer /> : <PublicFooter />}
    </>
  );
}

export default App;
