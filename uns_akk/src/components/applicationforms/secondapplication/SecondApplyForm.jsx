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
  }
  const schema = Yup.object().shape({
    QualificationTitleB1: Yup.string().required(t("FillField")),
    LevelB2: Yup.string().required(t("FillField")),
    QualificationTypeB3: Yup.string().required(t("FillField")),
    NumberOfHoursOfGeneralSubjectsB4: Yup.string().required(t("FillField")),
    NumberOfHoursOfProfessionalTheoreticalB4: Yup.string().required(
      t("FillField")
    ),
    NumberOfHoursPracticB4: Yup.string().required(t("FillField")),
    NumberOfHoursForEvaluationB4: Yup.string().required(t("FillField")),
    NumberOfHoursForSelfStudyB4: Yup.string().required(t("FillField")),
    TotalNumberOfCreditsB4: Yup.string().required(t("FillField")),
    NumberOfHoursOfGeneralSubjectsB4: Yup.string().required(t("FillField")),
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
      id='form9'
      onSubmit={formik.handleSubmit}
      className='animation animation-bot-top'
    >
      <div className='row'>
        <h4 className='card-title text-center'>{t("ValidationApplication")}</h4>
        <p className='text-muted'>
          {t("Note")}:
          <br />• {t("ValidationApplicationDesc1")}
        </p>
        <hr />
        <h4 className='card-title text-start'>{t("PartB")}</h4>
        <p className='card-title text-start text-muted'>
          {t("PartBValidationDesc")}
        </p>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='form-group'>
            <label>B.1 {t("ChooseQualificationApplication")}</label>
            <input
              type='text'
              onChange={(e) => {
                setSecondApplication((prevData) => ({
                  ...prevData,
                  QualificationTitleB1: e.target.value,
                }));
                formik.setFieldValue("QualificationTitleB1", e.target.value);
              }}
            />
            {formik.errors.QualificationTitleB1 && (
              <span className='text-danger text-center mt-2 fs-5'>
                {formik.errors.QualificationTitleB1}
              </span>
            )}
          </div>
        </div>
        <div className='col-xxl-4 col-lg-4 col-sm-12'>
          <div className='form-group'>
            <label>B.2 {t("LevelProposedKKK")}</label>
            <input
              type='text'
              onChange={(e) => {
                setSecondApplication((prevData) => ({
                  ...prevData,
                  LevelB2: e.target.value,
                }));
                formik.setFieldValue("LevelB2", e.target.value);
              }}
            />
            {formik.errors.LevelB2 && (
              <span className='text-danger text-center mt-2 fs-5'>
                {formik.errors.LevelB2}
              </span>
            )}
          </div>
        </div>
        <div className='col-xxl-4 col-lg-4 col-sm-12'>
          <div className='form-group'>
            <label>B.3 {t("QualificationType")}</label>
            <input
              type='text'
              onChange={(e) => {
                setSecondApplication((prevData) => ({
                  ...prevData,
                  QualificationTypeB3: e.target.value,
                }));
                formik.setFieldValue("QualificationTypeB3", e.target.value);
              }}
            />
            {formik.errors.QualificationTypeB3 && (
              <span className='text-danger text-center mt-2 fs-5'>
                {formik.errors.QualificationTypeB3}
              </span>
            )}
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <label>B.4 {t("B4Validation")}</label>
          <div className='row mt-2'>
            <div className='col-xxl-4 col-lg-4 col-sm-12'>
              <div className='form-group'>
                <label>{t("PartC4ValidationB41")}</label>
                <input
                  type='text'
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
                  <span className='text-danger text-center mt-2 fs-5'>
                    {formik.errors.NumberOfHoursOfGeneralSubjectsB4}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-4 col-lg-4 col-sm-12'>
              <div className='form-group'>
                <label>{t("PartC4ValidationB42")}</label>
                <input
                  type='text'
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
                  <span className='text-danger text-center mt-2 fs-5'>
                    {formik.errors.NumberOfHoursOfProfessionalTheoreticalB4}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-4 col-lg-4 col-sm-12'>
              <div className='form-group'>
                <label>{t("PartC4ValidationB43")}</label>
                <input
                  type='text'
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
                  <span className='text-danger text-center mt-2 fs-5'>
                    {formik.errors.NumberOfHoursPracticB4}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-4 col-lg-4 col-sm-12'>
              <div className='form-group'>
                <label>{t("PartC4ValidationB44")}</label>
                <input
                  type='text'
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
                  <span className='text-danger text-center mt-2 fs-5'>
                    {formik.errors.NumberOfHoursForEvaluationB4}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-4 col-lg-4 col-sm-12'>
              <div className='form-group'>
                <label>{t("PartC4ValidationB45")}</label>
                <input
                  type='text'
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
                  <span className='text-danger text-center mt-2 fs-5'>
                    {formik.errors.NumberOfHoursForSelfStudyB4}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-4 col-lg-4 col-sm-12'>
              <div className='form-group'>
                <label>{t("PartC4ValidationB46")}</label>
                <input
                  type='text'
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
                  <span className='text-danger text-center mt-2 fs-5'>
                    {formik.errors.TotalNumberOfCreditsB4}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h4 className='card-title text-start'>{t("PartC")}</h4>
        <p className='card-title text-start text-muted'>
          {t("PartCValidationDesc")}
        </p>
        <hr />
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <label>C.1 {t("PartCValidationC1")}</label>
          <div className='col-xxl-12 col-lg-12 col-sm-12'>
            <input
              type='checkbox'
              className='form-check-input mt-2'
              id='checkboxForC'
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
              className='form-check-label ps-1 mt-2 pe-1'
              htmlFor='checkboxForC'
            >
              {t("Yes")}
            </label>
            <input
              type='checkbox'
              className='form-check-input mt-2'
              id='checkboxForC1'
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
              className='form-check-label mt-2 ps-1'
              htmlFor='checkboxForC1'
            >
              {t("No")}
            </label>
          </div>
          <label className='text-muted w-100'>{t("PartC4ValidationC1")}</label>
          <label className='text-muted w-100'>
            {t("ParC4ValidationC1Placeholder")}
          </label>
          <div className='form-group'>
            <textarea
              rows={5}
              className='mt-2'
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
          </div>
        </div>
        <p className='text-muted'>{t("PartC4ValidationC1Docs")}</p>
        <CustomFileInput
          isMultiple={true}
          acceptType='.pdf'
          onChangeFunction={changePartValidationC4Docs}
        />
        <div className='col-xxl-12 col-lg-12 col-sm-12 mt-3 mb-3'>
          <label>C.2 {t("PartC4ValidationC2")}</label>
          <div className='col-xxl-12 col-lg-12 col-sm-12'>
            <input
              type='checkbox'
              className='form-check-input mt-2'
              id='checkboxForC22'
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
              className='form-check-label ps-1 mt-2 pe-1'
              htmlFor='checkboxForC22'
            >
              {t("Yes")}
            </label>
            <input
              type='checkbox'
              className='form-check-input mt-2'
              id='checkboxForC222'
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
              className='form-check-label mt-2 ps-1'
              htmlFor='checkboxForC222'
            >
              {t("No")}
            </label>
          </div>
          <label className='text-muted w-100'>{t("PartC4ValidationC22")}</label>
          <label className='text-muted w-100'>
            {t("ParC4ValidationC1Placeholder")}
          </label>
          <div className='form-group'>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) => {
                setSecondApplication((prevData) => ({
                  ...prevData,
                  HasInstitutionDevelopQualificationTextC2: e.target.value,
                }));
                formik.setFieldValue(
                  "NumberOfHoursOfGeneralSubjectsB4",
                  e.target.value
                );
              }}
            />
          </div>
          <p className='text-muted'>{t("PartC4ValidationC1Docs")}</p>
          <CustomFileInput
            isMultiple={true}
            acceptType='.pdf'
            onChangeFunction={changePartValidationC4Docs2}
          />
        </div>
        <hr />
        <h4 className='card-title text-start'>{t("PartD")}</h4>
        <h5 className='card-title text-start'>{t("PartDValidationDesc")}</h5>
        <h5 className='card-title text-start'>
          D.1 {t("PartDValidationDesc1")}
        </h5>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='form-group'>
            <label>D1.1 {t("PartDValidationDesc2")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  GoalsOfQualificationD11: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='form-group'>
            <label>D1.2 {t("PartDValidationDesc3")}</label>
            <textarea
              rows={5}
              placeholder={t("PartDValidationDesc3Placeholder")}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  TargetGroupInThisQualificationD12: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <h5 className='card-title text-start'>
          D.2 {t("PartDValidationDesc5")}
        </h5>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='form-group'>
            <label className=''>D2.1 {t("PartDValidationDesc6")}</label>
            <textarea
              rows={5}
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  DoesQualificationRelateWithOtherJobsD21: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='form-group'>
            <label>D2.2 {t("PartDValidationDesc7")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  WhatThisQualificationEnableD22: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='form-group'>
            <label>D2.3 {t("PartDValidationDesc8")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  ProvideDetailsOnInvolvementOfActorsD23: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <h5 className='card-title text-start'>
          D.3 {t("PartDValidationDesc9")}
        </h5>
        <div className='col-xxl-12 col-lg-12 col-sm-12 mb-3'>
          <div className='form-group'>
            <label>D3.1 {t("PartDValidationDesc10")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  ProvideDetailsOnRelateOfModulesD31: e.target.value,
                }))
              }
            />
          </div>
          <p className='text-muted'>{t("PartDValidationDesc11")}</p>
          <CustomFileInput
            isMultiple={true}
            acceptType='.pdf'
            onChangeFunction={changePartValidationC4Docs3}
          />
        </div>
        <h5 className='card-title text-start'>
          D.4 {t("PartDValidationDesc12")}
        </h5>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='form-group'>
            <label>{t("PartDValidationDesc13")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  ListModulesOfQualificationD4: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12 '>
          <div className='form-group'>
            <label>{t("PartDValidationDesc15")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  InCaseQualificationHasObligativeModulesD4: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12 '>
          <div className='form-group'>
            <label>{t("PartDValidationDesc14")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  SubmitLogicLinkOfModulesForCertificateD4: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12 '>
          <div className='form-group'>
            <label>{t("PartDValidationDesc16")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  ListModuletZgjedhoreD4: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <h5 className='card-title text-start'>
          D.5 {t("PartDValidationDesc17")}
        </h5>
        <div className='col-xxl-12 col-lg-12 col-sm-12 mb-3'>
          <div className='form-group'>
            <label>D.5.1 {t("PartDValidationDesc18")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  ProvideDataForMethodsOfEvaluationD51: e.target.value,
                }))
              }
            />
          </div>
          <p className='text-muted'>{t("PartDValidationDesc19")}</p>
          <CustomFileInput
            isMultiple={true}
            acceptType='.pdf'
            onChangeFunction={changePartValidationC4Docs4}
          />
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='form-group'>
            <label>D.5.2 {t("PartDValidationDesc20")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  WhatKnowledgePracticalCompetencesAreAssessedD52:
                    e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='form-group'>
            <label>D.5.3 {t("PartDValidationDesc21")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  MinimumRequirementsToAchieveQualificationD53: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12 mb-3'>
          <div className='form-group'>
            <label>D.5.4 {t("PartDValidationDesc22")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  WhatEquipmentAreUsedForAssessmentD54: e.target.value,
                }))
              }
            />
          </div>
          <p className='text-muted'>{t("PartDValidationDesc23")}</p>
          <CustomFileInput
            isMultiple={true}
            acceptType='.pdf'
            onChangeFunction={changePartValidationC4Docs5}
          />
        </div>
        <h5 className='card-title text-start'>
          D.6 {t("PartDValidationDesc24")}
        </h5>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='form-group'>
            <label>D.6.1 {t("PartDValidationDesc25")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  EntryRequirementsInQualificationD61: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='form-group'>
            <label>D.6.2 {t("PartDValidationDesc26")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  CritersAcceptOfCandidatesForQualificationD62: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='form-group'>
            <label>D.6.3 {t("PartDValidationDesc27")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  IsAnyModulPartOfOtherQualificationD63: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12 mb-3'>
          <div className='form-group'>
            <label>D.6.4 {t("PartDValidationDesc28")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  DoYouRecognizeCreditsFromOtherInstitutionD64: e.target.value,
                }))
              }
            />
          </div>
          <p className='text-muted'>{t("PartDValidationDesc29")}</p>
          <CustomFileInput
            isMultiple={true}
            acceptType='.pdf'
            onChangeFunction={changePartValidationC4Docs6}
          />
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='form-group'>
            <label>D.6.5 {t("PartDValidationDesc30")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  InformationIfThisQualificationEnableProgressD65:
                    e.target.value,
                }))
              }
            />
          </div>
        </div>
        <h5 className='card-title text-start'>
          D.7 {t("PartDValidationDesc31")}
        </h5>
        <div className='col-xxl-12 col-lg-12 col-sm-12 mb-3'>
          <div className='form-group'>
            <label>D.7.1 {t("PartDValidationDesc32")}</label>
            <textarea
              rows={5}
              className='mt-2'
              onChange={(e) =>
                setSecondApplication((prev) => ({
                  ...prev,
                  ProvideEvidenceOfInternalAndExternalQualityD71:
                    e.target.value,
                }))
              }
            />
          </div>
          <p className='text-muted'>{t("PartDValidationDesc33")}</p>
          <CustomFileInput
            isMultiple={true}
            acceptType='.pdf'
            onChangeFunction={changePartValidationC4Docs7}
          />
        </div>
        <hr />
        <h4 className='card-title text-start'>{t("PartE")}</h4>
        <p className='card-title text-start text-muted'>
          {t("PartDValidationDesc34")}
        </p>
        <h5 className='card-title text-start '>E1.1 {t("PartC1.1")}</h5>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='row'>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Name") + " " + t("Surname")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      NameSurnameLeaderE11: e.target.value,
                    }));
                    formik.setFieldValue("NameSurnameLeader", e.target.value);
                  }}
                />
                {formik.errors.NameSurnameLeader && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.NameSurnameLeader}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Address")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      AddressLeaderE11: e.target.value,
                    }));
                    formik.setFieldValue("AddressLeader", e.target.value);
                  }}
                />
                {formik.errors.NameSurnameLeader && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.NameSurnameLeader}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("PhoneNumber")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      PhoneNumberLeaderE11: e.target.value,
                    }));
                    formik.setFieldValue("PhoneNumberLeader", e.target.value);
                  }}
                />
                {formik.errors.PhoneNumberLeader && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.PhoneNumberLeader}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Fax")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      FaxLeaderE11: e.target.value,
                    }));
                    formik.setFieldValue("FaxLeader", e.target.value);
                  }}
                />
                {formik.errors.FaxLeader && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.FaxLeader}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Email")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      EmailLeaderE11: e.target.value,
                    }));
                    formik.setFieldValue("EmailLeader", e.target.value);
                  }}
                />
                {formik.errors.EmailLeader && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.EmailLeader}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h5 className='card-title text-start '>E1.2 {t("PartC1.2")}</h5>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='row'>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Name") + " " + t("Surname")}</label>
                <input
                  type='text'
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
                  <span className='text-danger mt-2 '>
                    {formik.errors.NameSurnameCoordinator}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Address")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      AddressCoordinatorE12: e.target.value,
                    }));
                    formik.setFieldValue("AddressCoordinator", e.target.value);
                  }}
                />
                {formik.errors.NameSurnameCoordinator && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.NameSurnameCoordinator}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("PhoneNumber")}</label>
                <input
                  type='text'
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
                  <span className='text-danger mt-2 '>
                    {formik.errors.PhoneNumberCoordinator}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Fax")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      FaxCoordinatorE12: e.target.value,
                    }));
                    formik.setFieldValue("FaxCoordinator", e.target.value);
                  }}
                />
                {formik.errors.FaxCoordinator && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.FaxCoordinator}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Email")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setSecondApplication((prev) => ({
                      ...prev,
                      EmailCoordinatorE12: e.target.value,
                    }));
                    formik.setFieldValue("EmailCoordinator", e.target.value);
                  }}
                />
                {formik.errors.EmailCoordinator && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.EmailCoordinator}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr />

        <h5 className='card-title text-start '>E1.5 {t("PartC1.5")}</h5>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='col-xxl-3 col-lg-5 col-sm-12'>
            <div className='form-group'>
              <input
                type='text'
                onChange={(e) => {
                  setSecondApplication((prev) => ({
                    ...prev,
                    PlaceOfApplicationE15: e.target.value,
                  }));
                  formik.setFieldValue("PlaceOfApplication", e.target.value);
                }}
              />
              {formik.errors.PlaceOfApplication && (
                <span className='text-danger mt-2 '>
                  {formik.errors.PlaceOfApplication}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12 text-end'>
        <button
          type='submit'
          className='btn btn btn-primary btn-soft-blue rounded-pill '
        >
          {t("Apply")}
        </button>
      </div>
    </form>
  );
}
