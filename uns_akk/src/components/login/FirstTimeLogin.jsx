import { useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";

export default function FirstTimeLogin({ UserId, setFirstTimeLogin }) {
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const [model, setModel] = useState({
    UserId: UserId,
    OldPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  });

  const ProfileSchema = Yup.object().shape({
    OldPassword: Yup.string().required(t("FillField")),
    Password: Yup.string().matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
      t("NewPasswordValidation")
    ),
    ConfirmPassword: Yup.string().matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
      t("NewPasswordValidation")
    ),
  });
  const formik = useFormik({
    initialValues: {},
    validationSchema: ProfileSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async () => SubmitForm(),
  });

  
  async function SubmitForm() {
    await CrudProvider.createItem(
      "AccountController/change-password",
      model
    ).then((res) => {
      if (res) {
        switch (res.code) {
          case 200:
            setFirstTimeLogin(false);
            toast.success(t("DataSavedSuccessfully"));
            break;
          default:
            toast.error(res.error);
            break;
        }
      }
    });
  }

  return (
    <div
      className='account-pages pt-5 animation '
      style={{ marginTop: "100px" }}
    >
      <div className='container d-flex justify-content-center'>
        <div className='col-md-8 col-lg-6 col-xl-4'>
          <form onSubmit={formik.handleSubmit}>
            <div className='card'>
              <div className='card-body p-4'>
                <div className='text-center mb-4'>
                  <h4 className='text-uppercase mt-0'>{t("FirstTimeLogin")}</h4>
                </div>
                <div className='row mb-3'>
                  <label className='col-form-label'>
                    {t("CurrentPassword")}
                  </label>
                  <div className='col-12'>
                    <input
                      type='password'
                      placeholder={t("CurrentPassword")}
                      className='form-control'
                      onChange={(e) => {
                        setModel({
                          ...model,
                          OldPassword: e.target.value,
                        });
                        formik.setFieldValue("OldPassword", e.target.value);
                      }}
                    />
                    {formik.errors.OldPassword && (
                      <span className='text-danger'>
                        {formik.errors.OldPassword}
                      </span>
                    )}
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className=' col-form-label'>{t("NewPassword")}</label>
                  <div className='col-12'>
                    <input
                      type='password'
                      placeholder={t("NewPassword")}
                      className='form-control'
                      onChange={(e) => {
                        setModel({
                          ...model,
                          NewPassword: e.target.value,
                        });
                        formik.setFieldValue("Password", e.target.value);
                      }}
                    />
                    {formik.errors.Password && (
                      <span className='text-danger'>
                        {formik.errors.Password}
                      </span>
                    )}
                  </div>
                </div>

                <div className='row mb-3'>
                  <label className=' col-form-label'>
                    {t("PasswordConfirmation")}
                  </label>
                  <div className='col-12'>
                    <input
                      type='password'
                      placeholder={t("PasswordConfirmation")}
                      className='form-control'
                      onChange={(e) => {
                        setModel({
                          ...model,
                          ConfirmNewPassword: e.target.value,
                        });
                        formik.setFieldValue("ConfirmPassword", e.target.value);
                      }}
                    />
                    {formik.errors.ConfirmPassword && (
                      <span className='text-danger'>
                        {formik.errors.ConfirmPassword}
                      </span>
                    )}
                  </div>
                </div>
                <div className='mb-3 d-grid text-center'>
                  {!load ? (
                    <button className='btn btn-primary' type='submit'>
                      {t("Save")}
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
