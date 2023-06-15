import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProgressBar from "../custom/ProgressBar";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../provider/CrudProvider";
import CustomSelect from "../custom/CustomSelect";
import * as Yup from "yup";
import CustomDatePicker from "../custom/CustomDatePicker";
import jwtDecode from "jwt-decode";
import { Checkbox } from "antd";
import { toast } from "react-toastify";

export default function CreateStudents() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [municipality, setMunicipality] = useState([]);
  const [residences, setResidences] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [groups, setGroups] = useState([]);
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [IsForeign, setIsForeign] = useState(false);
  const [model, setModel] = useState({
    Name: "",
    Surname: "",
    PersonalNr: "",
    BirthDate: "",
    CountryId: "1",
    CountryForeign: "0",
    MunicipalityId: "",
    MunicipalityForeign: "0",
    ResidenceId: "",
    ResidenceForeign: "",
    Address: "",
    Email: "",
    PhoneNum: "",
    InstitutionId: decodedToken.groupsid,
    InstitutionDecisionId: "",
    InstitutionGroupDecisionId: "",
  });

  useEffect(() => {
    setLoad(true);
    Promise.all([
      CrudProvider.getAllWithLang("GeneralAPI/GetAllMunicipalities").then(
        (res) => {
          if (res) {
            if (res.statusCode === 200) {
              setMunicipality(res.result);
            }
          }
        }
      ),
      CrudProvider.getItemById(
        "GeneralAPI/GetDecisionsByInstitution",
        decodedToken.groupsid
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setDecisions(res.result);
          }
        }
      }),
    ]).then((res) => {
      setLoad(false);
    });
  }, []);
  console.log(model);
  useEffect(() => {
    if (model.MunicipalityId !== "") {
      CrudProvider.getItemByIdLang(
        "GeneralAPI/GetResidencesByMunicipalityId",
        model.MunicipalityId
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setResidences(res.result);
          }
        }
      });
    }
    if (model.InstitutionDecisionId !== "") {
      CrudProvider.getItemById(
        "InstitutionGroupDecisionAPI/GetGroupsByDecision",
        model.InstitutionDecisionId
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setGroups(res.result);
          }
        }
      });
    }
  }, [model.MunicipalityId, model.InstitutionDecisionId]);

  const citiesList =
    municipality &&
    municipality.length > 0 &&
    municipality
      .map((obj) => {
        return {
          value: obj.municipality.municipalityId,
          label: obj.municipalityName,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

  function changeMunicipality(e) {
    setModel({
      ...model,
      MunicipalityId: e,
    });
    formik.setFieldValue("Municipality", e);
  }
  const residenceList =
    residences &&
    residences.length > 0 &&
    residences
      .map((obj) => {
        return {
          value: obj.residence.residenceId,
          label: obj.residenceName,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

  const decisionList =
    decisions &&
    decisions.length > 0 &&
    decisions
      .map((obj) => ({
        value: obj.institutionDecisionDetailsId,
        label:
          obj.municipality.municipalityLanguages[0].municipalityName +
          " - " +
          obj.qualification.qualificationLanguages[0].qualificationName,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  const groupsList =
    groups &&
    groups.length > 0 &&
    groups
      .map((obj) => {
        return {
          value: obj.institutionGroupDecisionId,
          label: obj.groupName,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

  function changeDecision(e) {
    setModel({
      ...model,
      InstitutionDecisionId: e,
    });
    formik.setFieldValue("ChooseDecision", e);
  }
  function changeGroup(e) {
    setModel({
      ...model,
      InstitutionGroupDecisionId: e,
    });
    formik.setFieldValue("Group", e);
  }
  function changeResidence(e) {
    setModel({
      ...model,
      ResidenceId: e,
    });
    formik.setFieldValue("Residence", e);
  }
  function formatedDate(date) {
    const [day, month, year] = date.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  function changeBirthDate(date, dateString) {
    setModel({
      ...model,
      BirthDate: formatedDate(dateString),
    });
    formik.setFieldValue("BirthDate", dateString);
  }
  function changeRegisterDate(date, dateString) {
    setModel({
      ...model,
      RegisteredDate: formatedDate(dateString),
    });
    formik.setFieldValue("RegisterDate", dateString);
  }
  function changeGraduationDate(date, dateString) {
    setModel({
      ...model,
      GraduatedDate: formatedDate(dateString),
    });
    formik.setFieldValue("RegisterDate", dateString);
  }
  const CreateStudentSchema = Yup.object().shape({
    Name: Yup.string().required(t("FillName")),
    Surname: Yup.string().required(t("FillSurname")),
    PersonalNr: Yup.string().required(t("FillPersonalNumber")),
    BirthDate: Yup.string().required(t("FillBirthDate")),
    Municipality: Yup.string().required(t("ChooseMunicipality")),
    Residence: Yup.string().required(t("ChooseResidence")),
    Address: Yup.string().required(t("PleaseFillAddress")),
    Phonenumber: Yup.string().required(t("PleaseFillPhoneNumber")),
    Email: Yup.string().required(t("PleaseFillEmail")),
    Group: Yup.string().required(t("ChooseGroup")),
    ChooseDecision: Yup.string().required(t("ChooseDecision")),
  });
  async function submitForm() {
    setLoadSubmit(true);
    await CrudProvider.createItem("PersonAPI/CreatePerson", model).then(
      (res) => {
        if (res) {
          switch (res.statusCode) {
            case 200:
              toast.success(t("DataSavedSuccessfully"));
              navigate("/students");
              break;
            case 409:
              toast.error(
                "Ju nuk mund të regjistroni kandidat ne grupin e zgjedhur sepse ska vende te lira"
              );
              break;
            case 500:
              toast.error(res.result.errorMessages[0]);
              break;
            default:
              break;
          }
        }
        setLoadSubmit(false);
      }
    );
  }

  const formik = useFormik({
    initialValues: {},
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: CreateStudentSchema,
    onSubmit: () => submitForm(),
  });

  return (
    <div className='card'>
      <div className='card-body'>
        <h3 className=' mb-3'>{t("RegisterStudent")}</h3>
        <form onSubmit={formik.handleSubmit}>
          <div id='progressbarwizard'>
            <div className='tab-content b-0 mb-0 pt-0'>
              <ProgressBar model={model} />
              <div className='tab-pane active' id='account-2'>
                <div className='row'>
                  <div className='col-xxl-12 text-start mb-1'>
                    <Checkbox
                      onChange={(e) => {
                        // setModel({
                        //   ...model,
                        //   IsForeign: e.target.checked,
                        // });
                        setIsForeign(e.target.checked);
                        formik.setFieldValue("Municipality", null);
                        formik.setFieldValue("Residence", null);
                        setModel({
                          ...model,
                          ResidenceId: "",
                          ResidenceForeign: "",
                          Municipality: "",
                          MunicipalityForeign: "",
                        });
                      }}
                    >
                      {t("ForeignStudent")}
                    </Checkbox>
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("Name")}:</label>
                    <input
                      type='text'
                      className='form-control'
                      onChange={(e) => {
                        setModel({
                          ...model,
                          Name: e.target.value,
                        });
                        formik.setFieldValue("Name", e.target.value);
                      }}
                    />
                    {formik.errors.Name && (
                      <span className='text-danger'>{formik.errors.Name}</span>
                    )}
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("Surname")}:</label>
                    <input
                      type='text'
                      className='form-control'
                      onChange={(e) => {
                        setModel({
                          ...model,
                          Surname: e.target.value,
                        });
                        formik.setFieldValue("Surname", e.target.value);
                      }}
                    />
                    {formik.errors.Surname && (
                      <span className='text-danger'>
                        {formik.errors.Surname}
                      </span>
                    )}
                  </div>

                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("PersonalNr")}:</label>
                    <input
                      type='text'
                      className='form-control'
                      onChange={(e) => {
                        setModel({
                          ...model,
                          PersonalNr: e.target.value,
                        });
                        formik.setFieldValue("PersonalNr", e.target.value);
                      }}
                    />
                    {formik.errors.PersonalNr && (
                      <span className='text-danger'>
                        {formik.errors.PersonalNr}
                      </span>
                    )}
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("BirthDate")}:</label>
                    <CustomDatePicker onChangeFunction={changeBirthDate} />
                    {formik.errors.BirthDate && (
                      <span className='text-danger'>
                        {formik.errors.BirthDate}
                      </span>
                    )}
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("Email")}:</label>
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
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("PhoneNumber")}:</label>
                    <input
                      type='text'
                      className='form-control'
                      onChange={(e) => {
                        setModel({
                          ...model,
                          PhoneNum: e.target.value,
                        });
                        formik.setFieldValue("Phonenumber", e.target.value);
                      }}
                    />
                    {formik.errors.Phonenumber && (
                      <span className='text-danger'>
                        {formik.errors.Phonenumber}
                      </span>
                    )}
                  </div>

                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("Country")}:</label>
                    {IsForeign ? (
                      <input
                        key='1'
                        type='text'
                        className='form-control'
                        placeholder='....'
                        onChange={(e) =>
                          setModel({
                            ...model,
                            CountryForeign: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <input
                        key='2'
                        type='text'
                        className='form-control'
                        defaultValue='Kosovë'
                      />
                    )}
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("Municipality")}:</label>
                    {IsForeign ? (
                      <>
                        <input
                          key='1'
                          type='text'
                          className='form-control'
                          placeholder='....'
                          onChange={(e) => {
                            setModel({
                              ...model,
                              MunicipalityForeign: e.target.value,
                            });
                            formik.setFieldValue(
                              "Municipality",
                              e.target.value
                            );
                          }}
                        />
                        <>
                          {formik.errors.Municipality && (
                            <span className='text-danger'>
                              {formik.errors.Municipality}
                            </span>
                          )}
                        </>
                      </>
                    ) : (
                      <>
                        <CustomSelect
                          optionsList={citiesList}
                          onChangeFunction={changeMunicipality}
                          isMulti={false}
                        />
                        {formik.errors.Municipality && (
                          <span className='text-danger'>
                            {formik.errors.Municipality}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("Residence")}:</label>
                    {IsForeign ? (
                      <>
                        <input
                          key='1'
                          type='text'
                          placeholder='....'
                          className='form-control'
                          onChange={(e) => {
                            setModel({
                              ...model,
                              ResidenceForeign: e.target.value,
                            });
                            formik.setFieldValue("Residence", e.target.value);
                          }}
                        />
                        <>
                          {formik.errors.Residence && (
                            <span className='text-danger'>
                              {formik.errors.Residence}
                            </span>
                          )}
                        </>
                      </>
                    ) : (
                      <>
                        <CustomSelect
                          optionsList={residenceList}
                          onChangeFunction={changeResidence}
                          isMulti={false}
                        />
                        {formik.errors.Residence && (
                          <span className='text-danger'>
                            {formik.errors.Residence}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("Address")}:</label>
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
                      <span className='text-danger'>
                        {formik.errors.Address}
                      </span>
                    )}
                  </div>

                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("ChooseDecision")}:</label>
                    <CustomSelect
                      onChangeFunction={changeDecision}
                      isMulti={false}
                      optionsList={decisionList}
                    />
                    {formik.errors.ChooseDecision && (
                      <span className='text-danger'>
                        {formik.errors.ChooseDecision}
                      </span>
                    )}
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("ChooseGroup")}:</label>
                    <CustomSelect
                      onChangeFunction={changeGroup}
                      isMulti={false}
                      optionsList={groupsList}
                    />
                    {formik.errors.Group && (
                      <span className='text-danger'>{formik.errors.Group}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <ul className='list-inline mb-0 wizard'>
              <Link
                to='/students'
                className='btn btn-danger waves-effect waves-light float-start'
              >
                <span className='btn-label'>
                  <i className='fe-arrow-left'></i>
                </span>
                {t("Discard")}
              </Link>
              <li className='next list-inline-item float-end'>
                {!loadSubmit ? (
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
  );
}
