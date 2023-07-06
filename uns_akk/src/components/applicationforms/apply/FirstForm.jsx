import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import CrudProvider from "../../../provider/CrudProvider";
import CustomSelect from "../../custom/CustomSelect";
import jwtDecode from "jwt-decode";

export default function FirstForm({ model, setModel, ...rest }) {
  const { t } = useTranslation();
  const [cities, setCities] = useState([]);
  const [status, setStatus] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [activity, setActivity] = useState([]);
  // const token = localStorage.getItem("akktoken");
  // const decodedToken = jwtDecode(token);

  useEffect(() => {
    Promise.all([
      CrudProvider.getAllWithLang("GeneralAPI/GetAllMunicipalities").then(
        (res) => {
          if (res) {
            if (res.statusCode === 200) {
              setCities(res.result);
            }
          }
        }
      ),
      CrudProvider.getAll("GeneralAPI/GetInstitutionStatus").then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setStatus(res.result);
          }
        }
      }),
      CrudProvider.getAll("GeneralAPI/GetInstitutionActivity").then((res) => {
        if (res) {
          setActivity(res.result);
        }
      }),
      CrudProvider.getAllWithLang("GeneralAPI/GetAllQualifications").then(
        (res) => {
          if (res) {
            setQualifications(res.result);
          }
        }
      ),
    ]);
  }, []);

  // useEffect(() => {
  //   CrudProvider.getItemById(
  //     "InstitutionAPI/GetInstitution",
  //     decodedToken.groupsid
  //   ).then((res) => {
  //     if (res.statusCode === 200) {
  //       const institution = res.result;
  //       console.log(institution);
  //       setModel({
  //         ...model,
  //         InstitutionName: institution.institutionName,
  //         UniqueNumber: institution.institutionName,
  //       });
  //     }
  //   });
  // }, [rest.authState]);

  const citiesList =
    cities &&
    cities.length > 0 &&
    cities
      .map((obj) => {
        return {
          value: obj.municipality.municipalityId,
          label: obj.municipalityName,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

  const statusList =
    status &&
    status.length > 0 &&
    status
      .map((obj) => {
        return {
          value: obj.institutionStatusId,
          label: obj.description,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  const qualificationsList =
    qualifications &&
    qualifications.length > 0 &&
    qualifications
      .map((item) => ({
        value: item.qualification.qualificationId,
        label: item.qualificationName,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

  const activityList =
    activity &&
    activity.length > 0 &&
    activity
      .map((item) => ({
        value: item.institutionActivityId,
        label: item.description,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

  function changeQualification(e) {
    setModel({
      ...model,
      QualificationId: e,
    });
    formik.setFieldValue("QualificationId", e);
  }
  function changeActivity(e) {
    setModel({
      ...model,
      InstitutionActivityId: e,
    });
    formik.setFieldValue("ActivityId", e);
  }
  function changeCity(e) {
    setModel({
      ...model,
      MunicipalityId: e,
    });
    formik.setFieldValue("MunicipalityId", e);
  }

  function changeStatus(e) {
    setModel({
      ...model,
      InstitutionStatusId: e,
    });
    formik.setFieldValue("StatusActivityId", e);
  }

  const CreateInstitutionSchema = !rest.authState
    ? Yup.object().shape({
        Name: Yup.string().required(t("PleaseFillInstitutionName")),
        UniqueNumber: Yup.number()
          .test("is-valid", t("UniqueNumberMustContain"), (value) =>
            /^8\d{8}$/.test(value)
          )
          .required(t("PleaseFillUniqueNumber")),
        MunicipalityId: Yup.string().required(t("PleaseFillMunicipality")),
        Address: Yup.string().required(t("PleaseFillAddress")),
        PostalCode: Yup.string()
          .required(t("PleaseFillPostalCode"))
          .max(20, t("PostalCodeMustContainMax")),
        PhoneNumber: Yup.string()
          .required(t("PleaseFillPhoneNumber"))
          .max(20, t("PhoneNumberMustContainMax")),
        Email: Yup.string().required(t("PleaseFillEmail")),
        Web: Yup.string().required(t("PleaseFillWeb")),
        Documents: Yup.string().required(t("PleaseFillDocument")),
        StatusActivityId: Yup.string().required(
          t("PleaseChooseStatusActivity")
        ),
        ActivityId: Yup.string().required(t("PleaseChooseActivity")),
        QualificationId: Yup.string().required(t("ChooseQualification")),
      })
    : Yup.object().shape({
        QualificationId: Yup.string().required(t("ChooseQualification")),
      });
  const formik = useFormik({
    initialValues: {},
    validationSchema: CreateInstitutionSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => SubmitForm(),
  });
  async function SubmitForm() {
    rest.setShowSecondForm(true);
  }
  return (
    <form
      onSubmit={formik.handleSubmit}
      className='animation animation-bot-top'
    >
      <div className='row'>
        {!rest.authState && (
          <>
            <>
              <h5 className='card-title text-start '>
                A1.1 {t("InstitutionsDetails")}
              </h5>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
                <label className='form-label'>{t("InstitutionName")}</label>
                <input
                  type='text'
                  className='form-control'
                  onChange={(e) => {
                    setModel({ ...model, InstitutionName: e.target.value });
                    formik.setFieldValue("Name", e.target.value);
                  }}
                />
                {formik.errors.Name && (
                  <span className='text-danger'>{formik.errors.Name}</span>
                )}
              </div>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
                <label className='form-label'>{t("UniqueNumber")}</label>
                <input
                  type='number'
                  className='form-control'
                  onChange={(e) => {
                    setModel({
                      ...model,
                      UniqueNumber: e.target.value,
                    });
                    formik.setFieldValue("UniqueNumber", e.target.value);
                  }}
                />
                {formik.errors.UniqueNumber && (
                  <span className='text-danger'>
                    {formik.errors.UniqueNumber}
                  </span>
                )}
              </div>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
                <label className='form-label'>{t("Municipality")}</label>
                <CustomSelect
                  onChangeFunction={changeCity}
                  optionsList={citiesList}
                  isMulti={false}
                />
                {formik.errors.MunicipalityId && (
                  <span className='text-danger'>
                    {formik.errors.MunicipalityId}
                  </span>
                )}
              </div>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
                <label className='form-label'>{t("Address")}</label>
                <input
                  type='text'
                  className='form-control'
                  onChange={(e) => {
                    setModel({
                      ...model,
                      Address: e.target.value,
                    });
                    formik.setFieldValue("Address", e.target.value);
                  }}
                />
                {formik.errors.Address && (
                  <span className='text-danger'>{formik.errors.Address}</span>
                )}
              </div>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
                <label className='form-label'>{t("PostalCode")}</label>
                <input
                  type='text'
                  className='form-control'
                  onChange={(e) => {
                    setModel({
                      ...model,
                      PostalCode: e.target.value,
                    });
                    formik.setFieldValue("PostalCode", e.target.value);
                  }}
                />
                {formik.errors.PostalCode && (
                  <span className='text-danger'>
                    {formik.errors.PostalCode}
                  </span>
                )}
              </div>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
                <label className='form-label'>{t("PhoneNumber")}</label>
                <input
                  type='text'
                  className='form-control'
                  onChange={(e) => {
                    setModel({
                      ...model,
                      PhoneNum: e.target.value,
                    });
                    formik.setFieldValue("PhoneNumber", e.target.value);
                  }}
                />
                {formik.errors.PhoneNumber && (
                  <span className='text-danger'>
                    {formik.errors.PhoneNumber}
                  </span>
                )}
              </div>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
                <label className='form-label'>{t("Email")}</label>
                <input
                  type='email'
                  className='form-control'
                  onChange={(e) => {
                    setModel({
                      ...model,
                      Email: e.target.value,
                    });
                    formik.setFieldValue("Email", e.target.value);
                  }}
                />
                {formik.errors.Email && (
                  <span className='text-danger'>{formik.errors.Email}</span>
                )}
              </div>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
                <label className='form-label'>{t("Web")}</label>
                <input
                  type='text'
                  className='form-control'
                  onChange={(e) => {
                    setModel({
                      ...model,
                      Web: e.target.value,
                    });
                    formik.setFieldValue("Web", e.target.value);
                  }}
                />
                {formik.errors.Web && (
                  <span className='text-danger'>{formik.errors.Web}</span>
                )}
              </div>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
                <label className='form-label'>{t("Logo")}</label>
                <input
                  type='file'
                  accept='image/*'
                  className='form-control'
                  onChange={(e) => {
                    setModel({
                      ...model,
                      InstitutionLogo: e.target.files[0],
                    });
                    console.log(e.target.files[0]);
                    formik.setFieldValue("Documents", e.target.value);
                  }}
                />
                {formik.errors.Documents && (
                  <span className='text-danger'>{formik.errors.Documents}</span>
                )}
              </div>
              <hr className='mt-2' />
              <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2 '>
                <h5 className='card-title text-start'>
                  A1.3 {t("InstitutionStatus")}
                </h5>
                <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
                  <label className='form-label'>{t("InstitutionStatus")}</label>
                  <CustomSelect
                    onChangeFunction={changeStatus}
                    optionsList={statusList}
                    isMulti={false}
                  />
                  {formik.errors.StatusActivityId && (
                    <span className='text-danger'>
                      {formik.errors.StatusActivityId}
                    </span>
                  )}
                </div>
              </div>
              <hr className='mt-2' />
              <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 '>
                <h5 className='card-title text-start'>
                  A1.4 {t("InstitutionActivity")}
                </h5>
                <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2'>
                  <label className='form-label'>
                    {t("InstitutionActivity")}
                  </label>
                  <CustomSelect
                    isMulti={false}
                    onChangeFunction={changeActivity}
                    optionsList={activityList}
                  />
                  {formik.errors.ActivityId && (
                    <span className='text-danger'>
                      {formik.errors.ActivityId}
                    </span>
                  )}
                </div>
              </div>
            </>
            <hr className='mt-3' />
          </>
        )}
        <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2'>
          <h5 className='card-title text-start'>
            A1.2 {t("ChooseQualificationApplication")}
          </h5>
          <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2'>
            <label className='form-label'>{t("ChooseQualification")}</label>
            <CustomSelect
              isMulti={false}
              onChangeFunction={changeQualification}
              optionsList={qualificationsList}
            />
            {formik.errors.QualificationId && (
              <span className='text-danger'>
                {formik.errors.QualificationId}
              </span>
            )}
          </div>
        </div>
        {!rest.showSecondForm && (
          <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2 text-end'>
            <button
              type='submit'
              className='btn btn btn-primary btn-soft-blue rounded-pill '
            >
              {t("Next")}
            </button>
          </div>
        )}
      </div>
      <hr />
    </form>
  );
}
