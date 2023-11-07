import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import CrudProvider from "../../../../provider/CrudProvider";
import DataTablev2 from "../../../custom/DataTablev2";
import { Link } from "react-router-dom";

export default function ComptenceDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);
  console.log(data);
  useEffect(() => {
    try {
      setLoad(true);
      CrudProvider.getItemByIdLang(
        "CompetencesAPI/GetCompetencesById",
        id
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setData(res.result);
          }
        }
      });
    } finally {
      setLoad(false);
    }
  }, [id]);

  const colQualificaitonStandards = [
    {
      name: t("QualificationStandartName"),
      selector: (row) => row.standartName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("PartialOccupationalQualifications"),
      selector: (row) => row.partialOccupationalQualification,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Type"),
      selector: (row) => row.type,
      sortable: true,
      filterable: true,
    },
    {
      name: t("ValidTo"),
      selector: (row) =>
        row.validTo &&
        new Date(row.validTo).toLocaleDateString("en-GB").split("T")[0],
      sortable: true,
      filterable: true,
    },
  ];

  return (
    <div className="content-page-landing animation">
      <div className="content">
        <div className="container">
          <div className="card">
            {Object.keys(data).length > 0 && !load ? (
              <div className="text-center card-body ">
                <div>
                  <h3 className="title mb-3">{t("CompetenceDetails")}</h3>
                  <hr />
                  <div className="row">
                    <div className="row text-start">
                      <label className="text-uppercase text-muted font-13">
                        {t("CompetenceName")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.competenceName}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("EstQFLevel")}:
                      </label>
                      <span className="ms-2 font-20">{data.estQFLevel}</span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("AssessmentMethods")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.assessmentMethods}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("PerformanceIndicators")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.performanceIndicators}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("SuppoirtingKnowledge")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.suppoirtingKnowledge}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("TypeOfCompetence")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.typeOfCompetence}
                      </span>
                      <hr />
                    </div>

                    <div className="col-xxl-12 col-lg-12 col-sm-12 mt-3">
                      <DataTablev2
                        dataSource={data.competenceStandartList}
                        title={t("QualificationStandartList")}
                        columns={colQualificaitonStandards}
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
