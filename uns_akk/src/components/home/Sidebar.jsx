import jwtDecode from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { t } = useTranslation();
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const role = decodedToken?.role;

  const SidebarItems = [
    //Admin
    {
      label: t("Home"),
      roles: ["Admin", "Zyrtar AKK", "Zyrtar per caktimin e eksperteve"],
      path: "/",
      hasMenu: false,
      showLabel: false,
      icon: "mdi mdi-view-dashboard-outline",
    },
    {
      label: t("Users"),
      roles: ["Admin", "Zyrtar AKK"],
      hasMenu: true,
      showLabel: true,
      icon: "mdi mdi-book-edit",
      submenu: [
        {
          label: t("Users"),
          roles: ["Admin", "Zyrtar AKK"],
          path: "/users",
          hasMenu: false,
          showLabel: true,
          icon: "fas fa-layer-group",
        },

        {
          label: t("ApplicationsForUser"),
          roles: ["Admin", "Zyrtar AKK"],
          path: "/institution-application",
          hasMenu: false,
          showLabel: true,
          icon: "fe-user",
        },
      ],
    },
    {
      label: t("QualificationTypes"),
      roles: ["Admin", "Zyrtar AKK"],
      path: "/qualifications-type",
      hasMenu: false,
      showLabel: true,
      icon: "mdi mdi-book-edit-outline",
    },
    {
      label: t("Registry"),
      roles: ["Admin", "Zyrtar AKK"],
      hasMenu: true,
      showLabel: true,
      icon: "mdi mdi-book-edit",
      submenu: [
        {
          label:"Nivelet KKK",
          roles: ["Admin", "Zyrtar AKK"],
          path: "/level",
          hasMenu: false,
          showLabel: true,
          icon: "mdi mdi-share-variant",
        },

        {
          label: t("QualificationStandarts"),
          roles: ["Admin", "Zyrtar AKK"],
          path: "/qualificationstandart",
          hasMenu: false,
          showLabel: true,
          icon: "fas fa-book",
        },
        {
          label: t("Competences"),
          roles: ["Admin", "Zyrtar AKK"],
          path: "/competences",
          hasMenu: false,
          showLabel: true,
          icon: "fas fa-cogs",
        },
        {
          label: t("Qualifications"),
          roles: ["Admin", "Zyrtar AKK"],
          path: "/qualifications",
          hasMenu: false,
          showLabel: true,
          icon: "mdi mdi-book-edit",
        },
      ],
    },
    {
      label: t("Institutions"),
      roles: ["Admin", "Zyrtar AKK"],
      path: "/institutions",
      hasMenu: false,
      showLabel: true,
      icon: "mdi mdi-calendar-blank-outline",
    },
    {
      label: t("Decisions"),
      roles: ["Admin", "Zyrtar AKK"],
      path: "/decisions",
      hasMenu: false,
      showLabel: true,
      icon: "fas fa-file-archive",
    },
    {
      label: t("Candidates"),
      roles: ["Admin", "Zyrtar AKK"],
      path: "/person",
      hasMenu: false,
      showLabel: true,
      icon: "mdi mdi-calendar-blank-outline",
    },
    {
      label: t("Reports"),
      roles: ["Admin", "Zyrtar AKK"],
      path: "/reports",
      hasMenu: false,
      showLabel: true,
      icon: "mdi mdi-microsoft-excel",
    },
    // {
    //   label: t("StatisticsReports"),
    //   roles: ["Admin", "Zyrtar AKK"],
    //   path: "/statisticsReports",
    //   hasMenu: false,
    //   showLabel: false,
    //   icon: "mdi mdi-microsoft-excel",
    // },
    /* -----------INSTITUTION------------- */
    {
      label: t("Users"),
      roles: ["Institution"],
      path: "/institution-user",
      hasMenu: false,
      showLabel: true,
      icon: "fas fa-layer-group",
    },
    {
      label: t("Groups"),
      roles: ["Institution", "Manager"],
      path: "/groups",
      hasMenu: false,
      showLabel: true,
      icon: "fas fa-layer-group",
    },
    {
      label: t("Candidates"),
      roles: ["Institution", "Manager", "Moderator"],
      path: "/students",
      hasMenu: false,
      showLabel: true,
      icon: "fe-user",
    },
    {
      label: t("ApplicationsForAccrediation"),
      roles: [
        "Admin",
        "Zyrtar per caktimin e eksperteve",
        "Zyrtar AKK",
        "Bord",
        "Ekspert",
      ],
      path: "/applications",
      hasMenu: false,
      showLabel: true,
      icon: "mdi mdi-form-select",
    },
    {
      label: t("ApplicationsForRegister"),
      roles: ["Admin", "Zyrtar per caktimin e eksperteve", "Zyrtar AKK"],
      path: "/applications-register-list",
      hasMenu: false,
      showLabel: true,
      icon: "mdi mdi-form-select",
    },
    // {
    //   label: "Aplikimet per akreditim",
    //   roles: ["Institution", "Manager"],
    //   path: "/applications-list",
    //   hasMenu: false,
    //   showLabel: true,
    //   icon: "mdi mdi-form-select",
    // },
    // {
    //   label: t("ApplyForAccreditation"),
    //   roles: ["Institution", "Manager"],
    //   path: "/application-form",
    //   hasMenu: false,
    //   showLabel: false,
    //   icon: "mdi mdi-form-select",
    // },
    {
      label: "Aplikimet per regjister",
      roles: ["Institution", "Manager"],
      path: "/register-applications-list",
      hasMenu: false,
      showLabel: true,
      icon: "mdi mdi-form-select",
    },
    {
      label: "Regjistrohu ne regjister",
      roles: ["Institution", "Manager"],
      path: "/application-for-register/1",
      hasMenu: false,
      showLabel: false,
      icon: "mdi mdi-form-select",
    },
  ];
  const navRef = useRef(null);
  useEffect(() => {
    const bodyDiv = document.getElementById("body");
    const mainNav = document.getElementById("mainNavDiv");
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !mainNav.contains(event.target)
      ) {
        bodyDiv.classList.remove("sidebar-enable");
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="left-side-menu menuitem-active " ref={navRef}>
      <div className="h-100 show" data-simplebar="init">
        <div className="simplebar-wrapper" style={{ margin: 0 }}>
          <div className="simplebar-height-auto-observer-wrapper">
            <div className="simplebar-height-auto-observer" />
          </div>
          <div className="simplebar-mask menuitem-active">
            <div
              className="simplebar-offset show"
              style={{ right: 0, bottom: 0 }}
            >
              <div
                className="simplebar-content-wrapper"
                tabIndex={0}
                role="region"
                aria-label="scrollable content"
                style={{ height: "100%", overflow: "hidden scroll" }}
              >
                <div
                  className="simplebar-content menuitem-active"
                  style={{ padding: 0 }}
                >
                  {/*- Sidemenu */}

                  <div id="sidebar-menu">
                    <ul id="side-menu">
                      {SidebarItems.map((item, index) => {
                        if (item.roles.includes(role)) {
                          return (
                            <React.Fragment key={index}>
                              {item.hasMenu ? (
                                <>
                                  {item.showLabel && (
                                    <li className="menu-title" key={index}>
                                      <strong>{item.label}</strong>
                                    </li>
                                  )}
                                  {item.submenu.map((submenuItem, index2) => {
                                    return (
                                      <li className="" key={index2}>
                                        <Link to={submenuItem.path}>
                                          <i className={submenuItem.icon} />
                                          <span>{submenuItem.label} </span>
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </>
                              ) : (
                                <>
                                  {item.showLabel && (
                                    <li className="menu-title">
                                      <strong>{item.label}</strong>
                                    </li>
                                  )}
                                  <li key={index}>
                                    <Link to={item.path}>
                                      <i className={item.icon} />
                                      <span> {item.label} </span>
                                    </Link>
                                  </li>
                                </>
                              )}
                            </React.Fragment>
                          );
                        }
                      })}
                    </ul>
                  </div>
                  {/* End Sidebar */}
                  <div className="clearfix" />
                </div>
              </div>
            </div>
          </div>
          <div
            className="simplebar-placeholder"
            style={{ width: "auto", height: 1272 }}
          />
        </div>
        <div
          className="simplebar-track simplebar-horizontal"
          style={{ visibility: "hidden" }}
        >
          <div
            className="simplebar-scrollbar"
            style={{ width: 0, display: "none" }}
          />
        </div>
        <div
          className="simplebar-track simplebar-vertical"
          style={{ visibility: "visible" }}
        >
          <div
            className="simplebar-scrollbar"
            style={{
              height: 569,
              display: "block",
              transform: "translate3d(0px, 0px, 0px)",
            }}
          />
        </div>
      </div>
      {/* Sidebar -left */}
    </div>
  );
}
