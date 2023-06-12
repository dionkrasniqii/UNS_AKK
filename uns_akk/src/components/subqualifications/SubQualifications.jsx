import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import DataTable from "../custom/DataTable";


export default function SubQualifications() {
    const [load, setLoad] = useState(false);
    const [data, setData] = useState([]);
    const { t } = useTranslation();
    const langId = localStorage.getItem("i18nextLng");
    const columns = [
      {
        title: t("SubQualifications"),
        dataIndex: "description",
        key: "description",
        className: "col-lg-3 col-md-4 col-sm-6",
      },
      {
        title: t("Code"),
        dataIndex: "code",
        key: "code",
        className: "col-lg-2 col-md-3 col-sm-4",
      },
      {
        title: t("Qualifications"),
        dataIndex: "qualificationName",
        key: "qualification",
        className: "col-lg-2 col-md-3 col-sm-4",
      },
      {
        title: t("Credits"),
        dataIndex: "credits",
        key: "credits",
        className: "col-lg-2 col-md-3 col-sm-4",
      },
      {
        title: t("Actions"),
        key: "qualificationChildId",
        className: "col-lg-2 col-md-2 col-sm-2 text-center",
        render: (value, record) => {
          return (
            <div className="row d-flex justify-content-center">
              <div className="col-lg-3 col-xxl-3 mr-md-3">
                <Link
                  className="btn-secondary btn-sm"
                  to={`/editsubqualifications/${record.qualificationChildId}`}
                >
                  <i className="fe-edit" />
                </Link>
              </div>
              <div className="col-lg-3 col-xxl-3 mt-3 mt-lg-0">
                <a
                  className="btn-sm btn-danger"
                  onClick={(e) => handleDelete(record.qualificationChildId)}
                >
                  <i className="fe-trash-2" />
                </a>
              </div>
            </div>
          );
        },
      },
    ];

    async function GetAllData() {
      CrudProvider.getAllWithLang("QualificationChildAPI/GetAll").then((res) => {
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
  
    async function handleDelete(id) {
      setLoad(true);
      await CrudProvider.deleteItemById(
        "QualificationChildAPI/DeleteQualificationChild",
        id
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            toast.success(t("DataDeletedSuccessfully"));
            CrudProvider.getAllWithLang("QualificationChildAPI/GetAll").then((res) => {
              if (res) {
                if (res.statusCode === 200) {
                  setData(res.result);
                } else if (res.statusCode === 400) {
                  toast.error(t("ServerProblems"));
                }
              }
            });
          }
        }
        setLoad(false);
      });
    }
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
                    to="/createsubqualifications"
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
                <DataTable
                  columns={columns}
                  dataSource={data}
                  title={t("SubQualificationsList")}
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