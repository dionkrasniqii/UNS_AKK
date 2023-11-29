import React, { useState } from "react";
import DataTablev2 from "../../../custom/DataTablev2";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../../../provider/CrudProvider";

export default function SearchQualificationStandard() {
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const [model, setModel] = useState({});
  const [data, setData] = useState([]);
  const columns = [
    {
      name: t("Name"),
      cell: (row) => {
        return (
          <a
            href={`/qualification-standards-details/${row.qualificationStandartId}`}
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
      name: t("ValidFrom"),
      selector: (row) => new Date(row.validFrom).toLocaleDateString("en-GB"),
      sortable: true,
      filterable: true,
    },
    {
      name: t("ValidTo"),
      selector: (row) => new Date(row.validTo).toLocaleDateString("en-GB"),
      sortable: true,
      filterable: true,
    },
    {
      name: t("DateOfDecisionOfOccupationalQualificationCouncil"),
      selector: (row) =>
        new Date(
          row.dateOfDecisionOfOccupationalQualificationCouncil
        ).toLocaleDateString("en-GB"),
      sortable: true,
      filterable: true,
    },
  ];

  async function searchData() {
    setLoad(true);
    await CrudProvider.createItem(
      "QualificationStandartAPI/FilterQualificationStandards",
      model
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setData(res.result);
          setLoad(false);
        }
      }
    });
  }

  function clearInputs() {
    window.location.reload();
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
                          QualificationName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    Detyrat dhe përgjegjësitë :
                  </label>
                  <div className=" col-xl-7">
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          DutiesAndResponsibilities: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    Njohuritë, aftësitë dhe aftësitë e nevojshme :
                  </label>
                  <div className=" col-xl-7">
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          RequiredKnowledgeSkillsAndAbilities: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    Edukimi dhe përvoja :
                  </label>
                  <div className=" col-xl-7">
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          EducationAndExperience: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-lg-6 col-sm-12 animation">
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    Kërkesat fizike :
                  </label>
                  <div className=" col-xl-7">
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          PhysicalRequirements: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    Pajisjet dhe mjetet :
                  </label>
                  <div className=" col-xl-7">
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          EquipmentAndTools: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    Trajnimi dhe zhvillimi :
                  </label>
                  <div className=" col-xl-7">
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          TrainingAndDevelopment: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    Mbrojtje dhe siguri :
                  </label>
                  <div className=" col-xl-7">
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          SafetyAndSecurity: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className=" col-xl-5 col-form-label text-xl-end text-md-start text-start-sm">
                    Pajtueshmëria ligjore dhe rregullatore :
                  </label>
                  <div className=" col-xl-7">
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          LegalAndRegulatoryCompliance: e.target.value,
                        }))
                      }
                    />
                  </div>
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
        </form>
      </div>
      {!load ? (
        <div className="flip-card-animation">
          <DataTablev2
            dataSource={data}
            title={"Lista e standardeve të kualifikimeve"}
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
