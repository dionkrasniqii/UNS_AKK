import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomSelect from "../custom/CustomSelect";
import ProgressBar from "../custom/ProgressBar";

export default function CreateCompetences() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [qualificationStandarts, setQualificationStandarts] = useState([]);
  const langId = localStorage.getItem("i18nextLng");
  const [model, setModel] = useState({
    EstQFLevel: "",
    CompetenceName: "",
    TypeOfCompetence: "",
    PerformanceIndicators: "",
    SuppoirtingKnowledge: "",
    AssessmentMethods: "",
    QualificationStandartIds: [],
    LangId: "",
  });

  async function GetQualificationsStandartsWithLang() {
    await CrudProvider.getAllWithLang("QualificationStandartAPI/GetAll").then(
      (res) => {
        if (res) {
          if (res.statusCode === 200) {
            setQualificationStandarts(res.result);
          }
        }
      }
    );
  }

  useEffect(() => {
    GetQualificationsStandartsWithLang();
  }, []);

  useEffect(() => {
    GetQualificationsStandartsWithLang();
  }, [langId]);

  async function SubmitForm() {
    await CrudProvider.createItem(
      "CompetencesAPI/CreateCompetence",
      model
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          navigate("/competences");
          toast.success(t("DataSavedSuccessfully"));
        }
      }
    });
  }

  const qualificationStandartList =
    qualificationStandarts &&
    qualificationStandarts.length > 0 &&
    qualificationStandarts.map((obj) => {
      return {
        value: obj.qualificationStandart.qualificationStandartId,
        label: obj.name,
      };
    });

  function changeQualificationStandarts(e) {
    setModel({
      ...model,
      QualificationStandartIds: e,
    });
    formik.setFieldValue("QualificationStandartIds", e);
  }

  const CreateCompetencesSchema = Yup.object().shape({
    EstQFLevel: Yup.string().required(t("FillField")),
    CompetenceName: Yup.string().required(t("FillField")),
    TypeOfCompetence: Yup.string().required(t("FillField")),
    PerformanceIndicators: Yup.string().required(t("FillField")),
    SuppoirtingKnowledge: Yup.string().required(t("FillField")),
    AssessmentMethods: Yup.string().required(t("FillField")),
    QualificationStandartIds: Yup.array().required(t("FillField")),
    LangId: Yup.string().required(t("FillField")),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: CreateCompetencesSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => SubmitForm(),
  });

  const changeLangId = async (e) => {
    setModel({
      ...model,
      LangId: e,
    });
    formik.setFieldValue("LangId", e);
  };

  const langList = [
    {
      value: 1,
      label: t("Albanian"),
    },
    {
      value: 2,
      label: t("English"),
    },
    {
      value: 3,
      label: t("Serbian"),
    },
  ];

  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-body">
          <h3 className="mb-3">{t("RegisterCompetence")}</h3>
          <form onSubmit={formik.handleSubmit}>
            <ProgressBar model={model} />
            <div className="row">
              <div className="col-xxl-2 col-lg-2 col-sm-12 mb-3">
                <label>{t("Language")}</label>
                <CustomSelect
                  optionsList={langList}
                  isMulti={false}
                  className="form-control"
                  name="LangId"
                  onChangeFunction={changeLangId}
                />
                {formik.errors.LangId && (
                  <span className="text-danger">{formik.errors.LangId}</span>
                )}
              </div>

              <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                <label>{t("QualificationStandarts")}</label>
                <CustomSelect
                  onChangeFunction={changeQualificationStandarts}
                  isMulti={true}
                  optionsList={qualificationStandartList}
                />
                {formik.errors.QualificationStandartIds && (
                  <span className="text-danger">
                    {formik.errors.QualificationStandartIds}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-6 col-lg-6 col-sm-12 mb-3">
                <label>{t("CompetenceName")}</label>
                <textarea
                  type="text"
                  className="form-control"
                  rows={4}
                  onChange={(e) => {
                    setModel({
                      ...model,
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
                <label>{t("EstQFLevel")}</label>
                <textarea
                  type="text"
                  rows={4}
                  className="form-control"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      EstQFLevel: e.target.value,
                    });
                    formik.setFieldValue("EstQFLevel", e.target.value);
                  }}
                />
                {formik.errors.EstQFLevel && (
                  <span className="text-danger">
                    {formik.errors.EstQFLevel}
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
                    setModel({
                      ...model,
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
                    setModel({
                      ...model,
                      PerformanceIndicators: e.target.value,
                    });
                    formik.setFieldValue(
                      "PerformanceIndicators",
                      e.target.value
                    );
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
                    setModel({
                      ...model,
                      SuppoirtingKnowledge: e.target.value,
                    });
                    formik.setFieldValue(
                      "SuppoirtingKnowledge",
                      e.target.value
                    );
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
                    setModel({
                      ...model,
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
                to="/competences"
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
          </form>
        </div>
      </div>
    </div>
  );
}
