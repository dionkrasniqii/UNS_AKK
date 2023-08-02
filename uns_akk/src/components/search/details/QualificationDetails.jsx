import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../../provider/CrudProvider";

import { Link } from "react-router-dom";

export default function QualificationDetails() {
  const { qualificationId, municipalityId, institutionId } = useParams();
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
    CrudProvider.getItemByIdLang(
      "QualificationAPI/GetQualificationDetails",
      `${qualificationId}/${municipalityId}/${institutionId}`
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
  }, [qualificationId, municipalityId, institutionId]);

  return (
    <div className='content-page-landing animation'>
      <div className='content'>
        <div className='container d-flex justify-content-center'>
          <div className='col-xxl-6'>
            <div className='card '>
              {Object.keys(data).length > 0 && !load ? (
                <div className='text-center card-body '>
                  <div>
                    <h3 className='title mb-3'>{t("Qualification")}</h3>
                    <hr />
                    <div className='row text-start'>
                      <label className='text-uppercase text-muted font-13'>
                        {t("QualificationName")}:
                      </label>
                      <span className='ms-2 font-20'>
                        {data.qualificationName}
                      </span>
                      <hr />
                      <label className='text-uppercase text-muted font-13'>
                        {t("SubQualifications")}:
                      </label>
                      <div className='table-responsive  mt-3 mb-3 rounded-1'>
                        <table className='table table-hover mb-0'>
                          <thead>
                            <tr>
                              <th>{t("Name")}</th>
                              <th>{t("Credits")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.qualificationChilds.map((obj, index) => (
                              <tr key={index}>
                                <td>{obj.qualificationChildName}</td>
                                <td> {obj.credits}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <label className='text-uppercase text-muted font-13 mt-2'>
                        {t("Level Description")}:
                      </label>
                      <span className='ms-2 font-20'>
                        <a
                          href={`/leveldetails/${data.levelKKKId}`}
                          target='_blank'
                        >
                          {data.levelKKKDesc}
                        </a>
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
  );
}
