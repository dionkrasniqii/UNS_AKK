import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import CrudProvider from "../../provider/CrudProvider";

import { toast } from "react-toastify";
import MultiRoles from "./MultiRoles";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/actions";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function Login(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [model, setModel] = useState({
    Username: "",
    Password: "",
    SelectedRole: 0,
  });
  const [showMultiRolesModal, setShowMultiRolesModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const dispatch = useDispatch();

  async function loginFunction() {
    setLoad(true);
    await CrudProvider.login("AccountController/login", model).then((res) => {
      if (res) {
        switch (res.code) {
          case 200:
            toast.success(t("LoginSuccess"));
            props.setAuthState(true);
            localStorage.setItem("akktoken", res.token);
            dispatch(setToken(res.token));
            const decodedToken = jwtDecode(res.token);
            if (decodedToken.role.includes("Institution")) {
              navigate("/students");
            } else {
              navigate("/");
            }
            break;
          case 207:
            setShowMultiRolesModal(true);
            setRoles(res.roles);
            break;
          case 401:
            toast.error(t("InCorrectCreds"));
            break;
          case 405:
            toast.error(t("YourAccountIsNotActive"));
            break;
          case "ERR_NETWORK":
            toast.info(t("ServerProblems"));
            break;
          default:
            toast.error(t("InCorrectCreds"));
            break;
        }
      }
      setLoad(false);
    });
  }
  const LoginSchema = Yup.object().shape({
    Username: Yup.string().required(t("Fill") + " " + t("Username")),
    Password: Yup.string().required(t("Fill") + " " + t("Password")),
  });
  const formik = useFormik({
    initialValues: {},
    validationSchema: LoginSchema,
    onSubmit: () => loginFunction(),
  });
  return showMultiRolesModal ? (
    <MultiRoles
      roles={roles}
      model={model}
      setModel={setModel}
      setAuthState={props.setAuthState}
    />
  ) : (
    <div
      className='account-pages pt-5 animation '
      style={{ marginTop: "100px" }}
    >
      <div className='container d-flex justify-content-center'>
        <div className='col-md-8 col-lg-6 col-xl-4'>
          <form onSubmit={formik.handleSubmit}>
            <div className='card'>
              {/* <div className='text-center'>
                    <img
                      src={logo}
                      alt=''
                      height={60}
                      className='mx-auto mt-2'
                    />
                </div> */}
              <div className='card-body p-4'>
                <div className='text-center mb-4'>
                  <h4 className='text-uppercase mt-0'>{t("Login")}</h4>
                </div>
                <div className='mb-3'>
                  <label htmlFor='emailaddress' className='form-label'>
                    {t("Username")}
                  </label>
                  <input
                    className='form-control'
                    autoComplete='off'
                    type='text'
                    onChange={(e) => {
                      setModel({
                        ...model,
                        Username: e.target.value,
                      });
                      formik.setFieldValue("Username", e.target.value);
                    }}
                    id='emailaddress'
                    required=''
                    placeholder='Enter your email'
                  />
                  {formik.errors.Username && (
                    <span className='text-danger'>
                      {formik.errors.Username}
                    </span>
                  )}
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label'>
                    {t("Password")}
                  </label>
                  <input
                    className='form-control'
                    type='password'
                    autoComplete='off'
                    required=''
                    onChange={(e) => {
                      setModel({
                        ...model,
                        Password: e.target.value,
                      });
                      formik.setFieldValue("Password", e.target.value);
                    }}
                    id='password'
                    placeholder='Enter your password'
                  />
                  {formik.errors.Password && (
                    <span className='text-danger'>
                      {formik.errors.Password}
                    </span>
                  )}
                </div>
                {/* <div className='mb-3'>
                    <div className='form-check'>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        id='checkbox-signin'
                        autoComplete='off'
                        defaultChecked=''
                      />
                      <label
                        className='form-check-label'
                        htmlFor='checkbox-signin'
                      >
                        Remember me
                      </label>
                    </div>
                  </div> */}
                <div className='mb-3 d-grid text-center'>
                  {!load ? (
                    <button className='btn btn-primary' type='submit'>
                      {t("Log-In")}
                    </button>
                  ) : (
                    <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
                      <div
                        className='spinner-border text-primary m-2 text-center'
                        role='status'
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
          <div className='row mt-3'>
            <div className='col-12 text-center'>
              <p className='text-muted'>
                <Link to='/' className='text-dark ms-1'>
                  <i className='fe-arrow-left' />
                  <b> {t("Back")}</b>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
