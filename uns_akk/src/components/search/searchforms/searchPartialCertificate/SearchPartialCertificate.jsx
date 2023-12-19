import React, { useEffect, useState } from "react";
import DataTablev2 from "../../../custom/DataTablev2";
import CustomSelect from "../../../custom/CustomSelect";
import CustomDatePicker from "../../../custom/CustomDatePicker";
import CrudProvider from "../../../../provider/CrudProvider";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function SearchPartialCertificate() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [kkkLevels, setKKKLevels] = useState([]);
  const [eqfLevels, setEQFLevels] = useState([]);
  const [fields, setFields] = useState([]);
  const [subFields, setSubFields] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [partialQualifications, setPartialQualifications] = useState([]);
  const [load, setLoad] = useState(false);

  const [model, setModel] = useState({
    CertificateNr: "",
    NameSurname: "",
    LevelKKK: "",
    LevelKEK: "",
    Institution: "",
    ProfessionMainGroup: "",
    ProfessionGroup: "",
    ChildProfessionGroup: "",
    Qualification: "",
  });
  useEffect(() => {
    Promise.all([
      CrudProvider.getAll(
        "InstitutionDesicionAPI/GetInstitutionAsSelected"
      ).then((res) => {
        if (res) {
          setInstitutions(res.result);
        }
      }),
      CrudProvider.getAllWithLang(
        "QualificationAPI/GetQualificationAsSelected"
      ).then((res) => {
        if (res) {
          setPartialQualifications(res.result);
        }
      }),

      CrudProvider.getAll("EQFLevelAPI/Get").then((res) => {
        if (res) {
          setEQFLevels(res.result);
        }
      }),
      CrudProvider.getAllWithLang("LevelAPI/Get").then((res) => {
        if (res) {
          setKKKLevels(res.result);
        }
      }),

      CrudProvider.getAllWithLang(
        "ProfessionGroupAPI/GetAllMainProfessions"
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setFields(res.result);
          }
        }
      }),
    ]);
  }, []);

  const columns = [
    {
      name: t("NumberOfCertificate"),
      cell: (row) => {
        return (
          <a href={`certificationdetails/${row.certificateNr}`} target="_blank">
            {row.certificateNr}
          </a>
        );
      },
      sortable: true,
      filterable: true,
    },
    {
      name: "Niveli KKK",
      selector: (row) => row.levelDescription,
      sortable: true,
      filterable: true,
    },
    {
      name: "Niveli KEK",
      selector: (row) => row.eqfLevelDescription,
      sortable: true,
      filterable: true,
    },
    {
      name: t("QualificationName"),
      selector: (row) => row.qualificationName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("ValidFrom"),
      sortable: true,
      filterable: true,
      cell: (row) =>
        row.validFrom
          ? new Date(row.validFrom?.split("T")[0]).toLocaleDateString("en-GB")
          : "",
    },
  ];

  function clearInputs() {
    window.location.reload();
  }
  async function searchData(e) {
    e.preventDefault();
    try {
      setLoad(true);
      await CrudProvider.createItem(
        "CertificatesAPI/GetCertificatesPartial",
        model
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            const data = res.result;
            setData(data && data);
          } else {
            toast.error(res.errorMessages[0]);
          }
        }
      });
    } finally {
      setLoad(false);
    }
  }
  async function getBySubFieldsByMainGroup(id) {
    await CrudProvider.getItemByIdLang(
      "ProfessionGroupAPI/GetProfessionByMainGroupId",
      id
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setSubFields(res.result);
        }
      }
    });
  }
  async function getProfessionsBySubField(id) {
    await CrudProvider.getItemByIdLang(
      "ProfessionGroupAPI/GetChildProfessionByGroupId",
      id
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setProfessions(res.result);
        }
      }
    });
  }
  async function changeInstitution(e) {
    setModel((prev) => ({
      ...prev,
      Institution: e,
    }));
  }
  async function changeLevelKKK(e) {
    setModel((prev) => ({
      ...prev,
      LevelKKK: e,
    }));
  }
  async function changeLevelEQF(e) {
    setModel((prev) => ({
      ...prev,
      LevelKEK: e,
    }));
  }
  async function changeField(e) {
    setModel((prev) => ({
      ...prev,
      ProfessionMainGroup: e,
    }));
    await getBySubFieldsByMainGroup(e);
  }
  async function changeSubField(e) {
    setModel((prev) => ({
      ...prev,
      ProfessionGroup: e,
    }));
    await getProfessionsBySubField(e);
  }
  async function changeProfession(e) {
    setModel((prev) => ({
      ...prev,
      ChildProfessionGroup: e,
    }));
  }
  async function changeQualification(e) {
    setModel((prev) => ({
      ...prev,
      ChildProfessionGroup: e,
    }));
  }
  return (
    <div className="container mt-5 bg-light-subtle ">
      <div className="card ">
        <div className="col-xxl-12 col-lg-12 col-sm-12 text-end mt-2 pe-2">
          <Link to={"/search-awardingbody"}>Diploma/Certifikata e ofruar</Link>
        </div>
        <form id="searchForm">
          <div className="card-body">
            <div className="row">
              <div className="col-xxl-6 col-lg-6 col-sm-12 animation">
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    Numri certifikatës:
                  </label>
                  <div className=" col-xl-7">
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          CertificateNr: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    Emri Mbiemri:
                  </label>
                  <div className="col-xl-7">
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          NameSurname: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    {t("Level")} KKK:
                  </label>
                  <div className="col-xl-7">
                    <CustomSelect
                      isMulti={false}
                      optionsList={kkkLevels}
                      hasDefaultValue={false}
                      onChangeFunction={changeLevelKKK}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    {t("Level")} KEK:
                  </label>
                  <div className="col-xl-7">
                    <CustomSelect
                      isMulti={false}
                      optionsList={eqfLevels}
                      hasDefaultValue={false}
                      onChangeFunction={changeLevelEQF}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    Ofruesi i kualifikimeve:
                  </label>
                  <div className="col-xl-7">
                    <CustomSelect
                      isMulti={false}
                      defaultValue={model.InstitutionId}
                      optionsList={institutions}
                      hasDefaultValue={false}
                      onChangeFunction={changeInstitution}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-lg-6 col-sm-12 animation">
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    Fusha:
                  </label>
                  <div className="col-xl-7">
                    <CustomSelect
                      isMulti={false}
                      optionsList={fields}
                      hasDefaultValue={false}
                      onChangeFunction={changeField}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    Nënfusha:
                  </label>
                  <div className="col-xl-7">
                    <CustomSelect
                      isMulti={false}
                      optionsList={subFields}
                      hasDefaultValue={false}
                      onChangeFunction={changeSubField}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    Profesioni:
                  </label>
                  <div className="col-xl-7">
                    <CustomSelect
                      isMulti={false}
                      optionsList={professions}
                      hasDefaultValue={false}
                      onChangeFunction={changeProfession}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    Kualifikimi i pjesshëm:
                  </label>
                  <div className="col-xl-7">
                    <CustomSelect
                      isMulti={false}
                      optionsList={partialQualifications}
                      hasDefaultValue={false}
                      onChangeFunction={changeQualification}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xxl-12 col-lg-12 col-sm-12 text-end animation">
                <div className="button-list text-end">
                  <button
                    type="button"
                    className="btn btn-soft-primary waves-effect waves-light mt-2"
                    onClick={searchData}
                  >
                    {t("Search")}
                  </button>
                  <button
                    type="button"
                    className="btn btn-soft-secondary waves-effect mt-2"
                    onClick={clearInputs}
                  >
                    {t("Clear")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {!load ? (
        <div className="flip-card-animation">
          <DataTablev2
            dataSource={data}
            title={"Lista e certifikatave të pjesshme"}
            columns={columns}
          />
        </div>
      ) : (
        <div className="card card-body">
          <div className="col-xxl-12 col-lg-12 col-sm-12 text-center">
            <div
              className="spinner-border text-primary m-2 text-center"
              role="status"
            />
          </div>
        </div>
      )}
    </div>
  );
}
