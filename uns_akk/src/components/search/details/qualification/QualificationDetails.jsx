import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../../../provider/CrudProvider";

import { Link } from "react-router-dom";
import DataTablev2 from "../../../custom/DataTablev2";
import ViewQualificationDetails from "../../../applicationForRegister/view/ViewQualificationDetails";
import ViewQualificationStandartsDetails from "../../../applicationForRegister/view/ViewQualificationStandartsDetails";
import ViewCompetencesDetails from "../../../applicationForRegister/view/ViewCompetencesDetails";

export default function QualificationDetails() {
  const { qualificationId } = useParams();
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const [load, setLoad] = useState(true);
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
    CrudProvider.getItemById(
      "QualificationStandartAPI/GetQualificationData",
      qualificationId
    ).then((res) => {
      if (res) {
        switch (res.statusCode) {
          case 200:
            setData(res.result);
            setLoad(false);
            break;
          default:
            break;
        }
      }
    });
  }, [qualificationId]);
  console.log(data);
  return (
    <div className="content-page-landing animation">
      <div className="content">
        <div className="container d-flex justify-content-center">
          <div className="col-xxl-10">
            <div className="card ">
              {!load ? (
                <div className="row">
                  <ViewQualificationDetails model={data} />
                  <ViewQualificationStandartsDetails
                    model={data.qualificationStandarts}
                  />
                  <ViewCompetencesDetails model={data.competences} />
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
