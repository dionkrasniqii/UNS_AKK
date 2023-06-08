import React, { useEffect, useState } from "react";
import DataTable from "../custom/DataTable";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";

export default function Qualifications() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const columns = [
    {
      title: t("QualificationName"),
      dataIndex: "qualificationName",
      key: "qualificationName",
      className: "col-lg-3 col-md-4 col-sm-6",
    },
    {
      title: t("Code"),
      dataIndex: "code",
      key: "code",
      className: "col-lg-2 col-md-3 col-sm-4",
    },
    {
      title: t("Level"),
      dataIndex: "levelName",
      key: "levelName",
      className: "col-lg-2 col-md-3 col-sm-4",
    },
    {
      title: t("Actions"),
      key: "qualificationId",
      className: "col-lg-2 col-md-2 col-sm-2 text-center",
      render: (value, record) => {
        return (
          <div className="row d-flex justify-content-center">
            <div className="col-lg-3 col-xxl-3 mr-md-3">
              <Link
                className="btn-secondary btn-sm"
                to={`/editqualifications/${record.qualificationId}`}
              >
                <i className="fe-edit" />
              </Link>
            </div>
            <div className="col-lg-3 col-xxl-3 mt-3 mt-lg-0">
              <a
                className="btn-sm btn-danger"
                onClick={(e) => handleDelete(record.qualificationId)}
              >
                <i className="fe-trash-2" />
              </a>
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    setLoad(true);
    CrudProvider.getAllWithLang("QualificationAPI/GetAll").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setData(res.result);
        } else if (res.statusCode === 400) {
          toast.error(t("ServerProblems"));
        }
      }
      setLoad(false);
    });
  }, []);

  async function handleDelete(id) {
    setLoad(true);
    await CrudProvider.deleteItemById(
      "QualificationAPI/DeleteQualification",
      id
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataDeletedSuccessfully"));
          CrudProvider.getAllWithLang("QualificationAPI/GetAll").then((res) => {
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
                  to="/createqualifications"
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
                title={t("QualificationList")}
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
