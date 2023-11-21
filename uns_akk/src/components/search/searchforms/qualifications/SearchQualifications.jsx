import React, { useEffect, useState } from "react";
import DataTablev2 from "../../../custom/DataTablev2";
import { toast } from "react-toastify";
import CrudProvider from "../../../../provider/CrudProvider";
import { useTranslation } from "react-i18next";
import CustomSelect from "../../../custom/CustomSelect";
import CustomDatePicker from "../../../custom/CustomDatePicker";

export default function SearchQualifications() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [kkkLevels, setKKKLevels] = useState([]);
  const [eqfLevels, setEQFLevels] = useState([]);
  const [qualificationsTypes, setQualificationsTypes] = useState([]);
  const [qualificationsStatuses, setQualificationsStatuses] = useState([]);
  const [load, setLoad] = useState(false);
  const [model, setModel] = useState({
    QualificationName: "",
    InstitutionId: "",
    QualificationTypeId: "",
    EQFLevelId: "",
    LevelKKKId: "",
    ExpiryDate: "",
    QualificationStatusId: "",
  });
  console.log(data);
  useEffect(() => {
    Promise.all([
      CrudProvider.getAllWithLang(
        "InstitutionAPI/GetAllInstitutionsAsSelect"
      ).then((res) => {
        if (res) {
          setInstitutions(res.result);
        }
      }),
      CrudProvider.getAll("EQFLevelAPI/Get").then((res) => {
        if (res) {
          setEQFLevels(res.result);
        }
      }),
      CrudProvider.getAll("LevelAPI/Get").then((res) => {
        if (res) {
          setKKKLevels(res.result);
        }
      }),
      CrudProvider.getAll("QualificationTypeAPI/Get").then((res) => {
        if (res) {
          setQualificationsTypes(res.result);
        }
      }),
      CrudProvider.getAll("QualificationAPI/GetQualificationStatus").then(
        (res) => {
          if (res) {
            setQualificationsStatuses(res.result);
          }
        }
      ),
    ]);
  }, []);

  const columns = [
    {
      name: t("Name"),
      cell: (row) => {
        return (
          <a
            href={`/qualificationdetails/${row.qualificationId}`}
            target="_blank"
          >
            {row.qualificationName}
          </a>
        );
      },
      sortable: true,
      filterable: true,
    },
    {
      name: t("Level") + " " + "KKK",
      selector: (row) => row.kkkLevelName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Level") + " " + "EQF",
      selector: (row) => row.eqfLevelName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Credits"),
      selector: (row) => row.credits,
      sortable: true,
      filterable: true,
    },
  ];

  function clearInputs() {
    // setModel({
    //   InstitutionId: "",
    //   LevelKKKId: "",
    //   EQFLevelId: "",
    //   QualificationTypeId: "",
    //   QualificationStatusId: "",
    //   QualificationName: "",
    //   ExpiryDate: "",
    // });
    // setData([]);
    window.location.reload();
  }
  async function searchData(e) {
    e.preventDefault();
    try {
      setLoad(true);
      await CrudProvider.createItem(
        "QualificationStandartAPI/FilterQualifications",
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

  async function changeInstitution(e) {
    setModel((prev) => ({
      ...prev,
      InstitutionId: e,
    }));
  }
  async function changeLevelKKK(e) {
    setModel((prev) => ({
      ...prev,
      LevelKKKId: e,
    }));
  }
  async function changeLevelEQF(e) {
    setModel((prev) => ({
      ...prev,
      EQFLevelId: e,
    }));
  }
  async function changeQualificationType(e) {
    setModel((prev) => ({
      ...prev,
      QualificationTypeId: e,
    }));
  }
  async function changeQualificationStatus(e) {
    setModel((prev) => ({
      ...prev,
      QualificationStatusId: e,
    }));
  }
  async function changeExpiryDate(e) {
    setModel((prev) => ({
      ...prev,
      QualificationStatusId: e,
    }));
  }
  async function changeExpiryDate(date, dateString) {
    setModel((prev) => ({
      ...prev,
      ExpiryDate: dateString,
    }));
  }
  return (
    <div className="container mt-5 bg-light-subtle ">
      <div className="card ">
        <form id="searchForm">
          <div className="card-body">
            <div className="row">
              <div className="col-xxl-6 col-lg-6 col-sm-12 animation">
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    {t("Name")}:
                  </label>
                  <div className=" col-xl-7">
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      placeholder={t("Name")}
                      defaultValue={model.QualificationName}
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          QualificationName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    {t("Insitution")}:
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
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    {t("ExpiryDate")}:
                  </label>
                  <div className="col-xl-7">
                    <CustomDatePicker onChangeFunction={changeExpiryDate} />
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-lg-6 col-sm-12 animation">
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
                    {t("QualificationType")}:
                  </label>
                  <div className="col-xl-7">
                    <CustomSelect
                      isMulti={false}
                      optionsList={qualificationsTypes}
                      hasDefaultValue={false}
                      onChangeFunction={changeQualificationType}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    {t("QualificationStatus")}:
                  </label>
                  <div className="col-xl-7">
                    <CustomSelect
                      isMulti={false}
                      optionsList={qualificationsStatuses}
                      hasDefaultValue={false}
                      onChangeFunction={changeQualificationStatus}
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
            title={"Lista e kualifikmeve"}
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
