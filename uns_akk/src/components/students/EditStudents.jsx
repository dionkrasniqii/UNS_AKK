import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomDatePicker from "../custom/CustomDatePicker";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Checkbox } from "antd";
import CustomSelect from "../custom/CustomSelect";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

export default function EditStudents() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const langId = localStorage.getItem("i18nextLng");
  const [municipality, setMunicipality] = useState([]);
  const [residences, setResidences] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [decision, setDecision] = useState({});
  const [groups, setGroups] = useState([]);
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [candidates, setCandidates] = useState({
    PersonId: "",
    PersonInstitutionId: "",
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
    InstitutionGroupDecisionId: "",
    RegisteredDate: "",
    Registered: "",
    UnRegisteredDate: "",
    UnRegistered: "",
    GraduatedDate: "",
    Graduated: "",
    CertificateNumber: "",
    Remark: "",
  });

  useEffect(() => {
    setLoad(true);
    Promise.all([
      CrudProvider.getItemById("PersonAPI/GetPersonById", id).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            const obj = res.result;
            setCandidates({
              ...candidates,
              PersonId: obj.person.personId,
              PersonInstitutionId: obj.personInstitutionId,
              Name: obj.person.name,
              Surname: obj.person.surname,
              PersonalNr: obj.person.personalNr,
              BirthDate: obj.person.birthDate
                ? new Date(obj.person.birthDate.split("T")[0])
                    .toISOString()
                    .split("T")[0]
                : "",
              CountryId: obj.person.countries.countriesId,
              CountryForeign: obj.person.countryForeign,
              MunicipalityId: obj.person.municipality?.municipalityId,
              MunicipalityForeign: obj.person.municipalityForeign,
              ResidenceId: obj.person.residence?.residenceId,
              ResidenceForeign: obj.person.residenceForeign,
              Address: obj.person.address,
              Email: obj.person.email,
              PhoneNum: obj.person.phoneNum,
              InstitutionGroupDecisionId:
                obj.institutionGroupDecision?.institutionGroupDecisionId,
              RegisteredDate: obj.registeredDate
                ? new Date(obj.registeredDate.split("T")[0])
                    .toISOString()
                    .split("T")[0]
                : "",
              Registered: obj.registered,
              UnRegisteredDate: obj.unregisteredDate
                ? new Date(obj.unregisteredDate.split("T")[0])
                    .toISOString()
                    .split("T")[0]
                : "",
              UnRegistered: obj.unregistered,
              GraduatedDate: obj.graduatedDate
                ? new Date(obj.graduatedDate.split("T")[0])
                    .toISOString()
                    .split("T")[0]
                : "",
              Graduated: obj.graduated,
              CertificateNumber: obj.certificateNumber,
              Remark: obj.remark,
              InstitutionId: decodedToken.groupsid,
              InstitutionGroupDecision: obj.institutionGroupDecision,
              ValidFrom: obj.validFrom,
              ValidTo: obj.validTo,
            });
          } else {
            toast.error(res.errorMessages[0]);
            navigate("/students");
          }
        }
      }),
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
    if (candidates.MunicipalityId !== "") {
      CrudProvider.getItemByIdLang(
        "GeneralAPI/GetResidencesByMunicipalityId",
        candidates.MunicipalityId
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setResidences(res.result);
          }
        }
      });
    }
    if (
      candidates.InstitutionGroupDecision?.institutionDecisionDetails
        ?.institutionDecisionDetailsId !== ""
    ) {
      CrudProvider.getItemById(
        "InstitutionGroupDecisionAPI/GetGroupsByDecision",
        candidates.InstitutionGroupDecision?.institutionDecisionDetails
          ?.institutionDecisionDetailsId
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setGroups(res.result);
          }
        }
      });
    }
  }, [candidates.MunicipalityId, candidates.InstitutionGroupDecision]);
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

  const dateString = candidates.ValidFrom;
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const validFrom = `${year}-${month}-${day}`;

  const dateString2 = candidates.ValidTo;
  const date2 = new Date(dateString2);
  const year2 = date2.getFullYear();
  const month2 = String(date2.getMonth() + 1).padStart(2, "0");
  const day2 = String(date2.getDate()).padStart(2, "0");
  const validTo = `${year2}-${month2}-${day2}`;

  const dateString3 = candidates.RegisteredDate;
  const date3 = new Date(dateString3);
  const year3 = date3.getFullYear();
  const month3 = String(date3.getMonth() + 1).padStart(2, "0");
  const day3 = String(date3.getDate()).padStart(2, "0");
  const registeredDate = `${year3}-${month3}-${day3}`;


  function changeMunicipality(e) {
    setCandidates({
      ...candidates,
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

  function changeDecision(e) {
    setCandidates({
      ...candidates,
      InstitutionDecisionId: e,
    });
    formik.setFieldValue("ChooseDecision", e);
  }
  function changeGroup(e) {
    setCandidates({
      ...candidates,
      InstitutionGroupDecisionId: e,
    });
    formik.setFieldValue("Group", e);
  }
  function changeResidence(e) {
    setCandidates({
      ...candidates,
      ResidenceId: e,
    });
    formik.setFieldValue("Residence", e);
  }
  function changeValidFromDate(e) {
    setCandidates({
      ...candidates,
      ValidFrom: e,
    });
    formik.setFieldValue("ValidFrom", e);
  }

  function changeValidToDate(e) {
    setCandidates({
      ...candidates,
      ValidTo: e,
    });
    formik.setFieldValue("ValidTo", e);
  }
  function changeBirthDate(date, dateString) {
    setCandidates({
      ...candidates,
      BirthDate: dateString,
    });
    formik.setFieldValue("BirthDate", dateString);
  }
  function changeRegisterDate(date, dateString) {
    setCandidates({
      ...candidates,
      RegisteredDate: dateString,
    });
    formik.setFieldValue("RegisterDate", dateString);
  }
  function changeGraduationDate(date, dateString) {
    setCandidates({
      ...candidates,
      GraduatedDate: dateString,
    });
    formik.setFieldValue("RegisterDate", dateString);
  }

  async function handleSubmit() {
    await CrudProvider.updateItem("PersonAPI/UpdatePerson", candidates).then(
      (res) => {
        if (res) {
          if (res.statusCode === 200) {
            toast.success(t("DataUpdatedSuccessfully"));
            navigate("/students");
          } else {
            toast.error(res.errorMessages[0]);
          }
        }
      }
    );
  }

  const defaultSelectValueM =
    municipality.length > 0 &&
    candidates.MunicipalityId &&
    municipality.find(
      (obj) => obj.municipality?.municipalityId === candidates.MunicipalityId
    );

  const defaultLabelM = defaultSelectValueM?.municipalityName ?? "";
  const defaultValueM = defaultSelectValueM?.municipality?.municipalityId ?? "";

  const defaultOptionM = {
    label: defaultLabelM,
    value: defaultValueM,
  };

  const defaultSelectValueR =
    residences.length > 0 &&
    residences.find(
      (obj) => obj.residence.residenceId === candidates.ResidenceId
    );

  const defaultLabelR = defaultSelectValueR?.residenceName ?? "";
  const defaultValueR = defaultSelectValueR?.residence?.residenceId ?? "";

  const defaultOptionR = {
    label: defaultLabelR,
    value: defaultValueR,
  };

  const defaultSelectValueD =
    decisions.length > 0 &&
    decisions
      .filter(
        (obj) =>
          obj.institutionDecisionDetailsId ===
          candidates.InstitutionGroupDecision?.institutionDecisionDetails
            ?.institutionDecisionDetailsId
      )
      .map((obj) => {
        return {
          label:
            obj.municipality.municipalityLanguages[0].municipalityName +
            " - " +
            obj.qualification.qualificationLanguage[0].qualificationName,
          value: obj.institutionDecisionDetailsId,
        };
      });

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => handleSubmit(),
  });
  return (
    <div className="card">
      {Object.keys(candidates).length > 0 && !load ? (
        <div className="card-body">
          <h3 className=" mb-3">{"Modifiko Kandidatin"}</h3>
          <form onSubmit={formik.handleSubmit}>
            <div id="progressbarwizard">
              <div className="tab-content b-0 mb-0 pt-0">
                <div className="tab-pane active" id="account-2">
                  <div className="row">
                    <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                      <label>{t("Name")}:</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={candidates.Name}
                        onChange={(e) => {
                          setCandidates({
                            ...candidates,
                            Name: e.target.value,
                          });
                          formik.setFieldValue("Name", e.target.value);
                        }}
                      />
                      {formik.errors.Name && (
                        <span className="text-danger">
                          {formik.errors.Name}
                        </span>
                      )}
                    </div>
                    <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                      <label>{t("Surname")}:</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={candidates.Surname}
                        onChange={(e) => {
                          setCandidates({
                            ...candidates,
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
                      <label>{t("Email")}:</label>
                      <input
                        type="email"
                        className="form-control"
                        defaultValue={candidates.Email}
                        onChange={(e) => {
                          setCandidates({
                            ...candidates,
                            Email: e.target.value,
                          });
                          formik.setFieldValue("Email", e.target.value);
                        }}
                      />
                      {formik.errors.Email && (
                        <span className="text-danger">
                          {formik.errors.Email}
                        </span>
                      )}
                    </div>
                    <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                      <label>{t("PersonalNr")}:</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={candidates.PersonalNr}
                        onChange={(e) => {
                          setCandidates({
                            ...candidates,
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
                      <label>{t("BirthDate")}:</label>
                      <input
                        type="date"
                        autoComplete="off"
                        id="basic-datepicker"
                        className="form-control flatpickr-input active"
                        value={candidates.BirthDate}
                        onChange={(e) => {
                          setCandidates({
                            ...candidates,
                            BirthDate: e.target.value,
                          });
                          formik.setFieldValue("BirthDate", e.target.value);
                        }}
                      />
                      {formik.errors.BirthDate && (
                        <span className="text-danger">
                          {formik.errors.BirthDate}
                        </span>
                      )}
                    </div>
                    <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                      <label>{t("Country")}:</label>
                      {candidates.CountryForeign !== "0" ? (
                        <input
                          key="1"
                          type="text"
                          className="form-control"
                          defaultValue={candidates.CountryForeign}
                          placeholder="...."
                          onChange={(e) =>
                            setCandidates({
                              ...candidates,
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
                      {candidates.MunicipalityForeign !== "0" ? (
                        <>
                          <input
                            key="1"
                            type="text"
                            className="form-control"
                            defaultValue={candidates.MunicipalityForeign}
                            placeholder="...."
                            onChange={(e) => {
                              setCandidates({
                                ...candidates,
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
                            hasDefaultValue={true}
                            defaultValue={defaultOptionM}
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
                      {candidates.ResidenceForeign !== "" ? (
                        <>
                          <input
                            key="1"
                            type="text"
                            placeholder="...."
                            defaultValue={candidates.ResidenceForeign}
                            className="form-control"
                            onChange={(e) => {
                              setCandidates({
                                ...candidates,
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
                            hasDefaultValue={true}
                            defaultValue={defaultOptionR}
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
                        defaultValue={candidates.Address}
                        onChange={(e) => {
                          setCandidates({
                            ...candidates,
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
                      <label>{t("PhoneNumber")}:</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={candidates.PhoneNum}
                        onChange={(e) => {
                          setCandidates({
                            ...candidates,
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
                      <label>{t("ChooseDecision")}:</label>
                      <CustomSelect
                        hasDefaultValue={true}
                        defaultValue={defaultSelectValueD[0]?.label}
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
                        hasDefaultValue={true}
                        defaultValue={
                          candidates.InstitutionGroupDecision?.groupName
                        }
                        optionsList={groupsList}
                      />
                      {formik.errors.Group && (
                        <span className="text-danger">
                          {formik.errors.Group}
                        </span>
                      )}
                    </div>
                    <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                      <label>{t("RegisterDate")}:</label>
                      <input
                        type="date"
                        autoComplete="off"
                        id="basic-datepicker"
                        className="form-control flatpickr-input active"
                        value={registeredDate}
                        onChange={(e) => {
                          setCandidates({
                            ...candidates,
                            RegisterDate: e.target.value,
                          });
                          formik.setFieldValue("RegisterDate", e.target.value);
                        }}
                      />
                      {formik.errors.RegisterDate && (
                        <span className="text-danger">
                          {formik.errors.RegisterDate}
                        </span>
                      )}
                    </div>
                    <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                      <label>{t("GraduationDate")}:</label>
                      <input
                        type="date"
                        autoComplete="off"
                        id="basic-datepicker"
                        className="form-control flatpickr-input active"
                        value={candidates.GraduatedDate}
                        onChange={(e) => {
                          setCandidates({
                            ...candidates,
                            GraduatedDate: e.target.value,
                          });
                          formik.setFieldValue("GraduatedDate", e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                      <label>Valid From:</label>
                      <input
                        type="date"
                        autoComplete="off"
                        id="basic-datepicker"
                        className="form-control flatpickr-input active"
                        value={validFrom}
                        onChange={(e) => {
                          setCandidates({
                            ...candidates,
                            ValidFrom: e.target.value,
                          });
                          formik.setFieldValue("ValidFrom", e.target.value);
                        }}
                      />
                      {formik.errors.ValidFrom && (
                        <span className="text-danger">
                          {formik.errors.ValidFrom}
                        </span>
                      )}
                    </div>
                    <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                      <label>Valid To:</label>
                      <input
                        type="date"
                        autoComplete="off"
                        id="basic-datepicker"
                        className="form-control flatpickr-input active"
                        value={validTo}
                        onChange={(e) => {
                          setCandidates({
                            ...candidates,
                            ValidTo: e.target.value,
                          });
                          formik.setFieldValue("ValidTo", e.target.value);
                        }}
                      />
                      {formik.errors.ValidTo && (
                        <span className="text-danger">
                          {formik.errors.ValidTo}
                        </span>
                      )}
                    </div>
                    {/* <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3 d-flex align-items-center">
                      <Checkbox
                        className="mt-3"
                        onChange={(e) => {
                          setCandidates({
                            ...candidates,
                            Graduated: e.target.checked,
                          });
                        }}
                      >
                        {t("HasGraduated")}
                      </Checkbox>
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
                      {t("Edit")}
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
      ) : (
        <div className="col-xxl-12 col-lg-12 col-sm-12 text-center">
          <div
            className="spinner-border text-primary m-2 text-center"
            role="status"
          />
        </div>
      )}
    </div>
  );
}
