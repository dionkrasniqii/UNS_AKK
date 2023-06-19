import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../custom/DataTable";
import CrudProvider from "../../provider/CrudProvider";
import img_certification from "../../images/certification-img.png";

export default function SearchCertificate() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [model, setModel] = useState({
    LangId: localStorage.getItem("i18nextLng"),
    PersonalNr: "",
    CertificateNr: "",
    NameSurname: "",
    Keyword: "",
  });

  const columns = [
    {
      title: t("NumberOfCertificate"),
      key: "certificateNr",
      dataIndex: "certificateNr",
      responsive: ["sm"],
      render: (item) => {
        return (
          <a href={`certificationdetails/${item}`} target='_blank'>
            {item}
          </a>
        );
      },
    },
    {
      title: t("Level Description"),
      dataIndex: "levelDescription",
      key: "levelDescription",
      responsive: ["sm"],
    },
    {
      title: t("QualificationName"),
      dataIndex: "qualificationName",
      key: "qualificationName",
      responsive: ["sm"],
    },
    {
      title: t("ValidFrom"),
      dataIndex: "validFrom",
      key: "validFrom",
      responsive: ["sm"],
      render: (item) =>
        item ? new Date(item.split("T")[0]).toLocaleDateString("en-GB") : "",
    },
    {
      title: t("ValidTo"),
      dataIndex: "validTo",
      key: "validTo",
      responsive: ["sm"],
      render: (item) =>
        item
          ? new Date(item.split("T")[0]).toLocaleDateString("en-GB")
          : t("NoLimit"),
    },
  ];
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
            setLoad(false);
            break;
          default:
            setLoad(false);
            break;
        }
      }
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
    <div className='row d-flex'>
      <div className='row align-items-center'>
        <div className='col-xxl-6 col-lg-6 text-start order-sm-2 order-lg-2 order-xl-2 order-xxl-2'>
          <img className='w-100 ' src={img_certification} loading='lazy' />
        </div>
        <div className='col-xxl-6 col-lg-6 text-start order-sm-1 order-lg-1 order-xl-1 order-xxl-1'>
          <div className='col-xxl-12'>
            <div className='row'>
              <label
                id='certificate'
                className='col-md-4 col-form-label text-md-end text-start-sm mb-2'
              >
                {t("NumberOfCertificate")}:
              </label>
              <div className='col-md-8'>
                <input
                  type='text'
                  className='form-control'
                  value={model.CertificateNr || ""}
                  onChange={(e) =>
                    setModel({
                      ...model,
                      LangId: localStorage.getItem("i18nextLng"),
                      CertificateNr: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className='col-xxl-12'>
            <div className='row'>
              <label
                id='fullname'
                className='col-md-4 col-form-label text-md-end text-start-sm mb-2'
              >
                {t("Name")} {t("Surname")}:
              </label>
              <div className='col-md-8'>
                <input
                  type='text'
                  value={model.NameSurname || ""}
                  className='form-control'
                  onChange={(e) =>
                    setModel({
                      ...model,
                      LangId: localStorage.getItem("i18nextLng"),
                      NameSurname: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className='col-xxl-12'>
            <div className='row'>
              <label
                id='personalNr'
                className='col-md-4 col-form-label text-md-end text-start-sm mb-2'
              >
                {t("PersonalNr")}:
              </label>
              <div className='col-md-8'>
                <input
                  type='text'
                  value={model.PersonalNr || ""}
                  className='form-control'
                  onChange={(e) =>
                    setModel({
                      ...model,
                      LangId: localStorage.getItem("i18nextLng"),
                      PersonalNr: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className='col-xxl-12'>
            <div className='row'>
              <label
                id='keyword'
                className='col-md-4 col-form-label text-md-end text-start-sm mb-2'
              >
                {t("Keyword")}:
              </label>
              <div className='col-md-8'>
                <input
                  type='text'
                  value={model.Keyword || ""}
                  className='form-control'
                  onChange={(e) =>
                    setModel({
                      ...model,
                      LangId: localStorage.getItem("i18nextLng"),
                      Keyword: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          {!load ? (
            <div className='button-list text-end'>
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
              <div className='spinner-border text-primary m-2' role='status' />
            </div>
          )}
        </div>
      </div>

      <div className='col-xxl-12'>
        <hr />
        {!load ? (
          <DataTable
            dataSource={data}
            columns={columns}
            title={t("ListOfCandidate")}
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
