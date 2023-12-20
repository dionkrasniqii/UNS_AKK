import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import smallLogo from "./../../assets/images/sm.png";
import logoAKK from "../../assets/images/mainLogo.png";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
export default function NavbarLanding() {
  const location = useLocation();
  const [scrolling, setScrolling] = useState(false);
  const [IsActive, setIsActive] = useState("");
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    {
      Name: t("Home"),
      Path: "/",
      IsList: false,
      SubItems: [],
    },
    {
      Name: "Kualifikimi i ofruar",
      Path: "/uniquePath",
      IsList: true,
      SubItems: [
        {
          Name: "Kualifikimet",
          Path: "qualifications-search",
        },
        {
          Name: "Diploma/Certifikata e ofruar",
          Path: "search-awardingbody",
        },
        {
          Name: "Certifikata të pjesshme",
          Path: "search-partial-certificate",
        },
      ],
    },
    {
      Name: "Standardet",
      Path: "/uniquePath2",
      IsList: true,
      SubItems: [
        {
          Name: "Standardet e profesionit",
          Path: "qualification-standards-search",
        },
        {
          Name: "Standardet e kualifikimit",
          Path: "qualification-standards-search",
        },
        {
          Name: "Klasifikimi i profesioneve në Kosovë",
          Path: "classification-of-professions",
        },
      ],
    },
    {
      Name: "Ofruesit",
      Path: "/institutions-search",
      IsList: false,
      SubItems: [],
    },
    {
      Name: "Shtojca e Diplomës/Certifikatës",
      Path: "/certificate-suplement-search",
      IsList: false,
      SubItems: [],
    },
    {
      Name: t("Competencies"),
      Path: "/compentencies-search",
      IsList: false,
      SubItems: [],
    },
    {
      Name: "Këshillat profesionale",
      Path: "/occupational-qualification-councils-search",
      IsList: false,
      SubItems: [],
    },
  ];
  useEffect(() => {
    if (location.pathname === "/") {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        setScrolling(scrollTop > 30);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [location.pathname]);

  useEffect(() => {
    let nav = document.getElementById("nav-sticky");
    if (location.pathname != "/") {
      nav.classList.remove("bg-none");
      nav.classList.remove("bg-blur");
      nav.classList.add("bg-dark");
    } else {
      nav.classList.add("bg-none");
      nav.classList.add("bg-blur");
      nav.classList.remove("bg-dark");
    }
  }, [location.pathname]);
  useEffect(() => {
    const mainNavDiv = document.getElementById("nav-sticky");
    const hamburger = document.getElementById("hamburger");
    if (
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/submit-email" ||
      location.pathname.split("/").some((path) => path === "reset-password")
    ) {
      mainNavDiv.classList.add("d-none");
      hamburger.classList.add("d-none");
    } else {
      mainNavDiv.classList.remove("d-none");
      hamburger.classList.remove("d-none");
    }
  }, [location]);

  async function changeLang(e) {
    i18next.changeLanguage(e);
    localStorage.setItem("Language", e);
  }

  return (
    <nav
      className={`navbar navbar-expand-lg navbarForLanding navbar-custom ${
        scrolling ? "bg-dark" : "bg-none bg-blur"
      }`}
      id="nav-sticky"
    >
      <div className="container-fluid ">
        <a className="logo ps-5 logoNavMainDiv">
          <img
            src={logoAKK}
            alt=""
            className="logo-dark logoNav"
            height={110}
          />
        </a>

        <button
          className="navbar-toggler"
          id="hamburger"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShow(!show)}
        >
          <i className="mdi mdi-menu" />
        </button>
        <div
          className={`collapse navbar-collapse ${show && "show"} pe-5`}
          id="navbarCollapse"
        >
          <ul className="navbar-nav ms-auto" id="mySidenav">
            {navItems.map((obj, index) => {
              return (
                <li className="nav-item" key={index}>
                  <Link
                    onMouseEnter={(e) => setIsActive(obj.Name)}
                    to={!obj.IsList && obj.Path}
                    className={`nav-link text-uppercase dropdown-toggle arrow-none ${
                      location.pathname === obj.Path ? "activeNav" : ""
                    }`}
                    href="#"
                    id={`topnav-layout-${index}`}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded={obj.IsList ? "true" : "false"}
                  >
                    {obj.Name}
                  </Link>
                  {obj.IsList && (
                    <div
                      onMouseLeave={(e) => setIsActive("")}
                      className={`dropdown-menu ${
                        IsActive === obj.Name ? "active show" : ""
                      }`}
                      aria-labelledby={`topnav-layout-${index}`}
                    >
                      {obj.SubItems.map((item, index1) => {
                        return (
                          <Link
                            to={item.Path}
                            className="dropdown-item text-uppercase"
                            key={index1}
                          >
                            {item.Name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            })}

            <li className="nav-item ps-3 hiddeonlaptop">
              <Link
                className="nav-link text-uppercase "
                onMouseEnter={() => setIsActive("lang")}
              >
                <i className="fas fa-language fs-4"></i>
              </Link>
              <div
                className={`dropdown-menu active ${
                  IsActive === "lang" ? "show" : ""
                }`}
                style={{ position: "absolute" }}
                aria-labelledby="topnav-layout"
                onMouseLeave={() => setIsActive("")}
              >
                <a className="dropdown-item " onClick={(e) => changeLang("1")}>
                  <label>AL</label>
                </a>
                <a className="dropdown-item " onClick={(e) => changeLang("2")}>
                  <label className="fs-6">ENG</label>
                </a>
                <a className="dropdown-item " onClick={(e) => changeLang("3")}>
                  <label className="fs-6">SR</label>
                </a>
              </div>
            </li>
            <li className="nav-item hiddeonlaptop">
              <Link className="nav-link text-uppercase" to={"/login"}>
                Qasja
              </Link>
            </li>
            <li className="nav-item hiddeonlaptop ps-3">
              <Link className="nav-link text-uppercase" to={"/login"}>
                Kërko
                <span className="ps-2">
                  <i class="ti-search fs-5"></i>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
