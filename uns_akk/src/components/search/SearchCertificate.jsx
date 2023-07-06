import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../custom/DataTable";
import CrudProvider from "../../provider/CrudProvider";
import img_certification from "../../assets/images/certificate.png";
import { toast } from "react-toastify";
import DataTablev2 from "../custom/DataTablev2";

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
      name: t("NumberOfCertificate"),
      cell: (row) => {
        return (
          <a href={`certificationdetails/${row.certificateNr}`} target='_blank'>
            {row.certificateNr}
          </a>
        );
      },
      sortable: true,
      filterable: true,
    },
    {
      name: t("Level Description"),
      selector: (row) => row.levelDescription,
      sortable: true,
      filterable: true,
    },
    {
      name: t("QualificationName"),
      selector: (row) => row.qualificationName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("ValidFrom"),
      sortable: true,
      filterable: true,
      cell: (row) =>
        row.validFrom
          ? new Date(row.validFrom.split("T")[0]).toLocaleDateString("en-GB")
          : "",
    },
    {
      name: t("ValidTo"),
      sortable: true,
      filterable: true,
      cell: (row) =>
        row.validFrom
          ? new Date(row.validTo.split("T")[0]).toLocaleDateString("en-GB")
          : "",
    },
  ];
  async function checkNullAttributes(model) {
    let count = 0;
    Object.keys(model).forEach((key) => {
      if (key !== "LangId") {
        model[key] && count++;
      }
    });
    return count > 0 ? false : true;
  }

  async function submitForm() {
    try {
      setLoad(true);
      const check = await checkNullAttributes(model);
      if (check) {
        toast.info(t("FillOneOfSearchingFields"));
        return;
      }
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
        }
      });
    } finally {
      setLoad(false);
    }
  }

  function clearInputs() {
    setModel({
      ...model,
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

      <div className='col-12'>
        <hr />
        {!load ? (
          <DataTablev2
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
