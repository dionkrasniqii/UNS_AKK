import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../provider/CrudProvider";
import CustomSelect from "../custom/CustomSelect";
import img_bus from "../../assets/images/institution.png";
import { toast } from "react-toastify";
import DataTablev2 from "../custom/DataTablev2";

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
      name: t("Name"),
      cell: (row) => {
        return (
          <a
            href={`/decisiondetails/${row.institutionDecisionDetailsId}`}
            target='_blank'
          >
            {row.institutionName}
          </a>
        );
      },
      sortable: true,
      filterable: true,
    },
    {
      name: t("Municipality"),
      selector: (row) => row.municipalityName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Qualification"),
      selector: (row) => row.qualificationName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("DateIssuanceDecision"),
      sortable: true,
      filterable: true,
      cell: (row) =>
        row.decisionDate
          ? new Date(row.decisionDate.split("T")[0]).toLocaleDateString("en-GB")
          : "",
    },
    {
      name: t("DateExpirationDecision"),
      sortable: true,
      filterable: true,
      cell: (row) =>
        row.termDate
          ? new Date(row.termDate.split("T")[0]).toLocaleDateString("en-GB")
          : "",
    },
  ];

  async function checkNullAttributes(model) {
    let count = 0;
    Object.entries(model).forEach((value) => {
      if (value[0] !== "LangId" && value[0] !== "MunicipalityName") {
        value[1] && count++;
      }
    });
    return count > 0 ? false : true;
  }

  async function submitForm() {
    const check = await checkNullAttributes(model);
    setLoad(true);
    if (check) {
      setLoad(false);
      toast.info(t("FillOneOfSearchingFields"));
      return;
    }
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
      setLoad(false);
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
      ...model,
      UniqueNumber: "",
      MunicipalityId: "",
      InstitutionName: "",
      MunicipalityName: "",
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
                  defaultValue={model.MunicipalityName}
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
          <DataTablev2
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
