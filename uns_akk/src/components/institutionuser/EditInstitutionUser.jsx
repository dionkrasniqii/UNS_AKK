import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import CustomSelect from "../custom/CustomSelect";
import jwtDecode from "jwt-decode";
import CrudProvider from "../../provider/CrudProvider";
import { setIn, useFormik } from "formik";
import { toast } from "react-toastify";
import { Checkbox } from "antd";

export default function EditInstitutionUser() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [institutionUser, setInstitutionUser] = useState({});
  const [roles, setRoles] = useState([]);
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  useEffect(() => {
    try {
      setLoad(true);
      Promise.all([
        CrudProvider.getItemById(
          "InstitutionUserAPI/GetRoles",
          decodedToken.UserId
        ).then((res) => {
          if (res) {
            if (res.statusCode === 200) {
              setRoles(res.result);
            }
          }
        }),
        CrudProvider.getItemById(
          "InstitutionUserAPI/GetInstitutionUser",
          id
        ).then((res) => {
          if (res) {
            if (res.statusCode === 200) {
              setInstitutionUser(res.result);
            }
          }
        }),
      ]);
    } finally {
      setLoad(false);
    }
  }, [id]);

  const rolesList =
    roles &&
    roles.length > 0 &&
    roles
      .map((obj) => {
        return {
          value: obj.id,
          label: obj.name,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

  function changeRoles(e) {
    setInstitutionUser({
      ...institutionUser,
      Role: e,
    });
    formik.setFieldValue("Role", e);
  }

  async function SubmitForm() {
    try {
      setLoad(true);

      await CrudProvider.updateItem(
        "InstitutionUserAPI/UpdateInstitutionUser",
        institutionUser
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            decodedToken && decodedToken.role === "Admin"
              ? navigate("/users")
              : navigate("/institution-user");
            toast.success(t("DataSavedSuccessfully"));
          }
        }
      });
    } finally {
      setLoad(false);
    }
  }

  const defaultSelectValue =
    roles &&
    roles.length > 0 &&
    roles.filter((obj) => institutionUser.role.includes(obj.name));

  const defaultOptions = Array.isArray(defaultSelectValue)
    ? defaultSelectValue.map((value) => ({
        label: value.name,
        value: value.id,
      }))
    : [];

  const dateString3 = institutionUser.birthDate;
  const date3 = new Date(dateString3);
  const year3 = date3.getFullYear();
  const month3 = String(date3.getMonth() + 1).padStart(2, "0");
  const day3 = String(date3.getDate()).padStart(2, "0");
  const birthDate = `${year3}-${month3}-${day3}`;

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => SubmitForm(),
  });
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">
          {decodedToken && decodedToken.role === "Admin"
            ? t("Modifiko përdorues")
            : t("ModifyUser")}
        </h4>
      </div>
      {Object.keys(institutionUser).length > 0 && !load ? (
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                <label>{t("ChooseRole")}:</label>
                <CustomSelect
                  hasDefaultValue={true}
                  defaultValue={defaultOptions}
                  onChangeFunction={changeRoles}
                  isMulti={true}
                  optionsList={rolesList}
                />
                {formik.errors.Role && (
                  <span className="text-danger">{formik.errors.Role}</span>
                )}
              </div>
              <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                <label>{t("Name")}:</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={institutionUser.name}
                  onChange={(e) => {
                    setInstitutionUser({
                      ...institutionUser,
                      name: e.target.value,
                    });
                    formik.setFieldValue("name", e.target.value);
                  }}
                />
                {formik.errors.name && (
                  <span className="text-danger">{formik.errors.name}</span>
                )}
              </div>
              <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                <label>{t("Surname")}:</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={institutionUser.surname}
                  onChange={(e) => {
                    setInstitutionUser({
                      ...institutionUser,
                      surname: e.target.value,
                    });
                    formik.setFieldValue("surname", e.target.value);
                  }}
                />
                {formik.errors.surname && (
                  <span className="text-danger">{formik.errors.surname}</span>
                )}
              </div>
              <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                <label>{t("PersonalNr")}:</label>
                <input
                  type="number"
                  className="form-control"
                  defaultValue={institutionUser.personalNumber}
                  onChange={(e) => {
                    setInstitutionUser({
                      ...institutionUser,
                      personalNumber: e.target.value,
                    });
                    formik.setFieldValue("personalNumber", e.target.value);
                  }}
                />
                {formik.errors.personalNumber && (
                  <span className="text-danger">
                    {formik.errors.personalNumber}
                  </span>
                )}
              </div>
              <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                <label>{t("BirthDate")}:</label>
                <input
                  type="date"
                  autoComplete="off"
                  id="basic-datepicker"
                  className="form-control flatpickr-input active"
                  value={birthDate}
                  onChange={(e) => {
                    setInstitutionUser({
                      ...institutionUser,
                      birthDate: e.target.value,
                    });
                    formik.setFieldValue("birthDate", e.target.value);
                  }}
                />
                {formik.errors.birthDate && (
                  <span className="text-danger">{formik.errors.birthDate}</span>
                )}
              </div>
              <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                <label>{t("Email")}:</label>
                <input
                  type="email"
                  className="form-control"
                  defaultValue={institutionUser.email}
                  onChange={(e) => {
                    setInstitutionUser({
                      ...institutionUser,
                      email: e.target.value,
                    });
                    formik.setFieldValue("email", e.target.value);
                  }}
                />
                {formik.errors.email && (
                  <span className="text-danger">{formik.errors.email}</span>
                )}
              </div>
              <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                <label>{t("PhoneNumber")}:</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={institutionUser.phoneNumber}
                  onChange={(e) => {
                    setInstitutionUser({
                      ...institutionUser,
                      phoneNumber: e.target.value,
                    });
                    formik.setFieldValue("phoneNumber", e.target.value);
                  }}
                />
                {formik.errors.phoneNumber && (
                  <span className="text-danger">
                    {formik.errors.phoneNumber}
                  </span>
                )}
              </div>
              <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                <label htmlFor="activeCheckbox" style={{ display: "block" }}>
                  {t("Active")}:
                </label>
                <Checkbox
                  id="activeCheckbox"
                  checked={institutionUser.active}
                  onChange={(e) => {
                    setInstitutionUser({
                      ...institutionUser,
                      active: e.target.checked,
                    });
                  }}
                  style={{ transform: "scale(1.5)", marginBottom: "5px" }}
                />
              </div>
            </div>
            <ul className="list-inline mb-0 wizard mt-3 mb-2">
              <Link
                to={
                  decodedToken && decodedToken.role === "Admin"
                    ? "/users"
                    : "/institution-user"
                }
                className="btn btn-danger waves-effect waves-light float-start"
              >
                <span className="btn-label">
                  <i className="fe-arrow-left"></i>
                </span>
                {t("Discard")}
              </Link>
              <li className="next list-inline-item float-end">
                <button
                  type="submit"
                  className="btn btn-success waves-effect waves-light"
                >
                  <span className="btn-label">
                    <i className="fe-check"></i>
                  </span>
                  {t("Edit")}
                </button>
              </li>
            </ul>
          </form>
        </div>
      ) : (
        load && (
          <div className="col-xxl-12 col-lg-12 col-sm-12 text-center">
            <div
              className="spinner-border text-primary m-2 text-center"
              role="status"
            />
          </div>
        )
      )}
    </div>
  );
}
