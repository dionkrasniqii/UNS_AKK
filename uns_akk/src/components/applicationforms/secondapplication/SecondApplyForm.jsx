import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import CustomFileInput from "../../custom/CustomFileInput";

export default function SecondApplyForm({
  model,
  setModel,
  secondApplication,
  setSecondApplication,
  submit,
  load,
}) {
  const { t } = useTranslation();

  async function changePartValidationC4Docs(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "ValidationC4Doc"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ValidationC4Doc",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("Docs1", files);
  }
  async function changePartValidationC4Docs2(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "ValidationC4Doc2"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ValidationC4Doc2",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("Docs2", files);
  }
  async function changePartValidationC4Docs3(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "ValidationC4Doc3"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ValidationC4Doc3",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("Docs3", files);
  }
  async function changePartValidationC4Docs4(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "ValidationC4Doc4"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ValidationC4Doc4",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("Docs4", files);
  }
  async function changePartValidationC4Docs5(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "ValidationC4Doc5"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ValidationC4Doc5",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("Docs5", files);
  }
  async function changePartValidationC4Docs6(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "ValidationC4Doc6"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ValidationC4Doc6",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("Docs6", files);
  }
  async function changePartValidationC4Docs7(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "ValidationC4Doc7"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ValidationC4Doc7",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("Docs7", files);
  }
  const schema = Yup.object().shape({
    QualificationTitleB1: Yup.string().required(t("FillField")),
    LevelB2: Yup.string().required(t("FillField")),
    QualificationTypeB3: Yup.string().required(t("FillField")),
    NumberOfHoursOfProfessionalTheoreticalB4: Yup.string().required(
      t("FillField")
    ),
    NumberOfHoursPracticB4: Yup.string().required(t("FillField")),
    NumberOfHoursForEvaluationB4: Yup.string().required(t("FillField")),
    NumberOfHoursForSelfStudyB4: Yup.string().required(t("FillField")),
    TotalNumberOfCreditsB4: Yup.string().required(t("FillField")),
    NumberOfHoursOfGeneralSubjectsB4: Yup.string().required(t("FillField")),
    HasInstitutionDevelopStandartOfJobTextC1: Yup.string().required(
      t("FillField")
    ),
    // HasInstitutionDevelopQualificationTextC2: Yup.string().required(
    //   t("FillField")
    // ),
    Docs1: Yup.mixed().required(t("UploadDocuments")),
    Docs2: Yup.mixed().required(t("UploadDocuments")),
    Docs3: Yup.mixed().required(t("UploadDocuments")),
    Docs4: Yup.mixed().required(t("UploadDocuments")),
    Docs5: Yup.mixed().required(t("UploadDocuments")),
    Docs6: Yup.mixed().required(t("UploadDocuments")),
    Docs7: Yup.mixed().required(t("UploadDocuments")),
    GoalsOfQualificationD11: Yup.string().required(t("FillField")),
    TargetGroupInThisQualificationD12: Yup.string().required(t("FillField")),
    DoesQualificationRelateWithOtherJobsD21: Yup.string().required(
      t("FillField")
    ),
    WhatThisQualificationEnableD22: Yup.string().required(t("FillField")),
    ProvideDetailsOnInvolvementOfActorsD23: Yup.string().required(
      t("FillField")
    ),
    ProvideDetailsOnRelateOfModulesD31: Yup.string().required(t("FillField")),
    ListModulesOfQualificationD4: Yup.string().required(t("FillField")),
    InCaseQualificationHasObligativeModulesD4: Yup.string().required(
      t("FillField")
    ),
    SubmitLogicLinkOfModulesForCertificateD4: Yup.string().required(
      t("FillField")
    ),
    ListModuletZgjedhoreD4: Yup.string().required(t("FillField")),
    ProvideDataForMethodsOfEvaluationD51: Yup.string().required(t("FillField")),
    WhatKnowledgePracticalCompetencesAreAssessedD52: Yup.string().required(
      t("FillField")
    ),
    MinimumRequirementsToAchieveQualificationD53: Yup.string().required(
      t("FillField")
    ),
    WhatEquipmentAreUsedForAssessmentD54: Yup.string().required(t("FillField")),
    EntryRequirementsInQualificationD61: Yup.string().required(t("FillField")),
    CritersAcceptOfCandidatesForQualificationD62: Yup.string().required(
      t("FillField")
    ),
    IsAnyModulPartOfOtherQualificationD63: Yup.string().required(
      t("FillField")
    ),
    DoYouRecognizeCreditsFromOtherInstitutionD64: Yup.string().required(
      t("FillField")
    ),
    InformationIfThisQualificationEnableProgressD65: Yup.string().required(
      t("FillField")
    ),
    ProvideEvidenceOfInternalAndExternalQualityD71: Yup.string().required(
      t("FillField")
    ),
  });
  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async () => submit(),
  });
  return (
    <form
      id="form9"
      onSubmit={formik.handleSubmit}
      className="animation animation-bot-top"
    >
      <div className="row">
        <h4 className="card-title text-center">{t("ValidationApplication")}</h4>
        <p className="text-muted">
          {t("Note")}:
          <br />• {t("ValidationApplicationDesc1")}
        </p>
        <hr />
        <h4 className="card-title text-start">{t("PartB")}</h4>
        <p className="card-title text-start text-muted">
          {t("PartBValidationDesc")}
        </p>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <div className="form-group">
            <label>B.1 {t("ChooseQualificationApplication")}</label>
            <input
              type="text"
              onChange={(e) => {
                setSecondApplication((prevData) => ({
                  ...prevData,
                  QualificationTitleB1: e.target.value,
                }));
                formik.setFieldValue("QualificationTitleB1", e.target.value);
              }}
            />
            {formik.errors.QualificationTitleB1 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.QualificationTitleB1}
              </span>
            )}
          </div>
        </div>
        <div className="col-xxl-4 col-lg-4 col-sm-12">
          <div className="form-group">
            <label>B.2 {t("LevelProposedKKK")}</label>
            <input
              type="text"
              onChange={(e) => {
                setSecondApplication((prevData) => ({
                  ...prevData,
                  LevelB2: e.target.value,
                }));
                formik.setFieldValue("LevelB2", e.target.value);
              }}
            />
            {formik.errors.LevelB2 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.LevelB2}
              </span>
            )}
          </div>
        </div>
        <div className="col-xxl-4 col-lg-4 col-sm-12">
          <div className="form-group">
            <label>B.3 {t("QualificationType")}</label>
            <input
              type="text"
              onChange={(e) => {
                setSecondApplication((prevData) => ({
                  ...prevData,
                  QualificationTypeB3: e.target.value,
                }));
                formik.setFieldValue("QualificationTypeB3", e.target.value);
              }}
            />
            {formik.errors.QualificationTypeB3 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.QualificationTypeB3}
              </span>
            )}
          </div>
        </div>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <label>B.4 {t("B4Validation")}</label>
          <div className="row mt-2">
            <div className="col-xxl-4 col-lg-4 col-sm-12">
              <div className="form-group">
                <label>{t("PartC4ValidationB41")}</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setSecondApplication((prevData) => ({
                      ...prevData,
                      NumberOfHoursOfGeneralSubjectsB4: e.target.value,
                    }));
                    formik.setFieldValue(
                      "NumberOfHoursOfGeneralSubjectsB4",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.NumberOfHoursOfGeneralSubjectsB4 && (
                  <span className="text-danger text-center mt-2 fs-5">
                    {formik.errors.NumberOfHoursOfGeneralSubjectsB4}
                  </span>
                )}
              </div>
            </div>
            <div className="col-xxl-4 col-lg-4 col-sm-12">
              <div className="form-group">
                <label>{t("PartC4ValidationB42")}</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setSecondApplication((prevData) => ({
                      ...prevData,
                      NumberOfHoursOfProfessionalTheoreticalB4: e.target.value,
                    }));
                    formik.setFieldValue(
                      "NumberOfHoursOfProfessionalTheoreticalB4",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.NumberOfHoursOfProfessionalTheoreticalB4 && (
                  <span className="text-danger text-center mt-2 fs-5">
                    {formik.errors.NumberOfHoursOfProfessionalTheoreticalB4}
                  </span>
                )}
              </div>
            </div>
            <div className="col-xxl-4 col-lg-4 col-sm-12">
              <div className="form-group">
                <label>{t("PartC4ValidationB43")}</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setSecondApplication((prevData) => ({
                      ...prevData,
                      NumberOfHoursPracticB4: e.target.value,
                    }));
                    formik.setFieldValue(
                      "NumberOfHoursPracticB4",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.NumberOfHoursPracticB4 && (
                  <span className="text-danger text-center mt-2 fs-5">
                    {formik.errors.NumberOfHoursPracticB4}
                  </span>
                )}
              </div>
            </div>
            <div className="col-xxl-4 col-lg-4 col-sm-12">
              <div className="form-group">
                <label>{t("PartC4ValidationB44")}</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setSecondApplication((prevData) => ({
                      ...prevData,
                      NumberOfHoursForEvaluationB4: e.target.value,
                    }));
                    formik.setFieldValue(
                      "NumberOfHoursForEvaluationB4",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.NumberOfHoursForEvaluationB4 && (
                  <span className="text-danger text-center mt-2 fs-5">
                    {formik.errors.NumberOfHoursForEvaluationB4}
                  </span>
                )}
              </div>
            </div>
            <div className="col-xxl-4 col-lg-4 col-sm-12">
              <div className="form-group">
                <label>{t("PartC4ValidationB45")}</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setSecondApplication((prevData) => ({
                      ...prevData,
                      NumberOfHoursForSelfStudyB4: e.target.value,
                    }));
                    formik.setFieldValue(
                      "NumberOfHoursForSelfStudyB4",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.NumberOfHoursForSelfStudyB4 && (
                  <span className="text-danger text-center mt-2 fs-5">
                    {formik.errors.NumberOfHoursForSelfStudyB4}
                  </span>
                )}
              </div>
            </div>
            <div className="col-xxl-4 col-lg-4 col-sm-12">
              <div className="form-group">
                <label>{t("PartC4ValidationB46")}</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setSecondApplication((prevData) => ({
                      ...prevData,
                      TotalNumberOfCreditsB4: e.target.value,
                    }));
                    formik.setFieldValue(
                      "TotalNumberOfCreditsB4",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.TotalNumberOfCreditsB4 && (
                  <span className="text-danger text-center mt-2 fs-5">
                    {formik.errors.TotalNumberOfCreditsB4}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h4 className="card-title text-start">{t("PartC")}</h4>
        <p className="card-title text-start text-muted">
          {t("PartCValidationDesc")}
        </p>
        <hr />
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <label>C.1 {t("PartCValidationC1")}</label>
          <div className="col-xxl-12 col-lg-12 col-sm-12">
            <input
              type="checkbox"
              className="form-check-input mt-2"
              id="checkboxForC"
              checked={
                secondApplication.HasInstitutionDevelopStandartOfJobC1
                  ? true
                  : false
              }
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  HasInstitutionDevelopStandartOfJobC1: e.target.checked,
                }));
              }}
            />
            <label
              className="form-check-label ps-1 mt-2 pe-1"
              htmlFor="checkboxForC"
            >
              {t("Yes")}
            </label>
            <input
              type="checkbox"
              className="form-check-input mt-2"
              id="checkboxForC1"
              checked={
                secondApplication.HasInstitutionDevelopStandartOfJobC1
                  ? false
                  : true
              }
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  HasInstitutionDevelopStandartOfJobC1: !e.target.checked,
                }));
              }}
            />
            <label
              className="form-check-label mt-2 ps-1"
              htmlFor="checkboxForC1"
            >
              {t("No")}
            </label>
          </div>
          <label className="text-muted w-100">{t("PartC4ValidationC1")}</label>
          <label className="text-muted w-100">
            {t("ParC4ValidationC1Placeholder")}
          </label>
            <p className="text-muted">{t("ProvideWrittenEvidence")}</p>
          <div className="form-group">
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prevData) => ({
                  ...prevData,
                  HasInstitutionDevelopStandartOfJobTextC1: e.target.value,
                }));
                formik.setFieldValue(
                  "HasInstitutionDevelopStandartOfJobTextC1",
                  e.target.value
                );
              }}
            />
            {formik.errors.HasInstitutionDevelopStandartOfJobTextC1 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.HasInstitutionDevelopStandartOfJobTextC1}
              </span>
            )}
          </div>
        </div>
        {/* <p className="text-muted">{t("PartC4ValidationC1Docs")}</p> */}
        <CustomFileInput
          isMultiple={true}
          acceptType=".pdf"
          onChangeFunction={changePartValidationC4Docs}
        />
        {formik.errors.Docs1 && (
          <span className="text-danger text-start mt-2 fs-5">
            {formik.errors.Docs1}
          </span>
        )}
        <div className="col-xxl-12 col-lg-12 col-sm-12 mt-3 mb-3">
          <label>C.2 {t("PartC4ValidationC2")}</label>
          <div className="col-xxl-12 col-lg-12 col-sm-12">
            <input
              type="checkbox"
              className="form-check-input mt-2"
              id="checkboxForC22"
              checked={
                secondApplication.HasInstitutionDevelopQualificationC2
                  ? true
                  : false
              }
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  HasInstitutionDevelopQualificationC2: e.target.checked,
                }));
              }}
            />
            <label
              className="form-check-label ps-1 mt-2 pe-1"
              htmlFor="checkboxForC22"
            >
              {t("Yes")}
            </label>
            <input
              type="checkbox"
              className="form-check-input mt-2"
              id="checkboxForC222"
              checked={
                secondApplication.HasInstitutionDevelopQualificationC2
                  ? false
                  : true
              }
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  HasInstitutionDevelopQualificationC2: !e.target.checked,
                }));
              }}
            />
            <label
              className="form-check-label mt-2 ps-1"
              htmlFor="checkboxForC222"
            >
              {t("No")}
            </label>
          </div>
          <label className="text-muted w-100">{t("PartC4ValidationC22")}</label>
          <label className="text-muted w-100">
            {t("ParC4ValidationC1Placeholder")}
          </label>
          <p className="text-muted">{t("PartC4ValidationC1Docs")}</p>
          <div className="form-group">
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prevData) => ({
                  ...prevData,
                  HasInstitutionDevelopQualificationTextC2: e.target.value,
                }));
                // formik.setFieldValue(
                //   "HasInstitutionDevelopQualificationTextC2",
                //   e.target.value
                // );
              }}
            />
            {/* {formik.errors.HasInstitutionDevelopQualificationTextC2 && (
              <span className='text-danger text-center mt-2 fs-5'>
                {formik.errors.HasInstitutionDevelopQualificationTextC2}
              </span>
            )} */}
          </div>
          <CustomFileInput
            isMultiple={true}
            acceptType=".pdf"
            onChangeFunction={changePartValidationC4Docs2}
          />
          {formik.errors.Docs2 && (
            <span className="text-danger text-center mt-2 fs-5">
              {formik.errors.Docs2}
            </span>
          )}
        </div>
        <hr />
        <h4 className="card-title text-start">{t("PartD")}</h4>
        <h5 className="card-title text-start">{t("PartDValidationDesc")}</h5>
        <h5 className="card-title text-start">
          D.1 {t("PartDValidationDesc1")}
        </h5>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <div className="form-group">
            <label>D1.1 {t("PartDValidationDesc2")}</label>
            <textarea
            placeholder={t("DescribeGeneralPurposeOfQualification")}
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  GoalsOfQualificationD11: e.target.value,
                }));
                formik.setFieldValue("GoalsOfQualificationD11", e.target.value);
              }}
            />
            {formik.errors.GoalsOfQualificationD11 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.GoalsOfQualificationD11}
              </span>
            )}
          </div>
        </div>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <div className="form-group">
            <label>D1.2 {t("PartDValidationDesc3")}</label>
            <textarea
              rows={5}
              placeholder={t("PartDValidationDesc3Placeholder")}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  TargetGroupInThisQualificationD12: e.target.value,
                }));
                formik.setFieldValue(
                  "TargetGroupInThisQualificationD12",
                  e.target.value
                );
              }}
            />
            {formik.errors.TargetGroupInThisQualificationD12 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.TargetGroupInThisQualificationD12}
              </span>
            )}
          </div>
        </div>
        <h5 className="card-title text-start">
          D.2 {t("PartDValidationDesc5")}
        </h5>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <div className="form-group">
            <label className="">D2.1 {t("PartDValidationDesc6")}</label>
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  DoesQualificationRelateWithOtherJobsD21: e.target.value,
                }));
                formik.setFieldValue(
                  "DoesQualificationRelateWithOtherJobsD21",
                  e.target.value
                );
              }}
            />
            {formik.errors.DoesQualificationRelateWithOtherJobsD21 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.DoesQualificationRelateWithOtherJobsD21}
              </span>
            )}
          </div>
        </div>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <div className="form-group">
            <label>D2.2 {t("PartDValidationDesc7")}</label>
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  WhatThisQualificationEnableD22: e.target.value,
                }));
                formik.setFieldValue(
                  "WhatThisQualificationEnableD22",
                  e.target.value
                );
              }}
            />
            {formik.errors.WhatThisQualificationEnableD22 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.WhatThisQualificationEnableD22}
              </span>
            )}
          </div>
        </div>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <div className="form-group">
            <label>D2.3 {t("PartDValidationDesc8")}</label>
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  ProvideDetailsOnInvolvementOfActorsD23: e.target.value,
                }));
                formik.setFieldValue(
                  "ProvideDetailsOnInvolvementOfActorsD23",
                  e.target.value
                );
              }}
            />
            {formik.errors.ProvideDetailsOnInvolvementOfActorsD23 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.ProvideDetailsOnInvolvementOfActorsD23}
              </span>
            )}
          </div>
        </div>
        <h5 className="card-title text-start">
          D.3 {t("PartDValidationDesc9")}
        </h5>
        <div className="col-xxl-12 col-lg-12 col-sm-12 mb-3">
          <div className="form-group">
            <label>D3.1 {t("PartDValidationDesc10")}</label>
            <textarea
              rows={5}
              className="mt-5"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  ProvideDetailsOnRelateOfModulesD31: e.target.value,
                }));
                formik.setFieldValue(
                  "ProvideDetailsOnRelateOfModulesD31",
                  e.target.value
                );
              }}
            />
            {formik.errors.ProvideDetailsOnRelateOfModulesD31 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.ProvideDetailsOnRelateOfModulesD31}
              </span>
            )}
          </div>
          <p className="text-muted">{t("PartDValidationDesc11")}</p>
          <CustomFileInput
            isMultiple={true}
            acceptType=".pdf"
            onChangeFunction={changePartValidationC4Docs3}
          />
          {formik.errors.Docs3 && (
            <span className="text-danger text-center mt-2 fs-5">
              {formik.errors.Docs3}
            </span>
          )}
        </div>
        <h5 className="card-title text-start">
          D.4 {t("PartDValidationDesc12")}
        </h5>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <div className="form-group">
            <label>{t("PartDValidationDesc13")}</label>
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  ListModulesOfQualificationD4: e.target.value,
                }));
                formik.setFieldValue(
                  "ListModulesOfQualificationD4",
                  e.target.value
                );
              }}
            />
            {formik.errors.ListModulesOfQualificationD4 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.ListModulesOfQualificationD4}
              </span>
            )}
          </div>
        </div>
        <div className="col-xxl-12 col-lg-12 col-sm-12 ">
          <div className="form-group">
            <label>{t("PartDValidationDesc15")}</label>
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  InCaseQualificationHasObligativeModulesD4: e.target.value,
                }));
                formik.setFieldValue(
                  "InCaseQualificationHasObligativeModulesD4",
                  e.target.value
                );
              }}
            />
            {formik.errors.InCaseQualificationHasObligativeModulesD4 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.InCaseQualificationHasObligativeModulesD4}
              </span>
            )}
          </div>
        </div>
        <div className="col-xxl-12 col-lg-12 col-sm-12 ">
          <div className="form-group">
            <label>{t("PartDValidationDesc14")}</label>
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  SubmitLogicLinkOfModulesForCertificateD4: e.target.value,
                }));
                formik.setFieldValue(
                  "SubmitLogicLinkOfModulesForCertificateD4",
                  e.target.value
                );
              }}
            />
            {formik.errors.SubmitLogicLinkOfModulesForCertificateD4 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.SubmitLogicLinkOfModulesForCertificateD4}
              </span>
            )}
          </div>
        </div>
        <div className="col-xxl-12 col-lg-12 col-sm-12 ">
          <div className="form-group">
            <label>{t("PartDValidationDesc16")}</label>
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  ListModuletZgjedhoreD4: e.target.value,
                }));
                formik.setFieldValue("ListModuletZgjedhoreD4", e.target.value);
              }}
            />
            {formik.errors.ListModuletZgjedhoreD4 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.ListModuletZgjedhoreD4}
              </span>
            )}
          </div>
        </div>
        <h5 className="card-title text-start">
          D.5 {t("PartDValidationDesc17")}
        </h5>
        <div className="col-xxl-12 col-lg-12 col-sm-12 mb-3">
          <div className="form-group">
            <label>D.5.1 {t("PartDValidationDesc18")}</label>
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  ProvideDataForMethodsOfEvaluationD51: e.target.value,
                }));
                formik.setFieldValue(
                  "ProvideDataForMethodsOfEvaluationD51",
                  e.target.value
                );
              }}
            />
            {formik.errors.ProvideDataForMethodsOfEvaluationD51 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.ProvideDataForMethodsOfEvaluationD51}
              </span>
            )}
          </div>
          <p className="text-muted">{t("PartDValidationDesc19")}</p>
          <CustomFileInput
            isMultiple={true}
            acceptType=".pdf"
            onChangeFunction={changePartValidationC4Docs4}
          />
          {formik.errors.Docs4 && (
            <span className="text-danger text-center mt-2 fs-5">
              {formik.errors.Docs4}
            </span>
          )}
        </div>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <div className="form-group">
            <label>D.5.2 {t("PartDValidationDesc20")}</label>
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  WhatKnowledgePracticalCompetencesAreAssessedD52:
                    e.target.value,
                }));
                formik.setFieldValue(
                  "WhatKnowledgePracticalCompetencesAreAssessedD52",
                  e.target.value
                );
              }}
            />
            {formik.errors.WhatKnowledgePracticalCompetencesAreAssessedD52 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.WhatKnowledgePracticalCompetencesAreAssessedD52}
              </span>
            )}
          </div>
        </div>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <div className="form-group">
            <label>D.5.3 {t("PartDValidationDesc21")}</label>
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  MinimumRequirementsToAchieveQualificationD53: e.target.value,
                }));
                formik.setFieldValue(
                  "MinimumRequirementsToAchieveQualificationD53",
                  e.target.value
                );
              }}
            />
            {formik.errors.MinimumRequirementsToAchieveQualificationD53 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.MinimumRequirementsToAchieveQualificationD53}
              </span>
            )}
          </div>
        </div>
        <div className="col-xxl-12 col-lg-12 col-sm-12 mb-3">
          <div className="form-group">
            <label>D.5.4 {t("PartDValidationDesc22")}</label>
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  WhatEquipmentAreUsedForAssessmentD54: e.target.value,
                }));
                formik.setFieldValue(
                  "WhatEquipmentAreUsedForAssessmentD54",
                  e.target.value
                );
              }}
            />
            {formik.errors.WhatEquipmentAreUsedForAssessmentD54 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.WhatEquipmentAreUsedForAssessmentD54}
              </span>
            )}
          </div>
          <p className="text-muted">{t("PartDValidationDesc23")}</p>
          <CustomFileInput
            isMultiple={true}
            acceptType=".pdf"
            onChangeFunction={changePartValidationC4Docs5}
          />
          {formik.errors.Docs5 && (
            <span className="text-danger text-center mt-2 fs-5">
              {formik.errors.Docs5}
            </span>
          )}
        </div>
        <h5 className="card-title text-start">
          D.6 {t("PartDValidationDesc24")}
        </h5>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <div className="form-group">
            <label>D.6.1 {t("PartDValidationDesc25")}</label>
            <textarea
              rows={5}
              placeholder={t("AgeAndPreviousQualification")}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  EntryRequirementsInQualificationD61: e.target.value,
                }));
                formik.setFieldValue(
                  "EntryRequirementsInQualificationD61",
                  e.target.value
                );
              }}
            />
            {formik.errors.EntryRequirementsInQualificationD61 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.EntryRequirementsInQualificationD61}
              </span>
            )}
          </div>
        </div>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <div className="form-group">
            <label>D.6.2 {t("PartDValidationDesc26")}</label>
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  CritersAcceptOfCandidatesForQualificationD62: e.target.value,
                }));
                formik.setFieldValue(
                  "CritersAcceptOfCandidatesForQualificationD62",
                  e.target.value
                );
              }}
            />
            {formik.errors.CritersAcceptOfCandidatesForQualificationD62 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.CritersAcceptOfCandidatesForQualificationD62}
              </span>
            )}
          </div>
        </div>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <div className="form-group">
            <label>D.6.3 {t("PartDValidationDesc27")}</label>
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  IsAnyModulPartOfOtherQualificationD63: e.target.value,
                }));
                formik.setFieldValue(
                  "IsAnyModulPartOfOtherQualificationD63",
                  e.target.value
                );
              }}
            />
            {formik.errors.IsAnyModulPartOfOtherQualificationD63 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.IsAnyModulPartOfOtherQualificationD63}
              </span>
            )}
          </div>
        </div>
        <div className="col-xxl-12 col-lg-12 col-sm-12 mb-3">
          <div className="form-group">
            <label>D.6.4 {t("PartDValidationDesc28")}</label>
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  DoYouRecognizeCreditsFromOtherInstitutionD64: e.target.value,
                }));
                formik.setFieldValue(
                  "DoYouRecognizeCreditsFromOtherInstitutionD64",
                  e.target.value
                );
              }}
            />
            {formik.errors.DoYouRecognizeCreditsFromOtherInstitutionD64 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.DoYouRecognizeCreditsFromOtherInstitutionD64}
              </span>
            )}
          </div>
          <p className="text-muted">{t("PartDValidationDesc29")}</p>
          <CustomFileInput
            isMultiple={true}
            acceptType=".pdf"
            onChangeFunction={changePartValidationC4Docs6}
          />
          {formik.errors.Docs6 && (
            <span className="text-danger text-center mt-2 fs-5">
              {formik.errors.Docs6}
            </span>
          )}
        </div>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <div className="form-group">
            <label>D.6.5 {t("PartDValidationDesc30")}</label>
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  InformationIfThisQualificationEnableProgressD65:
                    e.target.value,
                }));
                formik.setFieldValue(
                  "InformationIfThisQualificationEnableProgressD65",
                  e.target.value
                );
              }}
            />
            {formik.errors.InformationIfThisQualificationEnableProgressD65 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.InformationIfThisQualificationEnableProgressD65}
              </span>
            )}
          </div>
        </div>
        <h5 className="card-title text-start">
          D.7 {t("PartDValidationDesc31")}
        </h5>
        <div className="col-xxl-12 col-lg-12 col-sm-12 mb-3">
          <div className="form-group">
            <label>D.7.1 {t("PartDValidationDesc32")}</label>
            <textarea
              rows={5}
              className="mt-2"
              onChange={(e) => {
                setSecondApplication((prev) => ({
                  ...prev,
                  ProvideEvidenceOfInternalAndExternalQualityD71:
                    e.target.value,
                }));
                formik.setFieldValue(
                  "ProvideEvidenceOfInternalAndExternalQualityD71",
                  e.target.value
                );
              }}
            />
            {formik.errors.ProvideEvidenceOfInternalAndExternalQualityD71 && (
              <span className="text-danger text-center mt-2 fs-5">
                {formik.errors.ProvideEvidenceOfInternalAndExternalQualityD71}
              </span>
            )}
          </div>
          <p className="text-muted">{t("PartDValidationDesc33")}</p>
          <CustomFileInput
            isMultiple={true}
            acceptType=".pdf"
            onChangeFunction={changePartValidationC4Docs7}
          />
          {formik.errors.Docs7 && (
            <span className="text-danger text-center mt-2 fs-5">
              {formik.errors.Docs7}
            </span>
          )}
        </div>
        {/* <hr />
        <h4 className="card-title text-start">{t("PartE")}</h4>
        <p className="card-title text-start text-muted">
          {t("PartDValidationDesc34")}
        </p>
        <h5 className="card-title text-start ">E1.1 {t("PartC1.1")}</h5>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <div className="row">
            <div className="col-xxl-3 col-lg-5 col-sm-12">
              <div className="form-group">
                <label>{t("Name") + " " + t("Surname")}</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      NameSurnameLeaderE11: e.target.value,
                    }));
                    formik.setFieldValue("NameSurnameLeader", e.target.value);
                  }}
                />
                {formik.errors.NameSurnameLeader && (
                  <span className="text-danger mt-2 ">
                    {formik.errors.NameSurnameLeader}
                  </span>
                )}
              </div>
            </div>
            <div className="col-xxl-3 col-lg-5 col-sm-12">
              <div className="form-group">
                <label>{t("Address")}</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      AddressLeaderE11: e.target.value,
                    }));
                    formik.setFieldValue("AddressLeader", e.target.value);
                  }}
                />
                {formik.errors.NameSurnameLeader && (
                  <span className="text-danger mt-2 ">
                    {formik.errors.NameSurnameLeader}
                  </span>
                )}
              </div>
            </div>
            <div className="col-xxl-3 col-lg-5 col-sm-12">
              <div className="form-group">
                <label>{t("PhoneNumber")}</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      PhoneNumberLeaderE11: e.target.value,
                    }));
                    formik.setFieldValue("PhoneNumberLeader", e.target.value);
                  }}
                />
                {formik.errors.PhoneNumberLeader && (
                  <span className="text-danger mt-2 ">
                    {formik.errors.PhoneNumberLeader}
                  </span>
                )}
              </div>
            </div>
            <div className="col-xxl-3 col-lg-5 col-sm-12">
              <div className="form-group">
                <label>{t("Fax")}</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      FaxLeaderE11: e.target.value,
                    }));
                    formik.setFieldValue("FaxLeader", e.target.value);
                  }}
                />
                {formik.errors.FaxLeader && (
                  <span className="text-danger mt-2 ">
                    {formik.errors.FaxLeader}
                  </span>
                )}
              </div>
            </div>
            <div className="col-xxl-3 col-lg-5 col-sm-12">
              <div className="form-group">
                <label>{t("Email")}</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      EmailLeaderE11: e.target.value,
                    }));
                    formik.setFieldValue("EmailLeader", e.target.value);
                  }}
                />
                {formik.errors.EmailLeader && (
                  <span className="text-danger mt-2 ">
                    {formik.errors.EmailLeader}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h5 className="card-title text-start ">E1.2 {t("PartC1.2")}</h5>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <div className="row">
            <div className="col-xxl-3 col-lg-5 col-sm-12">
              <div className="form-group">
                <label>{t("Name") + " " + t("Surname")}</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      NameSurnameCoordinatorE12: e.target.value,
                    }));
                    formik.setFieldValue(
                      "NameSurnameCoordinator",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.NameSurnameCoordinator && (
                  <span className="text-danger mt-2 ">
                    {formik.errors.NameSurnameCoordinator}
                  </span>
                )}
              </div>
            </div>
            <div className="col-xxl-3 col-lg-5 col-sm-12">
              <div className="form-group">
                <label>{t("Address")}</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      AddressCoordinatorE12: e.target.value,
                    }));
                    formik.setFieldValue("AddressCoordinator", e.target.value);
                  }}
                />
                {formik.errors.NameSurnameCoordinator && (
                  <span className="text-danger mt-2 ">
                    {formik.errors.NameSurnameCoordinator}
                  </span>
                )}
              </div>
            </div>
            <div className="col-xxl-3 col-lg-5 col-sm-12">
              <div className="form-group">
                <label>{t("PhoneNumber")}</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      PhoneNumberCoordinatorE12: e.target.value,
                    }));
                    formik.setFieldValue(
                      "PhoneNumberCoordinator",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.PhoneNumberCoordinator && (
                  <span className="text-danger mt-2 ">
                    {formik.errors.PhoneNumberCoordinator}
                  </span>
                )}
              </div>
            </div>
            <div className="col-xxl-3 col-lg-5 col-sm-12">
              <div className="form-group">
                <label>{t("Fax")}</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      FaxCoordinatorE12: e.target.value,
                    }));
                    formik.setFieldValue("FaxCoordinator", e.target.value);
                  }}
                />
                {formik.errors.FaxCoordinator && (
                  <span className="text-danger mt-2 ">
                    {formik.errors.FaxCoordinator}
                  </span>
                )}
              </div>
            </div>
            <div className="col-xxl-3 col-lg-5 col-sm-12">
              <div className="form-group">
                <label>{t("Email")}</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      EmailCoordinatorE12: e.target.value,
                    }));
                    formik.setFieldValue("EmailCoordinator", e.target.value);
                  }}
                />
                {formik.errors.EmailCoordinator && (
                  <span className="text-danger mt-2 ">
                    {formik.errors.EmailCoordinator}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr />

        <h5 className="card-title text-start ">E1.5 {t("PartC1.5")}</h5>
        <div className="col-xxl-12 col-lg-12 col-sm-12">
          <div className="col-xxl-3 col-lg-5 col-sm-12">
            <div className="form-group">
              <input
                type="text"
                onChange={(e) => {
                  setSecondApplication((prev) => ({
                    ...prev,
                    PlaceOfApplicationE15: e.target.value,
                  }));
                  formik.setFieldValue("PlaceOfApplication", e.target.value);
                }}
              />
              {formik.errors.PlaceOfApplication && (
                <span className="text-danger mt-2 ">
                  {formik.errors.PlaceOfApplication}
                </span>
              )}
            </div>
          </div>
        </div> */}
      </div>
      <div className="col-xxl-12 col-lg-12 col-sm-12 text-end">
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
      </div>
    </form>
  );
}
