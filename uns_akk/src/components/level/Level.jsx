import React, { useEffect, useState } from "react";
import { Table, Input, Alert, Row, Col } from "antd";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import DataTable from "../custom/DataTable";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


export default function Level() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("i18nextLng")
  );
  const columns = [
    {
      title: t("Level Description"),
      dataIndex: "levelKKKDescription",
      key: "levelKKKDescription",
      responsive: ["sm"],
    },
    {
      title: t("Type"),
      dataIndex: "type",
      key: "type",
      responsive: ["sm"],
    },
    {
      title: t("Detailed Description"),
      dataIndex: "detailedDescription",
      key: "detailedDescription",
      responsive: ["sm"],
    },
    {
      title: t("Actions"),
      key: "levelKKKLanguageId",
      className: "col-12 col-sm-4 col-md-2 col-lg-2 text-center",
      render: (value, record) => {
        return (
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xxl-6 mt-2">
              <Link
                className="btn-secondary btn-sm"
                to={`/editlevel/${record.levelKKKId}`}
              >
                <i className="fe-edit" />
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xxl-6 mt-2">
              <a className="btn-sm btn-danger" onClick={(e) => handleDelete(record.levelKKKId)}>
                <i className="fe-trash-2" />
              </a>
            </div>
          </div>
        );
      },
    },
  ];
  async function getData() {
    setLoad(true);
    CrudProvider.getAllWithLang("LevelAPI/GetAll").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setData(res.result);
        } else if (res.statusCode === 400) {
          toast.error("Probleme ne server");
        }
      }
      setLoad(false);
    });
  }

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [selectedLang]);

  async function handleDelete(id) {
    setLoad(true);
    await CrudProvider.deleteItemById(
      "LevelAPI/DeleteLevel",
      id
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataDeletedSuccessfully"));
          CrudProvider.getAllWithLang("LevelAPI/GetAll").then((res) => {
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
                  to="/createlevel"
                >
                  <span className="btn-label">
                    <i className="fe-plus-circle"></i>
                  </span>
                  Shto Level
                </Link>
              </div>
            </div>
          </div>
          <div className="p-2 mt-2">
            {!load ? (
              <DataTable
                columns={columns}
                dataSource={data}
                title={"Lista e Level-ve"}
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
