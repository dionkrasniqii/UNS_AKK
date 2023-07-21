import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import DataTablev2 from "../custom/DataTablev2";

export default function Qualifications() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const langId = localStorage.getItem("i18nextLng");
  const columns = [
    {
      name: t("QualificationName"),
      selector: (row) => row.qualificationName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Code"),
      selector: (row) => row.code,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Level"),
      selector: (row) => row.levelName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Actions"),
      cell: (record) => {
        return (
          <div className='button-list'>
            <Link
              className=' btn btn-secondary btn-sm'
              to={`/editqualifications/${record.qualificationId}`}
            >
              <i className='fe-edit' />
            </Link>
            <a
              className='btn btn-sm btn-danger'
              onClick={(e) => handleDelete(record.qualificationId)}
            >
              <i className='fe-trash-2' />
            </a>
          </div>
        );
      },
    },
  ];

  async function GetAllData() {
    await CrudProvider.getAllWithLang("QualificationAPI/GetAll").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setData(res.result);
        } else if (res.statusCode === 400) {
          toast.error(t("ServerProblems"));
        }
      }
      setLoad(false);
    });
  }

  useEffect(() => {
    setLoad(true);
    GetAllData();
  }, []);

  useEffect(() => {
    setLoad(true);
    GetAllData();
  }, [langId]);

  async function handleDelete(id) {
    setLoad(true);
    await CrudProvider.deleteItemById(
      "QualificationAPI/DeleteQualification",
      id
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataDeletedSuccessfully"));
          CrudProvider.getAllWithLang("QualificationAPI/GetAll").then((res) => {
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
                  to='/createqualifications'
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
                title={t("QualificationList")}
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
