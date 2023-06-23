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
  const [loadPrint, setLoadPrint] = useState(false);

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

  async function printCertificate(id) {
    setLoadPrint(true);
    try {
      await CrudProvider.getReportRDLCWithLang(
        `ReportsAPI/PrintPersonCertificate`,
        `pdf`,
        `${id}/${false}`,
        `${t("Certificate")} ${data.nameSurname}`
      );
    } finally {
      setLoadPrint(false);
    }
  }

  const columns = [
    {
      title: t("NumberOfCertificate"),
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
            <i className="text-success ps-1 fas fa-circle-notch" />
          </a>
        ) : (
          <a>
            {t("No")}
            <i className="text-danger ps-1  fas fa-circle-notch" />
          </a>
        );
      },
    },
    {
      title: t("Actions"),
      key: "personId",
      render: (value, record) => {
        return (
          <div className="button-list">
              <Link
              type="button"
                className="btn-secondary btn-sm"
                to={`/editstudent/${record.personInstitutionId}`}
              >
                <i className="fe-edit" />
              </Link>
              <a
              type="button"
                className="btn-sm btn-danger "
                style={{marginLeft:"5px"}}
                onClick={(e) => handleDelete(record.person.personId)}
              >
                <i className="fe-trash-2" />
              </a>
              <a
              type="button"
                className="btn-sm btn-danger "
                style={{marginLeft:"5px"}}
                onClick={(e) => handleDelete(record.person.personId)}
              >
                <i className="fe-trash-2" />
              </a>
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
        }
      }
      setLoad(false);
    });
  }

  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-end">
        <Link
          className="btn btn-info waves-effect waves-light"
          to="/createstudents"
        >
          <span className="btn-label">
            <i className="fe-plus-circle"></i>
          </span>
          {t("Add")}
        </Link>
      </div>
      <div className="p-2 mt-2">
        {!load ? (
          <DataTable
            columns={columns}
            dataSource={data}
            title={t("CandidatesList")}
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
  );
}
