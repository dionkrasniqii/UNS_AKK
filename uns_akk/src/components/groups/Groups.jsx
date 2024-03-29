import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DataTablev2 from "../custom/DataTablev2";

export default function Groups() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const langId = localStorage.getItem("i18nextLng");
  const columns = [
    {
      name: t("GroupName"),
      selector: (row) => row.groupName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Municipality"),
      selector: (row) => row.municipalityNameQualification,
      sortable: true,
      filterable: true,
    },
    {
      name: t("StartDate"),
      selector: (row) =>
        new Date(row.startDate.split("T")[0]).toLocaleDateString("en-GB"),
      sortable: true,
      filterable: true,
    },
    {
      name: t("EndDate"),
      selector: (row) =>
        new Date(row.endDate.split("T")[0]).toLocaleDateString("en-GB"),
      sortable: true,
      filterable: true,
    },
    {
      name: t("Actions"),
      cell: (record) => {
        return (
          <button
            className='btn-danger btn-sm'
            onClick={(e) => deleteGroup(record.institutionGroupDecisionId)}
          >
            <i className='dripicons-trash' />
          </button>
        );
      },
    },
  ];
  async function deleteGroup(id) {
    await CrudProvider.deleteItemById(
      "InstitutionGroupDecisionAPI/DeleteGroup",
      id
    ).then((res) => {
      if (res) {
        switch (res.statusCode) {
          case 200:
            toast.success(t("DataDeletedSuccessfully"));
            getAllData();
            break;
          case 409:
            toast.error("Cant delete group because it have students");
            break;
          default:
            toast.error(res.errorMessages[0]);
            break;
        }
      }
    });
  }
  async function getAllData() {
    setLoad(true);
    await CrudProvider.getItemById(
      "InstitutionGroupDecisionAPI/GetAll",
      decodedToken.groupsid
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setData(res.result);
        }
        setLoad(false);
      }
    });
  }
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className='row'>
      <div className='col-12 d-flex justify-content-end'>
        <Link
          className='btn btn-info waves-effect waves-light'
          to='/creategroup'
        >
          <span className='btn-label'>
            <i className='fe-plus-circle'></i>
          </span>
          {t("Add")}
        </Link>
      </div>
      <div className='p-2 mt-2'>
        {!load ? (
          <DataTablev2
            columns={columns}
            dataSource={data}
            title={t("GroupList")}
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
  );
}
