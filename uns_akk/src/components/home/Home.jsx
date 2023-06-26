import React, { useEffect, useState } from "react";
import CrudProvider from "../../provider/CrudProvider";
import { useTranslation } from "react-i18next";
import DonutChart from "../charts/DonutApexChart";
import BarApexChart from "../charts/BarApexChart";
import StatisticWidget1 from "../../widgets/StatisticWidget1";
import RevenueChart from "../charts/RevenueApexChart";

export default function Home() {
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const [instituionByYear, setInstitutionByYear] = useState([]);
  const [candidatesByYear, setCandidatesByYear] = useState([]);
  const [
    accreditatedInstitutionsAndUnaccreditated,
    setAccreditatedInstitutions,
  ] = useState([]);
  const [reaccreditatedInstitutions, setReaccreditatedInstitutions] = useState(
    []
  );
  const [candidatesByQualifications, setCandidatesByQualification] = useState(
    []
  );
  const [candidatesByMonth, setCandidatesByMonth] = useState([]);

  useEffect(() => {
    setLoad(true);
    Promise.all([
      CrudProvider.getAll("StatisticsAPI/GetInstitutionsByYear"),
      CrudProvider.getAll("StatisticsAPI/GetCandidatesByYear"),
      CrudProvider.getAll(
        "StatisticsAPI/GetAccreditedAndUnAccreditedInstitutions"
      ),
      CrudProvider.getAll("StatisticsAPI/GetReaccreditedInstitutions"),
      CrudProvider.getAll("StatisticsAPI/GetCandidatesByQualifications"),
      CrudProvider.getAll("StatisticsAPI/GetCandidatesByMonth"),
    ]).then(
      ([
        institutionsRes,
        candidatesRes,
        accreditedRes,
        reaccreditedRes,
        qualificationsRes,
        candidatesByMonthRes,
      ]) => {
        // Process each response directly
        if (institutionsRes && institutionsRes.statusCode === 200) {
          setInstitutionByYear(institutionsRes.result);
        }
        if (candidatesRes && candidatesRes.statusCode === 200) {
          setCandidatesByYear(candidatesRes.result);
        }
        if (accreditedRes && accreditedRes.statusCode === 200) {
          setAccreditatedInstitutions(accreditedRes.result);
        }
        if (reaccreditedRes && reaccreditedRes.statusCode === 200) {
          setReaccreditatedInstitutions(reaccreditedRes.result);
        }
        if (qualificationsRes && qualificationsRes.statusCode === 200) {
          setCandidatesByQualification(qualificationsRes.result);
        }
        if (candidatesByMonthRes && candidatesByMonthRes.statusCode === 200) {
          setCandidatesByMonth(candidatesByMonthRes.result);
        }
        setLoad(false);
      }
    );
  }, []);

  const generateColorsByObjectLength = (obj) => {
    const startColor = [0, 0, 255]; // Blue color (RGB values)
    const endColor = [205, 127, 50]; // Bronze color (RGB values)
    const numColors = Object.keys(obj).length;
    const colors = [];

    for (let i = 0; i < numColors; i++) {
      const ratio = i / (numColors - 1);
      const color = startColor.map((start, index) => {
        const end = endColor[index];
        const value = Math.round(start + ratio * (end - start));
        return value;
      });

      const hexColor = `#${(
        (1 << 24) |
        (color[0] << 16) |
        (color[1] << 8) |
        color[2]
      )
        .toString(16)
        .slice(1)}`;
      colors.push(hexColor);
    }
    return colors;
  };

  return (
    <div className='container-fluid'>
      {!load ? (
        <div className='row'>
          <div className='col-xxl-3 col-lg-5 col-md-5  col-sm-12 ps-2'>
            <DonutChart
              data={Object.values(instituionByYear)}
              labels={Object.keys(instituionByYear)}
              colors={generateColorsByObjectLength(instituionByYear)}
              title={t("RegistredInstitutionsInYears")}
            />
          </div>
          <div className='col-xxl-3 col-lg-5 col-md-5  col-sm-12 ps-2'>
            <BarApexChart
              data={accreditatedInstitutionsAndUnaccreditated}
              title={t("AccreditatedUnAccreditatedInstitutions")}
              colors={generateColorsByObjectLength(
                accreditatedInstitutionsAndUnaccreditated
              )}
            />
          </div>
          <div className='col-xxl-3 col-lg-5 col-md-5  col-sm-12 ps-2'>
            <DonutChart
              data={Object.values(candidatesByYear)}
              labels={Object.keys(candidatesByYear)}
              colors={generateColorsByObjectLength(candidatesByYear)}
              title={t("CandidatesRegistredInYears")}
            />
          </div>
          <div className='col-xxl-3 col-lg-5 col-md-5  col-sm-12 ps-2'>
            <StatisticWidget1
              data={reaccreditatedInstitutions}
              title={"Institucione të ri-akredituara"}
              color={"#0047AB"}
              stats={reaccreditatedInstitutions}
              subTitle={"Institucione të ri-akredituara"}
            />
          </div>
          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12 ps-2'>
            <BarApexChart
              data={candidatesByQualifications}
              title={t("CandidatesBasedOnQualification")}
              colors={generateColorsByObjectLength(candidatesByQualifications)}
            />
          </div>
          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12 ps-2'>
            <RevenueChart
              data={candidatesByMonth}
              title={t("CandidatesRegistredMonths")}
            />
          </div>
          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12 ps-2'></div>
        </div>
      ) : (
        <div className='col-xxl-12 col-lg-12 col-sm-12 card card-body d-flex justify-content-center align-items-center'>
          <div
            className='spinner-border text-primary m-2 text-center'
            role='status'
          />
        </div>
      )}
    </div>
  );
}
