import React, { useEffect, useState } from "react";
import DataTablev2 from "../../custom/DataTablev2";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../../provider/CrudProvider";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Alert, Space } from "antd";
import CreateDecisionModal from "./CreateDecisionModal";
export default function ApplicationsList() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [load, setLoad] = useState(true);
  let columns = [
    {
      name: t("UniqueNumber"),
      sortable: true,
      filterable: true,
      selector: (row) => row.uniqueNumber,
    },
    {
      name: t("InstitutionName"),
      sortable: true,
      filterable: true,
      selector: (row) => row.institutionName,
    },
    {
      name: t("Qualification"),
      sortable: true,
      filterable: true,
      selector: (row) => row.qualification,
    },
    {
      name: t("Municipality"),
      sortable: true,
      filterable: true,
      selector: (row) => row.municipality,
    },

    {
      name: t("ApplicationDate"),
      sortable: true,
      filterable: true,
      selector: (row) =>
        new Date(row.applicationDate.split("T")[0]).toLocaleDateString("en-GB"),
    },
    {
      name: t("Status"),
      sortable: true,
      filterable: true,
      cell: (row) => {
        if (row.step === 3) {
          return (
            <button
              type="button"
              className="btn btn-warning rounded-pill waves-effect"
            >
              Rikthim
            </button>
          );
        } else if (row.step === 5 || row.step === 9) {
          return (
            <span
              type="button"
              className="btn btn-danger rounded-pill waves-effect"
            >
              Refuzuar
            </span>
          );
        } else if (row.step === 8) {
          return (
            <span
              type="button"
              className="btn btn-primary rounded-pill waves-effect"
            >
              Aprovuar
            </span>
          );
        } else {
          return (
            <span
              type="button"
              className="btn btn-success rounded-pill waves-effect"
            >
              Proces
            </span>
          );
        }
      },
    },
    {
      name: t("Actions"),
      sortable: true,
      filterable: true,
      cell: (row) => {
        return (
          <Link
            to={
              decodedToken.role === "Ekspert"
                ? `/expert-review-application/${row.applicationId}/${row.applicationExpertId}`
                : `/view-application/${row.applicationId}`
            }
            className="btn btn-dark waves-effect waves-light"
          >
            <i className="fe-edit" />
          </Link>
        );
      },
    },
  ];

  // columns =
  //  decodedToken?.role === "Zyrtar AKK" || decodedToken?.role === "Admin"?
  //  [...columns, {
  //     name: t("RegisterDecision"),
  //     sortable: true,
  //     filterable: true,
  //     cell: (row, index) => {
  //       switch (row.step) {
  //         case 8:
  //           return (
  //             <CreateDecisionModal
  //               applicationId={row.applicationId}
  //               institutionName={row.institutionName}
  //             />
  //           );
  //         default:
  //           return (
  //             <span className='text-danger'>
  //               {t("ApplicationNotApprovedYet")}
  //             </span>
  //           );
  //       }
  //     },
  //   },]
  //: columns

  const statusToSearch =
    decodedToken &&
    (() => {
      switch (decodedToken.role) {
        case "Zyrtar AKK":
          return "1";
        case "Bord":
          return "2";
        case "Zyrtar per caktimin e eksperteve":
          return "4";
        case "Ekspert":
          return "6";
        case "Admin":
          return "0";
        default:
          return null;
      }
    })();

  const fetchData = async () => {
    try {
      if (statusToSearch) {
        if (decodedToken.role === "Ekspert") {
          const res = await CrudProvider.getItemByIdLang(
            "ApplicationAPI/GetApplicationByExpert",
            decodedToken?.UserId
          );

          if (res.statusCode === 200) {
            setData(res.result);
            setLoad(false);
          }
        } else {
          const res = await CrudProvider.getItemByIdLang(
            "ApplicationAPI/GetAppByStatus",
            statusToSearch
          );

          if (res.statusCode === 200) {
            setData(res.result);
            setLoad(false);
          }
        }
      }
    } catch (error) {
      setLoad(false);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusToSearch]);

  return load ? (
    <div className="col-xxl-12 col-lg-12 col-sm-12 text-center">
      <div
        className="spinner-border text-primary m-2 text-center"
        role="status"
      />
    </div>
  ) : data.length > 0 ? (
    <DataTablev2
      dataSource={data}
      columns={columns}
      title={t("ApplicationList")}
    />
  ) : (
    <div className="card card-body">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Alert message={t("NoNewApplications")} type="info" />
      </Space>
    </div>
  );
}
