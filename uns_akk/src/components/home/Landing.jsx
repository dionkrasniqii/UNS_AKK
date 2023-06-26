import React, { useEffect, useRef, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import $ from "jquery";
import SearchingForms from "../search/SearchingForms";
import { useDispatch, useSelector } from "react-redux";
import { showMobileLanding } from "../../store/actions";
import CrudProvider from "../../provider/CrudProvider";
import BarChart from "../charts/BarChart";

export default function Landing() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [showSearchForm, setShowSearchForm] = useState(false);
  const showMobile = useSelector(
    ({ mobileList }) => mobileList.showmobile_landing
  );
  const navRef = useRef(null);

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

  useEffect(() => {
    CrudProvider.getAll("StatisticsAPI/GetStatisticsForLanding").then((res) => {
      if (res) {
        switch (res.statusCode) {
          case 200:
            setData(res.result);
            break;
        }
      }
    });
  }, []);

  const data2 = {
    labels: [],
    datasets: [
      {
        label: "Statistika",
        data: [], // Sample sales data
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  Object.entries(data).forEach((obj) => {
    data2.labels.push(t(obj[0]));
    data2.datasets[0].data.push(obj[1]);
  });

  return (
    <>
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
                    <a
                      className='nav-link arrow-none'
                      onClick={(e) => setShowSearchForm(false)}
                      id='topnav-dashboard'
                      role='button'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      <i className='mdi mdi-view-dashboard me-1' />
                      {t("Home")}
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      className='nav-link arrow-none'
                      id='topnav-dashboard'
                      role='button'
                      onClick={(e) => setShowSearchForm(true)}
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      <i className='fe-search me-1' />
                      {t("SearchForms")}
                    </a>
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
      <div className='content-page-landing navbar-costum-padding'>
        <div className='content mb-5'>
          <div className='container-fluid d-flex justify-content-center '>
            {showSearchForm ? (
              <SearchingForms />
            ) : (
              <div className='col-10'>
                <div className='card'>
                  <div className='card-body'>
                    <BarChart data={data2} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className='footer footer-landing  mt-5'>
        <div className='container-fluid text-center m-0'>
          <div className='col-12'>
            {new Date().getFullYear()} © All rights reserved by{" "}
            <a href='http://www.unisoft-rks.com/' target='_blank'>
              UniSoft
            </a>{" "}
          </div>
        </div>
      </footer>
    </>
  );
}
