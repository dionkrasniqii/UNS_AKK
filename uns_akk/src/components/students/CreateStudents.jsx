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
  const [subQualifications, setSubQualifications] = useState([]);
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [IsForeign, setIsForeign] = useState(false);
  const [model, setModel] = useState({
    Name: "",
    Surname: "",
    PersonalNr: "",
    BirthDate: "",
    CountryId: "",
    CountryForeign: "",
    MunicipalityId: "",
    MunicipalityForeign: "",
    ResidenceId: "",
    ResidenceForeign: "",
    Address: "",
    Email: "",
    PhoneNum: "",
    InstitutionId: decodedToken.groupsid,
    InstitutionDecisionId: "",
    InstitutionGroupDecisionId: "",
    GraduatedDate: null,
    Graduate: false,
    ValidFrom: "",
    ValidTo: "",
    QualificationChildIds: "",
    CertificateProtocolNr: "",
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
    if (model.InstitutionDecisionId !== "") {
      CrudProvider.getItemByIdLang(
        "PersonAPI/GetQualificationChildDecision",
        model.InstitutionDecisionId
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setSubQualifications(res.result);
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
          obj.qualification.qualificationLanguage[0].qualificationName,
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

  const subQualificationList =
    subQualifications &&
    subQualifications.length > 0 &&
    subQualifications
      .map((obj) => {
        return {
          value: obj.qualificationChildId,
          label: obj.qualificationChildName,
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

  function changeSubQualifications(e) {
    setModel({
      ...model,
      QualificationChildIds: e,
    });
    formik.setFieldValue("QualificationChildIds", e);
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
    if (dateString) {
      setModel({
        ...model,
        BirthDate: formatedDate(dateString),
      });
      formik.setFieldValue("BirthDate", dateString);
    } else {
      setModel({
        ...model,
        BirthDate: "",
      });
      formik.setFieldValue("", dateString);
    }
  }

  function changeGraduationDate(date, dateString) {
    if (dateString) {
      setModel({
        ...model,
        GraduatedDate: formatedDate(dateString),
      });
      formik.setFieldValue("GraduatedDate", dateString);
    } else {
      setModel({
        ...model,
        GraduatedDate: "",
      });
      formik.setFieldValue("", dateString);
    }
  }

  function changeValidFromDate(date, dateString) {
    if (dateString) {
      setModel({
        ...model,
        ValidFrom: formatedDate(dateString),
      });
      formik.setFieldValue("ValidFrom", dateString);
    } else {
      setModel({
        ...model,
        ValidFrom: "",
      });
      formik.setFieldValue("", dateString);
    }
  }

  function changeValidToDate(date, dateString) {
    if (dateString) {
      setModel({
        ...model,
        ValidTo: formatedDate(dateString),
      });
    } else {
      setModel({
        ...model,
        ValidTo: "",
      });
    }
    // formik.setFieldValue("ValidTo", dateString);
  }
  const CreateStudentSchema = Yup.object().shape({
    Name: Yup.string().required(t("FillName")),
    Surname: Yup.string().required(t("FillSurname")),
    PersonalNr: Yup.string()
      .required(t("FillPersonalNumber"))
      .matches(/^\d{10}$/, t("PersonalNumberLimit")),
    BirthDate: Yup.string().required(t("FillBirthDate")),
    Municipality: Yup.string().required(t("ChooseMunicipality")),
    Residence: Yup.string().required(t("ChooseResidence")),
    Address: Yup.string().required(t("PleaseFillAddress")),
    Phonenumber: Yup.string().required(t("PleaseFillPhoneNumber")),
    Email: Yup.string().required(t("PleaseFillEmail")),
    Group: Yup.string().required(t("ChooseGroup")),
    ChooseDecision: Yup.string().required(t("ChooseDecision")),
    // ValidFrom: Yup.string().required(t("PleaseFillFromDate")),
    // ValidTo: Yup.string().required(t("PleaseFillToDate")),
  });

  async function submitForm() {
    setLoadSubmit(true);
    await CrudProvider.createItemWithFile("PersonAPI/CreatePerson", model).then(
      (res) => {
        if (res) {
          switch (res.statusCode) {
            case 200:
              toast.success(t("DataSavedSuccessfully"));
              navigate("/students");
              break;
            case 406:
              toast.error(t("CandidateExists"));
            case 409:
              toast.error(t("NoVacancies"));
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
  console.log(formik.errors);
  return (
    <div className="card">
      <div className="card-body">
        <h3 className=" mb-3">{t("RegisterStudent")}</h3>
        <form onSubmit={formik.handleSubmit}>
          <div id="progressbarwizard">
            <div className="tab-content b-0 mb-0 pt-0">
              <ProgressBar model={model} />
              <div className="tab-pane active" id="account-2">
                <div className="row">
                  <div className="col-xxl-2 text-start mb-1">
                    <Checkbox
                      onChange={(e) => {
                        setIsForeign(e.target.checked);
                        formik.setFieldValue("Municipality", null);
                        formik.setFieldValue("Residence", null);
                        setModel({
                          ...model,
                          CountryId: "",
                          CountryForeign: e.target.checked,
                          ResidenceId: "",
                          ResidenceForeign: e.target.checked,
                          Municipality: "",
                          MunicipalityForeign: e.target.checked,
                        });
                      }}
                    >
                      {t("ForeignStudent")}
                    </Checkbox>
                  </div>
                  <div className="col-xxl-9 text-start mb-1">
                    <Checkbox
                      onChange={(e) => {
                        setModel({
                          ...model,
                          Graduate: e.target.checked,
                        });
                      }}
                    >
                      {t("HasGraduated")}
                    </Checkbox>
                  </div>
                  <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                    <label>{t("Name")}:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          Name: e.target.value,
                        });
                        formik.setFieldValue("Name", e.target.value);
                      }}
                    />
                    {formik.errors.Name && (
                      <span className="text-danger">{formik.errors.Name}</span>
                    )}
                  </div>
                  <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                    <label>{t("Surname")}:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          Surname: e.target.value,
                        });
                        formik.setFieldValue("Surname", e.target.value);
                      }}
                    />
                    {formik.errors.Surname && (
                      <span className="text-danger">
                        {formik.errors.Surname}
                      </span>
                    )}
                  </div>
                  <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                    <label>{t("PersonalNr")}:</label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          PersonalNr: e.target.value,
                        });
                        formik.setFieldValue("PersonalNr", e.target.value);
                      }}
                    />
                    {formik.errors.PersonalNr && (
                      <span className="text-danger">
                        {formik.errors.PersonalNr}
                      </span>
                    )}
                  </div>

                  <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                    <label>{t("CertificateProtocolNr")}:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          CertificateProtocolNr: e.target.value,
                        });
                        formik.setFieldValue(
                          "CertificateProtocolNr",
                          e.target.value
                        );
                      }}
                    />
                    {formik.errors.Surname && (
                      <span className="text-danger">
                        {formik.errors.Surname}
                      </span>
                    )}
                  </div>

                  <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                    <label>{t("BirthDate")}:</label>
                    <CustomDatePicker onChangeFunction={changeBirthDate} />
                    {formik.errors.BirthDate && (
                      <span className="text-danger">
                        {formik.errors.BirthDate}
                      </span>
                    )}
                  </div>
                  <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                    <label>{t("Email")}:</label>
                    <input
                      type="email"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          Email: e.target.value,
                        });
                        formik.setFieldValue("Email", e.target.value);
                      }}
                    />
                    {formik.errors.Email && (
                      <span className="text-danger">{formik.errors.Email}</span>
                    )}
                  </div>
                  <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                    <label>{t("PhoneNumber")}:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          PhoneNum: e.target.value,
                        });
                        formik.setFieldValue("Phonenumber", e.target.value);
                      }}
                    />
                    {formik.errors.Phonenumber && (
                      <span className="text-danger">
                        {formik.errors.Phonenumber}
                      </span>
                    )}
                  </div>

                  <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                    <label>{t("Country")}:</label>
                    {IsForeign ? (
                      <input
                        key="1"
                        type="text"
                        className="form-control"
                        placeholder="...."
                        onChange={(e) =>
                          setModel({
                            ...model,
                            CountryForeign: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <input
                        key="2"
                        type="text"
                        className="form-control"
                        defaultValue="Kosovë"
                      />
                    )}
                  </div>
                  <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                    <label>{t("Municipality")}:</label>
                    {IsForeign ? (
                      <>
                        <input
                          key="1"
                          type="text"
                          className="form-control"
                          placeholder="...."
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
                            <span className="text-danger">
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
                          <span className="text-danger">
                            {formik.errors.Municipality}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                    <label>{t("Residence")}:</label>
                    {IsForeign ? (
                      <>
                        <input
                          key="1"
                          type="text"
                          placeholder="...."
                          className="form-control"
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
                            <span className="text-danger">
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
                          <span className="text-danger">
                            {formik.errors.Residence}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                    <label>{t("Address")}:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          Address: e.target.value,
                        });
                        formik.setFieldValue("Address", e.target.value);
                      }}
                    />
                    {formik.errors.Address && (
                      <span className="text-danger">
                        {formik.errors.Address}
                      </span>
                    )}
                  </div>

                  <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                    <label>{t("ChooseDecision")}:</label>
                    <CustomSelect
                      onChangeFunction={changeDecision}
                      isMulti={false}
                      optionsList={decisionList}
                    />
                    {formik.errors.ChooseDecision && (
                      <span className="text-danger">
                        {formik.errors.ChooseDecision}
                      </span>
                    )}
                  </div>
                  <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                    <label>{t("ChooseGroup")}:</label>
                    <CustomSelect
                      onChangeFunction={changeGroup}
                      isMulti={false}
                      optionsList={groupsList}
                    />
                    {!model.InstitutionDecisionId && (
                      <span className="text-info">
                        {t("SelectMunicipalityToShowGroups")}
                      </span>
                    )}
                    {formik.errors.Group && (
                      <span className="text-danger">{formik.errors.Group}</span>
                    )}
                  </div>
                  <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                    <label>{t("SubQualifications")}:</label>
                    <CustomSelect
                      onChangeFunction={changeSubQualifications}
                      isMulti={true}
                      optionsList={subQualificationList}
                    />
                    {!model.InstitutionDecisionId && (
                      <span className="text-info">
                        {t("SelectMunicipalityToShowSubqualifications")}
                      </span>
                    )}
                    {formik.errors.QualificationChildIds && (
                      <span className="text-danger">
                        {formik.errors.QualificationChildIds}
                      </span>
                    )}
                  </div>
                  {model.Graduate ? (
                    <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                      <label>{t("GraduationDate")}:</label>
                      <CustomDatePicker
                        onChangeFunction={changeGraduationDate}
                      />
                      {formik.errors.GraduatedDate && (
                        <span className="text-danger">
                          {formik.errors.GraduatedDate}
                        </span>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {/* <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("ValidFrom")}:</label>
                    <CustomDatePicker onChangeFunction={changeValidFromDate} />
                    {formik.errors.ValidFrom && (
                      <span className='text-danger'>
                        {formik.errors.ValidFrom}
                      </span>
                    )}
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("ValidTo")}:</label>
                    <CustomDatePicker onChangeFunction={changeValidToDate} />
                    {formik.errors.ValidTo && (
                      <span className="text-danger">
                        {formik.errors.ValidTo}
                      </span>
                    )} 
                  </div> */}
                </div>
              </div>
            </div>
            <ul className="list-inline mb-0 wizard">
              <Link
                to="/students"
                className="btn btn-danger waves-effect waves-light float-start"
              >
                <span className="btn-label">
                  <i className="fe-arrow-left"></i>
                </span>
                {t("Discard")}
              </Link>
              <li className="next list-inline-item float-end">
                {!loadSubmit ? (
                  <button
                    type="submit"
                    className="btn btn-success waves-effect waves-light"
                  >
                    <span className="btn-label">
                      <i className="fe-check"></i>
                    </span>
                    {t("Save")}
                  </button>
                ) : (
                  <div
                    className="spinner-border text-primary m-2 text-center"
                    role="status"
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
