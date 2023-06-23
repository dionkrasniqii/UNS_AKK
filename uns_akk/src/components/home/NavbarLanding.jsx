import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import smallLogo from "./../../assets/images/sm.png";
import { useDispatch } from "react-redux";
import { showMobileLanding } from "../../store/actions";

export default function NavbarLanding() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hamburger = document.getElementById("hamburger");
    location.pathname === "/login"
      ? hamburger.classList.add("d-none")
      : hamburger.classList.remove("d-none");
  }, [location]);

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
    </div>
  );
}
