import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import DataTablev2 from "../custom/DataTablev2";

export default function Competences() {
    const [load, setLoad] = useState(false);
    const [data, setData] = useState([]);
    const {t} = useTranslation();
    const langId = localStorage.getItem("i18nextLng");
    const columns = [
        {
          name: t("CompetenceName"),
          selector: (row) => row.competenceName,
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
        {
          name: t("Actions"),
          cell: (record) => {
            return (
              <div className="button-list">
                <Link
                  className=" btn btn-secondary btn-sm"
                  to={`/editcompetences/${record.competencesId}`}
                >
                  <i className="fe-edit" />
                </Link>
                {/* <a
                  className="btn btn-sm btn-danger"
                  onClick={(e) => handleDelete(record.qualificationId)}
                >
                  <i className="fe-trash-2" />
                </a> */}
              </div>
            );
          },
        },
      ];

      async function GetAllData() {
        await CrudProvider.getAllWithLang("CompetencesAPI/GetCompetences").then((res) => {
          if (res) {
            if (res.statusCode === 200) {
              setData(res.result);
            } else if (res.statusCode === 400) {
              toast.error(t("ServerProblems"));
            }
          }
          setLoad(false);
        });
      }
    
      useEffect(() => {
        setLoad(true);
        GetAllData();
      }, []);
    
      useEffect(() => {
        setLoad(true);
        GetAllData();
      }, [langId]);
    
      return (
        <div className="col-xxl-12">
          <div className="col-xxl-12 text-end"></div>
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <div className="col-12 d-flex justify-content-end">
                    <Link
                      className="btn btn-info waves-effect waves-light"
                      to="/createcompetences"
                    >
                      <span className="btn-label">
                        <i className="fe-plus-circle"></i>
                      </span>
                      {t("Add")}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-2 mt-2">
                {!load ? (
                  <DataTablev2
                    columns={columns}
                    dataSource={data}
                    title={t("CompetencesList")}
                  />
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