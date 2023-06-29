import React from "react";

export default function PublicFooter() {
  return (
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
  );
}
