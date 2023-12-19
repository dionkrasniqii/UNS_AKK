import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import CrudProvider from "../../../../provider/CrudProvider";

export default function CertificateDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);
  const [loadPrint, setLoadPrint] = useState(false);
  useEffect(() => {
    try {
      setLoad(true);
      CrudProvider.getItemByIdLang(
        "CertificatesAPI/GetCertificateDetail",
        id
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
  }, [id]);
  // async function printCertificate() {
  //   setLoadPrint(true);
  //   try {
  //     await CrudProvider.getReportRDLCWithLang(
  //       `ReportsAPI/PrintPersonCertificate`,
  //       `pdf`,
  //       `${id}/${false}`,
  //       `${t("Certificate")} ${data.nameSurname}`
  //     );
  //   } finally {
  //     setLoadPrint(false);
  //   }
  // }
  return (
    <div className="content-page-landing animation">
      <div className="content">
        <div className="container d-flex justify-content-center">
          <div className="col-xxl-6">
            <div className="card">
              {Object.keys(data).length > 0 && !load ? (
                <div className="text-center card-body ">
                  <div>
                    <h3 className="title mb-3">{t("CandidateDetails")}</h3>
                    <hr />
                    <div className="row text-start">
                      {/* {data.canPrintCertificate && (
                          <>
                            <span className='ms-2 mb-2 font-20'>
                              {!loadPrint ? (
                                <button
                                  type='button'
                                  onClick={printCertificate}
                                  className='btn btn-dark waves-effect waves-light'
                                >
                                  <i itemType='button' className='fe-printer' />
                                  Print
                                </button>
                              ) : (
                                <div
                                  className='spinner-border text-dark m-2'
                                  role='status'
                                />
                              )}
                            </span>
                            <hr />
                          </>
                        )} */}

                      <label className="text-uppercase text-muted font-13">
                        {t("Name") + " " + t("Surname")}:
                      </label>
                      <span className="ms-2 font-20">{data.nameSurname}</span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("Institution")}:
                      </label>
                      <span
                        className="ms-2 font-20"
                        href={`/institutiondetails/${data.institution.institutionId}`}
                        target="_blank"
                      >
                        <a
                          href={`/institutiondetails/${data.institutionId}`}
                          target="_blank"
                        >
                          {data.institution}
                        </a>
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("BirthDate")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.dateOfBirth &&
                          new Date(
                            data.dateOfBirth.split("T")[0]
                          ).toLocaleDateString("en-GB")}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("Level Description")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.levelDescription}
                      </span>
                      <hr />
                      <label className="text-uppercase text-muted font-13">
                        {t("QualificationName")}:
                      </label>
                      <span className="ms-2 font-20">
                        <a
                          href={`/qualificationdetails/${data.qualificationId}`}
                          target="_blank"
                        >
                          {data.qualificationName}
                        </a>
                      </span>
                      <hr />
                      {data.qualificationChilds.length > 0 && (
                        <>
                          <label className="text-uppercase text-muted font-13">
                            {t("SubQualifications")}:
                          </label>
                          <span className=" font-20">
                            {data.qualificationChilds.map((obj, index) => {
                              return (
                                obj.qualificationChildName && (
                                  <span className="ms-2 font-20 " key={index}>
                                    {obj.qualificationChildName}
                                    <br />
                                  </span>
                                )
                              );
                            })}
                          </span>
                          <hr />
                        </>
                      )}
                      <label className="text-uppercase text-muted font-13">
                        {t("ValidFrom")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.validFrom && data.validFrom
                          ? new Date(
                              data.validFrom.split("T")[0]
                            ).toLocaleDateString("en-GB")
                          : ""}
                      </span>
                      <hr />
                      {/* <label className="text-uppercase text-muted font-13">
                        {t("ValidTo")}:
                      </label>
                      <span className="ms-2 font-20">
                        {data.validTo && data.validTo
                          ? new Date(
                              data.validTo.split("T")[0]
                            ).toLocaleDateString("en-GB")
                          : t("NoLimit")}
                      </span>
                      <hr /> */}
                    </div>
                    <div className="col-xxl-12 col-lg-12 col-sm-12 text-start">
                      <Link
                        to="/"
                        className="btn btn-soft-danger waves-effect waves-light float-start"
                      >
                        <span className="btn-label">
                          <i className="fe-arrow-left"></i>
                        </span>
                        {t("Back")}
                      </Link>
                    </div>
                  </div>
                </div>
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
    </div>
  );
}
