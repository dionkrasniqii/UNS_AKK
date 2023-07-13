// PersonList.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CrudProvider from "../../provider/CrudProvider";
import DataTable from "../custom/DataTable";
import { useTranslation } from "react-i18next";

export default function PersonList({ institutionId }) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: t("Personal Number"),
      dataIndex: "person",
      key: (item) => item.personalNr,
      responsive: ["sm"],
      render: (item) => item.personalNr,
    },
    {
      title: t("Name"),
      dataIndex: "person",
      key: (item) => item.name,
      responsive: ["sm"],
      render: (item) => item.name,
    },
    {
      title: t("Surname"),
      dataIndex: "person",
      key: (item) => item.surname,
      responsive: ["sm"],
      render: (item) => item.surname,
    },
    {
      title: t("Email"),
      dataIndex: "person",
      key: (item) => item.email,
      responsive: ["sm"],
      render: (item) => item.email,
    },
    {
      title: t("Address"),
      dataIndex: "person",
      key: (item) => item.address,
      responsive: ["sm"],
      render: (item) => item.address,
    },
    {
      title: t("Phone Number"),
      dataIndex: "person",
      key: (item) => item.phoneNum,
      responsive: ["sm"],
      render: (item) => item.phoneNum,
    },
    {
      title: t("Actions"),
      dataIndex: "person",
      key: (item) => item.personId,
      render: (item) => {
        console.log(item);
        return (
          <Link
            className='btn btn-dark btn-sm'
            target='_blank'
            to={`/persondetails/${item.personId}`}
          >
            <i className='dripicons-user' />
          </Link>
        );
      },
    },
  ];

  useEffect(() => {
    if (institutionId) {
      fetchData();
    }
  }, [institutionId]);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await CrudProvider.getItemById(
        "PersonAPI/GetPersons",
        institutionId
      );
      if (res) {
        switch (res.statusCode) {
          case 200:
            setData(res.result);
            break;
          default:
            // Handle other status codes if needed
            break;
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className='col-xxl-12'>
        <div className='row'>
          <div className='col-12'>
            <div className='p-2 mt-2'>
              {!loading ? (
                <DataTable
                  columns={columns}
                  dataSource={data}
                  title={t("Candidates")}
                />
              ) : (
                <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
                  <div
                    className='spinner-border text-primary m-2 text-center'
                    role='status'
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
