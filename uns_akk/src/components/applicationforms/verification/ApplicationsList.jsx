import React, { useState } from "react";
import DataTablev2 from "../../custom/DataTablev2";
import { useTranslation } from "react-i18next";

export default function ApplicationsList() {
  const { t } = useTranslation();
  const [data, setData] = useState([
    { municipalityName: "Test", status: "proces" },
    { municipalityName: "asdasd", status: "verfikuar" },
    { municipalityName: "asdasd", status: "refuzuar" },
    { municipalityName: "asdasd", status: "rikthim" },
    { municipalityName: "asdasd", status: "aprovuar" },
  ]);
  const columns = [
    {
      name: t("Municipality"),
      selector: (row) => row.municipalityName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Municipality"),
      selector: (row) => row.municipalityName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Municipality"),
      selector: (row) => row.municipalityName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Municipality"),
      selector: (row) => row.municipalityName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Municipality"),
      selector: (row) => row.municipalityName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Name"),
      sortable: true,
      filterable: true,
      cell: (row) => {
        switch (row.status) {
          case "aprovuar":
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
                    className='bi bi-check-circle'
                    viewBox='0 0 16 16'
                  >
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                    <path d='M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z' />
                  </svg>
                </i>

                {row.status}
              </button>
            );
          case "refuzuar":
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
          default:
            break;
        }
      },
    },
    {
      name: t("Municipality"),
      selector: (row) => row.municipalityName,
      sortable: true,
      filterable: true,
    },
  ];
  return (
    <DataTablev2
      dataSource={data}
      columns={columns}
      title={"Lista aplikimeve"}
    />
  );
}
