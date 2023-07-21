import React, { useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import ProgressBar from "../custom/ProgressBar";
import { Link, useNavigate } from "react-router-dom";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";

export default function CreateQualificationType() {
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [model, setModel] = useState({
    QualificationTypeNameAL: "",
    QualificationTypeNameEN: "",
    QualificationTypeNameSR: "",
  });
  async function SubmitForm() {
    try {
      await CrudProvider.createItem(
        "QualificationTypeAPI/CreateQualificationType",
        model
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            toast.success(t("DataSavedSuccessfully"));
            navigate("/qualifications-type");
          } else {
            toast.error(res.errorMessages[0]);
          }
        }
      });
    } finally {
      setLoad(false);
    }
  }

  const schema = Yup.object().shape({
    QualificationTypeNameAL: Yup.string().required(t("FillField")),
    QualificationTypeNameEN: Yup.string().required(t("FillField")),
    QualificationTypeNameSR: Yup.string().required(t("FillField")),
  });

  const formik = useFormik({
    initialValues: {},
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: schema,
    onSubmit: async () => SubmitForm(),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='card'>
        <div className='card-body'>
          <div className='row'>
            <h3 className='card-title'>{t("RegisterQualificationType")}</h3>
            <ProgressBar model={model} />
            <div className='col-xxl-2 col-lg-4 col-sm-12 mb-3'>
              <label>{t("QualificationType")} (AL):</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setModel({
                    ...model,
                    QualificationTypeNameAL: e.target.value,
                  });
                  formik.setFieldValue(
                    "QualificationTypeNameAL",
                    e.target.value
                  );
                }}
              />
              {formik.errors.QualificationTypeNameAL && (
                <span className='text-danger'>
                  {formik.errors.QualificationTypeNameAL}
                </span>
              )}
            </div>
            <div className='col-xxl-2 col-lg-4 col-sm-12 mb-3'>
              <label>{t("QualificationType")} (EN):</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setModel({
                    ...model,
                    QualificationTypeNameEN: e.target.value,
                  });
                  formik.setFieldValue(
                    "QualificationTypeNameEN",
                    e.target.value
                  );
                }}
              />
              {formik.errors.QualificationTypeNameEN && (
                <span className='text-danger'>
                  {formik.errors.QualificationTypeNameEN}
                </span>
              )}
            </div>
            <div className='col-xxl-2 col-lg-4 col-sm-12 mb-3'>
              <label>{t("QualificationType")} (SR):</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setModel({
                    ...model,
                    QualificationTypeNameSR: e.target.value,
                  });
                  formik.setFieldValue(
                    "QualificationTypeNameSR",
                    e.target.value
                  );
                }}
              />
              {formik.errors.QualificationTypeNameSR && (
                <span className='text-danger'>
                  {formik.errors.QualificationTypeNameSR}
                </span>
              )}
            </div>
          </div>
          <ul className='list-inline mb-0 wizard'>
            <Link
              to='/qualifications-type'
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
                <div
                  className='spinner-border text-primary m-2 text-center'
                  role='status'
                />
              )}
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
}
