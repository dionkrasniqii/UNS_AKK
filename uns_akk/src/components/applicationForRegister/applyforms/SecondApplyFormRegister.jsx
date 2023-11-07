import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProgressBar from "../../custom/ProgressBar";
import CustomSelect from "../../custom/CustomSelect";
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomDatePicker from "../../custom/CustomDatePicker";
import ThirdApplyFormRegister from "./ThirdApplyFormRegister";

export default function SecondApplyFormRegister({ model, setModel }) {
  const { t } = useTranslation();
  const langId = localStorage.getItem("i18nextLng");
  const [showThirdForm, setShowThirdForm] = useState(false);

  useEffect(() => {
    const formDiv = document.querySelector("#form2");
    formDiv.scrollIntoView();
  }, []);

  const [newModel, setNewModel] = useState({
    ReferenceToEuropanQualificationFramework: "",
    OccupationalQualificationStandartVersion: "",
    ValidFrom: "",
    ValidTo: "",
    DateOfDecisionOfOccupationalQualificationCouncil: "",
    QualificationStandartName: "",
    Specialisation: "",
    PartialOccupationalQualifications: "",
    DescriptionOfWork: "",
    WorkUnits: "",
    WorkEnvironmentAndSpecificNatureOfWork: "",
    Tools: "",
    PersonalQualities: "",
    ProfessionalPreparation: "",
    MostCommonOccupationalTitles: "",
    RegulationsGoverningProfession: "",
    CompetencyRequirements: "",
    DesignationInRegister: "",
    FieldOfOccupational: "",
    OccupationalQualificationCouncil: "",
    NoOfdecisionOfOccupationalQualificationCouncil: "",
    Field: "",
    SubField: "",
    Occupation: "",
    ISCO: "",
    ISCED: "",
    NACE: "",
    Status: "",
  });

  function formatedDate(date) {
    const [day, month, year] = date.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  function changeValidFrom(date, dateString) {
    setNewModel({
      ...newModel,
      ValidFrom: formatedDate(dateString),
    });
    formik.setFieldValue("ValidFrom", dateString);
  }

  function changeValidTo(date, dateString) {
    setNewModel({
      ...newModel,
      ValidTo: formatedDate(dateString),
    });
    formik.setFieldValue("ValidTo", dateString);
  }

  function changeDateOfDecision(date, dateString) {
    setNewModel({
      ...newModel,
      DateOfDecisionOfOccupationalQualificationCouncil:
        formatedDate(dateString),
    });
    formik.setFieldValue(
      "DateOfDecisionOfOccupationalQualificationCouncil",
      dateString
    );
  }

  const CreateQualificationStandartsSchema = Yup.object().shape({
    ReferenceToEuropanQualificationFramework: Yup.string().required(
      t("FillField")
    ),
    OccupationalQualificationStandartVersion: Yup.string().required(
      t("FillField")
    ),
    ValidFrom: Yup.string().required(t("FillField")),
    ValidTo: Yup.string().required(t("FillField")),
    DateOfDecisionOfOccupationalQualificationCouncil: Yup.string().required(
      t("FillField")
    ),
    QualificationStandartName: Yup.string().required(t("FillField")),
    Specialisation: Yup.string().required(t("FillField")),
    PartialOccupationalQualifications: Yup.string().required(t("FillField")),
    DescriptionOfWork: Yup.string().required(t("FillField")),
    WorkUnits: Yup.string().required(t("FillField")),
    WorkEnvironmentAndSpecificNatureOfWork: Yup.string().required(
      t("FillField")
    ),
    Tools: Yup.string().required(t("FillField")),
    PersonalQualities: Yup.string().required(t("FillField")),
    ProfessionalPreparation: Yup.string().required(t("FillField")),
    MostCommonOccupationalTitles: Yup.string().required(t("FillField")),
    RegulationsGoverningProfession: Yup.string().required(t("FillField")),
    CompetencyRequirements: Yup.string().required(t("FillField")),
    DesignationInRegister: Yup.string().required(t("FillField")),
    FieldOfOccupational: Yup.string().required(t("FillField")),
    OccupationalQualificationCouncil: Yup.string().required(t("FillField")),
    NoOfdecisionOfOccupationalQualificationCouncil: Yup.string().required(
      t("FillField")
    ),
    Field: Yup.string().required(t("FillField")),
    SubField: Yup.string().required(t("FillField")),
    Occupation: Yup.string().required(t("FillField")),
    ISCO: Yup.string().required(t("FillField")),
    ISCED: Yup.string().required(t("FillField")),
    NACE: Yup.string().required(t("FillField")),
    Status: Yup.string().required(t("FillField")),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: CreateQualificationStandartsSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => {
      setShowThirdForm(true);
      model.QualificationStandarts = newModel;
    },
  });
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        id="form2"
        className="animation animation-bot-top"
      >
        <div className="card">
          <div className="card-body">
            <h4 className="mb-3 text-uppercase">
              Te dhenat e standardit te kualifikimit
            </h4>
            <ProgressBar model={newModel} />
            <div className="row">
              <div className="col-xxl-2 col-lg-2 col-sm-12 mb-3">
                <label>{t("ValidFrom")}:</label>
                <CustomDatePicker onChangeFunction={changeValidFrom} />
                {formik.errors.ValidFrom && (
                  <span className="text-danger">{formik.errors.ValidFrom}</span>
                )}
              </div>
              <div className="col-xxl-2 col-lg-2 col-sm-12 mb-3">
                <label>{t("ValidTo")}:</label>
                <CustomDatePicker onChangeFunction={changeValidTo} />
                {formik.errors.ValidTo && (
                  <span className="text-danger">{formik.errors.ValidTo}</span>
                )}
              </div>
              <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                <label className="text-nowrap">
                  {t("DateOfDecisionOfOccupationalQualificationCouncil")}:
                </label>
                <CustomDatePicker onChangeFunction={changeDateOfDecision} />
                {formik.errors
                  .DateOfDecisionOfOccupationalQualificationCouncil && (
                  <span className="text-danger">
                    {
                      formik.errors
                        .DateOfDecisionOfOccupationalQualificationCouncil
                    }
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("QualificationStandartName")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      QualificationStandartName: e.target.value,
                    });
                    formik.setFieldValue(
                      "QualificationStandartName",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.QualificationStandartName && (
                  <span className="text-danger">
                    {formik.errors.QualificationStandartName}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("ReferenceToEuropanQualificationFramework")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      ReferenceToEuropanQualificationFramework: e.target.value,
                    });
                    formik.setFieldValue(
                      "ReferenceToEuropanQualificationFramework",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.ReferenceToEuropanQualificationFramework && (
                  <span className="text-danger">
                    {formik.errors.ReferenceToEuropanQualificationFramework}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("OccupationalQualificationStandartVersion")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      OccupationalQualificationStandartVersion: e.target.value,
                    });
                    formik.setFieldValue(
                      "OccupationalQualificationStandartVersion",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.OccupationalQualificationStandartVersion && (
                  <span className="text-danger">
                    {formik.errors.OccupationalQualificationStandartVersion}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("Specialisation")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      Specialisation: e.target.value,
                    });
                    formik.setFieldValue("Specialisation", e.target.value);
                  }}
                />
                {formik.errors.Specialisation && (
                  <span className="text-danger">
                    {formik.errors.Specialisation}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("PartialOccupationalQualifications")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      PartialOccupationalQualifications: e.target.value,
                    });
                    formik.setFieldValue(
                      "PartialOccupationalQualifications",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.PartialOccupationalQualifications && (
                  <span className="text-danger">
                    {formik.errors.PartialOccupationalQualifications}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("DescriptionOfWork")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      DescriptionOfWork: e.target.value,
                    });
                    formik.setFieldValue("DescriptionOfWork", e.target.value);
                  }}
                />
                {formik.errors.DescriptionOfWork && (
                  <span className="text-danger">
                    {formik.errors.DescriptionOfWork}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("WorkUnits")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      WorkUnits: e.target.value,
                    });
                    formik.setFieldValue("WorkUnits", e.target.value);
                  }}
                />
                {formik.errors.WorkUnits && (
                  <span className="text-danger">{formik.errors.WorkUnits}</span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("WorkEnvironmentAndSpecificNatureOfWork")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      WorkEnvironmentAndSpecificNatureOfWork: e.target.value,
                    });
                    formik.setFieldValue(
                      "WorkEnvironmentAndSpecificNatureOfWork",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.WorkEnvironmentAndSpecificNatureOfWork && (
                  <span className="text-danger">
                    {formik.errors.WorkEnvironmentAndSpecificNatureOfWork}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("Tools")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      Tools: e.target.value,
                    });
                    formik.setFieldValue("Tools", e.target.value);
                  }}
                />
                {formik.errors.Tools && (
                  <span className="text-danger">{formik.errors.Tools}</span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("PersonalQualities")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      PersonalQualities: e.target.value,
                    });
                    formik.setFieldValue("PersonalQualities", e.target.value);
                  }}
                />
                {formik.errors.PersonalQualities && (
                  <span className="text-danger">
                    {formik.errors.PersonalQualities}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("ProfessionalPreparation")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      ProfessionalPreparation: e.target.value,
                    });
                    formik.setFieldValue(
                      "ProfessionalPreparation",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.ProfessionalPreparation && (
                  <span className="text-danger">
                    {formik.errors.ProfessionalPreparation}
                  </span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("MostCommonOccupationalTitles")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      MostCommonOccupationalTitles: e.target.value,
                    });
                    formik.setFieldValue(
                      "MostCommonOccupationalTitles",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.MostCommonOccupationalTitles && (
                  <span className="text-danger">
                    {formik.errors.MostCommonOccupationalTitles}
                  </span>
                )}
              </div>
              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("RegulationsGoverningProfession")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      RegulationsGoverningProfession: e.target.value,
                    });
                    formik.setFieldValue(
                      "RegulationsGoverningProfession",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.RegulationsGoverningProfession && (
                  <span className="text-danger">
                    {formik.errors.RegulationsGoverningProfession}
                  </span>
                )}
              </div>
              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("CompetencyRequirements")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      CompetencyRequirements: e.target.value,
                    });
                    formik.setFieldValue(
                      "CompetencyRequirements",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.CompetencyRequirements && (
                  <span className="text-danger">
                    {formik.errors.CompetencyRequirements}
                  </span>
                )}
              </div>
              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("DesignationInRegister")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      DesignationInRegister: e.target.value,
                    });
                    formik.setFieldValue(
                      "DesignationInRegister",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.DesignationInRegister && (
                  <span className="text-danger">
                    {formik.errors.DesignationInRegister}
                  </span>
                )}
              </div>
              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("FieldOfOccupational")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      FieldOfOccupational: e.target.value,
                    });
                    formik.setFieldValue("FieldOfOccupational", e.target.value);
                  }}
                />
                {formik.errors.FieldOfOccupational && (
                  <span className="text-danger">
                    {formik.errors.FieldOfOccupational}
                  </span>
                )}
              </div>
              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("OccupationalQualificationCouncil")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      OccupationalQualificationCouncil: e.target.value,
                    });
                    formik.setFieldValue(
                      "OccupationalQualificationCouncil",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.OccupationalQualificationCouncil && (
                  <span className="text-danger">
                    {formik.errors.OccupationalQualificationCouncil}
                  </span>
                )}
              </div>
              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>
                  {t("NoOfdecisionOfOccupationalQualificationCouncil")}
                </label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      NoOfdecisionOfOccupationalQualificationCouncil:
                        e.target.value,
                    });
                    formik.setFieldValue(
                      "NoOfdecisionOfOccupationalQualificationCouncil",
                      e.target.value
                    );
                  }}
                />
                {formik.errors
                  .NoOfdecisionOfOccupationalQualificationCouncil && (
                  <span className="text-danger">
                    {
                      formik.errors
                        .NoOfdecisionOfOccupationalQualificationCouncil
                    }
                  </span>
                )}
              </div>
              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("Field")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      Field: e.target.value,
                    });
                    formik.setFieldValue("Field", e.target.value);
                  }}
                />
                {formik.errors.Field && (
                  <span className="text-danger">{formik.errors.Field}</span>
                )}
              </div>
              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("SubField")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      SubField: e.target.value,
                    });
                    formik.setFieldValue("SubField", e.target.value);
                  }}
                />
                {formik.errors.SubField && (
                  <span className="text-danger">{formik.errors.SubField}</span>
                )}
              </div>
              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("Occupation")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      Occupation: e.target.value,
                    });
                    formik.setFieldValue("Occupation", e.target.value);
                  }}
                />
                {formik.errors.Occupation && (
                  <span className="text-danger">
                    {formik.errors.Occupation}
                  </span>
                )}
              </div>
              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("ISCO")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      ISCO: e.target.value,
                    });
                    formik.setFieldValue("ISCO", e.target.value);
                  }}
                />
                {formik.errors.ISCO && (
                  <span className="text-danger">{formik.errors.ISCO}</span>
                )}
              </div>
              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("ISCED")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      ISCED: e.target.value,
                    });
                    formik.setFieldValue("ISCED", e.target.value);
                  }}
                />
                {formik.errors.ISCED && (
                  <span className="text-danger">{formik.errors.ISCED}</span>
                )}
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("NACE")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      NACE: e.target.value,
                    });
                    formik.setFieldValue("NACE", e.target.value);
                  }}
                />
                {formik.errors.NACE && (
                  <span className="text-danger">{formik.errors.NACE}</span>
                )}
              </div>
              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("Status")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setNewModel({
                      ...newModel,
                      Status: e.target.value,
                    });
                    formik.setFieldValue("Status", e.target.value);
                  }}
                />
                {formik.errors.Status && (
                  <span className="text-danger">{formik.errors.Status}</span>
                )}
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
      {showThirdForm && (
        <ThirdApplyFormRegister model={model} setModel={setModel} />
      )}
    </>
  );
}
