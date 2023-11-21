import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CrudProvider from "../../../provider/CrudProvider";
import DataTablev2 from "../../custom/DataTablev2";
import { Alert, Space } from "antd";
import { use } from "i18next";

export default function ApplicationsForRegisterListAKK() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [load, setLoad] = useState(false);
  const columns = [
    {
      name: t("QualificationName"),
      sortable: true,
      filterable: true,
      selector: (row) => row.qualificationName,
    },
    {
      name: t("Code"),
      sortable: true,
      filterable: true,
      selector: (row) => row.qualificationCode,
    },
    {
      name: t("Level") + " " + "KKK",
      sortable: true,
      filterable: true,
      selector: (row) => row.levelKKKDescription,
    },
    {
      name: t("Level") + " " + "KEK",
      sortable: true,
      filterable: true,
      selector: (row) => row.eqfLevelDescription,
    },
    {
      name: t("Status"),
      sortable: true,
      filterable: true,
      selector: (row) => row.statusDescription,
    },
    {
      name: t("ApplicationDate"),
      sortable: true,
      filterable: true,
      selector: (row) =>
        new Date(row.createdAt.split("T")[0]).toLocaleDateString("en-GB"),
    },

    {
      name: t("Actions"),
      sortable: true,
      filterable: true,
      cell: (row) => {
        if (row.step === 14) {
          return (
            <Link
              to={`/view-register-application/${row.id}`}
              className="btn btn-dark waves-effect waves-light"
            >
              <i className="fe-edit" />
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
        CrudProvider.getAll(
          "ApplicationAPI/GetAllRegisterApplicationsByStatus"
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
  console.log(data);
  return data.length > 0 ? (
    <DataTablev2
      dataSource={data}
      columns={columns}
      title={"Lista aplikimeve per regjister"}
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
