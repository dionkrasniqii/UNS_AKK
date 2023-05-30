import React from "react";
import { FallingLines } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className='container'>
      <div className='col-xxl-12 col-lg-12 col-md-10 col-sm-12 d-flex justify-content-center align-items-center  mt--100 mb--100'>
        <FallingLines
          color='red'
          width='250'
          visible={true}
          ariaLabel='falling-lines-loading'
        />
        <h4>Please wait</h4>
      </div>
    </div>
  );
}
