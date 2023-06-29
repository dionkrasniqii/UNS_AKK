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
    <div className='content-page-landing navbar-costum-padding'>
      <div className='content mb-3'>
        <div className='container-fluid d-flex justify-content-center '>
          <div className='col-10'>
            <div className='card'>
              <div className='card-body' style={{ height: "385px" }}>
                <BarChart data={data2} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='content mb-3'>
        <div className='container-fluid d-flex justify-content-center'>
          <div className='col-10'>
            <div className='card'>
              <div className='card-body'>
                <p className='text-center'>
                  <span className='h5'>
                    <FaPhone className='me-2' />
                    {t("QuestionText")}
                  </span>
                  <br />
                  <a href='tel:+383213517704' className='text-decoration-none'>
                    <span className='h5'>038 213 517 704</span>
                  </a>
                </p>
                <p className='text-center'>
                  <span className='h5'>
                    <FaEnvelope className='me-2' />
                    {t("WriteOn")}
                  </span>
                  <br />
                  <a
                    href='mailto:info.akk@rks-gov.net'
                    className='text-decoration-none'
                  >
                    <span className='h5 text-primary mt-1'>
                      info.akk@rks-gov.net
                    </span>
                  </a>
                </p>
                <p className='text-center'>
                  <span className='h5'> {t("Location")}:</span>
                  <br />
                  <span className='h5'>
                    Rr. Agim Ramadani p.n, Qendra e Studentëve, Prishtinë,
                    Kosovë
                  </span>
                </p>
                <hr></hr>
                <p className='text-center'>
                  <span className='h5'>
                    <FaInfoCircle className='me-2' />
                    {t("AKKText")}
                  </span>
                </p>
                <hr></hr>
                <ul className='text-center list-unstyled'>
                  <li>
                    <FaCheck className='me-2' />
                    Njohjen më të mirë kombëtare dhe ndërkombëtare të
                    kualifikimeve
                  </li>
                  <li>
                    <FaCheck className='me-2' />
                    Pjesëmarrjen më të gjerë në mësimin gjatë gjithë jetës
                  </li>
                  <li>
                    <FaCheck className='me-2' />
                    Fleksibilitetin më të madh gjatë ofrimit të arsimit dhe
                    aftësimit
                  </li>
                  <li>
                    <FaCheck className='me-2' />
                    Njohjen e mësimit të bazuar në punë
                  </li>
                  <li>
                    <FaCheck className='me-2' />
                    Progresin e përmirësuar për individ, nëpërmjet njohjes së
                    mësimit paraprak dhe transferim të kredive
                  </li>
                  <li>
                    <FaCheck className='me-2' />
                    AKK, gjithashtu, do të akreditojë institucionet për
                    vlerësimin e nxënësve dhe lëshimin e certifikatave për
                    kualifikimet e validuara në KKK
                  </li>
                </ul>
                <hr></hr>
                <p className='text-left'>
                  <FaInfoCircle className='me-2' />
                  {t("AKKSecondText")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='content mb-3'>
        <div className='container-fluid d-flex justify-content-center'>
          <div className='col-10'>
            <div className='card'>
              <div className='card-body'>
                <h4 className='text-center'>
                  <FaCertificate className='me-2' />
                  {t("Certificate")}
                </h4>
                <h5>
                  <FaHandPointRight className='me-2'></FaHandPointRight>
                  {t("SearchForms")}
                </h5>
                <hr />
                <p className='mb-4'>{t("SearchFormsText")}</p>
                <h5>
                  <FaHandPointRight className='me-2'></FaHandPointRight>
                  {t("SearchResult")}
                </h5>
                <hr />
                <p className='mb-4'>{t("SearchResultText")}</p>
                <h5>
                  <FaHandPointRight className='me-2'></FaHandPointRight>
                  {t("CandidateDetails")}
                </h5>
                <hr></hr>
                <p className='mb-4'>{t("CandidateDetailsText")}</p>
                <h5>
                  <FaHandPointRight className='me-2'></FaHandPointRight>
                  {t("OnlineCertificatePDF")}
                </h5>
                <hr></hr>
                <p className='mb-4'>{t("OnlineCertificatePDFText")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
