import React from "react";

export default function SearchCertificate() {
  return (
    <div className='row'>
      <div className='col-md-2'>
        <label>Numri personal</label>
        <input type='text' className='form-control' />
      </div>
      <div className='col-md-2'>
        <label>Emri</label>
        <input type='text' className='form-control' />
      </div>
      <div className='col-md-2'>
        <label>Mbiemri</label>
        <input type='text' className='form-control' />
      </div>
      <div className='col-md-2'>
        <label>Numri certifikates</label>
        <input type='text' className='form-control' />
      </div>
      <div className='col-md-2 d-flex align-items-center '>
        <div className='button-list'>
          <button
            type='button'
            className='btn btn-soft-primary waves-effect waves-light mt-2'
          >
            Kërko
          </button>
          <button
            type='button'
            className='btn btn-soft-secondary waves-effect mt-2'
          >
            Pastro
          </button>
        </div>
      </div>
    </div>
  );
}
