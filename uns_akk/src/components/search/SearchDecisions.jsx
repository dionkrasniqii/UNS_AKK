import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../custom/DataTable";
import CrudProvider from "../../provider/CrudProvider";
import CustomSelect from "../custom/CustomSelect";
import img_bus from "../../images/biz-img.png";

export default function SearchDecisions() {
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);
  const [model, setModel] = useState({
    LangId: localStorage.getItem("i18nextLng"),
    MunicipalityId: "",
    UniqueNumber: "",
    NameOfInstitution: "",
  });
  const columns = [];
  async function submitForm() {
    setLoad(true);
    await CrudProvider.createItem(
      "CertificatesAPI/GetCertificates",
      model
    ).then((res) => {
      if (res) {
        switch (res.statusCode) {
          case 200:
            setData(res.result);
            break;
          default:
            break;
        }
        setLoad(false);
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

  function changeCity(e) {
    setModel({
      ...model,
      MunicipalityId: e,
    });
  }

  function clearInputs() {
    setModel({
      PersonalNr: "",
      CertificateNr: "",
      NameSurname: "",
      Keyword: "",
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
                  onChange={(e) =>
                    setModel({
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
                  onChange={(e) =>
                    setModel({
                      NameOfInstitution: e.target.value,
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
                  className='btn btn-soft-secondary waves-effect mt-2'
                  onClick={clearInputs}
                >
                  {t("Clear")}
                </button>
                <button
                  type='button'
                  onClick={submitForm}
                  className='btn btn-soft-primary waves-effect waves-light mt-2'
                >
                  {t("Search")}
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
        <DataTable
          dataSource={data}
          columns={columns}
          title={t("InstitutionsList")}
        />
      </div>
    </div>
  );
}
