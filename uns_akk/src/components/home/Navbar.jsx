import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  //  const [prevScrollPos, setPrevScrollPos] = useState(0);

  //  useEffect(() => {
  //    const handleScroll = () => {
  //      const currentScrollPos = window.pageYOffset;

  //      if (prevScrollPos > currentScrollPos) {
  //        // Scrolling up
  //        document
  //          .querySelector(".navbar-custom")
  //          .classList.remove("navbar-hidden");
  //      } else {
  //        // Scrolling down
  //        document.querySelector(".navbar-custom").classList.add("navbar-hidden");
  //      }

  //      setPrevScrollPos(currentScrollPos);
  //    };

  //    window.addEventListener("scroll", handleScroll);

  //    return () => {
  //      window.removeEventListener("scroll", handleScroll);
  //    };
  //  }, [prevScrollPos]);

  useEffect(() => {
    const bodyDiv = document.getElementById("body");
    isSidebarOpen
      ? bodyDiv.classList.add("sidebar-enable")
      : bodyDiv.classList.remove("sidebar-enable");
  }, [isSidebarOpen]);

  const openSide = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  function logout() {
    localStorage.removeItem("akktoken");
    props.setAuthState(false);
  }

  return (
    // <div className='navbar-custom navbar-hidden bg-white border'>
    <div className='navbar-custom bg-white border'>
      <ul className='list-unstyled topnav-menu float-end mb-0'>
        <li className='dropdown notification-list'>
          <a
            onClick={logout}
            className='nav-link right-bar-toggle waves-effect waves-light'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={16}
              height={16}
              fill='currentColor'
              className='bi bi-box-arrow-right'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z'
              />
              <path
                fillRule='evenodd'
                d='M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'
              />
            </svg>
            Dilni
          </a>
        </li>
      </ul>
      {/* LOGO */}
      <div className='logo-box'>
        <Link to='/' className='logo logo-dark text-center'>
          <span className='logo-lg'>
            <img src='assets/images/logo_akk.jpg' alt='' height={50} />
          </span>
          <span className='logo-sm'>
            <img src='assets/images/sm.jpg' alt='' height={30} />
          </span>
        </Link>
      </div>

      <ul className='list-unstyled topnav-menu topnav-menu-left mb-0'>
        <li>
          <button
            className='button-menu-mobile disable-btn waves-effect'
            onClick={(e) => openSide()}
            id='openSidebar'
          >
            <i className='fe-menu' />
          </button>
        </li>
        <li>{/* <h4 className='page-title-main'>Ballina</h4> */}</li>
      </ul>

      <div className='clearfix' />
    </div>
  );
}
