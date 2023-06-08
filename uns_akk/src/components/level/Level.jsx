import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Input, Alert, Row, Col } from "antd";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import DataTable from "../custom/DataTable";

export default function Level() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);

  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("i18nextLng")
  );
  const columns = [
    {
      title: "Pershkrimi i levelit KKK",
      dataIndex: "levelKKKDescription",
      key: "levelKKKDescription",
      responsive: ["sm"],
    },
    {
      title: "Kategoria",
      dataIndex: "type",
      key: "type",
      responsive: ["sm"],
    },
    {
      title: "Kompetencat",
      dataIndex: "competencies",
      key: "competencies",
      responsive: ["sm"],
    },
    {
      title: "Pershkrim i detajuar",
      dataIndex: "detailedDescription",
      key: "detailedDescription",
      responsive: ["sm"],
    },
    {
      title: "Njohurit",
      dataIndex: "knowledge",
      key: "knowledge",
      responsive: ["sm"],
    },
    {
      title: "Aftesit",
      dataIndex: "skills",
      key: "skills",
      responsive: ["sm"],
    },
    {
      title: "Indikatoret e levelit",
      dataIndex: "levelIndicators",
      key: "levelIndicators",
      responsive: ["sm"],
    },
    {
      title: "Pershkruesi",
      dataIndex: "theDescriptor",
      key: "theDescriptor",
      responsive: ["sm"],
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
