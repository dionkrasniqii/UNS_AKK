import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import smallLogo from "./../../assets/images/sm.png";
import { useDispatch, useSelector } from "react-redux";
import { showMobileLanding } from "../../store/actions";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import $ from "jquery";

export default function NavbarLanding() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const showMobile = useSelector(
    ({ mobileList }) => mobileList.showmobile_landing
  );
  const navRef = useRef(null);
  const [showSearchForm, setShowSearchForm] = useState(false);

  useEffect(() => {
    const hamburger = document.getElementById("hamburger");
    location.pathname === "/login"
      ? hamburger.classList.add("d-none")
      : hamburger.classList.remove("d-none");
  }, [location]);
  async function changeLang(e) {
    i18next.changeLanguage(e);
  }
  useEffect(() => {
    const mainNavDiv = document.getElementById("mainNavLanding");
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !mainNavDiv.contains(event.target)
      ) {
        dispatch(showMobileLanding(false));
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className='navbar-custom navbar-costum-padding' id='mainNavLanding'>
      <div className='container-fluid'>
        <ul className='list-unstyled topnav-menu float-end mb-0'></ul>

        <div className='logo-box bg-dark-custom ' style={{ height: "67px" }}>
          <Link to='/' className='logo logo-dark text-center'>
            <span className='logo-lg text-center'>
              <img src={smallLogo} alt='' height={50} loading='lazy' />
            </span>
            <span className='logo-sm text-center'>
              <img src={smallLogo} alt='' height={30} loading='lazy' />
            </span>
          </Link>
        </div>
        <ul className='list-unstyled topnav-menu topnav-menu-left onlyMobile mb-0'>
          <li>
            {/* Mobile menu toggle (Horizontal Layout)*/}
            <a
              onClick={(e) => {
                dispatch(showMobileLanding(!show));
                setShow(!show);
              }}
              id='hamburger'
              className='navbar-toggle nav-link collapsed'
              data-bs-toggle='collapse'
              data-bs-target='#topnav-menu-content'
              aria-expanded='false'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={25}
                height={25}
                fill='currentColor'
                className='bi bi-list'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
                />
              </svg>
            </a>
          </li>
        </ul>
        <div className='clearfix' />
      </div>
      <div className='topnav navbar-costum-padding'>
        <div className='container-fluid'>
          <nav
            className='navbar navbar-light navbar-expand-lg topnav-menu'
            ref={navRef}
          >
            <div
              className={`collapse navbar-collapse ${
                showMobile ? "show animate" : ""
              }`}
              id='topnav-menu-content'
            >
              <ul className='d-flex justify-content-between active w-100'>
                <div className='navbar-nav nav-item-end'>
                  <li className='nav-item'>
                    <Link
                      to={"/"}
                      className='nav-link arrow-none'
                      id='topnav-dashboard'
                      role='button'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      <i className='mdi mdi-view-dashboard me-1' />
                      {t("Home")}
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link arrow-none'
                      to='/application-form'
                      id='topnav-dashboard'
                      role='button'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      <i className='ti-pencil me-1' /> {t("ApplyForm")}
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      to={"/search-forms"}
                      className='nav-link arrow-none'
                      id='topnav-dashboard'
                      role='button'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      <i className='fe-search me-1' />
                      {t("SearchForms")}
                    </Link>
                  </li>
                </div>
                <div className='navbar-nav nav-item-end active'>
                  <div className='nav-item dropdown '>
                    <a
                      className='nav-link dropdown-toggle arrow-none'
                      id='topnav-layout'
                      role='button'
                      data-bs-toggle='dropdown'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      <i className='mdi mdi-card-bulleted-settings-outline me-1' />
                      {t("Languages")} <div className='arrow-down' />
                    </a>
                    <div
                      className='dropdown-menu active'
                      aria-labelledby='topnav-layout'
                    >
                      <a
                        className='dropdown-item '
                        onClick={(e) => changeLang("1")}
                      >
                        <label>AL</label>
                      </a>
                      <a
                        className='dropdown-item '
                        onClick={(e) => changeLang("2")}
                      >
                        <label className='fs-6'>ENG</label>
                      </a>
                    </div>
                  </div>
                  <div className='nav-item'>
                    <Link
                      className='nav-link arrow-none'
                      to='/login'
                      id='topnav-dashboard'
                      role='button'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      <i className='fe-log-in me-1' /> {t("Login")}
                    </Link>
                  </div>
                </div>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
