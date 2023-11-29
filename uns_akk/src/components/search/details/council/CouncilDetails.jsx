import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../../loading/Loading";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../../../provider/CrudProvider";
import DataTablev2 from "../../../custom/DataTablev2";

export default function CouncilDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [load, setLoad] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    CrudProvider.getItemById("CouncilsAPI/GetCouncilById", id).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setData(res.result);
          setLoad(false);
        }
      }
    });
  }, [id]);
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
  console.log(data);
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
                  të dhënat e këshillës
                </h3>
                <hr />

                <div className="row">
                  <label className="text-uppercase text-muted font-13">
                    Emri në anglisht:
                  </label>
                  <span className="ms-2 font-20">{data.nameEN}</span>
                  <hr />
                  <label className="text-uppercase text-muted font-13">
                    Fushat :
                  </label>
                  <span className="ms-2 font-20">
                    {
                      data.professionMainGroup.professionMainGroupLanguages[0]
                        .name
                    }
                    <ul>
                      {data.professionMainGroup.professionGroup.map((obj) => {
                        return <li>{obj.professionGroupLanguage[0].name}</li>;
                      })}
                    </ul>
                  </span>
                  <hr />
                  <label className="text-uppercase text-muted font-13">
                    Data fillimit :
                  </label>
                  <span className="ms-2 font-20">
                    {new Date(data.startDate).toLocaleDateString("en-GB")}
                  </span>
                  <hr />
                  <label className="text-uppercase text-muted font-13">
                    Data mbarimit :
                  </label>
                  <span className="ms-2 font-20">
                    {new Date(data.endDate).toLocaleDateString("en-GB")}
                  </span>
                  <hr />
                  <label className="text-uppercase text-muted font-13">
                    Standartet e kualifikimit :
                  </label>
                  <span className="ms-2 font-20">
                    <DataTablev2
                      dataSource={data.councilsQualificationStandartRelate}
                      title={"Lista e standardeve të kualifikimeve"}
                      columns={columns}
                    />
                  </span>
                  <hr />

                  <label className="text-uppercase text-muted font-13">
                    Ofruesit e kualifikimeve :
                  </label>
                  {console.log(data.councilsQualificationStandartRelate)}
                  <span className="ms-2 font-20">
                    <DataTablev2
                      dataSource={data.councilsQualificationStandartRelate}
                      title={"Lista e ofruesëve"}
                      columns={columns}
                    />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
