import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../custom/DataTable";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

export default function InstitutionUser() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);

  const columns = [
    {
      title: t("Name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("Surname"),
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("PersonalNr"),
      dataIndex: "personalNumber",
      key: "personalNumber",
    },
    {
      title: t("PhoneNumber"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: t("Role"),
      dataIndex: "role",
      key: "role",
    },
    {
      title: t("Active"),
      dataIndex: "active",
      key: "active",
      responsive: ["sm"],
      render: (item) => {
        if (item === true) {
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
      title: t("Actions"),
      key: "userId",
      className: "col-12 col-sm-4 col-md-2 col-lg-2 text-center",
      render: (value, record) => {
        return (
          <div className="button-list">
            <Link
              type="button"
              className="btn-secondary btn-sm"
              to={`/editinstitutionuser/${record.userId}`}
            >
              <i className="fe-edit" />
            </Link>
            <a
              type="button"
              className="btn-sm btn-danger"
              style={{ marginLeft: "10px" }}
              onClick={(e) => handleDelete(record.userId)}
            >
              <i className="fe-trash-2" />
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
      decodedToken.groupsid
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
            decodedToken.groupsid
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
    <div className="col-xxl-12">
      <div className="col-xxl-12 text-end"></div>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <div className="col-12 d-flex justify-content-end">
                <Link
                  className="btn btn-info waves-effect waves-light"
                  to="/createinstitutionuser"
                >
                  <span className="btn-label">
                    <i className="fe-plus-circle"></i>
                  </span>
                  {t("Add")}
                </Link>
              </div>
            </div>
          </div>
          <div className="p-2 mt-2">
            {!load ? (
              <DataTable
                columns={columns}
                dataSource={data}
                title={t("InstitutionUserList")}
              />
            ) : (
              <div className="col-xxl-12 col-lg-12 col-sm-12 text-center">
                <div
                  className="spinner-border text-primary m-2 text-center"
                  role="status"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
