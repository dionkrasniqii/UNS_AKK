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
        switch (row.status) {
          case "Proces":
            return (
              <span
                type='button'
                className='btn btn-white rounded-pill waves-effect'
              >
                <i className='me-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='green'
                    className='bi bi-check-circle'
                    viewBox='0 0 16 16'
                  >
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                    <path d='M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z' />
                  </svg>
                </i>

                {row.status}
              </span>
            );
          case "Rikthim":
            return (
              <button
                type='button'
                className='btn btn-white rounded-pill waves-effect'
              >
                <i className='me-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='orange'
                    className='bi bi-exclamation-circle'
                    viewBox='0 0 16 16'
                  >
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                    <path d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z' />
                  </svg>
                </i>

                {row.status}
              </button>
            );
          case "Refuzuar":
            return (
              <button
                type='button'
                className='btn btn-white rounded-pill waves-effect'
              >
                <i className='me-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='red'
                    className='bi bi-exclamation-circle'
                    viewBox='0 0 16 16'
                  >
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                    <path d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z' />
                  </svg>
                </i>

                {row.status}
              </button>
            );
          case "Verifikuar":
            return (
              <button
                type='button'
                className='btn btn-white rounded-pill waves-effect'
              >
                <i className='me-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='blue'
                    className='bi bi-exclamation-circle'
                    viewBox='0 0 16 16'
                  >
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                    <path d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z' />
                  </svg>
                </i>

                {row.status}
              </button>
            );
          case "Aprovuar":
            return (
              <button
                type='button'
                className='btn btn-white rounded-pill waves-effect'
              >
                <i className='me-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='green'
                    className='bi bi-exclamation-circle'
                    viewBox='0 0 16 16'
                  >
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                    <path d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z' />
                  </svg>
                </i>

                {row.status}
              </button>
            );
          default:
            break;
        }
      },
    },
    {
      name: t("Actions"),
      sortable: true,
      filterable: true,
      cell: (row) => {
        return (
          row.status === "Rikthim" && (
            <Link
              to={`/editapplication/${row.applicationId}`}
              className='btn btn-dark waves-effect waves-light'
            >
              <i className='fe-edit' />
            </Link>
          )
        );
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
      title={"Lista aplikimeve"}
    />
  ) : load ? (
    <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
      <div
        className='spinner-border text-primary m-2 text-center'
        role='status'
      />
    </div>
  ) : (
    <div className='card card-body'>
      <Space
        direction='vertical'
        style={{
          width: "100%",
        }}
      >
        <Alert message={t("NoNewApplications")} type='info' />
      </Space>
    </div>
  );
}
