import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import { Link } from "react-router-dom";

export default function CertificateDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);
  useEffect(() => {
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
        setLoad(false);
      }
    });
  }, [id]);
  return (
    <div className='content-page-landing content-custom  animation'>
      <div className='content'>
        <div className='container-fluid'>
          <div className='col-xxl-12 d-flex justify-content-center'>
            <div className='col-xxl-4 col-lg-5 col-sm-12'>
              <div className='card '>
                {Object.keys(data).length > 0 && !load ? (
                  <div className='text-center card-body '>
                    <div>
                      <h3 className='title mb-3'>{t("CandidateDetails")}</h3>
                      <hr />
                      <div className='row text-start'>
                        <label className='text-uppercase text-muted font-13'>
                          {t("Name") + " " + t("Surname")}:
                        </label>
                        <span className='ms-2 font-20'>
                       {data.nameSurname}
                        </span>
                        <hr />

                        <label className='text-uppercase text-muted font-13'>
                          {t("Institution")}:
                        </label>
                        <span className='ms-2 font-20'>
                   {data.institution}
                        </span>
                        <hr />

                        <label className='text-uppercase text-muted font-13'>
                          {t("BirthDate")}:
                        </label>

                        <span className='ms-2 font-20'>
                          
                            {new Date(
                              data.dateOfBirth.split("T")[0]
                            ).toLocaleDateString("en-GB")}
                          
                        </span>
                        <hr />

                        <label className='text-uppercase text-muted font-13'>
                          {t("Level Description")}:
                        </label>
                        <span className='ms-2 font-20'>
                          {data.levelDescription}
                        </span>
                        <hr />

                        <label className='text-uppercase text-muted font-13'>
                          {t("QualificationName")}:
                        </label>
                        <span className='ms-2 font-20'>
                          <a
                            href={`/qualificationdetails/${data.qualificationId}/${data.municipalityId}/${data.institutionId}`}
                            target='_blank'
                          >
                            {data.qualificationName}
                          </a>
                        </span>
                        <hr />

                        <label className='text-uppercase text-muted font-13'>
                          {t("ValidFrom")}:
                        </label>
                        <span className='ms-2 font-20'>
                          
                            {data.validFrom
                              ? new Date(
                                  data.validFrom.split("T")[0]
                                ).toLocaleDateString("en-GB")
                              : ""}
                          
                        </span>
                        <hr />

                        <label className='text-uppercase text-muted font-13'>
                          {t("ValidTo")}:
                        </label>
                        <span className='ms-2 font-20'>
                          
                            {data.validTo
                              ? new Date(
                                  data.validTo.split("T")[0]
                                ).toLocaleDateString("en-GB")
                              : t("NoLimit")}
                          
                        </span>
                        <hr />
                      </div>
                      <div className='col-xxl-12 col-lg-12 col-sm-12 text-start'>
                        <Link
                          to='/'
                          className='btn btn-soft-danger waves-effect waves-light float-start'
                        >
                          <span className='btn-label'>
                            <i className='fe-arrow-left'></i>
                          </span>
                          {t("Back")}
                        </Link>
                      </div>
                    </div>
                  </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
