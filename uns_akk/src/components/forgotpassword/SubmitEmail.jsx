import { useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
export default function SubmitEmail() {
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    Email: Yup.string()
      .email()
      .required(t("Fill") + " " + t("Email").toLowerCase()),
  });
  async function submitEmail() {
try {
    setLoad(true)
    await CrudProvider.getItemById(
        "AccountController/get-user-by-email",
        email
      ).then((res) => {
        console.log(res)
        if (res) {
          if (res.statusCode === 200) {
            navigate(`/reset-password/${res.result}`);
          } else {
            toast.error(res.errorMessages[0]);
          }
        }
      });
} finally {
    setLoad(false)
}
  
  }
  const formik = useFormik({
    initialValues: {},
    validateOnMount: false,
    validateOnChange: false,
    validationSchema: LoginSchema,
    onSubmit: async () => submitEmail(),
  });
  return (
    <div
      className="account-pages pt-5 animation"
      style={{ marginTop: "100px" }}
    >
      <div className="container d-flex justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-4">
          <form onSubmit={formik.handleSubmit}>
            <div className="card">
              <div className="card-body p-4">
                <div className="mb-3">
                  <label htmlFor="emailaddress" className="form-label">
                    {t("Email")}
                  </label>
                  <input
                    className="form-control"
                    autoComplete="off"
                    type="text"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      formik.setFieldValue("Email", e.target.value);
                    }}
                    id="emailaddress"
                    required=""
                    placeholder={t("Email")}
                  />
                  {formik.errors.Email && (
                    <span className="text-danger">{formik.errors.Email}</span>
                  )}
                </div>
                <div className="mb-3 d-grid text-center">
                  {!load ? (
                    <button className="btn btn-primary" type="submit">
                      {t("Continue")}
                    </button>
                  ) : (
                    <div className="col-xxl-12 col-lg-12 col-sm-12 text-center">
                      <div
                        className="spinner-border text-primary m-2 text-center"
                        role="status"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
          <div className="row mt-3">
            <div className="col-12 text-center">
              <p className="text-muted">
                <Link to="/login" className="text-dark ms-1">
                  <i className="fe-arrow-left" />
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
