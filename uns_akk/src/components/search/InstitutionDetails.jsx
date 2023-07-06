import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import { Link } from "react-router-dom";

export default function InstitutionDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    setLoad(true);
    CrudProvider.getItemById("InstitutionAPI/GetInstitution", id).then(
      (res) => {
        if (res) {
          switch (res.statusCode) {
            case 200:
              setData(res.result);
              break;
            default:
              navigate("/");
              break;
          }
          setLoad(false);
        }
      }
    );
  }, [id]);

  return (
    <div className='content-page-landing animation'>
      <div className='content'>
        <div className='container d-flex justify-content-center'>
          <div className='col-xxl-6'>
            <div className='card '>
              {Object.keys(data).length > 0 && !load ? (
                <>
                  <div className='card-header bg-white'>
                    <img
                      className='card-img-top img-fluid mt-2'
                      src={CrudProvider.documentPath(data.path)}
                    />
                  </div>
                  <div className='text-center card-body '>
                    <div>
                      {/* <h3 className='title mb-3'>{t("Institution")}</h3> */}
                      <hr />
                      <div className='row text-start'>
                        <label className='text-uppercase text-muted font-13'>
                          {t("UniqueNumber")}:
                        </label>
                        <span className='ms-2 font-20'>
                          {data.uniqueNumber}
                        </span>
                        <hr />
                        <label className='text-uppercase text-muted font-13'>
                          {t("InstitutionName")}:
                        </label>
                        <span className='ms-2 font-20'>
                          {data.institutionName}
                        </span>
                        <hr />
                        <label className='text-uppercase text-muted font-13'>
                          {t("Municipality")}:
                        </label>
                        <span className='ms-2 font-20'>
                          {data.municipalityName}
                        </span>
                        <hr />
                        <label className='text-uppercase text-muted font-13'>
                          {t("Email")}:
                        </label>
                        <span className='ms-2 font-20'>{data.email}</span>
                        <hr />
                        <label className='text-uppercase text-muted font-13'>
                          {t("PhoneNumber")}:
                        </label>
                        <span className='ms-2 font-20'>{data.phoneNum}</span>
                        <hr />
                        <label className='text-uppercase text-muted font-13'>
                          {t("PostalCode")}:
                        </label>
                        <span className='ms-2 font-20'>{data.postalCode}</span>
                        <hr />
                        {data.web && (
                          <>
                            <label className='text-uppercase text-muted font-13'>
                              {t("Web")}:
                            </label>
                            <span className='ms-2 font-20'>
                              <Link
                                to={
                                  data.web.startsWith("http://") ||
                                  data.web.startsWith("https://")
                                    ? data.web
                                    : `http://${data.web}`
                                }
                                target='_blank'
                              >
                                {data.web}
                              </Link>
                            </span>
                            <hr />
                          </>
                        )}
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
                </>
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
  );
}
