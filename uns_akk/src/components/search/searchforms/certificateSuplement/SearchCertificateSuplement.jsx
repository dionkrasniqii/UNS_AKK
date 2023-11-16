import React, { useEffect, useState } from "react";
import CustomSelect from "../../../custom/CustomSelect";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../../../provider/CrudProvider";
import { toast } from "react-toastify";
import DataTablev2 from "../../../custom/DataTablev2";
import { Link } from "react-router-dom";

export default function SearchCertificateSuplement() {
  const { t } = useTranslation();

  const [qualificationStandarts, setQualificationStandarts] = useState([]);
  const [EQFLevel, setEQFLevels] = useState([]);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [model, setModel] = useState({
    EQFLevel: "",
    OccupationalStandartQualification: "",
    QualificationName: "",
  });
  const columns = [
    {
      name: t("Qualification"),
      cell: (row) => {
        return (
          <a href={`suplementdetails/${row.qualificationId}`} target="_blank">
            {row.qualificationName}
          </a>
        );
      },
      sortable: true,
      filterable: true,
    },
    {
      name: t("Level") + " KKK",
      selector: (row) => row.kkkLevelName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Level") + " KEK",
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
  useEffect(() => {
    Promise.all([
      CrudProvider.getAll("QualificationStandartAPI/Get").then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setQualificationStandarts(res.result);
          }
        }
      }),
      CrudProvider.getAll("EQFLevelAPI/Get").then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setEQFLevels(res.result);
          }
        }
      }),
    ]);
  }, []);

  function changeEQFLevelId(e) {
    setModel((prev) => ({
      ...prev,
      EQFLevel: e,
    }));
  }
  function changeQualificationStandartId(e) {
    setModel((prev) => ({
      ...prev,
      OccupationalStandartQualification: e,
    }));
  }
  async function submitForm() {
    try {
      setLoad(true);
      CrudProvider.createItem(
        "QualificationAPI/GetFilterQualification",
        model
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setData(res.result);
            setLoad(false);
          } else {
            toast.error("Ka ndodhur nje gabim ju lutem provoni me vone");
          }
        } else {
          toast.error("Ka ndodhur nje gabim ju lutem provoni me vone");
          setLoad(false);
        }
      });
    } finally {
      // setLoad(false);
    }
  }
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
  return (
    <div className="container mt-5 bg-light-subtle ">
      <div className="card ">
        <div className="card-body">
          <div className="row">
            <div className="col-xxl-6 col-lg-6 col-sm-12 animation">
              <div className="col-xxl-12 col-lg-12 mb-3">
                {/* <label className="">Emri ne anglisht</label> */}
                <label className="">Emri</label>
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  onInput={(e) =>
                    setModel((prev) => ({
                      ...prev,
                      QualificationName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-xxl-12 col-lg-12 mb-3">
                <label>Fusha</label>
                <CustomSelect />
              </div>
              <div className="col-xxl-12 col-lg-12 mb-3">
                <label>Nen fusha</label>
                <CustomSelect />
              </div>
            </div>
            <div className="col-xxl-6 col-lg-6 col-sm-12 animation">
              <div className="col-xxl-12 col-lg-12 mb-3">
                <label>Profesioni</label>
                <CustomSelect />
              </div>
              <div className="col-xxl-12 col-lg-12 mb-3">
                <label>Standardi i kualifikimit profesional:</label>
                <CustomSelect
                  onChangeFunction={changeQualificationStandartId}
                  hasDefaultValue={false}
                  isMulti={false}
                  optionsList={qualificationStandarts}
                />
              </div>
              <div className="col-xxl-12 col-lg-12 mb-3">
                <label>Niveli i KEK:</label>
                <CustomSelect
                  onChangeFunction={changeEQFLevelId}
                  hasDefaultValue={false}
                  isMulti={false}
                  optionsList={EQFLevel}
                />
              </div>
            </div>
            {!load ? (
              <div className="button-list text-end">
                <button
                  type="button"
                  onClick={submitForm}
                  className="btn btn-soft-primary waves-effect waves-light mt-2"
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
            ) : (
              <div className="col-xxl-12 col-lg-12 col-sm-12 text-end">
                <div
                  className="spinner-border text-primary m-2"
                  role="status"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-xxl-12 col-lg-12 col-sm-12 animation">
        <DataTablev2
          dataSource={data}
          title={"Shtojcat e diplomes"}
          columns={columns}
        />
      </div>
    </div>
  );
}
