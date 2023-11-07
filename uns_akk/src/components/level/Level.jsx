import React, { useEffect, useState } from "react";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DataTablev2 from "../custom/DataTablev2";

export default function Level() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("i18nextLng")
  );
  const columns = [
    {
      name: t("Level Description"),
      selector: (row) => row.levelKKKDescription,
      sortable: true,
      filterable: true,
      width: "380px",
    },
    {
      name: t("Type"),
      selector: (row) => row.type,
      sortable: true,
      filterable: true,
      width: "80px",
    },
    {
      name: t("Detailed Description"),
      selector: (row) => row.detailedDescription,
      width: "980px",
      sortable: true,
      filterable: true,
    },
    {
      name: t("Actions"),
      width: "150px",

      cell: (record) => {
        return (
          <div className="button-list">
            <Link
              className="btn btn-secondary btn-sm"
              to={`/editlevel/${record.levelKKKId}`}
            >
              <i className="fe-edit" />
            </Link>
            <a
              className="btn btn-sm btn-danger"
              onClick={(e) => handleDelete(record.levelKKKId)}
            >
              <i className="fe-trash-2" />
            </a>
          </div>
        );
      },
    },
  ];
  async function getData() {
    setLoad(true);
    CrudProvider.getAllWithLang("LevelAPI/GetAll").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setData(res.result);
        } else if (res.statusCode === 400) {
          toast.error("Probleme ne server");
        }
      }
      setLoad(false);
    });
  }

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [selectedLang]);

  async function handleDelete(id) {
    setLoad(true);
    await CrudProvider.deleteItemById("LevelAPI/DeleteLevel", id).then(
      (res) => {
        if (res) {
          if (res.statusCode === 200) {
            toast.success(t("DataDeletedSuccessfully"));
            CrudProvider.getAllWithLang("LevelAPI/GetAll").then((res) => {
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
      }
    );
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
                  to="/createlevel"
                >
                  <span className="btn-label">
                    <i className="fe-plus-circle"></i>
                  </span>
                  {t("AddLevel")}
                </Link>
              </div>
            </div>
          </div>
          <div className="p-2 mt-2">
            {!load ? (
              <DataTablev2
                columns={columns}
                dataSource={data}
                title={t("LevelList")}
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
