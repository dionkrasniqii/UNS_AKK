import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import CustomDatePicker from "../custom/CustomDatePicker";
import { useFormik } from "formik";
import ProgressBar from "../custom/ProgressBar";
import CustomSelect from "../custom/CustomSelect";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function CreateQualifications() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [levels, setLevels] = useState([]);
  const [qualificationTypes, setQualificationTypes] = useState([]);
  const [qualificationStatus, setQualificationStatus] = useState([]);
  const [qualificationStandarts, setQualificationStandarts] = useState([]);
  const langId = localStorage.getItem("i18nextLng");
  const [model, setModel] = useState({
    LevelKKKId: "",
    Code: "",
    QualificationName: "",
    QualificationTypeId: "",
    Credits: "",
    QualificationStatusId: "",
    AccreditedProvider: "",
    EntryRequirements: "",
    ExpiryDate: "",
    ExternalQualityAssurance: "",
    FurtherInformationOnQualification: "",
    LanguageOfProvision: "",
    LearningOutcomesKnowledge: "",
    LinkToRelevantSupplements: "",
    OfficialLengthOfQualification: "",
    Other: "",
    RecognitionOfPriorLearning: "",
    SectorField: "",
    OccupationalStandartCode: "",
    LangId: "",
    QualificationStandardsId: []
  });

  async function GetLevelsWithLang() {
    await CrudProvider.getAllWithLang("GeneralAPI/GetAllLevels").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setLevels(res.result);
        }
      }
    });
  }
  async function GetQualificationTypesWithLang() {
    await CrudProvider.getAllWithLang("QualificationTypeAPI/GetAll").then(
      (res) => {
        if (res) {
          if (res.statusCode === 200) {
            setQualificationTypes(res.result);
          }
        }
      }
    );
  }
  async function GetQualificationStandartsWithLang() {
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
    GetLevelsWithLang();
    GetQualificationTypesWithLang();
    GetQualificationStatusWithLang();
    GetQualificationStandartsWithLang();
  }, []);

  useEffect(() => {
    GetLevelsWithLang();
    GetQualificationTypesWithLang();
    GetQualificationStatusWithLang();
    GetQualificationStandartsWithLang();
  }, [langId]);

  async function GetQualificationStatusWithLang() {
    await CrudProvider.getAllWithLang(
      "QualificationAPI/GetQualificationStatus"
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setQualificationStatus(res.result);
        }
      }
    });
  }

  async function SubmitForm() {
    await CrudProvider.createItem(
      "QualificationAPI/CreateQualification",
      model
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          navigate("/qualifications");
          toast.success(t("DataSavedSuccessfully"));
        }
      }
    });
  }
  const qualificationTypeList =
    qualificationTypes &&
    qualificationTypes.length > 0 &&
    qualificationTypes.map((obj) => {
      return {
        value: obj.qualificationType?.qualificationTypeId,
        label: obj.qualificationTypeName,
      };
    });

  const qualificationStatusList =
    qualificationStatus &&
    qualificationStatus.length > 0 &&
    qualificationStatus.map((obj) => {
      return {
        value: obj.qualificationStatus?.qualificationStatusId,
        label: obj.description,
      };
    });

  const levelList =
    levels &&
    levels.length > 0 &&
    levels.map((obj) => {
      return {
        value: obj.levelKKK.levelKKKId,
        label: obj.levelKKKDescription,
      };
    });

    const qualificationStandardsList =
    qualificationStandarts &&
    qualificationStandarts.length > 0 &&
    qualificationStandarts.map((obj) => {
      return {
        value: obj.qualificationStandartId,
        label: obj.qualificationStandartName,
      };
    });

  function changeLevel(e) {
    setModel({
      ...model,
      LevelKKKId: e,
    });
    formik.setFieldValue("LevelKKKId", e);
  }

  function changeType(e) {
    setModel({
      ...model,
      QualificationTypeId: e,
    });
    formik.setFieldValue("QualificationTypeId", e);
  }

  function changeStatus(e) {
    setModel({
      ...model,
      QualificationStatusId: e,
    });
    formik.setFieldValue("QualificationStatusId", e);
  }

  function changeQualificationStandart(e) {
    setModel({
      ...model,
      QualificationStandardsId: e,
    });
    formik.setFieldValue("QualificationStandardsId", e);
  }

  function formatedDate(date) {
    const [day, month, year] = date.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  function changeExpiryDate(date, dateString) {
    setModel({
      ...model,
      ExpiryDate: formatedDate(dateString),
    });
    formik.setFieldValue("ExpiryDate", dateString);
  }

  const CreateQualificationsSchema = Yup.object().shape({
    Code: Yup.string().required(t("FillField")),
    Credits: Yup.string().required(t("FillField")),
    QualificationName: Yup.string().required(t("FillField")),
    LevelKKKId: Yup.string().required(t("FillField")),
    QualificationTypeId: Yup.string().required(t("FillField")),
    QualificationStatusId: Yup.string().required(t("FillField")),
    AccreditedProvider: Yup.string().required(t("FillField")),
    EntryRequirements: Yup.string().required(t("FillField")),
    ExpiryDate: Yup.string().required(t("FillField")),
    ExternalQualityAssurance: Yup.string().required(t("FillField")),
    FurtherInformationOnQualification: Yup.string().required(t("FillField")),
    LanguageOfProvision: Yup.string().required(t("FillField")),
    LearningOutcomesKnowledge: Yup.string().required(t("FillField")),
    LinkToRelevantSupplements: Yup.string().required(t("FillField")),
    OfficialLengthOfQualification: Yup.string().required(t("FillField")),
    Other: Yup.string().required(t("FillField")),
    RecognitionOfPriorLearning: Yup.string().required(t("FillField")),
    SectorField: Yup.string().required(t("FillField")),
    OccupationalStandartCode: Yup.string().required(t("FillField")),
    LangId: Yup.string().required(t("FillField")),
    QualificationStandardsId: Yup.array().required(t("FillField")),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: CreateQualificationsSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => SubmitForm(),
  });
  const changeLangId = (e) => {
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
          <h3 className="mb-3">{t("RegisterQualification")}</h3>
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
              <div className="col-xxl-2 col-lg-2 col-sm-12 mb-3">
                <label>{t("Code")}</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      Code: e.target.value,
                    });
                    formik.setFieldValue("Code", e.target.value);
                  }}
                />
                {formik.errors.Code && (
                  <span className="text-danger">{formik.errors.Code}</span>
                )}
              </div>
              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("QualificationType")}</label>
                <CustomSelect
                  onChangeFunction={changeType}
                  optionsList={qualificationTypeList}
                  isMulti={false}
                />
                {formik.errors.QualificationTypeId && (
                  <span className="text-danger">
                    {formik.errors.QualificationTypeId}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("QualificationStandarts")}</label>
                <CustomSelect
                  onChangeFunction={changeQualificationStandart}
                  optionsList={qualificationStandardsList}
                  isMulti={true}
                />
                {formik.errors.QualificationStandardsId && (
                  <span className="text-danger">
                    {" "}
                    {formik.errors.QualificationStandardsId}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("Level")}</label>
                <CustomSelect
                  onChangeFunction={changeLevel}
                  optionsList={levelList}
                  isMulti={false}
                />
                {formik.errors.LevelKKKId && (
                  <span className="text-danger">
                    {" "}
                    {formik.errors.LevelKKKId}
                  </span>
                )}
              </div>
              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("QualificationName")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      QualificationName: e.target.value,
                    });
                    formik.setFieldValue("QualificationName", e.target.value);
                  }}
                />
                {formik.errors.QualificationName && (
                  <span className="text-danger">
                    {formik.errors.QualificationName}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("AccreditedProvider")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      AccreditedProvider: e.target.value,
                    });
                    formik.setFieldValue("AccreditedProvider", e.target.value);
                  }}
                />
                {formik.errors.AccreditedProvider && (
                  <span className="text-danger">
                    {formik.errors.AccreditedProvider}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("EntryRequirements")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      EntryRequirements: e.target.value,
                    });
                    formik.setFieldValue("EntryRequirements", e.target.value);
                  }}
                />
                {formik.errors.EntryRequirements && (
                  <span className="text-danger">
                    {formik.errors.EntryRequirements}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("ExternalQualityAssurance")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      ExternalQualityAssurance: e.target.value,
                    });
                    formik.setFieldValue("ExternalQualityAssurance", e.target.value);
                  }}
                />
                {formik.errors.ExternalQualityAssurance && (
                  <span className="text-danger">
                    {formik.errors.ExternalQualityAssurance}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("FurtherInformationOnQualification")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      FurtherInformationOnQualification: e.target.value,
                    });
                    formik.setFieldValue("FurtherInformationOnQualification", e.target.value);
                  }}
                />
                {formik.errors.FurtherInformationOnQualification && (
                  <span className="text-danger">
                    {formik.errors.FurtherInformationOnQualification}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("LanguageOfProvision")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      LanguageOfProvision: e.target.value,
                    });
                    formik.setFieldValue("LanguageOfProvision", e.target.value);
                  }}
                />
                {formik.errors.LanguageOfProvision && (
                  <span className="text-danger">
                    {formik.errors.LanguageOfProvision}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("LearningOutcomesKnowledge")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      LearningOutcomesKnowledge: e.target.value,
                    });
                    formik.setFieldValue("LearningOutcomesKnowledge", e.target.value);
                  }}
                />
                {formik.errors.LearningOutcomesKnowledge && (
                  <span className="text-danger">
                    {formik.errors.LearningOutcomesKnowledge}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("LinkToRelevantSupplements")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      LinkToRelevantSupplements: e.target.value,
                    });
                    formik.setFieldValue("LinkToRelevantSupplements", e.target.value);
                  }}
                />
                {formik.errors.LinkToRelevantSupplements && (
                  <span className="text-danger">
                    {formik.errors.LinkToRelevantSupplements}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("OfficialLengthOfQualification")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      OfficialLengthOfQualification: e.target.value,
                    });
                    formik.setFieldValue("OfficialLengthOfQualification", e.target.value);
                  }}
                />
                {formik.errors.OfficialLengthOfQualification && (
                  <span className="text-danger">
                    {formik.errors.OfficialLengthOfQualification}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("Other")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      Other: e.target.value,
                    });
                    formik.setFieldValue("Other", e.target.value);
                  }}
                />
                {formik.errors.Other && (
                  <span className="text-danger">{formik.errors.Other}</span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("RecognitionOfPriorLearning")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      RecognitionOfPriorLearning: e.target.value,
                    });
                    formik.setFieldValue("RecognitionOfPriorLearning", e.target.value);
                  }}
                />
                {formik.errors.RecognitionOfPriorLearning && (
                  <span className="text-danger">
                    {formik.errors.RecognitionOfPriorLearning}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("SectorField")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      SectorField: e.target.value,
                    });
                    formik.setFieldValue("SectorField", e.target.value);
                  }}
                />
                {formik.errors.SectorField && (
                  <span className="text-danger">
                    {formik.errors.SectorField}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("OccupationalStandartCode")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      OccupationalStandartCode: e.target.value,
                    });
                    formik.setFieldValue("OccupationalStandartCode", e.target.value);
                  }}
                />
                {formik.errors.OccupationalStandartCode && (
                  <span className="text-danger">
                    {formik.errors.OccupationalStandartCode}
                  </span>
                )}
              </div>

              <div className="col-xxl-2 col-lg-2 col-sm-12 mb-3">
                <label>{t("ExpiryDate")}:</label>
                <CustomDatePicker onChangeFunction={changeExpiryDate} />
                {formik.errors.ExpiryDate && (
                  <span className="text-danger">
                    {formik.errors.ExpiryDate}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>
                  {t("QualificationStatus")}
                </label>
                <CustomSelect
                  onChangeFunction={changeStatus}
                  optionsList={qualificationStatusList}
                  isMulti={false}
                />
                {formik.errors.QualificationStatusId && (
                  <span className="text-danger">
                    {formik.errors.QualificationStatusId}
                  </span>
                )}
              </div>

              <div className="col-xxl-2 col-lg-2 col-sm-12 mb-3">
                <label>{t("Credits")}</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      Credits: e.target.value,
                    });
                    formik.setFieldValue("Credits", e.target.value);
                  }}
                />
                {formik.errors.Credits && (
                  <span className="text-danger">{formik.errors.Credits}</span>
                )}
              </div>
            </div>

            <ul className="list-inline mt-3 wizard">
              <Link
                to="/qualifications"
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
