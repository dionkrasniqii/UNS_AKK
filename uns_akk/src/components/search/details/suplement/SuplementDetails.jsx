import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loading from "../../../loading/Loading";
import CrudProvider from "../../../../provider/CrudProvider";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import suplement from "../../../../assets/docs/Shtojca.docx";
export default function SuplementDetails() {
  const { suplementId } = useParams();
  const [loadData, setLoadData] = useState(true);
  const [loadPrint, setLoadPrint] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    CrudProvider.getItemById(
      "QualificationAPI/GetQualificationDetailsById",
      suplementId
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setData(res.result);
          setLoadData(false);
        }
      } else {
        toast.error("Ka ndodhur nje gabim provoni perseri");
        navigate("/");
      }
    });
  }, [suplementId]);
  async function printSuplement() {
    setLoadPrint(true);
    await CrudProvider.getReportRDLC(
      `ReportsAPI/PrintCertificateSuplement`,
      `pdf`,
      suplementId,
      `Shtoja e certifikates per kualfikimin ${data.qualificationName} `
    ).then((res) => {
      setLoadPrint(false);
    });
  }
  function printSumplementV2() {
    window.open(suplement, "_blank");
  }
  return (
    <div className="content-page-landing animation">
      <div className="content">
        <div className="container">
          <div className="card">
            {loadData ? (
              <Loading />
            ) : (
              <div className="card-body">
                <div className="col-md-12 text-end">
                  {!loadPrint ? (
                    <button
                      className="btn btn-danger"
                      onClick={printSumplementV2}
                    >
                      <span className="btn-label">
                        <i className="fe-printer"></i>
                      </span>
                      Print
                    </button>
                  ) : (
                    <div
                      className="spinner-border text-primary m-2 text-center"
                      role="status"
                    />
                  )}
                </div>
                <h3 className="title mb-3 text-center text-uppercase">
                  {t("SuplementDetails")}
                </h3>
                <hr />

                <div className="row">
                  <label className="text-uppercase text-muted font-13">
                    {t("QualificationName")}:
                  </label>
                  <span className="ms-2 font-20">{data.qualificationName}</span>
                  <hr />
                  <label className="text-uppercase text-muted font-13">
                    {t("Level")} KEK:
                  </label>
                  <span className="ms-2 font-20">{data.eqfLevel}</span>
                  <hr />
                  <label className="text-uppercase text-muted font-13">
                    {t("Field")}:
                  </label>
                  <span className="ms-2 font-20">{data.field}</span>
                  <hr />
                  <label className="text-uppercase text-muted font-13">
                    {t("SubField")}:
                  </label>
                  <span className="ms-2 font-20">{data.subField}</span>
                  <hr />
                  {/* <label className="text-uppercase text-muted font-13">
                    {t("Occupation")}:
                  </label>
                  <span className="ms-2 font-20">{data.profession}</span>
                  <hr /> */}
                  <label className="text-uppercase text-muted font-13">
                    {t("QualificationStandarts")}:
                  </label>
                  <span className="ms-2 font-20">
                    {data.occupationalStandartQualification}
                  </span>
                  <hr />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
