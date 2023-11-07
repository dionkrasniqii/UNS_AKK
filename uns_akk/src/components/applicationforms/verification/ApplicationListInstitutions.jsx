import React, { useEffect, useState } from "react";
import DataTablev2 from "../../custom/DataTablev2";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../../provider/CrudProvider";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Alert, Space } from "antd";

export default function ApplicationListInstitutions() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [load, setLoad] = useState(false);

  const columns = [
    {
      name: t("UniqueNumber"),
      sortable: true,
      filterable: true,
      selector: (row) => row.uniqueNumber,
    },
    {
      name: t("Qualification"),
      sortable: true,
      filterable: true,
      selector: (row) => row.qualification,
    },
    {
      name: t("Municipality"),
      sortable: true,
      filterable: true,
      selector: (row) => row.municipality,
    },
    {
      name: t("ApplicationDate"),
      sortable: true,
      filterable: true,
      selector: (row) =>
        new Date(row.applicationDate.split("T")[0]).toLocaleDateString("en-GB"),
    },
    {
      name: t("Status"),
      sortable: true,
      filterable: true,
      cell: (row) => {
        if (row.step === 3) {
          return (
            <button
              type="button"
              className="btn btn-warning rounded-pill waves-effect"
            >
              Rikthim
            </button>
          );
        } else if (row.step === 5 || row.step === 9) {
          return (
            <span
              type="button"
              className="btn btn-danger rounded-pill waves-effect"
            >
              Refuzuar
            </span>
          );
        } else if (row.step === 8) {
          return (
            <span
              type="button"
              className="btn btn-primary rounded-pill waves-effect"
            >
              Aprovuar
            </span>
          );
        } else {
          return (
            <span
              type="button"
              className="btn btn-success rounded-pill waves-effect"
            >
              Proces
            </span>
          );
        }
      },
    },
    {
      name: t("Actions"),
      sortable: true,
      filterable: true,
      cell: (row) => {
        if (row.step === 3) {
          return (
            <Link
              to={`/editapplication/${row.applicationId}`}
              className="btn btn-dark waves-effect waves-light"
            >
              <i className="fe-edit" />
            </Link>
          );
        } else if (row.step === 8) {
          return (
            <Link
              to={`/application-for-register/2`}
              className="btn btn-dark waves-effect waves-light"
            >
              Regjistër
              <i className=" ti-arrow-right" />
            </Link>
          );
        }
      },
    },
  ];

  useEffect(() => {
    try {
      setLoad(true);
      if (decodedToken) {
        CrudProvider.getItemByIdLang(
          "ApplicationAPI/GetAppByInstitution",
          decodedToken.groupsid
        ).then((res) => {
          if (res) {
            if (res.statusCode === 200) {
              setData(res.result);
            }
          }
        });
      }
    } finally {
      setLoad(false);
    }
  }, []);

  return data.length > 0 ? (
    <DataTablev2
      dataSource={data}
      columns={columns}
      title={"Lista aplikimeve per akreditim"}
    />
  ) : load ? (
    <div className="col-xxl-12 col-lg-12 col-sm-12 text-center">
      <div
        className="spinner-border text-primary m-2 text-center"
        role="status"
      />
    </div>
  ) : (
    <div className="card card-body">
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Alert message={t("NoNewApplications")} type="info" />
      </Space>
    </div>
  );
}
