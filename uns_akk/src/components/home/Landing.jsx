import React, { useState } from "react";
import i18next from "i18next";
import SearchCertificate from "../search/SearchCertificate";
import { useTranslation } from "react-i18next";
import NavbarLanding from "./NavbarLanding";
import { Link } from "react-router-dom";
import $ from "jquery";
import SearchInstitution from "../search/SearchInstitution";
export default function Landing() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  async function changeLang(e) {
    i18next.changeLanguage(e);
  }

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 0) {
      $(".topnav").addClass("hidden");
    } else {
      $(".topnav").removeClass("hidden");
    }
  });
  return (
    <>
      <div className='topnav navbar-costum-padding'>
        <div className='container-fluid'>
          <nav className='navbar navbar-light navbar-expand-lg topnav-menu'>
            <div className='collapse navbar-collapse ' id='topnav-menu-content'>
              <ul className='navbar-nav active'>
                <li className='nav-item'>
                  <Link
                    className='nav-link arrow-none'
                    to='/'
                    id='topnav-dashboard'
                    role='button'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <i className='mdi mdi-view-dashboard me-1' />
                    {t("Home")}
                  </Link>
                </li>
                <li className='nav-item '>
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
                </li>
                <li className='nav-item dropdown '>
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
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className='content-page-landing navbar-costum-padding content-custom'>
        <div className='content mb-5'>
          <div className='container-fluid d-flex justify-content-center'>
            <div className='col-md-10'>
              <div className='card'>
                <div className='card-body'>
                  <h4 className='header-title mb-4 text-uppercase'>
                    {t("FormsForSearch")}
                  </h4>
                  <ul className='nav nav-pills navtab-bg nav-justified'>
                    <li className='nav-item'>
                      <a
                        type='button'
                        onClick={() => handleTabClick("1")}
                        aria-expanded={activeTab === "1" ? "true" : "false"}
                        className={`nav-link ${
                          activeTab === "1" ? " active" : ""
                        }`}
                      >
                        {t("Certificate")}
                      </a>
                    </li>
                    <li className='nav-item'>
                      <a
                        type='button'
                        onClick={() => handleTabClick("2")}
                        data-bs-toggle='tab'
                        aria-expanded={activeTab === "2" ? "true" : "false"}
                        className={`nav-link ${
                          activeTab === "2" ? " active" : ""
                        }`}
                      >
                        {t("Institucion1")}
                      </a>
                    </li>
                  </ul>
                  <div className='tab-content'>
                    <div
                      className={`tab-pane animation ${
                        activeTab === "1" ? "show active" : ""
                      }`}
                    >
                      <SearchCertificate />
                    </div>
                    <div
                      className={`tab-pane animation ${
                        activeTab === "2" ? "show active" : ""
                      }`}
                    >
                      <SearchInstitution />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className='footer footer-landing mt-5'>
          <div className='container-fluid m-0'>
            <div className='row'>
              <div className='col-md-6'>
                {new Date().getFullYear()} © All rights reserved by{" "}
                <a href='http://www.unisoft-rks.com/' target='_blank'>
                  UniSoft
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
