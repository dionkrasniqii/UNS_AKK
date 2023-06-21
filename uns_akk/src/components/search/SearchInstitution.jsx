import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../custom/DataTable";
import CrudProvider from "../../provider/CrudProvider";
import CustomSelect from "../custom/CustomSelect";
import img_bus from "../../images/biz-img.png";

export default function SearchInstitution() {
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);
  const [model, setModel] = useState({
    LangId: localStorage.getItem("i18nextLng"),
    MunicipalityId: "",
    MunicipalityName: "",
    UniqueNumber: "",
    InstitutionName: "",
  });
  const columns = [
    {
      title: t("Name"),
      key: "institutionName",
      dataIndex: "institutionName",
      responsive: ["sm"],
      render: (item, record) => {
        console.log(record);
        return (
          <a
            href={`/decisiondetails/${record.institutionDecisionDetailsId}`}
            target='_blank'
          >
            {item}
          </a>
        );
      },
    },
    {
      title: t("Municipality"),
      dataIndex: "municipalityName",
      key: "municipalityName",
      responsive: ["sm"],
    },
    {
      title: t("Qualification"),
      dataIndex: "qualificationName",
      key: "qualificationName",
      responsive: ["sm"],
    },
    {
      title: t("DateIssuanceDecision"),
      dataIndex: "decisionDate",
      key: "decisionDate",
      responsive: ["sm"],
      render: (item) =>
        item ? new Date(item.split("T")[0]).toLocaleDateString("en-GB") : "",
    },
    {
      title: t("DateExpirationDecision"),
      dataIndex: "termDate",
      key: "termDate",
      responsive: ["sm"],
      render: (item) =>
        item ? new Date(item.split("T")[0]).toLocaleDateString("en-GB") : "",
    },
  ];
  async function submitForm() {
    console.log(model);

    setLoad(true);
    await CrudProvider.createItem(
      "InstitutionAPI/GetInstitutionDecision",
      model
    ).then((res) => {
      if (res) {
        switch (res.statusCode) {
          case 200:
            setData(res.result);
            setLoad(false);
            break;
          default:
            setLoad(false);
            break;
        }
      }
    });
  }
  useEffect(() => {
    setLoad(true);
    CrudProvider.getAllWithLang("GeneralAPI/GetAllMunicipalities").then(
      (res) => {
        if (res) {
          switch (res.statusCode) {
            case 200:
              setCities(res.result);
              break;
            default:
              break;
          }
        }
        setLoad(false);
      }
    );
  }, []);

  const citiesList =
    cities &&
    cities.length > 0 &&
    cities
      .map((obj) => {
        return {
          value: obj.municipality.municipalityId,
          label: obj.municipalityName,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

  function changeCity(e, record) {
    setModel({
      ...model,
      LangId: localStorage.getItem("i18nextLng"),
      MunicipalityId: e,
      MunicipalityName: record?.label ? record.label : "",
    });
  }

  function clearInputs() {
    setModel({
      UniqueNumber: "",
      MunicipalityId: "",
      InstitutionName: "",
    });
    setData([]);
  }
  return (
    <div className='row '>
      <div className='row align-items-center'>
        <div className='col-lg-6 '>
          <img className='w-100' src={img_bus} loading='lazy' />
        </div>
        <div className='col-lg-6'>
          <div className='col-xxl-12'>
            <div className='row justify-content-end'>
              <label className='col-md-4 col-form-label text-md-end text-start-sm mb-2'>
                {t("UniqueNumber")}:
              </label>
              <div className='col-md-8'>
                <input
                  type='text'
                  className='form-control'
                  value={model.UniqueNumber || ""}
                  onChange={(e) =>
                    setModel({
                      ...model,
                      LangId: localStorage.getItem("i18nextLng"),
                      UniqueNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className='col-xxl-12'>
            <div className='row justify-content-end'>
              <label className='col-md-4 col-form-label text-md-end text-start-sm mb-2'>
                {t("NameOfInstitution")}:
              </label>
              <div className='col-md-8'>
                <input
                  type='text'
                  className='form-control'
                  value={model.InstitutionName || ""}
                  onChange={(e) =>
                    setModel({
                      ...model,
                      LangId: localStorage.getItem("i18nextLng"),
                      InstitutionName: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className='col-xxl-12'>
            <div className='row justify-content-end'>
              <label className='col-md-4 col-form-label text-md-end text-start-sm mb-2  labelForSearch'>
                {t("Municipality")}:
              </label>
              <div className='col-md-8'>
                <CustomSelect
                  optionsList={citiesList}
                  hasDefaultValue={true}
                  defaultValue={
                    model.MunicipalityName ? model.MunicipalityName : ""
                  }
                  onChangeFunction={changeCity}
                  isMulti={false}
                />
              </div>
            </div>
          </div>
          <div className='col-xxl-12 col-lg-12 text-end d-flex justify-content-end'>
            {!load ? (
              <div className='button-list'>
                <button
                  type='button'
                  onClick={submitForm}
                  className='btn btn-soft-primary waves-effect waves-light mt-2'
                >
                  {t("Search")}
                </button>
                <button
                  type='button'
                  className='btn btn-soft-secondary waves-effect mt-2'
                  onClick={clearInputs}
                >
                  {t("Clear")}
                </button>
              </div>
            ) : (
              <div className='col-xxl-12 col-lg-12 col-sm-12 text-end'>
                <div
                  className='spinner-border text-primary m-2'
                  role='status'
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='col-xxl-12'>
        <hr />
        {!load ? (
          <DataTable
            dataSource={data}
            columns={columns}
            title={t("InstitutionsList")}
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
