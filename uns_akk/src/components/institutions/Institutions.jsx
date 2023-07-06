import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Input, Alert, Row, Col } from "antd";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import DataTable from "../custom/DataTable";
import { useTranslation } from "react-i18next";

export default function Institutions() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const { t } = useTranslation();
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
      render: (value) => {
        const url =
          value.startsWith("http://") || value.startsWith("https://")
            ? value
            : `http://${value}`;
        return (
          <a target='_blank' rel='noopener noreferrer' href={url}>
            {value}
          </a>
        );
      },
    },
    {
      title: t("Actions"),
      key: "institutionId",
      className: "col-12 col-sm-4 col-md-2 col-lg-2 text-center",
      render: (value, record) => {
        return (
          <div className='button-list'>
            <Link
              className='btn btn-secondary btn-sm'
              to={`/editinstitutions/${record.institutionId}`}
            >
              <i className='fe-edit' />
            </Link>
            <a
              className='btn btn-sm btn-danger me-2'
              onClick={(e) => handleDelete(record.institutionId)}
            >
              <i className='fe-trash-2' />
            </a>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    setLoad(true);
    CrudProvider.getAllWithLang("InstitutionAPI/GetAll").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setData(res.result);
        } else if (res.statusCode === 400) {
          toast.error(t("ServerProblems"));
        }
      }
      setLoad(false);
    });
  }, []);

  async function handleDelete(id) {
    setLoad(true);
    await CrudProvider.deleteItemById(
      "InstitutionAPI/DeleteInstitution",
      id
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataDeletedSuccessfully"));
          CrudProvider.getAllWithLang("InstitutionAPI/GetAll").then((res) => {
            if (res) {
              if (res.statusCode === 200) {
                setData(res.result);
              } else if (res.statusCode === 400) {
                toast.error(t("ServerProblems"));
              }
            }
          });
        }
      }
      setLoad(false);
    });
  }
  return (
    <div className='col-xxl-12'>
      <div className='col-xxl-12 text-end'></div>
      <div className='row'>
        <div className='col-12'>
          <div className='row'>
            <div className='col-12'>
              <div className='col-12 d-flex justify-content-end'>
                <Link
                  className='btn btn-info waves-effect waves-light'
                  to='/createinstitutions'
                >
                  <span className='btn-label'>
                    <i className='fe-plus-circle'></i>
                  </span>
                  {t("Add")}
                </Link>
              </div>
            </div>
          </div>
          <div className='p-2 mt-2'>
            {!load ? (
              <DataTable
                columns={columns}
                dataSource={data}
                title={t("InstitutionsList")}
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
  );
}
