import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AppRoutes } from "./routes/routes";
import Sidebar from "./components/home/Sidebar";
import Footer from "./components/home/Footer";
import Navbar from "./components/home/Navbar";
import jwtDecode from "jwt-decode";
import PublicRoutes from "./routes/publicRoutes";

function App() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const path = useLocation();
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(false);
  const token = localStorage.getItem("akktoken");

  useEffect(() => {
    if (token !== null) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        toast.info("Seanca ka mbaruar qasuni perseri");
        localStorage.removeItem("akktok");
        setAuthState(false);
      } else {
        setAuthState(true);
      }
    } else {
      setAuthState(false);
    }
  }, []);
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
      {authState === false ? (
        <PublicRoutes setAuthState={setAuthState} />
      ) : (
        <>
          <Navbar setAuthState={setAuthState} />
          <Sidebar />
          <div className='content-page'>
            <div className='content mt-2 '>
              <AppRoutes />
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
