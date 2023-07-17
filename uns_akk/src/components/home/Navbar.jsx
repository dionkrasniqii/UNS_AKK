import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import smallLogo from "./../../assets/images/sm.png";
import i18next from "i18next";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";

export default function Navbar(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("i18nextLng")
  );
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  useEffect(() => {
    const bodyDiv = document.getElementById("body");
    isSidebarOpen
      ? bodyDiv.classList.add("sidebar-enable")
      : bodyDiv.classList.remove("sidebar-enable");
  }, [isSidebarOpen]);

  const openSide = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  function logout() {
    localStorage.removeItem("akktoken");
    localStorage.removeItem("hasShownToast");
    props.setAuthState(false);
    navigate("/");
  }

  async function changeLang(e) {
    i18next.changeLanguage(e);
    setSelectedLanguage(e);
  }

  return (
    <div
      className='navbar-custom bg-white border'
      style={{ backgroundColor: "white" }}
      id='mainNavDiv'
    >
      <ul className='list-unstyled topnav-menu  float-end mb-0'>
        <li
          className={`dropdown notification-list topbar-dropdown ${
            isDropdownOpen ? "show" : ""
          }`}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <a
            className='nav-link dropdown-toggle nav-user me-0 waves-effect waves-light'
            data-bs-toggle='dropdown'
            href='#'
            role='button'
            aria-haspopup='false'
            aria-expanded='false'
          >
            <span className='pro-user-name ms-1'>
              {selectedLanguage == 1 ? (
                <span>AL</span>
              ) : selectedLanguage == 2 ? (
                <span>ENG</span>
              ) : (
                <span>SR</span>
              )}{" "}
              <i className='mdi mdi-chevron-down' />
            </span>
          </a>
          <div
            className={`dropdown-menu dropdown-menu-end profile-dropdown ${
              isDropdownOpen ? "show" : ""
            }`}
            style={{}}
          >
            <a
              className='dropdown-item notify-item'
              onClick={(e) => changeLang("1")}
            >
              <label>AL</label>
            </a>
            <div className='dropdown-divider' />
            <a
              className='dropdown-item notify-item'
              onClick={(e) => changeLang("2")}
            >
              <label className='fs-6'>ENG</label>
            </a>
            <div className='dropdown-divider' />
            <a
              className='dropdown-item notify-item'
              onClick={(e) => changeLang("3")}
            >
              <label className='fs-6'>SR</label>
            </a>
          </div>
        </li>
        <li
          className={`dropdown notification-list topbar-dropdown ${
            isProfileOpen ? "show" : ""
          }`}
          onMouseEnter={() => setProfileOpen(true)}
          onMouseLeave={() => setProfileOpen(false)}
        >
          <a
            className='nav-link dropdown-toggle nav-user me-0 waves-effect waves-light show'
            data-bs-toggle='dropdown'
            href='#'
            role='button'
            aria-haspopup='false'
            aria-expanded='true'
          >
            <i className='fe-user' style={{ fontSize: "19px" }} />
            <span className='pro-user-name ms-1'>
              {/* {institution.institutionName}{" "} */}
              <i className='mdi mdi-chevron-down'></i>
            </span>
          </a>
          <div
            className={`dropdown-menu dropdown-menu-end profile-dropdown ${
              isProfileOpen ? "show" : ""
            }`}
          >
            {decodedToken?.role !== "Admin" && (
              <Link to='/profile' className='dropdown-item notify-item'>
                <i className='fe-user'></i>
                <span>{t("Profile")}</span>
              </Link>
            )}
            <a onClick={logout} className='dropdown-item notify-item'>
              <i className='fe-log-out'></i>
              {t("Logout")}
            </a>
          </div>
        </li>
      </ul>
      {/* LOGO */}
      <div className='logo-box' style={{ height: "66px" }}>
        <Link
          to={decodedToken?.role !== "Institution" && "/home"}
          className='logo logo-dark text-center'
        >
          <span className='logo-lg text-start'>
            <img src={smallLogo} alt='' height={50} loading='lazy' />
          </span>
          <span className='logo-sm'>
            <img src={smallLogo} alt='' height={30} loading='lazy' />
          </span>
        </Link>
      </div>

      <ul className='list-unstyled topnav-menu topnav-menu-left mb-0'>
        <li>
          <button
            className='button-menu-mobile disable-btn waves-effect'
            onClick={(e) => openSide()}
            id='openSidebar'
          >
            <i className='fe-menu' />
          </button>
        </li>
        <li>{/* <h4 className='page-title-main'>Ballina</h4> */}</li>
      </ul>

      <div className='clearfix' />
    </div>
  );
}
