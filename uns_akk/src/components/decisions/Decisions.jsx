import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import DataTable from "../custom/DataTable";
import { Link } from "react-router-dom";

export default function Decisions() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoad(true);
    CrudProvider.getAllWithLang("InstitutionDesicionAPI/GetAll").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setData(res.result.value);
        }
      }
      setLoad(false);
    });
  }, []);

  const columns = [
    {
      title: t("UniqueNumber"),
      dataIndex: ["institution"],
      key: (item) => item.uniqueNumber,
      responsive: ["sm"],
      render: (item) => item.uniqueNumber,
    },
    {
      title: t("InstitutionName"),
      dataIndex: ["institution"],
      key: (item) => item.institutionName,
      responsive: ["sm"],
      render: (item) => item.institutionName,
    },
    {
      title: t("Municipality"),
      dataIndex: ["municipalityName"],
      key: (item) => item,
      responsive: ["sm"],
    },
    {
      title: t("Qualification"),
      dataIndex: ["qualificationName"],
      key: (item) => item,
      responsive: ["sm"],
    },
    {
      title: "Aktiv",
      dataIndex: ["aktiv"],
      key: (item) => item,
      responsive: ["sm"],
      render: (item) => {
        if (item === true) {
          return (
            <a>
              Aktiv
              <i className='text-success ps-1 fas fa-circle-notch' />
            </a>
          );
        } else {
          return (
            <a>
              Pasiv
              <i className='text-danger ps-1  fas fa-circle-notch' />
            </a>
          );
        }
      },
    },
    {
      title: t("Actions"),
      key: (item, index) => index,
      responsive: ["sm"],
      width: "20%",
      render: (value, record) => {
        return (
          <Link
            to={`/editdecisions/${record.institutionDecisionDetailsId}`}
            className='btn btn-info btn-sm rounded-pill waves-effect waves-light'
          >
            <span className='btn-label'>
              <i className='mdi mdi-alert-circle-outline' />
            </span>
            Shiko vendimin
          </Link>
        );
      },
    },
  ];
  return (
    <div className='row'>
      <div className='col-12 d-flex justify-content-end'>
        <Link
          className='btn btn-info waves-effect waves-light'
          to='/createdecisions'
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
            title={t("ListOfAllDecisions")}
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
