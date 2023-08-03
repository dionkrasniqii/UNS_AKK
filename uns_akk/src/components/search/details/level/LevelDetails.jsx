import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../../../provider/CrudProvider";

import { Link } from "react-router-dom";

export default function LevelDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    setLoad(true);
    CrudProvider.getItemByIdLang("LevelAPI/GetLevelById", id).then((res) => {
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
    <div className='content-page-landing animation'>
      <div className='content'>
        <div className='container d-flex justify-content-center'>
          <div className='col-xxl-10'>
            <div className='card '>
              {Object.keys(data).length > 0 && !load ? (
                <div className='text-center card-body '>
                  <div>
                    <h3 className='title mb-3'>{t("Level")}</h3>
                    <hr />
                    <div className='row text-start'>
                      <label className='text-uppercase text-muted font-13'>
                        {t("Level Reference KEK")}:
                      </label>
                      <span className='ms-2 font-20'>
                        {data.levelKKK.levelReferenceKEK}
                      </span>
                      <hr />
                      <label className='text-uppercase text-muted font-13'>
                        {t("Competencies")}:
                      </label>
                      <span className='ms-2 font-20'>{data.competencies}</span>
                      <hr />
                      <label className='text-uppercase text-muted font-13'>
                        {t("Knowledge")}:
                      </label>
                      <span className='ms-2 font-20'>{data.knowledge}</span>
                      <hr />
                      <label className='text-uppercase text-muted font-13'>
                        {t("Level Indicator")}:
                      </label>
                      <span className='ms-2 font-20'>
                        {data.levelIndicators}
                      </span>
                      <hr />
                      <label className='text-uppercase text-muted font-13'>
                        {t("Skills")}:
                      </label>
                      <span className='ms-2 font-20'>{data.skills}</span>
                      <hr />
                      <label className='text-uppercase text-muted font-13'>
                        {t("Descriptor")}:
                      </label>
                      <span className='ms-2 font-20'>{data.theDescriptor}</span>
                      <hr />
                      <label className='text-uppercase text-muted font-13'>
                        {t("Type")}:
                      </label>
                      <span className='ms-2 font-20'>{data.type}</span>
                      <hr />
                      <label className='text-uppercase text-muted font-13'>
                        {t("Detailed Description")}:
                      </label>
                      <span className='ms-2 font-20'>
                        {data.levelKKKDescription}
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
