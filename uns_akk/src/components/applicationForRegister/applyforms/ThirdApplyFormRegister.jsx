import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import ProgressBar from "../../custom/ProgressBar";
import CrudProvider from "../../../provider/CrudProvider";
import { toast } from "react-toastify";

export default function ThirdApplyFormRegister({ model, setModel }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const CreateCompetencesSchema = Yup.object().shape({
    CompetenceName: Yup.string().required(t("FillField")),
    TypeOfCompetence: Yup.string().required(t("FillField")),
    PerformanceIndicators: Yup.string().required(t("FillField")),
    SuppoirtingKnowledge: Yup.string().required(t("FillField")),
    AssessmentMethods: Yup.string().required(t("FillField")),
  });

  useEffect(() => {
    const formDiv = document.querySelector("#form3");
    formDiv.scrollIntoView();
  }, []);
  const [newModel, setNewModel] = useState({
    CompetenceName: "",
    TypeOfCompetence: "",
    PerformanceIndicators: "",
    SuppoirtingKnowledge: "",
    AssessmentMethods: "",
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: CreateCompetencesSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => {
      model.Competences = newModel;
      console.log(model);
      SubmitForm();
    },
  });

  async function SubmitForm() {
    setLoad(true);
    const response = await CrudProvider.createItemWithFile(
      "QualificationAPI/CreateQualificationData",
      model
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          navigate("/register-applications-list");
          setLoad(false);
          toast.success(t("DataSavedSuccessfully"));
        } else {
          toast.error(res.errorMessages[0]);
        }
      }
    });
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      id="form3"
      className="animation animation-bot-top"
    >
      <div className="card">
        <div className="card-body">
          <h3 className="mb-3 text-uppercase">Te dhenat e kompetences</h3>
          <ProgressBar model={newModel} />
          <div className="row">
            <div className="col-xxl-6 col-lg-6 col-sm-12 mb-3">
              <label>{t("CompetenceName")}</label>
              <textarea
                type="text"
                className="form-control"
                rows={4}
                onChange={(e) => {
                  setNewModel({
                    ...newModel,
                    CompetenceName: e.target.value,
                  });
                  formik.setFieldValue("CompetenceName", e.target.value);
                }}
              />
              {formik.errors.CompetenceName && (
                <span className="text-danger">
                  {formik.errors.CompetenceName}
                </span>
              )}
            </div>
            <div className="col-xxl-6 col-lg-6 col-sm-12 mb-3">
              <label>{t("TypeOfCompetence")}</label>
              <textarea
                type="text"
                className="form-control"
                rows={4}
                onChange={(e) => {
                  setNewModel({
                    ...newModel,
                    TypeOfCompetence: e.target.value,
                  });
                  formik.setFieldValue("TypeOfCompetence", e.target.value);
                }}
              />
              {formik.errors.TypeOfCompetence && (
                <span className="text-danger">
                  {formik.errors.TypeOfCompetence}
                </span>
              )}
            </div>

            <div className="col-xxl-6 col-lg-6 col-sm-12 mb-3">
              <label>{t("PerformanceIndicators")}</label>
              <textarea
                type="text"
                className="form-control"
                rows={4}
                onChange={(e) => {
                  setNewModel({
                    ...newModel,
                    PerformanceIndicators: e.target.value,
                  });
                  formik.setFieldValue("PerformanceIndicators", e.target.value);
                }}
              />
              {formik.errors.PerformanceIndicators && (
                <span className="text-danger">
                  {formik.errors.PerformanceIndicators}
                </span>
              )}
            </div>

            <div className="col-xxl-6 col-lg-6 col-sm-12 mb-3">
              <label>{t("SuppoirtingKnowledge")}</label>
              <textarea
                type="text"
                rows={4}
                className="form-control"
                onChange={(e) => {
                  setNewModel({
                    ...newModel,
                    SuppoirtingKnowledge: e.target.value,
                  });
                  formik.setFieldValue("SuppoirtingKnowledge", e.target.value);
                }}
              />
              {formik.errors.SuppoirtingKnowledge && (
                <span className="text-danger">
                  {formik.errors.SuppoirtingKnowledge}
                </span>
              )}
            </div>

            <div className="col-xxl-6 col-lg-6 col-sm-12 mb-3">
              <label>{t("AssessmentMethods")}</label>
              <textarea
                type="text"
                rows={4}
                className="form-control"
                onChange={(e) => {
                  setNewModel({
                    ...newModel,
                    AssessmentMethods: e.target.value,
                  });
                  formik.setFieldValue("AssessmentMethods", e.target.value);
                }}
              />
              {formik.errors.AssessmentMethods && (
                <span className="text-danger">
                  {formik.errors.AssessmentMethods}
                </span>
              )}
            </div>
          </div>
          <ul className="list-inline mt-3 wizard">
            <Link
              to="/institution-user"
              className="btn btn-danger waves-effect waves-light float-start"
            >
              <span className="btn-label">
                <i className="fe-arrow-left"></i>
              </span>
              {t("Discard")}
            </Link>
            <li className="next list-inline-item float-end">
              {!load ? (
                <button
                  type="submit"
                  className="btn btn btn-primary btn-soft-blue rounded-pill "
                >
                  {t("Perfundoni")}
                </button>
              ) : (
                <div
                  className="spinner-border text-primary m-2 text-center"
                  role="status"
                />
              )}
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
}
