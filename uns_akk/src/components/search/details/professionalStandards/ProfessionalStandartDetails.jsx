import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CrudProvider from "../../../../provider/CrudProvider";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DataTablev2 from "../../../custom/DataTablev2";

export default function ProfessionalStandartDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  useEffect(() => {
    try {
      setLoad(true);
      CrudProvider.getItemByIdLang("QualificationStandartAPI/GetById", id).then(
        (res) => {
          if (res) {
            if (res.statusCode === 200) {
              setData(res.result);
            }
          }
        }
      );
    } finally {
      setLoad(false);
    }
  }, [id]);

  const colCompetencies = [
    {
      name: t("Name"),
      selector: (row) => row.competenceName,
      cell: (row) => {
        return (
          <a href={`/competence-details/${row.competencesId}`} target="_blank">
            {row.competenceName}
          </a>
        );
      },
      sortable: true,
      filterable: true,
    },
    {
      name: t("EstQFLevel"),
      selector: (row) => row.estQFLevel,
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

  console.log(data);
  return (
    <div className="content-page-landing animation">
      <div className="content">
        <div className="container">
          <div className="card">
            {data && Object.keys(data).length > 0 && !load ? (
              <div className="text-center card-body ">
                <div>
                  <h3 className="title mb-3">
                    Të dhënat e standardit profesionit
                  </h3>
                  <hr />
                  <div className="row">
                    <div className="col-xxl-12 col-lg-12 col-sm-12 pe-1">
                      <div className="col-xxl-11 col-lg-11 col-sm-12">
                        <div className="row text-start">
                          <label className="text-uppercase text-muted font-13">
                            {t("QualificationStandartName")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.qualificationStandartName}
                          </span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("CompetencyRequirements")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.competencyRequirements}
                          </span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("DescriptionOfWork")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.descriptionOfWork}
                          </span>
                          <hr />

                          <label className="text-uppercase text-muted font-13">
                            {t(
                              "DateOfDecisionOfOccupationalQualificationCouncil"
                            )}
                            :
                          </label>
                          <span className="ms-2 font-20">
                            {data.dateOfDecisionOfOccupationalQualificationCouncil &&
                              new Date(
                                data.dateOfDecisionOfOccupationalQualificationCouncil?.split(
                                  "T"
                                )[0]
                              ).toLocaleDateString("en-GB")}
                          </span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("EstQFLevel")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.estQFLevel}
                          </span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("Field")}:
                          </label>
                          <span className="ms-2 font-20">{data.field}</span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("FieldOfOccupational")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.fieldOfOccupational}
                          </span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("ISCED")}:
                          </label>
                          <span className="ms-2 font-20">{data.isced}</span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("ICSO")}:
                          </label>
                          <span className="ms-2 font-20">{data.isco}</span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("MostCommonOccupationalTitles")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.mostCommonOccupationalTitles}
                          </span>
                          <hr />

                          <label className="text-uppercase text-muted font-13">
                            {t("NACE")}:
                          </label>
                          <span className="ms-2 font-20">{data.nace}</span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t(
                              "NoOfdecisionOfOccupationalQualificationCouncil"
                            )}
                            :
                          </label>
                          <span className="ms-2 font-20">
                            {
                              data.noOfdecisionOfOccupationalQualificationCouncil
                            }
                          </span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("Occupation")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.occupation}
                          </span>
                          <hr />
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-12 col-lg-12 col-sm-12 pe-1">
                      <div className="col-xxl-11 col-lg-11 col-sm-12">
                        <div className="row text-start">
                          <label className="text-uppercase text-muted font-13">
                            {t("OccupationalQualificationCouncil")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.occupationalQualificationCouncil}
                          </span>
                          <hr />

                          <label className="text-uppercase text-muted font-13">
                            {t("OccupationalQualificationStandartVersion")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.occupationalQualificationStandartVersion}
                          </span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("PartialOccupationalQualifications")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.partialOccupationalQualifications}
                          </span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("PersonalQualities")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.personalQualities}
                          </span>
                          <hr />

                          <label className="text-uppercase text-muted font-13">
                            {t("ProfessionalPreparation")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.professionalPreparation}
                          </span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("ReferenceToEuropanQualificationFramework")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.referenceToEuropanQualificationFramework}
                          </span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("RegulationsGoverningProfession")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.regulationsGoverningProfession}
                          </span>
                          <hr />

                          <label className="text-uppercase text-muted font-13">
                            {t("Specialisation")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.specialisation}
                          </span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("Status")}:
                          </label>
                          <span className="ms-2 font-20">{data.status}</span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("SubField")}:
                          </label>
                          <span className="ms-2 font-20">{data.subField}</span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("Tools")}:
                          </label>
                          <span className="ms-2 font-20">{data.tools}</span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("ValidFrom")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.validFrom && data.validFrom
                              ? new Date(
                                  data.validFrom.split("T")[0]
                                ).toLocaleDateString("en-GB")
                              : ""}
                          </span>
                          <hr />
                          <label className="text-uppercase text-muted font-13">
                            {t("ValidTo")}:
                          </label>
                          <span className="ms-2 font-20">
                            {data.validTo && data.validTo
                              ? new Date(
                                  data.validTo.split("T")[0]
                                ).toLocaleDateString("en-GB")
                              : t("NoLimit")}
                          </span>
                          <hr />
                        </div>
                      </div>
                    </div>

                    <div className="col-xxl-12 col-lg-12 col-sm-12 mt-3">
                      <DataTablev2
                        dataSource={data?.competences}
                        title={t("Competencies")}
                        columns={colCompetencies}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-12 col-lg-12 col-sm-12 text-start">
                    <Link
                      to="/"
                      className="btn btn-soft-danger waves-effect waves-light float-start"
                    >
                      <span className="btn-label">
                        <i className="fe-arrow-left"></i>
                      </span>
                      {t("Back")}
                    </Link>
                  </div>
                </div>
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
        </div>
      </div>
    </div>
  );
}
