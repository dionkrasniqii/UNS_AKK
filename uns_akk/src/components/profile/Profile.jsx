import React, { useEffect, useState } from "react";
import CrudProvider from "../../provider/CrudProvider";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Profile() {
  const [institution, setInstitution] = useState({});
  const { t } = useTranslation();
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);

  const [model, setModel] = useState({
    Img: "",
    OldPassword: "",
    Password: "",
    ConfirmPassword: "",
  });

  useEffect(() => {
    if (token) {
      try {
        if (decodedToken.role === "Institution") {
          CrudProvider.getItemById(
            "InstitutionAPI/GetInstitution",
            decodedToken.groupsid
          ).then((res) => {
            if (res) {
              if (res.statusCode === 200) {
                setInstitution(res.result);
              }
            }
          });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  async function SubmitForm() {
    await CrudProvider.createItemWithFile(
      "UserProfileAPI/ChangeImage",
      model,console.log(model)
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataSavedSuccessfully"));
          if (model.Img !== '' && model.Password !== '') {
            localStorage.removeItem("akktoken");
            window.location.href = "/";
          } else if (model.Img !== '' && model.Password === '') {
            window.location.reload();
          } else if (model.Password !== '') {
            localStorage.removeItem("akktoken");
            window.location.href = "/";
          }
        } else if (res.statusCode === 400) {
          toast.error(t("OldPasswordNotValid"));
        } else if (res.statusCode === 401) {
          toast.error(
            t("PasswordsDoNotMatch")
          );
        }
      }
    });
  }

  const ProfileSchema = Yup.object().shape({
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
    validationOnBlur: false,
    validateOnChange: false,
    onSubmit: () => SubmitForm(),
  });

  return (
    <div className="row">
      <div className="col-lg-5">
        <div className="card">
          <div className="card-body text-center">
            <div className="text-center mb-4">
              <h2 className="text-uppercase mt-0 mb-4">{t("Profile")}</h2>
              <img
                src={CrudProvider.documentPath(institution.path)}
                alt="user-image"
                className="img-fluid rounded"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
              <h4 className="text-muted my-4">{institution.institutionName}</h4>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="row mb-3">
                <label className="col-4 col-form-label">Logo</label>
                <div className="col-6">
                  <input
                    className="form-control"
                    type="file"
                    onChange={(e) => {
                      setModel({
                        ...model,
                        Img: e.target.files[0],
                      });
                      formik.setFieldValue("Img", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-4 col-form-label">{t("CurrentPassword")}</label>
                <div className="col-6">
                  <input
                    type="password"
                    placeholder={t("CurrentPassword")}
                    className="form-control"
                    onChange={(e) => {
                      setModel({
                        ...model,
                        OldPassword: e.target.value,
                      });
                      formik.setFieldValue("OldPassword", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-4 col-form-label">{t("NewPassword")}</label>
                <div className="col-6">
                  <input
                    type="password"
                    placeholder={t("NewPassword")}
                    className="form-control"
                    onChange={(e) => {
                      setModel({
                        ...model,
                        Password: e.target.value,
                      });
                      formik.setFieldValue("Password", e.target.value);
                    }}
                  />
                  {formik.errors.Password && (
                    <span className="text-danger">
                      {formik.errors.Password}
                    </span>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-4 col-form-label">{t("PasswordConfirmation")}</label>
                <div className="col-6">
                  <input
                    type="password"
                    placeholder={t("PasswordConfirmation")}
                    className="form-control"
                    onChange={(e) => {
                      setModel({
                        ...model,
                        ConfirmPassword: e.target.value,
                      });
                      formik.setFieldValue("ConfirmPassword", e.target.value);
                    }}
                  />
                  {formik.errors.ConfirmPassword && (
                    <span className="text-danger">
                      {formik.errors.ConfirmPassword}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary waves-effect waves-light"
                  >
                    {t("Edit")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
