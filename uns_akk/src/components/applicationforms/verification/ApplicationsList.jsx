import React, { useEffect, useState } from "react";
import DataTablev2 from "../../custom/DataTablev2";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../../provider/CrudProvider";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Alert, Space } from "antd";
import CreateDecisionModal from "./CreateDecisionModal";
export default function ApplicationsList() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [load, setLoad] = useState(true);
  let columns = [
    {
      name: t("UniqueNumber"),
      sortable: true,
      filterable: true,
      selector: (row) => row.uniqueNumber,
    },
    {
      name: t("InstitutionName"),
      sortable: true,
      filterable: true,
      selector: (row) => row.institutionName,
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
        switch (row.status) {
          case "Proces":
            return (
              <span
                type='button'
                className='btn btn-success rounded-pill waves-effect'
              >
                {row.status}
              </span>
            );
          case "Rikthim":
            return (
              <button
                type='button'
                className='btn btn-warning rounded-pill waves-effect'
              >
                {row.status}
              </button>
            );
          case "Refuzuar":
            return (
              <button
                type='button'
                className='btn btn-danger rounded-pill waves-effect'
              >
                {row.status}
              </button>
            );
          case "Verifikuar":
            return (
              <button
                type='button'
                className='btn btn-info rounded-pill waves-effect'
              >
                {row.status}
              </button>
            );
          case "Aprovuar":
            return (
              <button
                type='button'
                className='btn btn-primary rounded-pill waves-effect'
              >
                {row.status}
              </button>
            );
          default:
            break;
        }
      },
    },
    {
      name: t("RegisterDecision"),
      sortable: true,
      filterable: true,
      cell: (row, index) => {
        switch (row.status) {
          case "Aprovuar":
            return (
              <CreateDecisionModal
                applicationId={row.applicationId}
                institutionName={row.institutionName}
              />
            );
          default:
            return (
              <span className='text-danger'>
                {t("ApplicationNotApprovedYet")}
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
        return (
          <Link
            to={`/view-application/${row.applicationId}`}
            className='btn btn-dark waves-effect waves-light'
          >
            <i className='fe-edit' />
          </Link>
        );
      },
    },
  ];

  columns = columns.filter((col) => {
    if (decodedToken?.role === "Zyrtar") {
      return col.name !== t("RegisterDecision");
    } else {
      return col;
    }
  });

  const statusToSearch =
    decodedToken &&
    (() => {
      switch (decodedToken.role) {
        case "Zyrtar":
          return "a05fff28-087c-4063-3409-08db77102452";
        case "KAAPR":
          return "a05fff28-087c-4063-3409-08db67102415";
        case "Admin":
          return "00000000-0000-0000-0000-000000000000";
        default:
          return null;
      }
    })();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (statusToSearch) {
          const res = await CrudProvider.getItemByIdLang(
            "ApplicationAPI/GetAppByStatus",
            statusToSearch
          );

          if (res.statusCode === 200) {
            setData(res.result);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoad(false);
      }
    };

    fetchData();
  }, [statusToSearch]);
  return load ? (
    <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
      <div
        className='spinner-border text-primary m-2 text-center'
        role='status'
      />
    </div>
  ) : data.length > 0 ? (
    <DataTablev2
      dataSource={data}
      columns={columns}
      title={t("ApplicationList")}
    />
  ) : (
    <div className='card card-body'>
      <Space direction='vertical' style={{ width: "100%" }}>
        <Alert message={t("NoNewApplications")} type='info' />
      </Space>
    </div>
  );
}
