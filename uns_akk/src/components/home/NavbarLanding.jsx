import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import smallLogo from "./../../assets/images/sm.png";
import logoAKK from "../../assets/images/logo_akk.png";
import { useDispatch, useSelector } from "react-redux";
import { showMobileLanding } from "../../store/actions";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export default function NavbarLanding() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [invitationsDropdownOpen, setInvitationsDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [qualificationsDropdownOpen, setQualificationsDropdownOpen] =
    useState(false);
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
      location.pathname === "/register" ||
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
      <nav
        className="navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-dark"
        id="nav-sticky"
      >
        <div className="container-fluid">
          {/* LOGO */}
          <div className="logo-box bg-dark-custom " style={{ height: "67px" }}>
            <Link to="/" className="logo logo-dark text-center">
              <span className="logo-lg text-center">
                {/* <img src={smallLogo} alt="" height={50} loading="lazy" /> */}
                <img src={logoAKK} alt="" height={50} loading="lazy" />
              </span>
              <span className="logo-sm text-center">
                <img src={smallLogo} alt="" height={30} loading="lazy" />
              </span>
            </Link>
          </div>

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
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ms-auto" id="mySidenav">
              <li className="nav-item">
                <a
                  className="nav-link dropdown-toggle arrow-none text-white"
                  id="topnav-layout"
                  role="button"
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                >
                  <i className="mdi mdi-card-bulleted-settings-outline me-1" />
                  {t("Languages")} <div className="arrow-down" />
                </a>
                <div
                  className={`dropdown-menu  ${
                    languageDropdownOpen ? "show" : ""
                  }`}
                  style={{ position: "absolute" }}
                  aria-labelledby="topnav-layout"
                  onMouseLeave={() => setLanguageDropdownOpen(false)}
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
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link arrow-none fs-5 text-white"
                  to="/login"
                  id="topnav-dashboard"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fe-log-in me-1" /> {t("Login")}
                </Link>
              </li>
              <li className="nav-item">
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
          </div>
        </div>
      </nav>

      <div className="topnav navbarLanding" id="secondNav">
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
                <div className="navbar-nav nav-items-container nav-item-end ">
                  <li className="nav-item">
                    <Link
                      to={"/"}
                      className="nav-link arrow-none text-nowrap fs-5"
                      id="topnav-dashboard"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="mdi mdi-view-dashboard me-1" />
                      {t("Home")}
                    </Link>
                  </li>
                  {/* <li className="nav-item">
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
                  </li> */}
                  <li className="nav-item">
                    <Link
                      to={"/search-awardingbody"}
                      className="nav-link arrow-none text-nowrap fs-5"
                      id="topnav-dashboard"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {/* <i className="fe-search me-1" /> */}
                      {/* {t("SearchForms")} */}
                      Perfituesit
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link
                      to={"/professional-standards-search"}
                      className="nav-link arrow-none text-nowrap fs-5"
                      id="topnav-dashboard"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {t("ProfessionalStandards")}
                    </Link>
                  </li> */}
                  <div className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle arrow-none text-nowrap fs-5"
                      id="topnav-layout"
                      role="button"
                      // data-bs-toggle="dropdown"
                      // aria-haspopup="true"
                      // aria-expanded="true"
                      onClick={() =>
                        setQualificationsDropdownOpen(
                          !qualificationsDropdownOpen
                        )
                      }
                    >
                      {/* <i className="fe-search me-1" /> */}
                      Standardet dhe klasifikimi
                      <div className="arrow-down" />
                    </a>
                    {/* <div
                      className="dropdown-menu active"
                      aria-labelledby="topnav-layout"
                    > */}
                    <div
                      className={`dropdown-menu ${
                        qualificationsDropdownOpen ? "show" : ""
                      }`}
                      onMouseLeave={() => setQualificationsDropdownOpen(false)}
                      aria-labelledby="topnav-layout"
                    >
                      <Link
                        to={"/qualifications-search"}
                        className="nav-link arrow-none fs-5 "
                        id="topnav-dashboard"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Kualifikimet
                      </Link>

                      <Link
                        // to={"/classification-of-professions"}
                        className="nav-link arrow-none fs-5"
                        id="topnav-dashboard"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Standartet e profesionit
                      </Link>
                      <Link
                        to={"/professional-standards-search"}
                        className="nav-link arrow-none text-nowrap fs-5"
                        id="topnav-dashboard"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Standardet e kualifikimit
                      </Link>
                      <Link
                        to={"/classification-of-professions"}
                        className="nav-link arrow-none fs-5"
                        id="topnav-dashboard"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Klasifikimi i profesioneve në Kosovë
                      </Link>
                    </div>
                  </div>
                  <li className="nav-item">
                    <Link
                      to={"/certificate-suplement-search"}
                      className="nav-link arrow-none fs-5 text-nowrap "
                      id="topnav-dashboard"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {/* <i className="fe-search me-1" /> */}
                      Shtojca e Diplomës/Certifikatës
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/compentencies-search"}
                      className="nav-link arrow-none fs-5 text-nowrap"
                      id="topnav-dashboard"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {/* <i className="fe-search me-1" /> */}
                      {t("Competencies")}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/institutions-search"}
                      className="nav-link arrow-none fs-5 text-nowrap"
                      id="topnav-dashboard"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {/* <i className="fe-search me-1" /> */}
                      Ofruesit
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/occupational-qualification-councils-search"}
                      className="nav-link arrow-none fs-5 text-nowrap"
                      id="topnav-dashboard"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Këshillat profesionale/sektoriale
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={
                        "https://arbk.rks-gov.net/desk/inc/media/FA0E6C9D-2422-481E-8047-A2AFB4B9124C.pdf"
                      }
                      target="_blank"
                      className="nav-link arrow-none fs-5 text-nowrap"
                      id="topnav-dashboard"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      NACE Kodi i veprimtarive ekonomike
                    </Link>
                  </li>
                </div>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
