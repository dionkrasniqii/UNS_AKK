import jwtDecode from "jwt-decode";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { t } = useTranslation();
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const role = decodedToken?.role;
  const SidebarItems = [
    //ZKPS
    {
      label: "Agjensionet",
      roles: ["Admin"],
      path: '/agencies',
      hasMenu: false,
      icon: "mdi mdi-calendar-blank-outline",
    },

    // {
    //   label: "Buxheti",
    //   hasMenu: true,
    //   icon: "mdi mdi-calendar-blank-outline",
    //   roles: ["35"],
    //   menus: [
    //     {
    //       label: `Buxheti Total`,
    //       path: "/budget/totalbudget",
    //       roles: ["35"],
    //       icon: "mdi mdi-calendar-blank-outline",
    //     },
    //     {
    //       label: `Buxheti Fakulteteve`,
    //       path: "/budget/index",
    //       icon: "mdi mdi-calendar-blank-outline",
    //       roles: ["35"],
    //     },
    //   ],
    // },
  ];

  return (
    <div className='left-side-menu menuitem-active'>
      <div className='h-100 show' data-simplebar='init'>
        <div className='simplebar-wrapper' style={{ margin: 0 }}>
          <div className='simplebar-height-auto-observer-wrapper'>
            <div className='simplebar-height-auto-observer' />
          </div>
          <div className='simplebar-mask menuitem-active'>
            <div
              className='simplebar-offset show'
              style={{ right: 0, bottom: 0 }}
            >
              <div
                className='simplebar-content-wrapper'
                tabIndex={0}
                role='region'
                aria-label='scrollable content'
                style={{ height: "100%", overflow: "hidden scroll" }}
              >
                <div
                  className='simplebar-content menuitem-active'
                  style={{ padding: 0 }}
                >
                  {/*- Sidemenu */}
                  <div id='sidebar-menu'>
                    <ul id='side-menu'>
                      {SidebarItems.map((item, index) => {
                        if (item.roles.includes(role))
                          return (
                            <>
                              {item.hasMenu ? (
                                <>
                                  <li className='menu-title' key={index}>
                                    <strong>{item.label}</strong>
                                  </li>
                                  {item.menus.map((menus, index2) => {
                                    return (
                                      <li className='ps-2' key={index2}>
                                        <Link to={menus.path}>
                                          <i className={menus.icon} />
                                          <span>{menus.label} </span>
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </>
                              ) : (
                                <>
                                  <li className='menu-title'>
                                    <strong>{item.label}</strong>
                                  </li>
                                  <li key={index}>
                                    <Link to={item.path}>
                                      <i className={item.icon} />
                                      <span> {item.label} </span>
                                    </Link>
                                  </li>
                                </>
                              )}
                            </>
                          );
                      })}
                    </ul>
                  </div>
                  {/* End Sidebar */}
                  <div className='clearfix' />
                </div>
              </div>
            </div>
          </div>
          <div
            className='simplebar-placeholder'
            style={{ width: "auto", height: 1272 }}
          />
        </div>
        <div
          className='simplebar-track simplebar-horizontal'
          style={{ visibility: "hidden" }}
        >
          <div
            className='simplebar-scrollbar'
            style={{ width: 0, display: "none" }}
          />
        </div>
        <div
          className='simplebar-track simplebar-vertical'
          style={{ visibility: "visible" }}
        >
          <div
            className='simplebar-scrollbar'
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
