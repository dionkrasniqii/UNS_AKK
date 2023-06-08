import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object } from "yup";
import { red } from "@mui/material/colors";
import CrudProvider from "../../provider/CrudProvider";
import ProgressBar from "../custom/ProgressBar";
import CustomSelect from "../custom/CustomSelect";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import * as Yup from "yup";
export default function CreateInstitutions() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [cities, setCities] = useState([]);
  const [model, setModel] = useState({
    InstitutionName: "",
    UniqueNumber: "",
    Address: "",
    PostalCode: "",
    PhoneNum: "",
    MunicipalityId: "",
    Email: "",
    Web: "",
    Document: "",
  });

  useEffect(() => {
    CrudProvider.getAllWithLang("GeneralAPI/GetAllMunicipalities").then(
      (res) => {
        if (res) {
          if (res.statusCode === 200) {
            setCities(res.result);
          }
        }
      }
    );
  }, []);

  const citiesList =
    cities &&
    cities.length > 0 &&
    cities
      .map((obj) => {
        return {
          value: obj.municipality.municipalityId,
          label: obj.municipalityName,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

  function changeCity(e) {
    setModel({
      ...model,
      MunicipalityId: e,
    });
    formik.setFieldValue("MunicipalityId", e);
  }

  async function SubmitForm() {
    await CrudProvider.createItemWithFile(
      "InstitutionAPI/CreateInstitution",
      model
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          navigate("/institutions");
          toast.success(t("DataSavedSuccessfully"));
        }
      }
    });
  }
  const CreateInstitutionSchema = Yup.object().shape({
    Name: Yup.string().required(t("PleaseFillInstitutionName")),
    UniqueNumber: Yup.number()
      .test(
        "is-valid",
        t("UniqueNumberMustContain"),
        (value) => /^8\d{8}$/.test(value)
      )
      .required(t("PleaseFillUniqueNumber")),
    MunicipalityId: Yup.string().required(
      t("PleaseFillMunicipality")
    ),
    Address: Yup.string().required(t("PleaseFillAddress")),
    PostalCode: Yup.string().required(
      t("PleaseFillPostalCode")
    ).max(20, t("PostalCodeMustContainMax")),
    PhoneNumber: Yup.string().required(
      t("PleaseFillPhoneNumber")
    ).max(20, t("PhoneNumberMustContainMax")),
    Email: Yup.string().required(t("PleaseFillEmail")),
    Web: Yup.string().required(
      t("PleaseFillWeb")
    ),
    Documents: Yup.string().required(
      t("PleaseFillDocument")
    ),
  });
  const formik = useFormik({
    initialValues: {},
    validationSchema: CreateInstitutionSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => SubmitForm(),
  });
  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-body">
          <h3 className=" mb-3">{t("RegisterInstitution")}</h3>
          <form onSubmit={formik.handleSubmit}>
            <div id="progressbarwizard">
              <div className="tab-content b-0 mb-0 pt-0">
                <ProgressBar model={model} />
                <div className="tab-pane active" id="account-2">
                  <div className="row">
                    <div className="col-12">
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">
                          {t("InstitutionName")}
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                InstitutionName: e.target.value,
                              });
                              formik.setFieldValue("Name", e.target.value);
                            }}
                          />
                          {formik.errors.Name && (
                            <span className="text-danger">
                              {formik.errors.Name}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">
                          {t("UniqueNumber")}
                        </label>
                        <div className="col-md-9">
                          <input
                            type="number"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                UniqueNumber: e.target.value,
                              });
                              formik.setFieldValue(
                                "UniqueNumber",
                                e.target.value
                              );
                            }}
                            className="form-control"
                          />
                          {formik.errors.UniqueNumber && (
                            <span className="text-danger">
                              {formik.errors.UniqueNumber}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">
                          {t("Municipality")}
                        </label>
                        <div className="col-md-9">
                          <CustomSelect
                            onChangeFunction={changeCity}
                            optionsList={citiesList}
                            isMulti={false}
                          />
                          {formik.errors.MunicipalityId && (
                            <span className="text-danger">
                              {formik.errors.MunicipalityId}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">
                          {t("Address")}
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                Address: e.target.value,
                              });
                              formik.setFieldValue("Address", e.target.value);
                            }}
                            className="form-control"
                          />
                          {formik.errors.Address && (
                            <span className="text-danger">
                              {formik.errors.Address}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">
                          {t("PostalCode")}
                        </label>
                        <div className="col-md-9">
                          <input
                            type="number"
                            className="form-control"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                PostalCode: e.target.value,
                              });
                              formik.setFieldValue(
                                "PostalCode",
                                e.target.value
                              );
                            }}
                          />
                          {formik.errors.PostalCode && (
                            <span className="text-danger">
                              {formik.errors.PostalCode}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">
                          {t("PhoneNumber")}
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                PhoneNum: e.target.value,
                              });
                              formik.setFieldValue(
                                "PhoneNumber",
                                e.target.value
                              );
                            }}
                          />
                          {formik.errors.PhoneNumber && (
                            <span className="text-danger">
                              {formik.errors.PhoneNumber}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">Email</label>
                        <div className="col-md-9">
                          <input
                            type="email"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                Email: e.target.value,
                              });
                              formik.setFieldValue("Email", e.target.value);
                            }}
                            className="form-control"
                          />
                          {formik.errors.Email && (
                            <span className="text-danger">
                              {formik.errors.Email}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">
                          {t("Web")}
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                Web: e.target.value,
                              });
                              formik.setFieldValue("Web", e.target.value);
                            }}
                            className="form-control"
                          />
                          {formik.errors.Web && (
                            <span className="text-danger">
                              {formik.errors.Web}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">Logo</label>
                        <div className="col-md-9">
                          <input
                            type="file"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                Document: e.target.files[0],
                              });
                              formik.setFieldValue("Documents", e.target.value);
                            }}
                            className="form-control"
                          />
                          {formik.errors.Documents && (
                            <span className="text-danger">
                              {formik.errors.Documents}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="list-inline mb-0 wizard">
                  <Link
                    to="/institutions"
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
                      {t("Save")}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
