import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProgressBar from "../custom/ProgressBar";
import CustomSelect from "../custom/CustomSelect";
import { useNavigate, Link } from "react-router-dom";
import CrudProvider from "../../provider/CrudProvider";
import jwtDecode from "jwt-decode";
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomDatePicker from "../custom/CustomDatePicker";
import { toast } from "react-toastify";

export default function CreateInstitutionUser() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [roles, setRoles] = useState([]);
  const [load, setLoad] = useState(false);
  const [model, setModel] = useState({
    Name: "",
    Surname: "",
    Email: "",
    PersonalNumber: "",
    PhoneNumber: "",
    BirthDate: "",
    InstitutionId:
      decodedToken && decodedToken.role === "Admin"
        ? null
        : decodedToken.groupsid,
    Role: "",
  });
  useEffect(() => {
    CrudProvider.getItemById(
      "InstitutionUserAPI/GetRoles",
      decodedToken.UserId
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setRoles(res.result);
        }
      }
    });
  }, []);

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
    setModel({
      ...model,
      Role: e,
    });
    formik.setFieldValue("Role", e);
  }

  async function SubmitForm() {
    try {
      setLoad(true);
      await CrudProvider.createItem(
        "InstitutionUserAPI/CreateInstitutionUser",
        model
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            decodedToken && decodedToken.role === "Admin"
              ? navigate("/users")
              : navigate("/institution-user");
            toast.success(t("DataSavedSuccessfully"));
          } else if (res.statusCode === 409) {
            toast.error(t("UserExists"));
          }
        }
      });
    } finally {
      setLoad(false);
    }
  }

  const CreateInstitutionUser = Yup.object().shape({
    Name: Yup.string().max(200).required(t("FillName")),
    Surname: Yup.string().max(200).required(t("FillSurname")),
    Email: Yup.string().max(256).required(t("PleaseFillEmail")),
    PersonalNumber: Yup.string()
      .required(t("FillPersonalNumber"))
      .matches(/^\d{10}$/, t("PersonalNumberLimit")),
    PhoneNumber: Yup.string().required(t("PleaseFillPhoneNumber")),
    BirthDate: Yup.string().required(t("FillBirthDate")),
    Role: Yup.array().required(t("PleaseChooseRole")),
  });

  function formatedDate(date) {
    const [day, month, year] = date.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  function changeBirthDate(date, dateString) {
    setModel({
      ...model,
      BirthDate: formatedDate(dateString),
    });
    formik.setFieldValue("BirthDate", dateString);
  }

  const formik = useFormik({
    initialValues: {},
    validationSchema: CreateInstitutionUser,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async () => SubmitForm(),
  });

  return (
    <>
      <ProgressBar model={model} />
      <div className='main-content'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='card'>
              <div className='card-header'>
                <h4 className='card-title'>{decodedToken && decodedToken.role === "Admin"
              ? t("Regjistro përdorues")
              : t("RegisterInstitutionUser")}</h4>
              </div>
              <div className='card-body'>
                <form onSubmit={formik.handleSubmit}>
                  <div className='row'>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("ChooseRole")}:</label>
                      <CustomSelect
                        onChangeFunction={changeRoles}
                        isMulti={true}
                        optionsList={rolesList}
                      />
                      {formik.errors.Role && (
                        <span className='text-danger'>
                          {formik.errors.Role}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("Name")}:</label>
                      <input
                        type='text'
                        className='form-control'
                        onChange={(e) => {
                          setModel({
                            ...model,
                            Name: e.target.value,
                          });
                          formik.setFieldValue("Name", e.target.value);
                        }}
                      />
                      {formik.errors.Name && (
                        <span className='text-danger'>
                          {formik.errors.Name}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("Surname")}:</label>
                      <input
                        type='text'
                        className='form-control'
                        onChange={(e) => {
                          setModel({
                            ...model,
                            Surname: e.target.value,
                          });
                          formik.setFieldValue("Surname", e.target.value);
                        }}
                      />
                      {formik.errors.Surname && (
                        <span className='text-danger'>
                          {formik.errors.Surname}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("PersonalNr")}:</label>
                      <input
                        type='number'
                        className='form-control'
                        onChange={(e) => {
                          setModel({
                            ...model,
                            PersonalNumber: e.target.value,
                          });
                          formik.setFieldValue(
                            "PersonalNumber",
                            e.target.value
                          );
                        }}
                      />
                      {formik.errors.PersonalNumber && (
                        <span className='text-danger'>
                          {formik.errors.PersonalNumber}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("BirthDate")}:</label>
                      <CustomDatePicker onChangeFunction={changeBirthDate} />
                      {formik.errors.BirthDate && (
                        <span className='text-danger'>
                          {formik.errors.BirthDate}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("Email")}:</label>
                      <input
                        type='email'
                        className='form-control'
                        onChange={(e) => {
                          setModel({
                            ...model,
                            Email: e.target.value,
                          });
                          formik.setFieldValue("Email", e.target.value);
                        }}
                      />
                      {formik.errors.Email && (
                        <span className='text-danger'>
                          {formik.errors.Email}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("PhoneNumber")}:</label>
                      <input
                        type='text'
                        className='form-control'
                        onChange={(e) => {
                          setModel({
                            ...model,
                            PhoneNumber: e.target.value,
                          });
                          formik.setFieldValue("PhoneNumber", e.target.value);
                        }}
                      />
                      {formik.errors.PhoneNumber && (
                        <span className='text-danger'>
                          {formik.errors.PhoneNumber}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className='list-inline mb-0 wizard mt-3 mb-2'>
                    <Link
                      to={decodedToken && decodedToken.role === 'Admin' ? '/users' : '/institution-user'}
                      className='btn btn-danger waves-effect waves-light float-start'
                    >
                      <span className='btn-label'>
                        <i className='fe-arrow-left'></i>
                      </span>
                      {t("Discard")}
                    </Link>
                    <li className='next list-inline-item float-end'>
                      {!load ? (
                        <button
                          type='submit'
                          className='btn btn-success waves-effect waves-light'
                        >
                          <span className='btn-label'>
                            <i className='fe-check'></i>
                          </span>
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
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
