import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import DataTablev2 from "../custom/DataTablev2";

export default function SubQualifications() {
  const { id } = useParams();
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const langId = localStorage.getItem("i18nextLng");
  const columns = [
    {
      name: t("Modules"),
      selector: (row) => row.description,
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
      name: t("Qualification"),
      selector: (row) => row.qualificationName,
    },
    {
      name: t("Actions"),
      cell: (record) => {
        return (
          <div className='button-list'>
            <Link
              className='btn btn-secondary btn-sm'
              to={`/editsubqualifications/${record.qualificationChildId}`}
            >
              <i className='fe-edit' />
            </Link>
            <a
              className='btn btn-sm btn-danger'
              onClick={(e) => handleDelete(record.qualificationChildId)}
            >
              <i className='fe-trash-2' />
            </a>
          </div>
        );
      },
    },
  ];
  
  async function GetAllData() {
    await CrudProvider.getItemByIdLang("QualificationChildAPI/GetAll", id).then((res) => {
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
      "QualificationChildAPI/DeleteQualificationChild",
      id
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataDeletedSuccessfully"));
          CrudProvider.getItemByIdLang("QualificationChildAPI/GetAll", data[0].qualificationId).then(
            (res) => {
              if (res) {
                if (res.statusCode === 200) {
                  setData(res.result);
                } else if (res.statusCode === 400) {
                  toast.error(t("ServerProblems"));
                }
              }
            }
          );
        } else if(res.statusCode === 409) {
          toast.error(t("CannotDeleteModule"));
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
                  className='btn btn-secondary waves-effect waves-light'
                  to='/qualifications'
                >
                  <span className='btn-label'>
                    <i className="icon-arrow-left"></i>
                  </span>
                  {t("Back")}
                </Link>
              </div>
            </div>
          </div>
          <div className='p-2 mt-2'>
            {!load ? (
              <DataTablev2
                columns={columns}
                dataSource={data}
                title={t("ModuleList")}
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
