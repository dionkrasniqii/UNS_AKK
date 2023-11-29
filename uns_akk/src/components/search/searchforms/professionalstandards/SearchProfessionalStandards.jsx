import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AdvancedFilters from "./AdvancedFilters";
import DataTablev2 from "../../../custom/DataTablev2";
import CrudProvider from "../../../../provider/CrudProvider";
import { toast } from "react-toastify";

export default function SearchProfessionalStandards() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [lessFilters, setLessFilters] = useState(false);
  const [load, setLoad] = useState(false);

  const [model, setModel] = useState({
    LangId: localStorage.getItem("Language"),
    Name: "",
    FieldOfProfessionalActivity: "",
    Specialisations: "",
    PartialInvitations: "",
    Field: "",
    Profession: "",
    ISCO: "",
    ISCED: "",
    Status: "",
  });
  const columns = [
    {
      name: t("Name"),
      cell: (row) => {
        return (
          <a
            href={`/professional-standard-details/${row.qualificationStandart?.qualificationStandartId}`}
            target="_blank"
          >
            {row.name}
          </a>
        );
      },
      sortable: true,
      filterable: true,
    },
    {
      name: t("EstQFLevel"),
      selector: (row) => row.qualificationStandart?.estQFLevel,
      sortable: true,
      filterable: true,
    },
    {
      name: t("ISCO"),
      selector: (row) => row.isco,
      sortable: true,
      filterable: true,
    },
    {
      name: t("ISCED"),
      selector: (row) => row.isced,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Status"),
      selector: (row) => row.status,
      sortable: true,
      filterable: true,
    },
  ];

  useEffect(() => {}, []);

  async function checkNullAttributes(model) {
    let count = 0;
    Object.keys(model).forEach((key) => {
      if (key !== "LangId") {
        model[key] && count++;
      }
    });
    return count > 0 ? false : true;
  }

  function clearInputs() {
    setModel({
      ...model,
      Name: "",
      FieldOfProfessionalActivity: "",
      Specialisations: "",
      PartialInvitations: "",
      Field: "",
      Profession: "",
      ISCO: "",
      ISCED: "",
      Status: "",
    });
    setData([]);
  }
  async function searchData(e) {
    e.preventDefault();
    try {
      setLoad(true);

      await CrudProvider.createItem(
        "QualificationStandartAPI/FilterStandards",
        model
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setData(res.result);
          } else {
            toast.error(res.errorMessages[0]);
          }
        }
      });
    } finally {
      setLoad(false);
    }
  }

  return (
    <div className="container mt-5 bg-light-subtle ">
      <div className="card ">
        <div className="card-body">
          <div className="row">
            <div className="col-xxl-6 col-lg-6 col-sm-12 animation">
              <form className="form-horizontal">
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    Titulli kualifikimit:
                  </label>
                  <div className=" col-xl-7">
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      placeholder={t("Name")}
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          Name: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    {t("FieldOfProfessionalActivity")}:
                  </label>
                  <div className=" col-xl-7">
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      placeholder={t("FieldOfProfessionalActivity")}
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          FieldOfProfessionalActivity: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-xxl-6 col-lg-6 col-sm-12 animation">
              <form className="form-horizontal">
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    {t("Specializations")}:
                  </label>
                  <div className=" col-xl-7">
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      placeholder={t("Specializations")}
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          Specialisations: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    {t("PartialInvitations")}:
                  </label>
                  <div className=" col-xl-7">
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      placeholder={t("PartialInvitations")}
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          PartialInvitations: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-xxl-12 col-lg-12 col-sm-12 animation">
              <button
                type="button"
                className="btn btn-bordered-light text-dark shadow-inner"
                onClick={() => setLessFilters(!lessFilters)}
              >
                {!lessFilters ? t("ShowMoreFilters") : t("ShowLessFilters")}
              </button>
            </div>
            {lessFilters && (
              <AdvancedFilters model={model} setModel={setModel} />
            )}
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
      </div>
      {!load ? (
        <div className="flip-card-animation">
          <DataTablev2
            dataSource={data}
            title={"Standartet e profesionit"}
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
