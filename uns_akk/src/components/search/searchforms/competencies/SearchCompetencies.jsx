import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../../../provider/CrudProvider";
import { toast } from "react-toastify";
import DataTablev2 from "../../../custom/DataTablev2";

export default function SearchCompetencies() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [model, setModel] = useState({
    LangId: localStorage.getItem("Language"),
    EstQFLevel: "",
    CompetenceName: "",
    TypeOfCompetence: "",
    PerformanceIndicators: "",
    SuppoirtingKnowledge: "",
    AssessmentMethods: "",
  });
  const competenciesColumns = [
    {
      name: t("Name"),
      cell: (row) => {
        return (
          <a
            href={`/competence-details/${row.competences?.competencesId}`}
            target='_blank'
          >
            {row.competenceName}
          </a>
        );
      },
      sortable: true,
      filterable: true,
    },
    {
      name: t("EstQFLevel"),
      selector: (row) => row.competences?.estQFLevel,
      sortable: true,
      filterable: true,
    },
    {
      name: t("PerformanceIndicators"),
      selector: (row) => row.performanceIndicators,
      sortable: true,
      filterable: true,
    },
    {
      name: t("SuppoirtingKnowledge"),
      selector: (row) => row.supportingKnowledge,
      sortable: true,
      filterable: true,
    },
    {
      name: t("TypeOfCompetence"),
      selector: (row) => row.typeOfCompetence,
      sortable: true,
      filterable: true,
    },
  ];
  function clearInputs() {
    setModel({
      ...model,
      EstQFLevel: "",
      CompetenceName: "",
      TypeOfCompetence: "",
      PerformanceIndicators: "",
      SuppoirtingKnowledge: "",
      AssessmentMethods: "",
    });
    setData([]);
  }
  async function searchData(e) {
    e.preventDefault();
    try {
      setLoad(true);

      await CrudProvider.createItem(
        "CompetencesAPI/FilterCompetences",
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
    <div className='container mt-5 bg-light-subtle '>
      <div className='card '>
        <div className='card-body'>
          <div className='row'>
            <div className='col-xxl-6 col-lg-6 col-sm-12 animation'>
              <form className='form-horizontal'>
                <div className='row mb-3'>
                  <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
                    {t("EstQFLevel")}:
                  </label>
                  <div className=' col-xl-7'>
                    <input
                      autoComplete='off'
                      type='text'
                      className='form-control'
                      placeholder={t("EstQFLevel")}
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          EstQFLevel: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
                    {t("CompetenceName")}:
                  </label>
                  <div className=' col-xl-7'>
                    <input
                      autoComplete='off'
                      type='text'
                      className='form-control'
                      placeholder={t("CompetenceName")}
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          CompetenceName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
                    {t("TypeOfCompetence")}:
                  </label>
                  <div className=' col-xl-7'>
                    <input
                      autoComplete='off'
                      type='text'
                      className='form-control'
                      placeholder={t("TypeOfCompetence")}
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          TypeOfCompetence: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className='col-xxl-6 col-lg-6 col-sm-12 animation'>
              <form className='form-horizontal'>
                <div className='row mb-3'>
                  <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
                    {t("PerformanceIndicators")}:
                  </label>
                  <div className=' col-xl-7'>
                    <input
                      autoComplete='off'
                      type='text'
                      className='form-control'
                      placeholder={t("PerformanceIndicators")}
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          PerformanceIndicators: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
                    {t("SuppoirtingKnowledge")}:
                  </label>
                  <div className=' col-xl-7'>
                    <input
                      autoComplete='off'
                      type='text'
                      className='form-control'
                      placeholder={t("SuppoirtingKnowledge")}
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          SuppoirtingKnowledge: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
                    {t("AssessmentMethods")}:
                  </label>
                  <div className=' col-xl-7'>
                    <input
                      autoComplete='off'
                      type='text'
                      className='form-control'
                      placeholder={t("AssessmentMethods")}
                      onChange={(e) =>
                        setModel((prev) => ({
                          ...prev,
                          AssessmentMethods: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className='col-xxl-12 col-lg-12 col-sm-12 text-end animation'>
              <div className='button-list text-end'>
                <button
                  type='button'
                  className='btn btn-soft-primary waves-effect waves-light mt-2'
                  onClick={searchData}
                >
                  {t("Search")}
                </button>
                <button
                  type='button'
                  className='btn btn-soft-secondary waves-effect mt-2'
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
        <div className='flip-card-animation'>
          <DataTablev2
            dataSource={data}
            title={t("Competencies")}
            columns={competenciesColumns}
          />
        </div>
      ) : (
        <div className='card card-body'>
          <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
            <div
              className='spinner-border text-primary m-2 text-center'
              role='status'
            />
          </div>
        </div>
      )}
    </div>
  );
}
