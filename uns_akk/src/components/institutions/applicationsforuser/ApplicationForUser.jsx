import React, { useEffect, useState } from "react";
import DataTablev2 from "../../custom/DataTablev2";
import { Link } from "react-router-dom";
import CrudProvider from "../../../provider/CrudProvider";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function ApplicationForUser() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const { t } = useTranslation();
  const columns = [
    {
      name: t("InstitutionName"),
      selector: (row) => row.institutionName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("UniqueNumber"),
      selector: (row) => row.uniqueNumber,
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
      name: t("Address"),
      selector: (row) => row.address,
      sortable: true,
      filterable: true,
    },
    {
      name: t("PostalCode"),
      selector: (row) => row.postalCode,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Email"),
      selector: (row) => row.email,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Web"),
      sortable: true,
      filterable: true,
      cell: (record) => {
        const url =
          record.web.startsWith("http://") || record.web.startsWith("https://")
            ? record.web
            : `http://${record.web}`;
        return (
          <a target='_blank' rel='noopener noreferrer' href={url}>
            {record.web}
          </a>
        );
      },
    },
    {
      name: t("Actions"),
      cell: (record) => {
        return (
          <div className='button-list'>
            <Link
              className='btn btn-secondary btn-sm'
              to={`/check-institution-application/${record.institutionId}`}
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
    CrudProvider.getAll("InstitutionAPI/GetSelfRegistredInsitutions").then(
      (res) => {
        if (res) {
          if (res.statusCode === 200) {
            setData(res.result);
            setLoad(false);
          } else if (res.statusCode === 400) {
            toast.error(t("ServerProblems"));
          }
        }
        setLoad(false);
      }
    );
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
              <DataTablev2
                columns={columns}
                dataSource={data}
                title={t("ApplicationList")}
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
