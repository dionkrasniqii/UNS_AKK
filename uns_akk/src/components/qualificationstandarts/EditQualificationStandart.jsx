import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import CustomDatePicker from "../custom/CustomDatePicker";

export default function EditQualificationStandart() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const langId = localStorage.getItem("i18nextLng");
  const [qualificationStandart, setQualificationStandart] = useState({
    QualificationStandartId: id,
    EstQFLevel: "",
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

  useEffect(() => {
    setLoad(true);
    Promise.all([
      CrudProvider.getItemByIdLang("QualificationStandartAPI/GetById", id).then(
        (res) => {
          if (res) {
            if (res.statusCode === 200) {
              const obj = res.result;
              setQualificationStandart({
                ...qualificationStandart,
                EstQFLevel: obj.estQFLevel,
                ReferenceToEuropanQualificationFramework:
                  obj.referenceToEuropanQualificationFramework,
                OccupationalQualificationStandartVersion:
                  obj.occupationalQualificationStandartVersion,
                ValidFrom: obj.validFrom,
                ValidTo: obj.validTo,
                DateOfDecisionOfOccupationalQualificationCouncil:
                  obj.dateOfDecisionOfOccupationalQualificationCouncil,
                QualificationStandartName: obj.qualificationStandartName,
                Specialisation: obj.specialisation,
                PartialOccupationalQualifications:
                  obj.partialOccupationalQualifications,
                DescriptionOfWork: obj.descriptionOfWork,
                WorkUnits: obj.workUnits,
                WorkEnvironmentAndSpecificNatureOfWork:
                  obj.workEnvironmentAndSpecificNatureOfWork,
                Tools: obj.tools,
                PersonalQualities: obj.personalQualities,
                ProfessionalPreparation: obj.professionalPreparation,
                MostCommonOccupationalTitles:
                  obj.mostCommonOccupationalTitles,
                RegulationsGoverningProfession:
                  obj.regulationsGoverningProfession,
                CompetencyRequirements: obj.competencyRequirements,
                DesignationInRegister: obj.designationInRegister,
                FieldOfOccupational: obj.fieldOfOccupational,
                OccupationalQualificationCouncil:
                  obj.occupationalQualificationCouncil,
                NoOfdecisionOfOccupationalQualificationCouncil:
                  obj.noOfdecisionOfOccupationalQualificationCouncil,
                Field: obj.field,
                SubField: obj.subField,
                Occupation: obj.occupation,
                ISCO: obj.isco,
                ISCED: obj.isced,
                NACE: obj.nace,
                Status: obj.status,
              });
            } else {
              toast.error(res.errorMessages[0]);
              navigate("/qualificationstandart");
            }
          }
        }
      ),
    ]).then((res) => {
      setLoad(false);
    });
  }, [id]);

  const dateString1 = qualificationStandart.ValidFrom;
  const date1 = new Date(dateString1);
  const year1 = date1.getFullYear();
  const month1 = String(date1.getMonth() + 1).padStart(2, "0");
  const day1 = String(date1.getDate()).padStart(2, "0");
  const ValidFrom = `${year1}-${month1}-${day1}`;

  const dateString2 = qualificationStandart.ValidTo;
  const date2 = new Date(dateString2);
  const year2 = date2.getFullYear();
  const month2 = String(date2.getMonth() + 1).padStart(2, "0");
  const day2 = String(date2.getDate()).padStart(2, "0");
  const ValidTo = `${year2}-${month2}-${day2}`;

  const dateString3 =
    qualificationStandart.DateOfDecisionOfOccupationalQualificationCouncil;
  const date3 = new Date(dateString3);
  const year3 = date3.getFullYear();
  const month3 = String(date3.getMonth() + 1).padStart(2, "0");
  const day3 = String(date3.getDate()).padStart(2, "0");
  const DateOfDecisionOfOccupationalQualificationCouncil = `${year3}-${month3}-${day3}`;

  async function SubmitForm() {
    try {
      setLoad(true);
      await CrudProvider.updateItem(
        "QualificationStandartAPI/UpdateQualificationStandart",
        qualificationStandart
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            toast.success(t("DataUpdatedSuccessfully"));
            navigate("/qualificationstandart");
          } else {
            toast.error(res.errorMessages[0]);
          }
        }
      });
    } finally {
      setLoad(false);
    }
  }

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => SubmitForm(),
  });
  return (
    <div className='col-xl-12'>
      <div className='card'>
        {!load ? (
          <div className='card-body'>
            <h3 className='mb-3'>{t("Modify Qualification Standart")}</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className='row'>
                <div className='col-xxl-2 col-lg-2 col-sm-12 mb-3'>
                  <label>{t("ValidFrom")}:</label>
                  <input
                    type='date'
                    autoComplete='off'
                    id='basic-datepicker'
                    className='form-control flatpickr-input active'
                    defaultValue={ValidFrom}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        ValidFrom: e.target.value,
                      });
                    }}
                  />
                  {formik.errors.ValidFrom && (
                    <span className='text-danger'>
                      {formik.errors.ValidFrom}
                    </span>
                  )}
                </div>
                <div className='col-xxl-2 col-lg-2 col-sm-12 mb-3'>
                  <label>{t("ValidTo")}:</label>
                  <input
                    type='date'
                    autoComplete='off'
                    id='basic-datepicker'
                    className='form-control flatpickr-input active'
                    defaultValue={ValidTo}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        ValidTo: e.target.value,
                      });
                    }}
                  />
                  {formik.errors.ValidTo && (
                    <span className='text-danger'>{formik.errors.ValidTo}</span>
                  )}
                </div>
                <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                  <label>
                    {t("DateOfDecisionOfOccupationalQualificationCouncil")}:
                  </label>
                  <input
                    type='date'
                    autoComplete='off'
                    id='basic-datepicker'
                    className='form-control flatpickr-input active'
                    defaultValue={
                      DateOfDecisionOfOccupationalQualificationCouncil
                    }
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        DateOfDecisionOfOccupationalQualificationCouncil:
                          e.target.value,
                      });
                    }}
                  />
                  {formik.errors
                    .DateOfDecisionOfOccupationalQualificationCouncil && (
                    <span className='text-danger'>
                      {
                        formik.errors
                          .DateOfDecisionOfOccupationalQualificationCouncil
                      }
                    </span>
                  )}
                </div>
              </div>
              <div className='row'>
                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("QualificationStandartName")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={
                      qualificationStandart.QualificationStandartName
                    }
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        QualificationStandartName: e.target.value,
                      });
                      formik.setFieldValue(
                        "QualificationStandartName",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.QualificationStandartName && (
                    <span className='text-danger'>
                      {formik.errors.QualificationStandartName}
                    </span>
                  )}
                </div>

                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("EstQFLevel")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.EstQFLevel}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        EstQFLevel: e.target.value,
                      });
                      formik.setFieldValue("EstQFLevel", e.target.value);
                    }}
                  />
                  {formik.errors.EstQFLevel && (
                    <span className='text-danger'>
                      {formik.errors.EstQFLevel}
                    </span>
                  )}
                </div>

                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("ReferenceToEuropanQualificationFramework")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={
                      qualificationStandart.ReferenceToEuropanQualificationFramework
                    }
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        ReferenceToEuropanQualificationFramework:
                          e.target.value,
                      });
                      formik.setFieldValue(
                        "ReferenceToEuropanQualificationFramework",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.ReferenceToEuropanQualificationFramework && (
                    <span className='text-danger'>
                      {formik.errors.ReferenceToEuropanQualificationFramework}
                    </span>
                  )}
                </div>

                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("OccupationalQualificationStandartVersion")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={
                      qualificationStandart.OccupationalQualificationStandartVersion
                    }
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        OccupationalQualificationStandartVersion:
                          e.target.value,
                      });
                      formik.setFieldValue(
                        "OccupationalQualificationStandartVersion",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.OccupationalQualificationStandartVersion && (
                    <span className='text-danger'>
                      {formik.errors.OccupationalQualificationStandartVersion}
                    </span>
                  )}
                </div>

                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("Specialisation")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.Specialisation}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        Specialisation: e.target.value,
                      });
                      formik.setFieldValue("Specialisation", e.target.value);
                    }}
                  />
                  {formik.errors.Specialisation && (
                    <span className='text-danger'>
                      {formik.errors.Specialisation}
                    </span>
                  )}
                </div>

                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("PartialOccupationalQualifications")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={
                      qualificationStandart.PartialOccupationalQualifications
                    }
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        PartialOccupationalQualifications: e.target.value,
                      });
                      formik.setFieldValue(
                        "PartialOccupationalQualifications",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.PartialOccupationalQualifications && (
                    <span className='text-danger'>
                      {formik.errors.PartialOccupationalQualifications}
                    </span>
                  )}
                </div>

                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("DescriptionOfWork")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.DescriptionOfWork}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        DescriptionOfWork: e.target.value,
                      });
                      formik.setFieldValue("DescriptionOfWork", e.target.value);
                    }}
                  />
                  {formik.errors.DescriptionOfWork && (
                    <span className='text-danger'>
                      {formik.errors.DescriptionOfWork}
                    </span>
                  )}
                </div>

                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("WorkUnits")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.WorkUnits}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        WorkUnits: e.target.value,
                      });
                      formik.setFieldValue("WorkUnits", e.target.value);
                    }}
                  />
                  {formik.errors.WorkUnits && (
                    <span className='text-danger'>
                      {formik.errors.WorkUnits}
                    </span>
                  )}
                </div>

                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("WorkEnvironmentAndSpecificNatureOfWork")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={
                      qualificationStandart.WorkEnvironmentAndSpecificNatureOfWork
                    }
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        WorkEnvironmentAndSpecificNatureOfWork: e.target.value,
                      });
                      formik.setFieldValue(
                        "WorkEnvironmentAndSpecificNatureOfWork",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.WorkEnvironmentAndSpecificNatureOfWork && (
                    <span className='text-danger'>
                      {formik.errors.WorkEnvironmentAndSpecificNatureOfWork}
                    </span>
                  )}
                </div>

                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("Tools")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.Tools}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        Tools: e.target.value,
                      });
                      formik.setFieldValue("Tools", e.target.value);
                    }}
                  />
                  {formik.errors.Tools && (
                    <span className='text-danger'>{formik.errors.Tools}</span>
                  )}
                </div>

                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("PersonalQualities")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.PersonalQualities}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        PersonalQualities: e.target.value,
                      });
                      formik.setFieldValue("PersonalQualities", e.target.value);
                    }}
                  />
                  {formik.errors.PersonalQualities && (
                    <span className='text-danger'>
                      {formik.errors.PersonalQualities}
                    </span>
                  )}
                </div>

                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("ProfessionalPreparation")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.ProfessionalPreparation}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        ProfessionalPreparation: e.target.value,
                      });
                      formik.setFieldValue(
                        "ProfessionalPreparation",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.ProfessionalPreparation && (
                    <span className='text-danger'>
                      {formik.errors.ProfessionalPreparation}
                    </span>
                  )}
                </div>

                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("MostCommonOccupationalTitles")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={
                      qualificationStandart.MostCommonOccupationalTitles
                    }
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        MostCommonOccupationalTitles: e.target.value,
                      });
                      formik.setFieldValue(
                        "MostCommonOccupationalTitles",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.MostCommonOccupationalTitles && (
                    <span className='text-danger'>
                      {formik.errors.MostCommonOccupationalTitles}
                    </span>
                  )}
                </div>
                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("RegulationsGoverningProfession")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={
                      qualificationStandart.RegulationsGoverningProfession
                    }
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        RegulationsGoverningProfession: e.target.value,
                      });
                      formik.setFieldValue(
                        "RegulationsGoverningProfession",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.RegulationsGoverningProfession && (
                    <span className='text-danger'>
                      {formik.errors.RegulationsGoverningProfession}
                    </span>
                  )}
                </div>
                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("CompetencyRequirements")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.CompetencyRequirements}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        CompetencyRequirements: e.target.value,
                      });
                      formik.setFieldValue(
                        "CompetencyRequirements",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.CompetencyRequirements && (
                    <span className='text-danger'>
                      {formik.errors.CompetencyRequirements}
                    </span>
                  )}
                </div>
                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("DesignationInRegister")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.DesignationInRegister}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        DesignationInRegister: e.target.value,
                      });
                      formik.setFieldValue(
                        "DesignationInRegister",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.DesignationInRegister && (
                    <span className='text-danger'>
                      {formik.errors.DesignationInRegister}
                    </span>
                  )}
                </div>
                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("FieldOfOccupational")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.FieldOfOccupational}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        FieldOfOccupational: e.target.value,
                      });
                      formik.setFieldValue(
                        "FieldOfOccupational",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.FieldOfOccupational && (
                    <span className='text-danger'>
                      {formik.errors.FieldOfOccupational}
                    </span>
                  )}
                </div>
                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("OccupationalQualificationCouncil")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={
                      qualificationStandart.OccupationalQualificationCouncil
                    }
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        OccupationalQualificationCouncil: e.target.value,
                      });
                      formik.setFieldValue(
                        "OccupationalQualificationCouncil",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.OccupationalQualificationCouncil && (
                    <span className='text-danger'>
                      {formik.errors.OccupationalQualificationCouncil}
                    </span>
                  )}
                </div>
                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>
                    {t("NoOfdecisionOfOccupationalQualificationCouncil")}
                  </label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={
                      qualificationStandart.NoOfdecisionOfOccupationalQualificationCouncil
                    }
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
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
                    <span className='text-danger'>
                      {
                        formik.errors
                          .NoOfdecisionOfOccupationalQualificationCouncil
                      }
                    </span>
                  )}
                </div>
                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("Field")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.Field}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        Field: e.target.value,
                      });
                      formik.setFieldValue("Field", e.target.value);
                    }}
                  />
                  {formik.errors.Field && (
                    <span className='text-danger'>{formik.errors.Field}</span>
                  )}
                </div>
                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("SubField")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.SubField}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        SubField: e.target.value,
                      });
                      formik.setFieldValue("SubField", e.target.value);
                    }}
                  />
                  {formik.errors.SubField && (
                    <span className='text-danger'>
                      {formik.errors.SubField}
                    </span>
                  )}
                </div>
                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("Occupation")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.Occupation}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        Occupation: e.target.value,
                      });
                      formik.setFieldValue("Occupation", e.target.value);
                    }}
                  />
                  {formik.errors.Occupation && (
                    <span className='text-danger'>
                      {formik.errors.Occupation}
                    </span>
                  )}
                </div>
                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("ISCO")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.ISCO}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        ISCO: e.target.value,
                      });
                      formik.setFieldValue("ISCO", e.target.value);
                    }}
                  />
                  {formik.errors.ISCO && (
                    <span className='text-danger'>{formik.errors.ISCO}</span>
                  )}
                </div>
                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("ISCED")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.ISCED}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        ISCED: e.target.value,
                      });
                      formik.setFieldValue("ISCED", e.target.value);
                    }}
                  />
                  {formik.errors.ISCED && (
                    <span className='text-danger'>{formik.errors.ISCED}</span>
                  )}
                </div>

                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("NACE")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.NACE}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        NACE: e.target.value,
                      });
                      formik.setFieldValue("NACE", e.target.value);
                    }}
                  />
                  {formik.errors.NACE && (
                    <span className='text-danger'>{formik.errors.NACE}</span>
                  )}
                </div>
                <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                  <label>{t("Status")}</label>
                  <textarea
                    type='text'
                    rows={3}
                    className='form-control'
                    defaultValue={qualificationStandart.Status}
                    onChange={(e) => {
                      setQualificationStandart({
                        ...qualificationStandart,
                        Status: e.target.value,
                      });
                      formik.setFieldValue("Status", e.target.value);
                    }}
                  />
                  {formik.errors.Status && (
                    <span className='text-danger'>{formik.errors.Status}</span>
                  )}
                </div>
              </div>

              <ul className='list-inline mt-3 wizard'>
                <Link
                  to='/qualificationstandart'
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
        ) : (
          <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
            <div
              className='spinner-border text-primary m-2 text-center'
              role='status'
            />
          </div>
        )}
      </div>
    </div>
  );
}
