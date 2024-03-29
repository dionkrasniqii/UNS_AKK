import React from "react";

export default function Footer() {
  return (
    <footer className='footer bg-white border'>
      <div className='container-fluid'>
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
  );
}
