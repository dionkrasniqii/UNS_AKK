import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import jwtDecode from "jwt-decode";
import DataTable from "../custom/DataTable";
import { Link } from "react-router-dom";

export default function Students() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [data, setData] = useState([]);

  useEffect(() => {
    CrudProvider.getItemById(
      "PersonAPI/GetPersons",
      decodedToken.groupsid
    ).then((res) => {
      if (res) {
        switch (res.statusCode) {
          case 200:
            setData(res.result);
            break;
          default:
            break;
        }
      }
    });
  }, []);
  const columns = [
    {
      title: t("InstitutionName"),
      dataIndex: "institutionName",
      key: "institutionName",
      // className: "col-lg-2 col-md-2 col-sm-4",
    },
    {
      title: t("UniqueNumber"),
      dataIndex: "uniqueNumber",
      key: "uniqueNumber",
      // className: "col-lg-2 col-md-2 col-sm-4",
    },
    {
      title: t("Municipality"),
      dataIndex: "municipalityName",
      key: "municipalityName",
      // className: "col-lg-2 col-md-2 col-sm-4",
    },
    {
      title: t("Address"),
      dataIndex: "address",
      key: "address",
      // className: "d-none d-md-table-cell col-md-2",
    },
    {
      title: t("PostalCode"),
      dataIndex: "postalCode",
      key: "postalCode",
      // className: "d-none d-md-table-cell col-md-2",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      // className: "d-none d-lg-table-cell col-lg-2",
    },
    {
      title: t("Web"),
      dataIndex: "web",
      key: "web",
      // className: "d-none d-lg-table-cell col-lg-2",
    },
    {
      title: t("Actions"),
      key: "institutionId",
      className: "col-12 col-sm-4 col-md-2 col-lg-2 text-center",
      render: (value, record) => {
        return (
          <div className='row d-flex justify-content-center'>
            <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xxl-6 mt-2'>
              <Link
                className='btn-secondary btn-sm'
                to={`/editinstitutions/${record.institutionId}`}
              >
                <i className='fe-edit' />
              </Link>
            </div>
            <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xxl-6 mt-2'>
              {/* <a
                className='btn-sm btn-danger'
                onClick={(e) => handleDelete(record.institutionId)}
              >
                <i className='fe-trash-2' />
              </a> */}
            </div>
          </div>
        );
      },
    },
  ];
  console.log(data);
  return (
    <div className='row'>
      <div className='col-12 d-flex justify-content-end'>
        <Link
          className='btn btn-info waves-effect waves-light'
          to='/createstudents'
        >
          <span className='btn-label'>
            <i className='fe-plus-circle'></i>
          </span>
          {t("Add")}
        </Link>
      </div>
      <div className='p-2 mt-2'>
        {!load ? (
          //<DataTable
          // columns={columns}
          //dataSource={data}
          //title={t("InstitutionsList")}
          ///>
          <p>1</p>
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
  );
}
