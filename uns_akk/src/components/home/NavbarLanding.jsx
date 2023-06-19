import React from "react";
import { Link } from "react-router-dom";
import smallLogo from "./../../assets/images/sm.png";

export default function NavbarLanding() {
  return (
    <div className='navbar-custom navbar-costum-padding'>
      <div className='container-fluid'>
        <ul className='list-unstyled topnav-menu float-end mb-0'></ul>

        <div className='logo-box bg-dark-custom ' style={{ height: "67px" }}>
          <Link to='/' className='logo logo-dark text-center'>
            <span className='logo-lg text-start'>
              <img src={smallLogo} alt='' height={50} loading='lazy' />
            </span>
            <span className='logo-sm text-start'>
              <img src={smallLogo} alt='' height={30} loading='lazy' />
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
  );
}
