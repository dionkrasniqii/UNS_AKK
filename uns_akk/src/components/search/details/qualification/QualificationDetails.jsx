import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../../../provider/CrudProvider";

import { Link } from "react-router-dom";
import DataTablev2 from "../../../custom/DataTablev2";

export default function QualificationDetails() {
  const { qualificationId, municipalityId, institutionId } = useParams();
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);
  const columns = [
    {
      name: t("Modules"),
      selector: (row) => row.description,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Code"),
      selector: (row) => row.code,
      sortable: true,
      filterable: true,
    },
  ];
  const columns2 = [
    {
      name: t("Name"),
      cell: (row) => {
        return (
          <a
            href={`/qualification-standard-details/${row.qualificationStandardId}`}
            target='_blank'
          >
            {row.name}
          </a>
        );
      },
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
  useEffect(() => {
    setLoad(true);
    CrudProvider.getItemByIdLang(
      "QualificationAPI/GetQualificationDetails",
      `${qualificationId}/${municipalityId}/${institutionId}`
    ).then((res) => {
      if (res) {
        switch (res.statusCode) {
          case 200:
            setData(res.result);
            break;
          default:
            break;
        }
        setLoad(false);
      }
    });
  }, [qualificationId, municipalityId, institutionId]);

  const subQualifications =
    Object.keys(data).length > 0
      ? data.modules.filter((obj) => obj.qualificationChildId !== null)
      : [];

  const qualificationStandards =
    Object.keys(data).length > 0
      ? data.standards.filter((obj) => obj.qualificationStandardId !== null)
      : [];
  console.log(qualificationStandards);
  return (
    <div className="content-page-landing animation">
      <div className="content">
        <div className="container d-flex justify-content-center">
          <div className="col-xxl-10">
            <div className="card ">
              {data && Object.keys(data).length > 0 && !load ? (
                <div className="text-center card-body ">
                  <div>
                    <h3 className="title mb-3">{t("Qualification")}</h3>
                    <hr />
                    <div className="row text-start">
                      <label className="text-uppercase text-muted font-13">
                        {t("QualificationName")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.qualificationName}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("Credits")}:
                      </label>
                      <span className="ms-2 font-20">{data.credits}</span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("Code")}:
                      </label>
                      <span className="ms-2 font-20">{data.code}</span>
                      <hr />
                      <label className="text-uppercase text-muted font-13 mt-2">
                        {t("Level Description")}:
                      </label>
                      <span className="ms-2 font-20">
                        <a
                          href={`/leveldetails/${data.levelKKKId}`}
                          target="_blank"
                        >
                          {data.levelName}
                        </a>
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("AccreditedProvider")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.accreditedProvider}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("EntryRequirements")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.entryRequirements}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("ExpiryDate")}:
                      </label>
                      <span className="ms-2 font-20">
                        {new Date(
                          data.expiryDate.split("T")[0]
                        ).toLocaleDateString("en-GB")}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("ExternalQualityAssurance")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.externalQualityAssurance}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("FurtherInformationOnQualification")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.furtherInformationOnQualification}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("LanguageOfProvision")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.languageOfProvision}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("LearningOutcomesKnowledge")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.learningOutcomesKnowledge}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("LinkToRelevantSupplements")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.linkToRelevantSupplements}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("OccupationalStandartCode")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.occupationalStandartCode}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("OfficialLengthOfQualification")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.officialLengthOfQualification}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("Other")}:
                      </label>
                      <span className="ms-2 font-20">{data.other}</span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("RecognitionOfPriorLearning")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.recognitionOfPriorLearning}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("SectorField")}:
                      </label>
                      <span className="ms-2 font-20">{data.sectorField}</span>
                      <hr />
                      {subQualifications.length > 0 && (
                        <>
                          <DataTablev2
                            columns={columns}
                            dataSource={subQualifications}
                            title={t("Modules")}
                          />
                          <hr />
                        </>
                      )}
                      {qualificationStandards.length > 0 && (
                        <>
                          <DataTablev2
                            columns={columns2}
                            dataSource={qualificationStandards}
                            title={t("QualificationStandarts")}
                          />
                          <hr />
                        </>
                      )}
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
    </div>
  );
}
