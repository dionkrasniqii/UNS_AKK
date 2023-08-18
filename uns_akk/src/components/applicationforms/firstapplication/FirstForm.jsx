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
    ]);
  }, []);

  // useEffect(() => {
  //   CrudProvider.getItemById(
  //     "InstitutionAPI/GetInstitution",
  //     decodedToken.groupsid
  //   ).then((res) => {
  //     if (res.statusCode === 200) {
  //       const institution = res.result;
  //       setModel({
  //         ...model,
  //         InstitutionName: institution.institutionName,
  //         UniqueNumber: institution.uniqueNumber,
  //         MunicipalityId: institution.municipalityId,
  //         Address: institution.address,
  //         PostalCode: institution.postalCode,
  //         PhoneNum: institution.phoneNum,
  //         Email: institution.email,
  //         Web: institution.web,
  //         InstitutionLogo: institution.path,
  //         MunicipalityName: institution.municipalityName
  //       });
  //     }
  //   });
  // }, [rest.authState]);
  
  useEffect(() => {
    if (rest.authState !== false) { // Check if authState is not false
      const token = localStorage.getItem("akktoken");
      const decodedToken = jwtDecode(token);
      CrudProvider.getItemById(
        "InstitutionAPI/GetInstitution",
        decodedToken.groupsid
      ).then((res) => {
        if (res.statusCode === 200) {
          const institution = res.result;
          setModel((prevModel) => ({
            ...prevModel,
            InstitutionName: institution.institutionName,
            UniqueNumber: institution.uniqueNumber,
            MunicipalityId: institution.municipalityId,
            Address: institution.address,
            PostalCode: institution.postalCode,
            PhoneNum: institution.phoneNum,
            Email: institution.email,
            Web: institution.web,
            InstitutionLogo: institution.path,
            MunicipalityName: institution.municipalityName
          }));
        }
      }).catch((error) => {
        console.error('Error fetching institution:', error);
      });
    }
  }, [rest.authState]);

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
  const activityList =
    activity &&
    activity.length > 0 &&
    activity
      .map((item) => ({
        value: item.institutionActivityId,
        label: item.description,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

  function changeActivity(e, record) {
    setModel({
      ...model,
      InstitutionActivityId: e,
      InstitutionActivityName: record.label,
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

  function changeStatus(e, record) {
    setModel({
      ...model,
      InstitutionStatusId: e,
      InstitutionStatusName: record.label,
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
        QualificationId: Yup.string().required(t("FillField")),
        // NumOfGroupsA24: Yup.string().required(t("ChooseNumber")),
        // TargetNumberOfCandidatesA24: Yup.string().required(
        //   t("SetNumberOfMembers")
        // ),
        // Equipments: Yup.string().required(t("FillField")),
      })
    : Yup.object().shape({
        QualificationId: Yup.string().required(t("FillField")),
        StatusActivityId: Yup.string().required(
          t("PleaseChooseStatusActivity")
        ),
        ActivityId: Yup.string().required(t("PleaseChooseActivity")),
        // NumOfGroupsA24: Yup.string().required(t("ChooseNumber")),
        // TargetNumberOfCandidatesA24: Yup.string().required(
        //   t("SetNumberOfMembers")
        // ),
        // Equipments: Yup.string().required(t("FillField")),
      });
  const formik = useFormik({
    initialValues: {},
    validationSchema: CreateInstitutionSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => rest.setShowSecondForm(true),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='animation animation-bot-top'
    >
      <div className='row'>
        <h3 className='card-title text-start '>{t("PartA")}</h3>
        <h3 className='card-title text-start '>
              A.1 {t("InstitutionsDetails")}
            </h3>
        {!rest.authState && (
          <>
            <h5 className='card-title text-start '>
              A.1.1 {t("InstitutionsDetails")}
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
                <span className='text-danger'>{formik.errors.PostalCode}</span>
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
                <span className='text-danger'>{formik.errors.PhoneNumber}</span>
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
                  formik.setFieldValue("Documents", e.target.value);
                }}
              />
              {formik.errors.Documents && (
                <span className='text-danger'>{formik.errors.Documents}</span>
              )}
            </div>
            <hr className='mt-2' />
            <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2'>
          <div className='row'>
            <h5 className='card-title text-start'>
              A1.2 {t("ChooseQualificationApplication")}
            </h5>
            {/* <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2'>
              <h5 className='card-title text-start '>
                {t("ToolsForQualification")}
              </h5>
              <div className='form-group'>
                <p className='text-muted'>{t("ToolsDesc")}</p>
                <textarea
                  rows={5}
                  className='mt-2'
                  onChange={(e) => {
                    setModel({
                      ...model,
                      EquipmentMaterialsQualificationA22: e.target.value,
                    });
                    formik.setFieldValue("Equipments", e.target.value);
                  }}
                />
                {formik.errors.Equipments && (
                  <span className='text-danger'>
                    {formik.errors.Equipments}
                  </span>
                )}
              </div>
            </div> */}

            <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2'>
              <div className='form-group'>
                <label className='form-label'>
                  {t("QualificationTitleAndLevel")}
                </label>
                <textarea
                  rows={5}
                  className='mt-5'
                  onChange={(e) => {
                    setModel({
                      ...model,
                      QualificationTitleAndLevel: e.target.value,
                    });
                    formik.setFieldValue("QualificationId", e.target.value);
                  }}
                />
                {formik.errors.QualificationId && (
                  <span className='text-danger'>
                    {formik.errors.QualificationId}
                  </span>
                )}
              </div>
            </div>

            {/* <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
              <label className='form-label'>{t("NumOfGroups")}</label>
              <input
                type='number'
                className='form-control'
                onChange={(e) => {
                  setModel({
                    ...model,
                    NumOfGroupsA24: e.target.value,
                  });
                  formik.setFieldValue("NumOfGroupsA24", e.target.value);
                }}
              />
              {formik.errors.NumOfGroupsA24 && (
                <span className='text-danger'>
                  {formik.errors.NumOfGroupsA24}
                </span>
              )}
            </div>
            <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
              <label className='form-label'>{t("TargetOfCandidates")}</label>
              <input
                type='number'
                className='form-control'
                onChange={(e) => {
                  setModel({
                    ...model,
                    TargetNumberOfCandidatesA24: e.target.value,
                  });
                  formik.setFieldValue(
                    "TargetNumberOfCandidatesA24",
                    e.target.value
                  );
                }}
              />
              {formik.errors.TargetNumberOfCandidatesA24 && (
                <span className='text-danger'>
                  {formik.errors.TargetNumberOfCandidatesA24}
                </span>
              )}
            </div> */}
          </div>
        </div>
        <hr className='mt-3' />
            <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2 '>
              <div className='row'>
                <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 '>
                  <h5 className='card-title text-start'>
                    A.1.3 {t("InstitutionStatus")}
                  </h5>
                  <div className='col-xxl-7 col-lg-7 col-sm-12 mt-2'>
                    <label className='form-label'>
                      {t("InstitutionStatus")}
                    </label>
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
                <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 '>
                  <h5 className='card-title text-start'>
                    A.1.4 {t("InstitutionActivity")}
                  </h5>
                  <div className='col-xxl-7 col-lg-7 col-sm-12 mt-2'>
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
              </div>
            </div>
          </>
        )}
        {rest.authState && (
          <>
            <h5 className='card-title text-start '>
              A.1.1 {t("InstitutionsDetails")}
            </h5>
            <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
              <label className='form-label'>{t("InstitutionName")}</label>
              <input
                type='text'
                defaultValue={model.InstitutionName}
                className='form-control'
                readOnly
              />
            </div>
            <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
              <label className='form-label'>{t("UniqueNumber")}</label>
              <input
                type='number'
                className='form-control'
                defaultValue={model.UniqueNumber}
              />
            </div>
            <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
              <label className='form-label'>{t("Municipality")}</label>
              <input
                type='text'
                defaultValue={model.MunicipalityName}
                className='form-control'
                readOnly
              />
            </div>
            <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
              <label className='form-label'>{t("Address")}</label>
              <input
                type='text'
                className='form-control'
                readOnly
                defaultValue={model.Address}
              />
            </div>
            <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
              <label className='form-label'>{t("PostalCode")}</label>
              <input
                type='text'
                className='form-control'
                readOnly
                defaultValue={model.PostalCode}
              />
            </div>
            <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
              <label className='form-label'>{t("PhoneNumber")}</label>
              <input
                type='text'
                className='form-control'
                readOnly
                defaultValue={model.PhoneNum}
              />
            </div>
            <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
              <label className='form-label'>{t("Email")}</label>
              <input
                type='email'
                className='form-control'
                readOnly
                defaultValue={model.Email}
              />
            </div>
            <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
              <label className='form-label'>{t("Web")}</label>
              <input
                type='text'
                className='form-control'
                readOnly
                defaultValue={model.Web}
              />
            </div>
            <hr className='mt-2' />
            <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2'>
          <div className='row'>
            <h5 className='card-title text-start'>
              A1.2 {t("ChooseQualificationApplication")}
            </h5>
            <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2'>
              <div className='form-group'>
                <label className='form-label'>
                  {t("QualificationTitleAndLevel")}
                </label>
                <textarea
                  rows={5}
                  className='mt-5'
                  onChange={(e) => {
                    setModel({
                      ...model,
                      QualificationTitleAndLevel: e.target.value,
                    });
                    formik.setFieldValue("QualificationId", e.target.value);
                  }}
                />
                {formik.errors.QualificationId && (
                  <span className='text-danger'>
                    {formik.errors.QualificationId}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr className='mt-3' />
            <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2 '>
              <div className='row'>
                <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 '>
                  <h5 className='card-title text-start'>
                    A.1.3 {t("InstitutionStatus")}
                  </h5>
                  <div className='col-xxl-7 col-lg-7 col-sm-12 mt-2'>
                    <label className='form-label'>
                      {t("InstitutionStatus")}
                    </label>
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
                <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 '>
                  <h5 className='card-title text-start'>
                    A.1.4 {t("InstitutionActivity")}
                  </h5>
                  <div className='col-xxl-7 col-lg-7 col-sm-12 mt-2'>
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
              </div>
            </div>
          </>
        )}
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
