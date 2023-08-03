import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import CrudProvider from "../../../../provider/CrudProvider";

import { Button, Modal } from "antd";
import DataTablev2 from "../../../custom/DataTablev2";

export default function DecisionDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [documentModal, setDocumentModal] = useState(false);
  const [decision, setDecision] = useState({});
  const columns = [
    {
      name: t("SubQualifications"),
      selector: (row) => row.qualificationChildName,
      sortable: true,
      filterable: true,
    },
    {
      name: t("Credits"),
      selector: (row) => row.credits,
      sortable: true,
      filterable: true,
    },
  ];

  useEffect(() => {
    setLoad(true);
    CrudProvider.getItemByIdLang("InstitutionDesicionAPI/GetById", id).then(
      (res) => {
        if (res) {
          switch (res.statusCode) {
            case 200:
              setDecision(res.result.value);
              break;
            default:
              break;
          }
          setLoad(false);
        }
      }
    );
  }, [id]);
  const subQualifications =
    Object.keys(decision).length > 0
      ? decision.qualificationChildIds.filter(
          (obj) => obj.qualificationChildId !== null
        )
      : [];

  return (
    <div className='content-page-landing animation'>
      <div className='content'>
        <div className='container d-flex justify-content-center'>
          <div className='card '>
            {Object.keys(decision).length > 0 && !load ? (
              <div className='card-body'>
                <div className='panel-body'>
                  <div className='clearfix'>
                    <div className='float-start'>
                      <a
                        href={`/institutiondetails/${decision.institution.institutionId}`}
                        target='_blank'
                      >
                        <h3 className='text-primary border-bottom'>
                          {decision.institution.institutionName}
                        </h3>
                      </a>
                      <label>{decision.municipalityName}</label>
                    </div>
                    <div className='float-end'>
                      {decision.aktiv ? (
                        <h4 className='text-success'>{t("Active")}</h4>
                      ) : (
                        <h4 className='text-danger'>Pasiv</h4>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='float-start mt-3 ps-xl-1 ps-md-2 ps-sm-3 ps-4'>
                        <label className='fs-5'>{t("Qualification")}:</label>
                        <br />
                        {decision.qualificationName}
                        <br />
                        <label className='fs-5'>{t("ProtocolNumber")}:</label>
                        <br />
                        {decision.protocolNr}
                        <br />
                        <label className='fs-5'>{t("ProtocolDate")}:</label>
                        <br />
                        {new Date(
                          decision.protocolDate.split("T")[0]
                        ).toLocaleDateString("en-GB")}
                      </div>
                      <div className='float-start mt-3 ps-xl-1 ps-md-2 ps-sm-3 ps-4'>
                        <label className='fs-5'>{t("Credits")}:</label>
                        <br />
                        {decision.credits}
                        <br />
                        <label className='fs-5'>{t("GroupLimits")}:</label>
                        <br />
                        {decision.noLimitGroups ? t("Yes") : t("No")}
                        <br />
                        <label className='fs-5'>{t("NumberOfGroups")}:</label>
                        <br />
                        {decision.numOfGroups}
                      </div>
                      <div className='float-start mt-3 ps-xl-1 ps-md-2 ps-sm-3 ps-4'>
                        <label className='fs-5'>
                          {t("MaxPersonsInGroup")}:
                        </label>
                        <br />
                        {decision.maximumPeoplePerGroup}
                        <br />
                        <label className='fs-5'>{t("IsReaccrediation")}</label>
                        <br />
                        {decision.reaccreditation ? t("Yes") : t("No")}
                        <br />
                        <label className='fs-5'>{t("Municipality")}</label>
                        <br />
                        {decision.municipalityName}
                      </div>
                      <div className='float-start mt-3 ps-xl-1 ps-md-2 ps-sm-3 ps-4'>
                        <p>
                          <strong>{t("DateIssuanceDecision")}: </strong>
                          {new Date(
                            decision.decisionDate.split("T")[0]
                          ).toLocaleDateString("en-GB")}
                        </p>
                        <p>
                          <strong>{t("ExpirationDate")}: </strong>
                          {new Date(
                            decision.termDate.split("T")[0]
                          ).toLocaleDateString("en-GB")}
                        </p>
                        <Button
                          type='primary'
                          onClick={(e) => setDocumentModal(true)}
                          className=''
                        >
                          {t("Decision")}
                        </Button>
                        <Modal
                          title={t("Decision")}
                          centered
                          className='responsive-modal'
                          okButtonProps={{ style: { display: "none" } }}
                          open={documentModal}
                          onCancel={(e) => setDocumentModal(false)}
                        >
                          {CrudProvider.checkIsPDf(
                            decision.documents.docPath
                          ) == true ? (
                            <iframe
                              src={CrudProvider.documentPath(
                                decision.documents.docPath
                              )}
                              loading='lazy'
                            ></iframe>
                          ) : (
                            <img
                              src={CrudProvider.documentPath(
                                decision.documents.docPath
                              )}
                              loading='lazy'
                            ></img>
                          )}
                        </Modal>
                      </div>
                    </div>
                  </div>
                  <hr />
                  {subQualifications.length > 0 && (
                    <>
                      <DataTablev2
                        columns={columns}
                        dataSource={subQualifications}
                        title={t("SubQualifications")}
                      />
                      <hr />
                    </>
                  )}
                  <ul className='list-inline mb-0 wizard'>
                    <Link
                      to='/'
                      className='btn btn-danger waves-effect waves-light float-start'
                    >
                      <span className='btn-label'>
                        <i className='fe-arrow-left'></i>
                      </span>
                      {t("Discard")}
                    </Link>
                    <li className='next list-inline-item float-end'></li>
                  </ul>
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
  );
}
