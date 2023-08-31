import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import CrudProvider from "../../provider/CrudProvider";
import { useTranslation } from "react-i18next";

export default function EditSubQualification() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [subqualification, setSubQualification] = useState({
    QualificationChildId: id,
    QualificationId: "",
    CodeAL: "",
    CodeEN: "",
    CodeSR: "",
    DescriptionAL: "",
    DescriptionEN: "",
    DescriptionSR: "",
    Credits: "",
  });

  useEffect(() => {
    setLoad(true);
    Promise.all([
      CrudProvider.getItemById("QualificationChildAPI/GetById", id).then(
        (res) => {
          if (res) {
            if (res.statusCode === 200) {
              const obj = res.result;
              setSubQualification({
                ...subqualification,
                QualificationId:
                  obj[0].qualificationChild.qualification.qualificationId,
                CodeAL: obj[2].code,
                CodeEN: obj[1].code,
                CodeSR: obj[0].code,
                DescriptionAL: obj[2].description,
                DescriptionEN: obj[1].description,
                DescriptionSR: obj[0].description,
                Credits: obj[0].qualificationChild.credits,
              });
            } else {
              toast.error(res.errorMessages[0]);
              navigate("/subqualifications");
            }
          }
        }
      ),
    ]).then((res) => {
      setLoad(false);
    });
  }, [id]);

  async function handleSubmit() {
    await CrudProvider.updateItem(
      "QualificationChildAPI/UpdateQualificationChild",
      subqualification
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataUpdatedSuccessfully"));
          navigate(`/subqualifications/${subqualification.QualificationId}`);
        } else {
          toast.error(res.errorMessages[0]);
        }
      }
    });
  }
  const formik = useFormik({
    initialValues: {},
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => handleSubmit(),
  });
  return (
    <div className='card'>
      {!load ? (
        <div className='card-body'>
          <h3 className='mb-3'>{t("ModifyModule")}</h3>
          <hr />
          <form onSubmit={formik.handleSubmit}>
            <div className='row'>
              <div className='col-md-3'>
                <label className='col-form-label'>{t("Code")} (AL)</label>
                <input
                  type='text'
                  defaultValue={subqualification.CodeAL}
                  className='form-control'
                  onChange={(e) => {
                    setSubQualification({
                      ...subqualification,
                      codeAL: e.target.value,
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
                  defaultValue={subqualification.CodeEN}
                  className='form-control'
                  onChange={(e) => {
                    setSubQualification({
                      ...subqualification,
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
                <label className=' col-form-label'>{t("Code")} (SR)</label>
                <input
                  type='text'
                  defaultValue={subqualification.CodeSR}
                  className='form-control'
                  onChange={(e) => {
                    setSubQualification({
                      ...subqualification,
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
                  defaultValue={subqualification.Credits}
                  className='form-control'
                  onChange={(e) => {
                    setSubQualification({
                      ...subqualification,
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
                  defaultValue={subqualification.DescriptionAL}
                  className='form-control'
                  onChange={(e) => {
                    setSubQualification({
                      ...subqualification,
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
                  defaultValue={subqualification.DescriptionEN}
                  className='form-control'
                  onChange={(e) => {
                    setSubQualification({
                      ...subqualification,
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
                  defaultValue={subqualification.DescriptionSR}
                  className='form-control'
                  onChange={(e) => {
                    setSubQualification({
                      ...subqualification,
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
                to={`/subqualifications/${subqualification.QualificationId}`}
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
                  {t("Edit")}
                </button>
              </li>
            </ul>
          </form>
        </div>
      ) : (
        <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
          <div
            className='spinner-border text-primary m-2 text-center'
            role='status'
          />
        </div>
      )}
    </div>
  );
}
