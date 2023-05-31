import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AppRoutes } from "./routes/routes";
import Sidebar from "./components/home/Sidebar";
import Footer from "./components/home/Footer";
import Navbar from "./components/home/Navbar";
import PrivateRoutes from "./routes/privateroutes";

function App() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const path = useLocation();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
  });
  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate("/login");
    }
  }, []);

  const navigate = useNavigate();
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
      {!authState.isAuthenticated ? (
        <PrivateRoutes setAuthState={setAuthState} />
      ) : (
        <>
          <Navbar />
          <Sidebar />
          <div className='content-page'>
            <div className='content'>
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
