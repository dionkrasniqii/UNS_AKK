import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import jwtDecode from "jwt-decode";
import DataTable from "../custom/DataTable";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Students() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoad(true);
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
      setLoad(false);
    });
  }, []);
  const columns = [
    {
      title: t("CertificateNumber"),
      dataIndex: "certificateNumber",
      key: (item) => item,
    },
    {
      title: t("Name") + " " + t("Surname"),
      dataIndex: "person",
      key: (item) => item.name,
      render: (item) => item.name + " " + item.surname,
    },
    {
      title: t("Email"),
      dataIndex: "person",
      key: (item) => item.email,
      render: (item) => item.email,
    },
    {
      title: t("GroupName"),
      dataIndex: "institutionGroupDecision",
      key: (item) => item.groupName,
      render: (item) => item.groupName,
    },
    {
      title: t("Graduated"),
      dataIndex: "graduated",
      key: "graduated",
      render: (item) => {
        return item === true ? (
          <a>
            {t("Yes")}
            <i className='text-success ps-1 fas fa-circle-notch' />
          </a>
        ) : (
          <a>
            {t("No")}
            <i className='text-danger ps-1  fas fa-circle-notch' />
          </a>
        );
      },
    },
    {
      title: t("Actions"),
      key: "personInstitutionId",
      render: (value, record) => {
        return (
          <div className='row d-flex justify-content-center'>
            <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xxl-6 mt-2'>
              <Link
                className='btn-secondary btn-sm'
                to={`/editstudent/${record.personInstitutionId}`}
              >
                <i className='fe-edit' />
              </Link>
            </div>
            <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xxl-6 mt-2'>
              <a className="btn-sm btn-danger" onClick={(e) => handleDelete(record.personInstitutionId)}>
                <i className="fe-trash-2" />
              </a>
            </div>
          </div>
        );
      },
    },
  ];

  async function handleDelete(id) {
    setLoad(true);
    await CrudProvider.deleteItemById(
      "PersonAPI/DeletePersonInstitution",
      id
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataDeletedSuccessfully"));
        }
      }
      setLoad(false);
    });
  }

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
          <DataTable
            columns={columns}
            dataSource={data}
            title={"Lista e studenteve"}
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
