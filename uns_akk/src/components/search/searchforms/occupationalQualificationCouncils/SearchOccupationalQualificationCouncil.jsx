import React, { useState } from "react";
import CustomSelect from "../../../custom/CustomSelect";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../../../provider/CrudProvider";
import DataTablev2 from "../../../custom/DataTablev2";

export default function SearchOccupationalQualificationCouncil() {
  const { t } = useTranslation();
  const [model, setModel] = useState({});
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const langId = localStorage.getItem("i18nextLng");
  const statuses = [
    { value: 1, label: "Aktiv" },
    { value: 2, label: "Ish-Këshilli Profesional" },
  ];
  const columns = [
    {
      name: t("Name"),
      cell: (row) => {
        return (
          // <a href={`/council-details/${row.id}`} target="_blank">
          <a>
            {langId == 1 ? row.nameSQ : langId == 2 ? row.nameEN : row.nameSR}
          </a>
        );
      },
      sortable: true,
      filterable: true,
    },
    {
      name: "Data fillimit",
      selector: (row) => new Date(row.startDate).toLocaleDateString("en-GB"),
      sortable: true,
      filterable: true,
    },
    {
      name: "Data mbarimit",
      selector: (row) => new Date(row.endDate).toLocaleDateString("en-GB"),
      sortable: true,
      filterable: true,
    },
    {
      name: "Statusi",
      selector: (row) =>
        row.status == 1 ? "Aktiv" : "Ish-Këshilli Profesional",
      sortable: true,
      filterable: true,
    },
  ];
  async function searchData() {
    setLoad(true);
    CrudProvider.createItem("CouncilsAPI/GetAll", model).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setData(res.result);
          setLoad(false);
        }
      }
    });
  }

  function changeStatus(e) {
    setModel((prev) => ({
      ...prev,
      Status: e,
    }));
  }

  function clearInputs() {
    window.location.reload();
  }
  return (
    <div className="container mt-5 bg-light-subtle ">
      <div className="card ">
        <div className="card-body">
          <div className="row">
            <div className="col-xxl-4 col-lg-5 col-sm-12">
              <label>Emri në anglisht</label>
              <input
                autoComplete="off"
                type="text"
                className="form-control"
                onChange={(e) =>
                  setModel((prev) => ({
                    ...prev,
                    Name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-xxl-4 col-lg-3 col-sm-12">
              <label>Status</label>
              <CustomSelect
                optionsList={statuses}
                onChangeFunction={changeStatus}
              />
            </div>
            <div className="col-xxl-12 col-lg-12 col-sm-12 text-end animation">
              <div className="button-list text-end">
                <button
                  type="button"
                  className="btn btn-soft-primary waves-effect waves-light mt-2"
                  onClick={searchData}
                >
                  {t("Search")}
                </button>
                <button
                  type="button"
                  className="btn btn-soft-secondary waves-effect mt-2"
                  onClick={clearInputs}
                >
                  {t("Clear")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!load ? (
        <div className="flip-card-animation">
          <DataTablev2
            dataSource={data}
            title={"Lista e keshillave"}
            columns={columns}
          />
        </div>
      ) : (
        <div className="card card-body">
          <div className="col-xxl-12 col-lg-12 col-sm-12 text-center">
            <div
              className="spinner-border text-primary m-2 text-center"
              role="status"
            />
          </div>
        </div>
      )}
    </div>
  );
}
