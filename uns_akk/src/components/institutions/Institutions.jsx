import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Input, Alert, Row, Col } from "antd";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import DataTable from "../custom/DataTable";

export default function Institutions() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "Emri i Institucionit",
      dataIndex: "institutionName",
      key: "institutionName",
      responsive: ["sm"],
    },
    {
      title: "Numri Unik",
      dataIndex: "uniqueNumber",
      key: "uniqueNumber",
      responsive: ["sm"],
    },
    {
      title: "Qyteti",
      dataIndex: "municipalityName",
      key: "municipalityName",
      responsive: ["sm"],
    },
    {
      title: "Adresa",
      dataIndex: "address",
      key: "address",
      responsive: ["sm"],
    },
    {
      title: "Kodi Postal",
      dataIndex: "postalCode",
      key: "postalCode",
      responsive: ["sm"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["sm"],
    },
    {
      title: "Faqja e Internetit",
      dataIndex: "web",
      key: "web",
      responsive: ["sm"],
    },
  ];

  useEffect(() => {
    setLoad(true);
    CrudProvider.getAll("InstitutionAPI/GetAll").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setData(res.result);
        } else if (res.statusCode === 400) {
          toast.error("Probleme ne server");
        }
      }
      setLoad(false);
    });
  }, []);
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
                  to="/createagencies"
                >
                  <span className="btn-label">
                    <i className="fe-plus-circle"></i>
                  </span>
                  Shto
                </Link>
              </div>
            </div>
          </div>
          <div className="p-2 mt-2">
            {!load ? (
              <DataTable
                columns={columns}
                dataSource={data}
                title={"Lista e institucioneve"}
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
