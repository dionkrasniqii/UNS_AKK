import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../provider/CrudProvider";
import BarChart from "../charts/BarChart";
import Loading from "../loading/Loading";
import {
  FaPhone,
  FaEnvelope,
  FaInfoCircle,
  FaCheck,
  FaCertificate,
  FaHandPointRight,
} from "react-icons/fa";
import BarChartForLanding from "../charts/BarChartForLanding";
import { Link } from "react-router-dom";
import Slider from "./slider/Slider";

export default function Landing() {
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const [levels, setLevels] = useState([]);
  const [secondStats, setSecondStats] = useState({});
  const [statsForStudents, setStatsForStudents] = useState({});
  const [statsForGradutedStudents, setStatsForGradutedStudents] = useState({});
  const [openAccordion, setOpenAccordion] = useState("");
  const [mainStats, setMainStats] = useState([]);
  const langId = localStorage.getItem("i18nextLng");

  useEffect(() => {
    Promise.all([
      CrudProvider.getAll("StatisticsAPI/GetStatisticsForLanding").then(
        (res) => {
          if (res) {
            switch (res.statusCode) {
              case 200:
                setData(res.result);
                break;
            }
          }
        }
      ),
      CrudProvider.getAll("StatisticsAPI/GetStatisticsForLandingv2").then(
        (res) => {
          if (res) {
            switch (res.statusCode) {
              case 200:
                setSecondStats(res.result);
                break;
            }
          }
        }
      ),
      CrudProvider.getAll("StatisticsAPI/GetStatisticsForLandingv3").then(
        (res) => {
          if (res) {
            switch (res.statusCode) {
              case 200:
                setStatsForStudents(res.result);
                break;
            }
          }
        }
      ),
      CrudProvider.getAll("StatisticsAPI/GetStatisticsForLandingv4").then(
        (res) => {
          if (res) {
            switch (res.statusCode) {
              case 200:
                setStatsForGradutedStudents(res.result);
                break;
            }
          }
        }
      ),
      CrudProvider.getAll("StatisticsAPI/GetInstituionsForLanding").then(
        (res) => {
          if (res) {
            switch (res.statusCode) {
              case 200:
                setMainStats(res.result);
                break;
            }
          }
        }
      ),
      fetchLevels(),
    ]);
  }, []);
  useEffect(() => {
    fetchLevels();
  }, [langId]);

  async function fetchLevels() {
    CrudProvider.getAllWithLang("LevelAPI/GetAll").then((res) => {
      if (res) {
        switch (res.statusCode) {
          case 200:
            setLevels(res.result);
            break;
        }
      }
    });
  }
  console.log(levels);
  return (
    <>
      <Slider />
      <div className="content-page-landing navbar-costum-padding " id="top">
        <div className="contentList paddingUnderSlider">
          <section className="section bg-gradient-landing  w-100">
            <div className="row justify-content-center" id="counter">
              {mainStats.map((obj, index) => {
                return (
                  <div className="col-lg-3 col-sm-6" key={index}>
                    <div className="text-center p-3">
                      <div className="counter-icon text-white-50 mb-4">
                        <i className="pe-7s-add-user display-4" />
                      </div>
                      <div className="counter-content">
                        <h2 className="counter_value mb-3 text-white animation animation-reverse ">
                          {obj.value}
                        </h2>
                        <h5 className="counter-name text-white animation animation-reverse  ">
                          {t(obj.key)}
                        </h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="content mb-3">
            <div className="container-fluid d-flex justify-content-center animation ">
              <div className="col-10">
                <div className="card">
                  <div className="row">
                    {secondStats &&
                    statsForStudents &&
                    statsForGradutedStudents &&
                    Object.keys(secondStats).length > 0 &&
                    Object.keys(statsForStudents).length > 0 &&
                    Object.keys(statsForGradutedStudents).length > 0 ? (
                      <>
                        <div
                          className="card-body"
                          style={{ height: "385px", width: "385px" }}
                        >
                          <BarChartForLanding
                            data={secondStats}
                            description={
                              "Institucionet e regjistruara në 3 vitet e fundit "
                            }
                          />
                        </div>
                        <div
                          className="card-body"
                          style={{ height: "385px", width: "385px" }}
                        >
                          <BarChartForLanding
                            data={statsForStudents}
                            description={
                              "Personat e regjistruar në 3 vitet e fundit "
                            }
                          />
                        </div>
                        <div
                          className="card-body"
                          style={{ height: "385px", width: "385px" }}
                        >
                          <BarChartForLanding
                            data={statsForGradutedStudents}
                            description={
                              "Kualifikimet e dhëna në 3 vitet e fundit "
                            }
                          />
                        </div>
                      </>
                    ) : (
                      <Loading />
                    )}
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
                      <a
                        href="tel:+383213517704"
                        className="text-decoration-none"
                      >
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
                    <div className="row">
                      {levels &&
                        levels.length > 0 &&
                        levels
                          .slice()
                          .sort((a, b) =>
                            a.levelKKKDescription.localeCompare(
                              b.levelKKKDescription
                            )
                          )
                          .map((level, index) => {
                            return (
                              <React.Fragment key={index}>
                                <div
                                  type="button"
                                  style={{
                                    backgroundColor: level.color,
                                  }}
                                  data-color={level.color}
                                  className="card-header "
                                  id={`heading_${index}`}
                                  onClick={(e) =>
                                    openAccordion == level.levelKKKDescription
                                      ? setOpenAccordion("")
                                      : setOpenAccordion(
                                          level.levelKKKDescription
                                        )
                                  }
                                >
                                  <h5 className="m-0">
                                    <a
                                      type="button"
                                      className="text-dark collapsed"
                                      data-bs-toggle="collapse"
                                      aria-expanded={
                                        openAccordion ==
                                        level.levelKKKDescription
                                          ? true
                                          : false
                                      }
                                    >
                                      <i className="mdi mdi-share-variant me-1 text-white"></i>
                                      <span className="text-uppercase text-white">
                                        {level.levelKKKDescription}
                                      </span>
                                    </a>
                                  </h5>
                                </div>
                                <div className="card mb-1 mt-2 shadow shadow-1">
                                  <div
                                    id={`collapse_${index}`}
                                    className={`collapse ${
                                      openAccordion ==
                                        level.levelKKKDescription && "show"
                                    }`}
                                    aria-labelledby={`heading_${index}`}
                                    data-bs-parent="#accordion"
                                  >
                                    <div className="card-body">
                                      {level.detailedDescription}
                                    </div>
                                  </div>
                                </div>
                              </React.Fragment>
                            );
                          })}
                      {/* {levels &&
                        levels.length > 0 &&
                        levels
                          .slice()
                          .sort((a, b) =>
                            a.levelKKKDescription.localeCompare(
                              b.levelKKKDescription
                            )
                          )
                          .map((level, index) => {
                            return <></>;
                          })} */}
                    </div>
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
                    <Link
                      to={
                        "https://arbk.rks-gov.net/desk/inc/media/FA0E6C9D-2422-481E-8047-A2AFB4B9124C.pdf"
                      }
                      target="_blank"
                      className="btn btn-bordered-secondary"
                      id="topnav-dashboard"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      NACE Kodi i veprimtarive ekonomike
                    </Link>
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
      </div>
    </>
  );
}
