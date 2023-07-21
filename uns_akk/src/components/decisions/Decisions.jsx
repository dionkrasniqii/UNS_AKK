import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import { Link } from "react-router-dom";
import DataTablev2 from "../custom/DataTablev2";

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
      name: t("UniqueNumber"),
      selector: (item) => item.institution.uniqueNumber,
      sortable: true,
      filterable: true,
    },
    {
      name: t("InstitutionName"),
      selector: (item) => item.institution.institutionName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Municipality"),
      selector: (item) => item.municipalityName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Qualification"),
      selector: (item) => item.qualificationName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Active"),
      cell: (item) => {
        if (item.aktiv === true) {
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
      sortable: true,
      filterable: true,
    },
    {
      name: t("Actions"),
      cell: (record) => {
        return (
          <Link
            to={`/editdecisions/${record.institutionDecisionDetailsId}`}
            className='btn btn-info btn-sm rounded-pill waves-effect waves-light'
          >
            <i className='mdi mdi-alert-circle-outline pe-1' />
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
          <DataTablev2
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
