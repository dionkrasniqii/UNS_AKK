import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import smallLogo from "./../../assets/images/sm.png";
import { useDispatch, useSelector } from "react-redux";
import { showMobileLanding } from "../../store/actions";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import usePagination from "@mui/material/usePagination/usePagination";

export default function NavbarLanding() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const showMobile = useSelector(
    ({ mobileList }) => mobileList.showmobile_landing
  );
  const navRef = useRef(null);

  useEffect(() => {
    const mainNavDiv = document.getElementById("mainNavLanding");
    const secondNav = document.getElementById("secondNav");
    const hamburger = document.getElementById("hamburger");
    if (
      location.pathname === "/login" ||
      location.pathname === "/submit-email" ||
      location.pathname.split("/").some((path) => path === "reset-password")
    ) {
      mainNavDiv.classList.add("d-none");
      secondNav.classList.add("d-none");
      hamburger.classList.add("d-none");
    } else {
      mainNavDiv.classList.remove("d-none");
      secondNav.classList.remove("d-none");
      hamburger.classList.remove("d-none");
    }
  }, [location]);
  async function changeLang(e) {
    i18next.changeLanguage(e);
    localStorage.setItem("Language", e);
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
    <div className="navbar-custom navbar-costum-padding" id="mainNavLanding">
      <div className="container-fluid">
        <ul className="list-unstyled topnav-menu float-end mb-0"></ul>

        <div className="logo-box bg-dark-custom " style={{ height: "67px" }}>
          <Link to="/" className="logo logo-dark text-center">
            <span className="logo-lg text-center">
              <img src={smallLogo} alt="" height={50} loading="lazy" />
            </span>
            <span className="logo-sm text-center">
              <img src={smallLogo} alt="" height={30} loading="lazy" />
            </span>
          </Link>
        </div>
        <ul className="list-unstyled topnav-menu topnav-menu-left onlyMobile mb-0">
          <li>
            <a
              onClick={(e) => {
                dispatch(showMobileLanding(!show));
                setShow(!show);
              }}
              id="hamburger"
              className="navbar-toggle nav-link collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#topnav-menu-content"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </a>
          </li>
        </ul>
        <div className="clearfix" />
      </div>
      <div className="topnav navbar-costum-padding" id="secondNav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            ref={navRef}
          >
            <div
              className={`collapse navbar-collapse ${
                showMobile ? "show animate" : ""
              }`}
              id="topnav-menu-content"
            >
              <ul className="top-navbar-costume">
                <div className="navbar-nav nav-item-end ">
                  <li className="nav-item">
                    <Link
                      to={"/"}
                      className="nav-link arrow-none"
                      id="topnav-dashboard"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="mdi mdi-view-dashboard me-1" />
                      {t("Home")}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link arrow-none"
                      to="/application-form"
                      id="topnav-dashboard"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="ti-pencil me-1" /> {t("ApplyForm")}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/search-forms"}
                      className="nav-link arrow-none"
                      id="topnav-dashboard"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fe-search me-1" />
                      {t("SearchForms")}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/professional-standards-search"}
                      className="nav-link arrow-none"
                      id="topnav-dashboard"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fe-search me-1" />
                      {t("ProfessionalStandards")}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/compentencies-search"}
                      className="nav-link arrow-none"
                      id="topnav-dashboard"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fe-search me-1" />
                      {t("Competencies")}
                    </Link>
                  </li>
                </div>
                <div className="navbar-center navbar-nav">
                  <div className="nav-item dropdown ">
                    <a
                      className="nav-link dropdown-toggle arrow-none"
                      id="topnav-layout"
                      role="button"
                      // data-bs-toggle="dropdown"
                      // aria-haspopup="true"
                      // aria-expanded="true"
                      onClick={() =>
                        setLanguageDropdownOpen(!languageDropdownOpen)
                      }
                    >
                      <i className="mdi mdi-card-bulleted-settings-outline me-1" />
                      {t("Languages")} <div className="arrow-down" />
                    </a>
                    {/* <div
                      className="dropdown-menu active"
                      aria-labelledby="topnav-layout"
                    > */}
                    <div
                      className={`dropdown-menu ${
                        languageDropdownOpen ? "show" : ""
                      }`}
                      aria-labelledby="topnav-layout"
                    >
                      <a
                        className="dropdown-item "
                        onClick={(e) => changeLang("1")}
                      >
                        <label>AL</label>
                      </a>
                      <a
                        className="dropdown-item "
                        onClick={(e) => changeLang("2")}
                      >
                        <label className="fs-6">ENG</label>
                      </a>
                      <a
                        className="dropdown-item "
                        onClick={(e) => changeLang("3")}
                      >
                        <label className="fs-6">SR</label>
                      </a>
                    </div>
                  </div>
                  <div className="nav-item">
                    <Link
                      className="nav-link arrow-none"
                      to="/login"
                      id="topnav-dashboard"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fe-log-in me-1" /> {t("Login")}
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
