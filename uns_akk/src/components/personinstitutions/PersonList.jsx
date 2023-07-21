import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CrudProvider from "../../provider/CrudProvider";
import { useTranslation } from "react-i18next";
import DataTablev2 from "../custom/DataTablev2";

export default function PersonList({ institutionId }) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: t("Personal Number"),
      selector: (row) => row.person.personalNr,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Name"),
      selector: (row) => row.person.name,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Surname"),
      selector: (row) => row.person.surname,
      sortable: true,
      filterable: true,
    },
    {
      name: "Email",
      selector: (row) => row.person.email,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Address"),
      selector: (row) => row.person.address,
      sortable: true,
      filterable: true,
    },
    {
      name: t("PhoneNumber"),
      selector: (row) => row.person.phoneNum,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Actions"),

      cell: (record) => {
        return (
          <Link
            className='btn btn-dark btn-sm'
            target='_blank'
            to={`/persondetails/${record.person.personId}`}
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

  return !loading ? (
    <DataTablev2 columns={columns} dataSource={data} title={t("Candidates")} />
  ) : (
    <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
      <div
        className='spinner-border text-primary m-2 text-center'
        role='status'
      />
    </div>
  );
}
