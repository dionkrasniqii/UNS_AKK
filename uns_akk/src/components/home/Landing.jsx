import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../provider/CrudProvider";
import BarChart from "../charts/BarChart";
import {
  FaPhone,
  FaEnvelope,
  FaInfoCircle,
  FaCheck,
  FaCertificate,
  FaHandPointRight,
} from "react-icons/fa";

export default function Landing() {
  const { t } = useTranslation();
  const [data, setData] = useState({});

  // useEffect(() => {
  //   document.getElementById("top").scrollIntoView();
  // }, []);

  useEffect(() => {
    CrudProvider.getAll("StatisticsAPI/GetStatisticsForLanding").then((res) => {
      if (res) {
        switch (res.statusCode) {
          case 200:
            setData(res.result);
            break;
        }
      }
    });
  }, []);

  const data2 = {
    labels: [],
    datasets: [
      {
        label: "Statistika",
        data: [], // Sample sales data
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  Object.entries(data).forEach((obj) => {
    data2.labels.push(t(obj[0]));
    data2.datasets[0].data.push(obj[1]);
  });

  return (
    <div className="content-page-landing navbar-costum-padding" id="top">
      <div className="content mb-3">
        <div className="container-fluid d-flex justify-content-center ">
          <div className="col-10">
            <div className="card">
              <div className="card-body">
                <label>
                  Sistemi kombëtar i kualifikimeve në Kosovë bazohet në Kornizën
                  Kombëtare të Kualifikimeve (KKK) që është themeluar dhe
                  mirëmbahet nga Autoriteti Kombëtar i Kualifikimeve (AKK). Baza
                  ligjore për rregullimin e sistemit kombëtar të kualifikimeve
                  është paraparë me Ligjin për Kualifikimet Kombëtare (Ligji
                  Nr.03/L-060, i miratuar nga Kuvendi i Republikës së Kosovës më
                  7 nëntor 2008). Kualifikimi i referohet një certifikimi formal
                  që një person ka arritur me sukses rezultate specifike të të
                  nxënit që lidhen me kërkesat e identifikuara akademike,të
                  industrisë ose komunitetit. Një kualifikim është një dokument
                  formal i lëshuar nga një organ i autorizuar në njohje të
                  arritjeve arsimore të një individi dhe/ose kompetencave
                  aktuale. Ky dokument mund të lëshohet në formën e diplomës,
                  certifikatës ose licencës Regjistri i Kualifikimeve të Kosovës
                  është një burim që siguron konfirmimin publik të marrëdhënies
                  formale, teknike midis një kualifikimi dhe Kornizës Kombëtare
                  të Kualifikimeve. Niveli i kualifikimeve në regjistër
                  korrespondon me tetë nivelet e KKK-së, përkatësisht KEK.
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content mb-3">
        <div className="container-fluid d-flex justify-content-center ">
          <div className="col-10">
            <div className="card">
              <div className="card-body" style={{ height: "385px" }}>
                <BarChart data={data2} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content mb-3">
        <div className="container-fluid d-flex justify-content-center">
          <div className="col-10">
            <div className="card">
              <div className="card-body">
                <p className="text-center">
                  <span className="h5">
                    <FaPhone className="me-2" />
                    {t("QuestionText")}
                  </span>
                  <br />
                  <a href="tel:+383213517704" className="text-decoration-none">
                    <span className="h5">038 213 517 704</span>
                  </a>
                </p>
                <p className="text-center">
                  <span className="h5">
                    <FaEnvelope className="me-2" />
                    {t("WriteOn")}
                  </span>
                  <br />
                  <a
                    href="mailto:info.akk@rks-gov.net"
                    className="text-decoration-none"
                  >
                    <span className="h5 text-primary mt-1">
                      info.akk@rks-gov.net
                    </span>
                  </a>
                </p>
                <p className="text-center">
                  <span className="h5"> {t("Location")}</span>
                  <br />
                  <span className="h5">{t("LandingAddress")}</span>
                </p>
                <hr></hr>
                <p className="text-center">
                  <span className="h5">
                    <FaInfoCircle className="me-2" />
                    {t("AKKText")}
                  </span>
                </p>
                <hr></hr>
                <ul className="text-center list-unstyled">
                  <li>
                    <FaCheck className="me-2" />
                    {t("LandingInfo1")}
                  </li>
                  <li>
                    <FaCheck className="me-2" />
                    {t("LandingInfo2")}
                  </li>
                  <li>
                    <FaCheck className="me-2" />
                    {t("LandingInfo3")}
                  </li>
                  <li>
                    <FaCheck className="me-2" />
                    {t("LandingInfo4")}
                  </li>
                  <li>
                    <FaCheck className="me-2" />
                    {t("LandingInfo5")}
                  </li>
                  <li>
                    <FaCheck className="me-2" />
                    {t("LandingInfo6")}
                  </li>
                </ul>
                <hr></hr>
                <p className="text-left">
                  <FaInfoCircle className="me-2" />
                  {t("AKKSecondText")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content mb-3">
        <div className="container-fluid d-flex justify-content-center">
          <div className="col-10">
            <div className="card">
              <div className="card-body">
                <h4 className="text-center">
                  <FaCertificate className="me-2" />
                  {t("Certificate")}
                </h4>
                <h5>
                  <FaHandPointRight className="me-2"></FaHandPointRight>
                  {t("SearchForms")}
                </h5>
                <hr />
                <p className="mb-4">{t("SearchFormsText")}</p>
                <h5>
                  <FaHandPointRight className="me-2"></FaHandPointRight>
                  {t("SearchResult")}
                </h5>
                <hr />
                <p className="mb-4">{t("SearchResultText")}</p>
                <h5>
                  <FaHandPointRight className="me-2"></FaHandPointRight>
                  {t("CandidateDetails")}
                </h5>
                <hr></hr>
                <p className="mb-4">{t("CandidateDetailsText")}</p>
                <h5>
                  <FaHandPointRight className="me-2"></FaHandPointRight>
                  {t("OnlineCertificatePDF")}
                </h5>
                <hr></hr>
                <p className="mb-4">{t("OnlineCertificatePDFText")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
