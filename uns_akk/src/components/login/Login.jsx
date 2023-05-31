import React from "react";
import { useNavigate } from "react-router";

export default function Login(props) {
  const navigate = useNavigate();
  return (
    <div className='account-pages my-5'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8 col-lg-6 col-xl-4'>
            <div className='card'>
              <div className='text-center'>
                <a href='index.html'>
                  <img
                    src='assets/images/logo_akk.jpg'
                    alt=''
                    height={70}
                    className='mx-auto mt-2'
                  />
                </a>
              </div>
              <div className='card-body p-4'>
                <div className='text-center mb-4'>
                  <h4 className='text-uppercase mt-0'>Sign In</h4>
                </div>
                <form action='#'>
                  <div className='mb-3'>
                    <label htmlFor='emailaddress' className='form-label'>
                      Username
                    </label>
                    <input
                      className='form-control'
                      type='text'
                      id='emailaddress'
                      required=''
                      placeholder='Enter your email'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                      Password
                    </label>
                    <input
                      className='form-control'
                      type='password'
                      required=''
                      id='password'
                      placeholder='Enter your password'
                    />
                  </div>
                  <div className='mb-3'>
                    <div className='form-check'>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        id='checkbox-signin'
                        defaultChecked=''
                      />
                      <label
                        className='form-check-label'
                        htmlFor='checkbox-signin'
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className='mb-3 d-grid text-center'>
                    <button
                      className='btn btn-primary'
                      type='submit'
                      onClick={(e) => {
                        props.setAuthState({
                          isAuthenticated: true,
                        });
                        navigate("/");
                      }}
                    >
                      {" "}
                      Log In{" "}
                    </button>
                  </div>
                </form>
              </div>{" "}
              {/* end card-body */}
            </div>
            {/* end card */}
            {/* end row */}
          </div>{" "}
          {/* end col */}
        </div>
        {/* end row */}
      </div>
      {/* end container */}
    </div>
  );
}
