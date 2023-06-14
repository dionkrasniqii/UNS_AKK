import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mainLogo from "./../../assets/images/logo_akk.jpg";
import smallLogo from "./../../assets/images/sm.jpg";
import i18next from "i18next";
import CrudProvider from "../../provider/CrudProvider";

export default function Navbar(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("i18nextLng")
  );

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
    // localStorage.removeItem("role");
    localStorage.removeItem("hasShownToast");
    props.setAuthState(false);
    navigate("/");
  }

  async function changeLang(e) {
    i18next.changeLanguage(e);
    setSelectedLanguage(e);
  }
  // useEffect(() => {
  //   CrudProvider.changeLang();
  //   CrudProvider.getAll("InstitutionGroupDecisionAPI/Test");
  // }, [selectedLanguage]);
  return (
    // <div className='navbar-custom navbar-hidden bg-white border'>
    <div className='navbar-custom bg-white border'>
      <ul className='list-unstyled topnav-menu float-end mb-0'>
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
            {selectedLanguage == 1 ? (
              <img
                className='flag-icon'
                src='https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@3.5.0/flags/4x3/al.svg'
              />
            ) : selectedLanguage == 2 ? (
              <img
                className='flag-icon'
                src='https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@3.5.0/flags/4x3/gb.svg'
              />
            ) : (
              <img
                className='flag-icon'
                src='https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@3.5.0/flags/4x3/al.svg'
              />
            )}
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
              <label>
                <img
                  className='flag-icon'
                  src='https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@3.5.0/flags/4x3/al.svg'
                />{" "}
                (AL)
              </label>
            </a>
            <div className='dropdown-divider' />
            <a
              className='dropdown-item notify-item'
              onClick={(e) => changeLang("2")}
            >
              <label className='fs-6'>
                <img
                  className='flag-icon'
                  src='https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@3.5.0/flags/4x3/gb.svg'
                />{" "}
                (ENG)
              </label>
            </a>
            <div className='dropdown-divider' />
            <a
              className='dropdown-item notify-item'
              onClick={(e) => changeLang("3")}
            >
              <label className='fs-6'>
                (SR){" "}
                {/* <img
                  className='flag-icon'
                  src='https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@3.5.0/flags/4x3/rs.svg'
                  alt='UK Flag'
                /> */}
              </label>
            </a>
          </div>
        </li>

        <li className='dropdown notification-list'>
          <a
            onClick={logout}
            className='nav-link right-bar-toggle waves-effect waves-light'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={16}
              height={16}
              fill='currentColor'
              className='bi bi-box-arrow-right'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z'
              />
              <path
                fillRule='evenodd'
                d='M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'
              />
            </svg>
            Dilni
          </a>
        </li>
      </ul>
      {/* LOGO */}
      <div className='logo-box'>
        <Link to='/home' className='logo logo-dark text-center'>
          <span className='logo-lg'>
            <img src={mainLogo} alt='' height={50} />
          </span>
          <span className='logo-sm'>
            <img src={smallLogo} alt='' height={30} />
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
