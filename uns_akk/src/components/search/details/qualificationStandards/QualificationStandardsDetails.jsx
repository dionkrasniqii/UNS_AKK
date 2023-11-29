import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CrudProvider from "../../../../provider/CrudProvider";
import { useTranslation } from "react-i18next";
import Loading from "../../../loading/Loading";

export default function QualificationStandardsDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { t } = useTranslation();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    CrudProvider.getItemById(
      "QualificationStandartAPI/GetQualificationStandardById",
      id
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setData(res.result);
          setLoad(false);
        }
      }
    });
  }, [id]);

  return (
    <div className="content-page-landing animation">
      <div className="content">
        <div className="container">
          <div className="card">
            {load ? (
              <Loading />
            ) : (
              <div className="card-body">
                <div className="col-md-12 text-end"></div>
                <h3 className="title mb-3 text-center text-uppercase">
                  të dhënat e standardit të kualifikimit
                </h3>
                <hr />

                <div className="row">
                  <label className="text-uppercase text-muted font-13">
                    {t("QualificationName")}:
                  </label>
                  <span className="ms-2 font-20">{data.qualificationName}</span>
                  <hr />
                  <label className="text-uppercase text-muted font-13">
                    Detyrat dhe përgjegjësitë :
                  </label>
                  <span className="ms-2 font-20">
                    {data.dutiesAndResponsibilities}
                  </span>
                  <hr />
                  <label className="text-uppercase text-muted font-13">
                    Njohuritë, aftësitë dhe aftësitë e nevojshme :
                  </label>
                  <span className="ms-2 font-20">
                    {data.requiredKnowledgeSkillsAndAbilities}
                  </span>
                  <hr />
                  <label className="text-uppercase text-muted font-13">
                    Edukimi dhe përvoja :
                  </label>
                  <span className="ms-2 font-20">
                    {data.educationAndExperience}
                  </span>
                  <hr />
                  <label className="text-uppercase text-muted font-13">
                    Kërkesat fizike :
                  </label>
                  <span className="ms-2 font-20">
                    {data.physicalRequirements}
                  </span>
                  <hr />
                  <label className="text-uppercase text-muted font-13">
                    Pajisjet dhe mjetet :
                  </label>
                  <span className="ms-2 font-20">{data.equipmentAndTools}</span>
                  <hr />
                  <label className="text-uppercase text-muted font-13">
                    Trajnimi dhe zhvillimi :
                  </label>
                  <span className="ms-2 font-20">
                    {data.trainingAndDevelopment}
                  </span>
                  <hr />
                  <label className="text-uppercase text-muted font-13">
                    Mbrojtje dhe siguri :
                  </label>
                  <span className="ms-2 font-20">{data.safetyAndSecurity}</span>
                  <hr />
                  <label className="text-uppercase text-muted font-13">
                    Pajtueshmëria ligjore dhe rregullatore :
                  </label>
                  <span className="ms-2 font-20">
                    {data.legalAndRegulatoryCompliance}
                  </span>
                  <hr />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
