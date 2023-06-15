import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mainLogo from "./../../assets/images/logo_akk.png";
import smallLogo from "./../../assets/images/sm.png";
import i18next from "i18next";
import SearchCertificate from "../search/SearchCertificate";

export default function Landing() {
  const [activeTab, setActiveTab] = useState("1");

  async function changeLang(e) {
    i18next.changeLanguage(e);
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <div className='navbar-custom navbar-costum-padding'>
        <div className='container-fluid'>
          <ul className='list-unstyled topnav-menu float-end mb-0'></ul>

          <div className='logo-box bg-dark-custom ' style={{ height: "67px" }}>
            <Link to='/' className='logo logo-dark text-center'>
              <span className='logo-lg text-start'>
                <img src={smallLogo} alt='' height={50} />
              </span>
              <span className='logo-sm text-start'>
                <img src={smallLogo} alt='' height={30} />
              </span>
            </Link>
          </div>
          <ul className='list-unstyled topnav-menu topnav-menu-left mb-0'>
            <li>
              <a
                className='navbar-toggle nav-link'
                data-bs-toggle='collapse'
                data-bs-target='#topnav-menu-content'
              >
                <div className='lines'>
                  <span />
                  <span />
                  <span />
                </div>
              </a>
            </li>
          </ul>
          <div className='clearfix' />
        </div>
      </div>
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
                    <i className='mdi mdi-view-dashboard me-1' /> Ballina
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
                    <i className='fe-log-in me-1' /> Qasja
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
                    Gjuhët <div className='arrow-down' />
                  </a>
                  <div
                    className='dropdown-menu active'
                    aria-labelledby='topnav-layout'
                  >
                    <a
                      className='dropdown-item '
                      onClick={(e) => changeLang("1")}
                    >
                      <label>
                        <img
                          className='flag-icon'
                          src='https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@3.5.0/flags/4x3/al.svg'
                        />
                        (AL)
                      </label>
                    </a>
                    <a
                      className='dropdown-item '
                      onClick={(e) => changeLang("2")}
                    >
                      <label className='fs-6'>
                        <img
                          className='flag-icon'
                          src='https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@3.5.0/flags/4x3/gb.svg'
                        />
                        (ENG)
                      </label>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className='content-page-landing navbar-costum-padding content-custom'>
        <div className='content '>
          <div className='container-fluid d-flex justify-content-center'>
            <div className='col-md-10'>
              <div className='card'>
                <div className='card-body'>
                  <h4 className='header-title mb-4 text-uppercase'>
                    Format e kërkimit
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
                        Certifikata
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
                        Vendime
                      </a>
                    </li>
                  </ul>
                  <div className='tab-content'>
                    <div
                      className={`tab-pane ${
                        activeTab === "1" ? "show active" : ""
                      }`}
                      id='home1'
                    >
                      <SearchCertificate />
                    </div>
                    <div
                      className={`tab-pane ${
                        activeTab === "2" ? "show active" : ""
                      }`}
                      id='profile1'
                    >
                      <p>Form 2</p>
                      <p className='mb-0'>Form 2</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
