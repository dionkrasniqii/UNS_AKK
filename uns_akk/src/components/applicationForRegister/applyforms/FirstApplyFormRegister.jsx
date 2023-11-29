import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import CustomSelect from "../../custom/CustomSelect";
import ProgressBar from "../../custom/ProgressBar";
import CrudProvider from "../../../provider/CrudProvider";
import CustomDatePicker from "../../custom/CustomDatePicker";
import SecondApplyFormRegister from "./SecondApplyFormRegister";
export default function FirstApplyFormRegister({
  IsAccreditatedBefore,
  model,
  setModel,
}) {
  const { t } = useTranslation();
  const [levels, setLevels] = useState([]);
  const [qualificationTypes, setQualificationTypes] = useState([]);
  const [qualificationStatus, setQualificationStatus] = useState([]);
  const [EQFLevels, setEQFLevels] = useState([]);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [dynamicDivs, setDynamicDivs] = useState([]);
  const langId = localStorage.getItem("i18nextLng");
  async function fetchDataWithLang(apiEndpoint, setter) {
    const res = await CrudProvider.getAllWithLang(apiEndpoint);
    if (res && res.statusCode === 200) {
      setter(res.result);
    }
  }

  async function fetchData() {
    await Promise.all([
      fetchDataWithLang("GeneralAPI/GetAllLevels", setLevels),
      fetchDataWithLang("QualificationTypeAPI/GetAll", setQualificationTypes),
      fetchDataWithLang(
        "QualificationAPI/GetQualificationStatus",
        setQualificationStatus
      ),

      fetchDataWithLang("EQFLevelAPI/GetAll", setEQFLevels),
    ]);
  }
  useEffect(() => {
    fetchData();
  }, [langId]);

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
    levels
      .map((obj) => {
        return {
          value: obj.levelKKK.levelKKKId,
          label: obj.levelKKKDescription,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

  function changeLevel(e) {
    setModel({
      ...model,
      LevelKKKId: e,
    });
    formik.setFieldValue("LevelKKKId", e);
  }
  function changeLevelEQF(e) {
    setModel({
      ...model,
      EQFLevel: e,
    });
    formik.setFieldValue("EQFLevelId", e);
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
    EQFLevelId: Yup.string().required(t("FillField")),
    QualificationTypeId: Yup.string().required(t("FillField")),
    QualificationStatusId: Yup.string().required(t("FillField")),
    AccreditedProvider: Yup.string().required(t("FillField")),
    EntryRequirements: Yup.string().required(t("FillField")),
    ExpiryDate: Yup.string().required(t("FillField")),
    ExternalQualityAssurance: Yup.string().required(t("FillField")),
    // FurtherInformationOnQualification: Yup.string().required(t("FillField")),
    LanguageOfProvision: Yup.string().required(t("FillField")),
    LearningOutcomesKnowledge: Yup.string().required(t("FillField")),
    LinkToRelevantSupplements: Yup.string().required(t("FillField")),
    OfficialLengthOfQualification: Yup.string().required(t("FillField")),
    Other: Yup.string().required(t("FillField")),
    RecognitionOfPriorLearning: Yup.string().required(t("FillField")),
    SectorField: Yup.string().required(t("FillField")),
    OccupationalStandartCode: Yup.string().required(t("FillField")),
    LangId: Yup.string().required(t("FillField")),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: CreateQualificationsSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => {
      setShowSecondForm(true);
    },
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

  const addDynamicDiv = () => {
    const newDynamicDivs = [...dynamicDivs];
    const dynamicDivContent = [
      {
        label: t("Description"),
        stateKey: "Description",
        type: "text",
      },
      {
        label: t("Code"),
        stateKey: "Code",
        type: "number",
      },
      {
        label: t("Credits"),
        stateKey: "Credits",
        type: "number",
      },
    ];
    const dynamicDivData = {};

    dynamicDivContent.forEach(({ label, stateKey, type }) => {
      newDynamicDivs.push(
        <div
          key={newDynamicDivs.length}
          className="col-xxl-4 col-lg-4 col-sm-12"
        >
          <label>{label}</label>
          <input
            className="mt-1 form-control"
            type={type}
            onChange={(e) => {
              dynamicDivData[stateKey] = e.target.value;
              setModel({
                ...model,
                QualificationChilds: [
                  ...model.QualificationChilds,
                  dynamicDivData,
                ],
              });
            }}
          />
        </div>
      );
    });
    setDynamicDivs(newDynamicDivs);
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        id="form1"
        className="animation animation-bot-top"
      >
        <div className="card">
          <div className="card-body">
            <h4 className="mb-3 text-uppercase">Te dhenat e kualifikimit</h4>
            <ProgressBar model={model} />
            <div className="row">
              <div className="col-xxl-3 col-lg-4 col-sm-12 mb-3">
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
              <div className="col-xxl-3 col-lg-4 col-sm-12 mb-3">
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
              <div className="col-xxl-3 col-lg-4 col-sm-12 mb-3">
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
              <div className="col-xxl-2 col-lg-2 col-sm-12 mb-3">
                <label>{t("ExpiryDate")}:</label>
                <CustomDatePicker onChangeFunction={changeExpiryDate} />
                {formik.errors.ExpiryDate && (
                  <span className="text-danger">
                    {formik.errors.ExpiryDate}
                  </span>
                )}
              </div>
              <div className="col-xxl-3 col-lg-4 col-sm-12 mb-3">
                <label>{t("QualificationStatus")}</label>
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
              <div className="col-xxl-3 col-lg-4 col-sm-12 mb-3">
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

              <div className="col-xxl-3 col-lg-4 col-sm-12 mb-3">
                <label>{t("Level")} KKK</label>
                <CustomSelect
                  onChangeFunction={changeLevel}
                  optionsList={levelList}
                  isMulti={false}
                />
                {formik.errors.LevelKKKId && (
                  <span className="text-danger">
                    {formik.errors.LevelKKKId}
                  </span>
                )}
              </div>
              {console.log(EQFLevels)}
              <div className="col-xxl-3 col-lg-4 col-sm-12 mb-3">
                <label>{t("Level")} KEK</label>
                <CustomSelect
                  onChangeFunction={changeLevelEQF}
                  optionsList={EQFLevels.sort((a, b) => a.label > b.label)}
                  isMulti={false}
                />
                {formik.errors.LevelKKKId && (
                  <span className="text-danger">
                    {formik.errors.LevelKKKId}
                  </span>
                )}
              </div>
              <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
                <div className="form-group">
                  <label className="form-label">{t("QualificationName")}</label>
                  <textarea
                    rows={5}
                    className="mt-1"
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
              </div>
              <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
                <div className="form-group">
                  <label className="form-label">
                    {t("AccreditedProvider")}
                  </label>
                  <textarea
                    rows={5}
                    className="mt-1"
                    onChange={(e) => {
                      setModel({
                        ...model,
                        AccreditedProvider: e.target.value,
                      });
                      formik.setFieldValue(
                        "AccreditedProvider",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.AccreditedProvider && (
                    <span className="text-danger">
                      {formik.errors.AccreditedProvider}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
                <div className="form-group">
                  <label className="form-label">{t("EntryRequirements")}</label>
                  <textarea
                    rows={5}
                    className="mt-1"
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
              </div>
              <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
                <div className="form-group">
                  <label className="form-label">
                    {t("ExternalQualityAssurance")}
                  </label>
                  <textarea
                    rows={5}
                    className="mt-1"
                    onChange={(e) => {
                      setModel({
                        ...model,
                        ExternalQualityAssurance: e.target.value,
                      });
                      formik.setFieldValue(
                        "ExternalQualityAssurance",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.ExternalQualityAssurance && (
                    <span className="text-danger">
                      {formik.errors.ExternalQualityAssurance}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
                <div className="row">
                  <label className="form-label">
                    {t("FurtherInformationOnQualification")}
                  </label>
                  <div className="col-xxl-2 col-lg-2 col-sm-5">
                    <button
                      type="button"
                      className="btn btn-primary ps-2"
                      onClick={addDynamicDiv}
                    >
                      {t("Add") + " " + t("Modules")}
                    </button>
                  </div>
                </div>
                <div className="row">
                  {dynamicDivs.map((obj) => {
                    return obj;
                  })}
                </div>
              </div>

              <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
                <div className="form-group">
                  <label className="form-label">
                    {t("LanguageOfProvision")}
                  </label>
                  <textarea
                    rows={5}
                    className="mt-1"
                    onChange={(e) => {
                      setModel({
                        ...model,
                        LanguageOfProvision: e.target.value,
                      });
                      formik.setFieldValue(
                        "LanguageOfProvision",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.LanguageOfProvision && (
                    <span className="text-danger">
                      {formik.errors.LanguageOfProvision}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
                <div className="form-group">
                  <label className="form-label">
                    {t("LearningOutcomesKnowledge")}
                  </label>
                  <textarea
                    rows={5}
                    className="mt-1"
                    onChange={(e) => {
                      setModel({
                        ...model,
                        LearningOutcomesKnowledge: e.target.value,
                      });
                      formik.setFieldValue(
                        "LearningOutcomesKnowledge",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.LearningOutcomesKnowledge && (
                    <span className="text-danger">
                      {formik.errors.LearningOutcomesKnowledge}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
                <div className="form-group">
                  <label className="form-label">
                    {t("LinkToRelevantSupplements")}
                  </label>
                  <textarea
                    rows={5}
                    className="mt-1"
                    onChange={(e) => {
                      setModel({
                        ...model,
                        LinkToRelevantSupplements: e.target.value,
                      });
                      formik.setFieldValue(
                        "LinkToRelevantSupplements",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.LinkToRelevantSupplements && (
                    <span className="text-danger">
                      {formik.errors.LinkToRelevantSupplements}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
                <div className="form-group">
                  <label className="form-label">
                    {t("OfficialLengthOfQualification")}
                  </label>
                  <textarea
                    rows={5}
                    className="mt-1"
                    onChange={(e) => {
                      setModel({
                        ...model,
                        OfficialLengthOfQualification: e.target.value,
                      });
                      formik.setFieldValue(
                        "OfficialLengthOfQualification",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.OfficialLengthOfQualification && (
                    <span className="text-danger">
                      {formik.errors.OfficialLengthOfQualification}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
                <div className="form-group">
                  <label className="form-label">
                    {t("RecognitionOfPriorLearning")}
                  </label>
                  <textarea
                    rows={5}
                    className="mt-1"
                    onChange={(e) => {
                      setModel({
                        ...model,
                        RecognitionOfPriorLearning: e.target.value,
                      });
                      formik.setFieldValue(
                        "RecognitionOfPriorLearning",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.RecognitionOfPriorLearning && (
                    <span className="text-danger">
                      {formik.errors.RecognitionOfPriorLearning}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
                <div className="form-group">
                  <label className="form-label">{t("SectorField")}</label>
                  <textarea
                    rows={5}
                    className="mt-1"
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
              </div>

              <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
                <div className="form-group">
                  <label className="form-label">
                    {t("OccupationalStandartCode")}
                  </label>
                  <textarea
                    rows={5}
                    className="mt-1"
                    onChange={(e) => {
                      setModel({
                        ...model,
                        OccupationalStandartCode: e.target.value,
                      });
                      formik.setFieldValue(
                        "OccupationalStandartCode",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.OccupationalStandartCode && (
                    <span className="text-danger">
                      {formik.errors.OccupationalStandartCode}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
                <div className="form-group">
                  <label className="form-label">{t("Other")}</label>
                  <textarea
                    rows={5}
                    className="mt-1"
                    onInput={(e) => {
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
              </div>
            </div>

            <ul className="list-inline mt-3 wizard">
              <li className="next list-inline-item float-end">
                <button
                  type="submit"
                  className="btn btn btn-primary btn-soft-blue rounded-pill "
                >
                  Vazhdo
                </button>
              </li>
            </ul>
          </div>
        </div>
      </form>
      {showSecondForm == true && (
        <SecondApplyFormRegister model={model} setModel={setModel} />
      )}
    </>
  );
}
