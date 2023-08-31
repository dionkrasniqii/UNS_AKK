import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProgressBar from "../custom/ProgressBar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CrudProvider from "../../provider/CrudProvider";
import { useTranslation } from "react-i18next";

export default function CreateSubQualification() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [model, setModel] = useState({
    QualificationId: id,
    CodeAL: "",
    CodeEN: "",
    CodeSR: "",
    DescriptionAL: "",
    DescriptionEN: "",
    DescriptionSR: "",
    Credits: "",
  });

  async function SubmitForm() {
    await CrudProvider.createItem(
      "QualificationChildAPI/CreateQualificationChild",
      model
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          navigate(`/subqualifications/${model.QualificationId}`);
          toast.success(t("DataSavedSuccessfully"));
        }
      }
    });
  }

  const CreateSubQualificationsSchema = Yup.object().shape({
    CodeAL: Yup.string().required(t("PleaseFillCodeAL")),
    CodeEN: Yup.string().required(t("PleaseFillCodeEN")),
    CodeSR: Yup.string().required(t("PleaseFillCodeSR")),
    DescriptionAL: Yup.string().required(t("PleaseFillModuleAl")),
    DescriptionEN: Yup.string().required(t("PleaseFillModuleEN")),
    DescriptionSR: Yup.string().required(t("PleaseFillModuleSR")),
    Credits: Yup.string().required(t("FillField")),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: CreateSubQualificationsSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => SubmitForm(),
  });

  return (
    <div className='card'>
      <div className='card-body'>
        <h3 className='mb-3'>{t("RegisterModule")}</h3>
        <form onSubmit={formik.handleSubmit}>
          <ProgressBar model={model} />
          <div className='row'>
            <div className='col-md-3'>
              <label className='col-form-label'>{t("Code")} (AL)</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setModel({
                    ...model,
                    CodeAL: e.target.value,
                  });
                  formik.setFieldValue("CodeAL", e.target.value);
                }}
              />
              {formik.errors.CodeAL && (
                <span className='text-danger'>{formik.errors.CodeAL}</span>
              )}
            </div>
            <div className='col-md-3'>
              <label className='col-form-label'>{t("Code")} (EN)</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setModel({
                    ...model,
                    CodeEN: e.target.value,
                  });
                  formik.setFieldValue("CodeEN", e.target.value);
                }}
              />
              {formik.errors.CodeEN && (
                <span className='text-danger'>{formik.errors.CodeEN}</span>
              )}
            </div>

            <div className='col-md-3'>
              <label className='col-form-label'>{t("Code")} (SR)</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setModel({
                    ...model,
                    CodeSR: e.target.value,
                  });
                  formik.setFieldValue("CodeSR", e.target.value);
                }}
              />
              {formik.errors.CodeSR && (
                <span className='text-danger'>{formik.errors.CodeSR}</span>
              )}
            </div>
            <div className='col-md-2'>
              <label className='col-form-label'>{t("Credits")}</label>
              <input
                type='number'
                className='form-control'
                onChange={(e) => {
                  setModel({
                    ...model,
                    Credits: e.target.value,
                  });
                  formik.setFieldValue("Credits", e.target.value);
                }}
              />
              {formik.errors.Credits && (
                <span className='text-danger'>{formik.errors.Credits}</span>
              )}
            </div>
            <div className='col-md-12'>
              <label className='col-form-label'>{t("ModuleName")} (AL)</label>
              <textarea
                type='text'
                rows={6}
                className='form-control'
                onChange={(e) => {
                  setModel({
                    ...model,
                    DescriptionAL: e.target.value,
                  });
                  formik.setFieldValue("DescriptionAL", e.target.value);
                }}
              />
              {formik.errors.DescriptionAL && (
                <span className='text-danger'>
                  {formik.errors.DescriptionAL}
                </span>
              )}
            </div>
            <div className='col-md-12'>
              <label className='col-form-label'>{t("ModuleName")} (EN)</label>
              <textarea
                type='text'
                rows={6}
                className='form-control'
                onChange={(e) => {
                  setModel({
                    ...model,
                    DescriptionEN: e.target.value,
                  });
                  formik.setFieldValue("DescriptionEN", e.target.value);
                }}
              />
              {formik.errors.DescriptionEN && (
                <span className='text-danger'>
                  {formik.errors.DescriptionEN}
                </span>
              )}
            </div>
            <div className='col-md-12'>
              <label className='col-form-label'>{t("ModuleName")} (SR)</label>
              <textarea
                type='text'
                rows={6}
                className='form-control'
                onChange={(e) => {
                  setModel({
                    ...model,
                    DescriptionSR: e.target.value,
                  });
                  formik.setFieldValue("DescriptionSR", e.target.value);
                }}
              />
              {formik.errors.DescriptionSR && (
                <span className='text-danger'>
                  {formik.errors.DescriptionSR}
                </span>
              )}
            </div>
          </div>
          <ul className='list-inline mb-0 wizard mt-2'>
            <Link
              to='/qualifications'
              className='btn btn-danger waves-effect waves-light float-start'
            >
              <span className='btn-label'>
                <i className='fe-arrow-left'></i>
              </span>
              {t("Discard")}
            </Link>
            <li className='next list-inline-item float-end'>
              <button
                type='submit'
                className='btn btn-success waves-effect waves-light'
              >
                <span className='btn-label'>
                  <i className='fe-check'></i>
                </span>
                {t("Save")}
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
