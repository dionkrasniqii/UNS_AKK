import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProgressBar from "../custom/ProgressBar";
import { Link, useNavigate } from "react-router-dom";
import CustomSelect from "../custom/CustomSelect";
import CustomDatePicker from "../custom/CustomDatePicker";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import * as Yup from "yup";
export default function CreateDecisions() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [subQualifications, setSubQualifications] = useState([]);
  const [model, setModel] = useState({
    InstitutionId: "",
    MunicipalityId: "",
    QualificationId: "",
    QualificationChildIds: [],
    Credits: "",
    ProtocolNr: "",
    ProtocolDate: "",
    DecisionDate: "",
    TermDate: "",
    NoLimitGroups: true,
    NumOfGroups: 0,
    MaximumPeoplePerGroup: "",
    Reaccreditation: false,
    Document: "",
  });

  useEffect(() => {
    Promise.all([
      CrudProvider.getAllWithLang("InstitutionAPI/GetAll").then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setInstitutions(res.result);
          }
        }
      }),
      CrudProvider.getAllWithLang("GeneralAPI/GetAllMunicipalities").then(
        (res) => {
          if (res) {
            if (res.statusCode === 200) {
              setMunicipalities(res.result);
            }
          }
        }
      ),
      CrudProvider.getAllWithLang("QualificationAPI/GetAll").then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setQualifications(res.result);
          }
        }
      }),
    ]);
  }, []);

  useEffect(() => {
    if (model.QualificationId) {
      CrudProvider.getItemByIdLang(
        "GeneralAPI/GetAllSubQualificationsByQualificationId",
        model.QualificationId
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setSubQualifications(res.result);
          }
        }
      });
    }
  }, [model.QualificationId]);

  const institutionsList =
    institutions.length > 0
      ? institutions.map((obj) => ({
          label: obj.institutionName,
          value: obj.institutionId,
        }))
      : [];
  function changeInstitution(e) {
    setModel({
      ...model,
      InstitutionId: e,
    });
    formik.setFieldValue("InstitutionId", e);
  }
  const municipalitiesList =
    municipalities.length > 0
      ? municipalities.map((obj) => ({
          label: obj.municipalityName,
          value: obj.municipality.municipalityId,
        }))
      : [];
  function changeMunicipality(e) {
    setModel({
      ...model,
      MunicipalityId: e,
    });
    formik.setFieldValue("MunicipalityId", e);
  }
  const qualificationsList =
    qualifications.length > 0
      ? qualifications.map((obj) => ({
          label: obj.qualificationName,
          value: obj.qualificationId,
        }))
      : [];
  function changeQualification(e) {
    setModel({
      ...model,
      QualificationId: e,
    });
    formik.setFieldValue("QualificationId", e);
  }
  const subQualificationsList =
    subQualifications.length > 0
      ? subQualifications.map((obj) => ({
          label: obj.description,
          value: obj.qualificationChild.qualificationChildId,
        }))
      : [];
  function changeSubQualification(e) {
    setModel({
      ...model,
      QualificationChildIds: e,
    });
  }
  function changeProtocolDate(e) {
    setModel({
      ...model,
      ProtocolDate: e,
    });
  }
  function changeProtocolDate(date, dateString) {
    setModel({
      ...model,
      ProtocolDate: dateString,
    });
    formik.setFieldValue("ProtocolDate", dateString);
  }
  function changeDecisionDate(date, dateString) {
    setModel({
      ...model,
      DecisionDate: dateString,
    });
    formik.setFieldValue("DecisionDate", dateString);
  }
  function changeTermDate(date, dateString) {
    setModel({
      ...model,
      TermDate: dateString,
    });
    formik.setFieldValue("TermDate", dateString);
  }
  async function submitForm() {
    setLoad(true);

    if (model.DecisionDate >= model.TermDate) {
      toast.error("Decision date cannot be greater than term date");
      setLoad(false);
      return;
    }

    await CrudProvider.createItemWithFile(
      "InstitutionDesicionAPI/CreateInstitutionDecision",
      model
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          navigate("/decisions");
          toast.success("Të dhënat u ruajtën me sukses");
        } else {
          toast.error(res.errorMessages[0]);
        }
      }
      setLoad(false);
    });
  }

  const credits =
    subQualifications.length > 0 &&
    subQualifications
      .filter((obj) =>
        model.QualificationChildIds.includes(
          obj.qualificationChild.qualificationChildId
        )
      )
      .map((obj) => obj.qualificationChild.credits);
  const numbersArray = credits && Array.from(credits, Number);
  let total = 0;
  numbersArray.length > 0 && numbersArray.map((obj) => (total += obj));
  useEffect(() => {
    if (total !== 0) {
      setModel({
        ...model,
        Credits: total,
      });
      formik.setFieldValue("Credits", total);
    } else {
      formik.setFieldValue("Credits", "");
      setModel({
        ...model,
        Credits: "",
      });
    }
  }, [total]);

  const CreateDecisionSchema = Yup.object().shape({
    InstitutionId: Yup.string().required(t("ChooseInstitution")),
    MunicipalityId: Yup.string().required(t("ChooseMunicipality")),
    QualificationId: Yup.string().required(t("ChooseQualification")),
    Credits: Yup.string().max(20).required(t("CompleteCredits")),
    ProtocolNr: Yup.string().max(20).required(t("CompleteProtocolNumber")),
    ProtocolDate: Yup.mixed().required(t("CompleteProtocolDate")),
    DecisionDate: Yup.string().required(t("CompleteStartDateDecision")),
    TermDate: Yup.mixed().required(t("ExpirationDateDecision")),
    NumOfGroups: Yup.number()
      // .positive(t("PositiveNumber"))
      .required(t("ChooseNumber")),
    NoLimitGroups: Yup.boolean().required(t("Choose")),
    MaximumPeoplePerGroup: Yup.number().required(t("SetNumberOfMembers")),
    Reaccreditation: Yup.string().required(t("Choose")),
    Document: Yup.string().required(t("UploadDoc")),
  });

  const formik = useFormik({
    initialValues: {
      NoLimitGroups: false,
      Reaccreditation: false,
      NumOfGroups: 0,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: CreateDecisionSchema,
    onSubmit: () => submitForm(),
  });
  return (
    <div className='col-xl-12'>
      <div className='card'>
        <div className='card-body'>
          <h3 className=' mb-3'>{t("RegisterDecision")}</h3>
          <form onSubmit={formik.handleSubmit}>
            <div id='progressbarwizard'>
              <div className='tab-content b-0 mb-0 pt-0'>
                <ProgressBar model={model} />
                <div className='tab-pane active' id='account-2'>
                  <div className='row'>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("Institution")}:</label>
                      <CustomSelect
                        onChangeFunction={changeInstitution}
                        isMulti={false}
                        optionsList={institutionsList}
                      />
                      {formik.errors.InstitutionId && (
                        <span className='text-danger'>
                          {formik.errors.InstitutionId}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("Municipality")}:</label>
                      <CustomSelect
                        onChangeFunction={changeMunicipality}
                        isMulti={false}
                        optionsList={municipalitiesList}
                      />
                      {formik.errors.MunicipalityId && (
                        <span className='text-danger'>
                          {formik.errors.MunicipalityId}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("Qualification")}:</label>
                      <CustomSelect
                        onChangeFunction={changeQualification}
                        isMulti={false}
                        optionsList={qualificationsList}
                      />
                      {formik.errors.QualificationId && (
                        <span className='text-danger'>
                          {formik.errors.QualificationId}
                        </span>
                      )}
                    </div>

                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("SubQualifications")}:</label>
                      <CustomSelect
                        onChangeFunction={changeSubQualification}
                        isMulti={true}
                        optionsList={subQualificationsList}
                      />
                    </div>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("Credits")}:</label>
                      {total !== 0 ? (
                        <input
                          type='number'
                          className='form-control'
                          readOnly
                          defaultValue={model.Credits}
                        />
                      ) : (
                        <input
                          type='number'
                          className='form-control'
                          defaultValue={""}
                          onChange={(e) => {
                            setModel({
                              ...model,
                              Credits: e.target.value,
                            });
                            formik.setFieldValue("Credits", e.target.value);
                          }}
                        />
                      )}

                      {formik.errors.Credits && (
                        <span className='text-danger'>
                          {formik.errors.Credits}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("ProtocolNumber")}:</label>
                      <input
                        type='number'
                        min={1}
                        className='form-control'
                        onChange={(e) => {
                          setModel({
                            ...model,
                            ProtocolNr: e.target.value,
                          });
                          formik.setFieldValue("ProtocolNr", e.target.value);
                        }}
                      />
                      {formik.errors.ProtocolNr && (
                        <span className='text-danger'>
                          {formik.errors.ProtocolNr}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("ProtocolDate")}:</label>
                      <CustomDatePicker onChangeFunction={changeProtocolDate} />
                      {formik.errors.ProtocolDate && (
                        <span className='text-danger'>
                          {formik.errors.ProtocolDate}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("DateIssuanceDecision")}:</label>
                      <CustomDatePicker onChangeFunction={changeDecisionDate} />
                      {formik.errors.DecisionDate && (
                        <span className='text-danger'>
                          {formik.errors.DecisionDate}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("DateExpirationDecision")}:</label>
                      <CustomDatePicker onChangeFunction={changeTermDate} />
                      {formik.errors.TermDate && (
                        <span className='text-danger'>
                          {formik.errors.TermDate}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-2 col-md-3 col-lg-3 col-sm-12 mb-3'>
                      <div className='row'>
                        <label>{t("GroupLimits")}:</label>
                        <div className='row'>
                          <div className=''>
                            <div className='form-check ps-4'>
                              <input
                                type='radio'
                                id='customRadio1'
                                name='customRadio'
                                defaultChecked={
                                  !model.NoLimitGroups ? true : false
                                }
                                onChange={(e) => {
                                  setModel({
                                    ...model,
                                    NoLimitGroups: false,
                                  });
                                  formik.setFieldValue("NoLimitGroups", true);
                                  formik.setFieldValue("NumOfGroups", null);
                                  formik.setFieldValue(
                                    "MaximumPeoplePerGroup",
                                    null
                                  );
                                }}
                                className='form-check-input'
                              />
                              <label
                                className='form-check-label'
                                htmlFor='customRadio1'
                              >
                                {t("Yes")}
                              </label>
                            </div>
                          </div>
                          <div>
                            <div className='form-check ps-4'>
                              <input
                                type='radio'
                                id='customRadio2'
                                name='customRadio'
                                defaultChecked={
                                  model.NoLimitGroups ? true : false
                                }
                                className='form-check-input'
                                onChange={(e) => {
                                  setModel({
                                    ...model,
                                    NoLimitGroups: true,
                                  });
                                  formik.setFieldValue("NoLimitGroups", false);
                                  formik.setFieldValue("NumOfGroups", 1);
                                  formik.setFieldValue(
                                    "MaximumPeoplePerGroup",
                                    0
                                  );
                                }}
                              />
                              <label
                                className='form-check-label'
                                htmlFor='customRadio2'
                              >
                                {t("No")}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {!model.NoLimitGroups && (
                      <div className=' mb-3 col-xxl-1 col-lg-2 col-md-2 col-sm-12'>
                        <label>{t("NumberOfGroups")}:</label>
                        <input
                          type='number'
                          onChange={(e) => {
                            setModel({
                              ...model,
                              NumOfGroups: e.target.value,
                            });
                            formik.setFieldValue("NumOfGroups", e.target.value);
                          }}
                          className='form-control'
                        />
                        {formik.errors.NumOfGroups && (
                          <span className='text-danger'>
                            {formik.errors.NumOfGroups}
                          </span>
                        )}
                      </div>
                    )}
                    <div className=' mb-3 col-xxl-3 col-lg-3 col-md-4 col-sm-12'>
                      <label>{t("MaxPersonsInGroup")}:</label>
                      <input
                        type='number'
                        onChange={(e) => {
                          setModel({
                            ...model,
                            MaximumPeoplePerGroup: e.target.value,
                          });
                          formik.setFieldValue(
                            "MaximumPeoplePerGroup",
                            e.target.value
                          );
                        }}
                        className='form-control'
                      />
                      {formik.errors.MaximumPeoplePerGroup && (
                        <span className='text-danger'>
                          {formik.errors.MaximumPeoplePerGroup}
                        </span>
                      )}
                    </div>
                    <div className=' mb-3 col-xxl-1 col-lg-2 col-md-2 col-sm-12'>
                      <label>{t("IsReaccrediation")}:</label>
                      <div className='form-check ps-4'>
                        <input
                          type='radio'
                          id='customRadio3'
                          name='customRadio2'
                          defaultChecked={
                            model.Reaccreditation === true ? true : false
                          }
                          className='form-check-input'
                          onChange={(e) => {
                            setModel({
                              ...model,
                              Reaccreditation: !model.Reaccreditation,
                            });
                            formik.setFieldValue(
                              "Reaccreditation",
                              e.target.checked
                            );
                          }}
                        />
                        <label
                          className='form-check-label'
                          htmlFor='customRadio3'
                        >
                          {t("Yes")}
                        </label>
                      </div>
                      <div className='form-check ps-4'>
                        <input
                          type='radio'
                          id='customRadio4'
                          name='customRadio2'
                          defaultChecked={
                            model.Reaccreditation === false ? true : false
                          }
                          className='form-check-input'
                          onChange={(e) => {
                            setModel({
                              ...model,
                              Reaccreditation: !model.Reaccreditation,
                            });
                            formik.setFieldValue(
                              "Reaccreditation",
                              e.target.checked
                            );
                          }}
                        />
                        <label
                          className='form-check-label'
                          htmlFor='customRadio4'
                        >
                          {t("No")}
                        </label>
                      </div>
                      {formik.errors.Reaccreditation && (
                        <span className='text-danger'>
                          {formik.errors.Reaccreditation}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-3'>
                      <label>{t("UploadDecision")}:</label>
                      <input
                        type='file'
                        accept='application/pdf'
                        onChange={(e) => {
                          setModel({
                            ...model,
                            Document: e.target.files[0],
                          });
                          formik.setFieldValue("Document", e.target.files[0]);
                        }}
                        className='form-control'
                      />
                      {formik.errors.Document && (
                        <span className='text-danger'>
                          {formik.errors.Document}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <ul className='list-inline mb-0 wizard'>
                <Link
                  to='/decisions'
                  className='btn btn-danger waves-effect waves-light float-start'
                >
                  <span className='btn-label'>
                    <i className='fe-arrow-left'></i>
                  </span>
                  {t("Discard")}
                </Link>
                <li className='next list-inline-item float-end'>
                  {!load ? (
                    <button
                      type='submit'
                      className='btn btn-success waves-effect waves-light'
                    >
                      <span className='btn-label'>
                        <i className='fe-check'></i>
                      </span>
                      {t("Save")}
                    </button>
                  ) : (
                    <div
                      className='spinner-border text-primary m-2 text-center'
                      role='status'
                    />
                  )}
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
