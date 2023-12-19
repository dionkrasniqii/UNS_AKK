import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DataTablev2 from "../custom/DataTablev2";

export default function Students() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [data, setData] = useState([]);
  const [loadPrint, setLoadPrint] = useState("");

  useEffect(() => {
    try {
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
      });
    } finally {
      setLoad(false);
    }
  }, []);

  async function printCertificate(id) {
    setLoadPrint(id);
    try {
      await CrudProvider.getReportRDLCWithLang(
        `ReportsAPI/PrintPersonCertificate`,
        `pdf`,
        `${id}/${true}`,
        `${t("Certificate")} ${data.nameSurname}`
      );
    } finally {
      setLoadPrint("");
    }
  }
  const columns = [
    {
      name: t("NumberOfCertificate"),
      selector: (row) => row.certificateNumber,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Name") + " " + t("Surname"),
      selector: (row) => row.person.name + " " + row.person.surname,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Email"),
      selector: (row) => row.person.email,
      sortable: true,
      filterable: true,
    },
    {
      name: t("GroupName"),
      selector: (row) => row.institutionGroupDecision.groupName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Graduated"),
      cell: (row) => {
        return row.graduated === true ? (
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
      name: t("Actions"),
      width: "200px",
      cell: (record) => {
        return (
          <div className="button-list">
            <Link
              type="button"
              className="btn btn-secondary btn-sm"
              to={`/editstudent/${record.personInstitutionId}`}
            >
              <i className="fe-edit" />
            </Link>
            {!record.graduated && (
              <a
                type="button"
                className="btn btn-sm btn-danger "
                style={{ marginLeft: "5px" }}
                onClick={(e) => handleDelete(record.person.personId)}
              >
                <i className="fe-trash-2" />
              </a>
            )}

            {loadPrint !== record.certificateNumber ? (
              <button
                style={{ marginLeft: "5px" }}
                onClick={(e) => printCertificate(record.certificateNumber)}
                className="btn btn-sm btn-dark waves-effect waves-light "
              >
                <i itemType="button" className="fe-printer" />
              </button>
            ) : (
              <div className="spinner-border text-dark m-2" role="status" />
            )}
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
          <DataTablev2
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
