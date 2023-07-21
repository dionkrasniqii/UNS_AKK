import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DataTablev2 from "../custom/DataTablev2";
import { Link } from "react-router-dom";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import { Delete } from "@mui/icons-material";
export default function QualificationType() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const langId = localStorage.getItem("i18nextLng");
  const { t } = useTranslation();
  const columns = [
    {
      name: t("QualificationType"),
      selector: (row) => row.qualificationTypeName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("CreatedAt"),
      selector: (row) =>
        new Date(row.createdAt.split("T")[0]).toLocaleDateString("en-GB"),
      sortable: true,
      filterable: true,
    },
    {
      name: t("Actions"),
      width: "200px",
      cell: (record) => {
        return (
          <div className='button-list'>
            <Link
              className='btn btn-dark btn-sm'
              to={`/qualificationtype-edit/${record.qualificationType.qualificationTypeId}`}
            >
              <i className='fe-edit' />
            </Link>
            <a
              className='btn btn-danger btn-sm'
              onClick={(e) =>
                DeleteType(record.qualificationType.qualificationTypeId)
              }
            >
              <i className='fe-trash' />
            </a>
          </div>
        );
      },
    },
  ];
  async function DeleteType(id) {
    await CrudProvider.deleteItemById(
      "QualificationTypeAPI/DeleteQualificationType",
      id
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataDeletedSuccessfully"));
          fetchData();
        } else {
          toast.error(res.errorMessages[0]);
        }
      }
    });
  }
  async function fetchData() {
    await CrudProvider.getAllWithLang("QualificationTypeAPI/GetAll").then(
      (res) => {
        if (res) {
          if (res.statusCode === 200) {
            setData(res.result);
          }
        }
      }
    );
  }
  useEffect(() => {
    try {
      setLoad(true);
      fetchData();
    } finally {
      setLoad(false);
    }
  }, []);
  useEffect(() => {
    try {
      setLoad(true);
      fetchData();
    } finally {
      setLoad(false);
    }
  }, [langId]);
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
                  to='/createqualifications-type'
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
                title={t("QualificationTypes")}
              />
            ) : (
              load && (
                <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
                  <div
                    className='spinner-border text-primary m-2 text-center'
                    role='status'
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
