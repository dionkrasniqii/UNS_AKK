import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import DataTablev2 from "../custom/DataTablev2";

export default function InstitutionUser() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const columns = [
    {
      name: t("Name"),
      selector: (row) => row.name,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Surname"),
      selector: (row) => row.surname,
      sortable: true,
      filterable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      filterable: true,
    },
    {
      name: t("PersonalNr"),
      selector: (row) => row.personalNumber,
      sortable: true,
      filterable: true,
    },
    {
      name: t("PhoneNumber"),
      selector: (row) => row.phoneNumber,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Role"),
      selector: (row) =>
        row.role.length > 1 ? row.role.join(" , ") : `${row.role} `,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Active"),
      selector: (row) => row.active,
      sortable: true,
      filterable: true,
      cell: (row) => {
        if (row.active === true) {
          return (
            <a>
              {t("Active")}
              <i className='text-success ps-1 fas fa-circle-notch' />
            </a>
          );
        } else {
          return (
            <a>
              {t("Inactive")}
              <i className='text-danger ps-1  fas fa-circle-notch' />
            </a>
          );
        }
      },
    },
    {
      name: t("Actions"),
      key: "userId",
      className: "col-12 col-sm-4 col-md-2 col-lg-2 text-center",
      cell: (row) => {
        return (
          <div className='button-list'>
            {(row.role.includes("Zyrtar") || row.role.includes("KAAPR")) && (
              <Link
                type='button'
                className='btn-secondary btn-sm'
                to={`/editinstitutionuser/${row.userId}`}
              >
                <i className='fe-edit' />
              </Link>
            )}
            <a
              type='button'
              className='btn-sm btn-danger'
              style={{ marginLeft: "10px" }}
              onClick={(e) => handleDelete(row.userId)}
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
    CrudProvider.getItemById(
      "InstitutionUserAPI/GetAll",
      decodedToken.UserId
    ).then((res) => {
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
      "InstitutionUserAPI/DeleteInstitutionUser",
      id
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataDeletedSuccessfully"));
          CrudProvider.getItemById(
            "InstitutionUserAPI/GetAll",
            decodedToken.UserId
          ).then((res) => {
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
                  to='/createinstitutionuser'
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
                title={t("UserList")}
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
