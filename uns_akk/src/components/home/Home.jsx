import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import LineChart from "../charts/LineChart";

export default function Home() {
  const { t } = useTranslation();
  const [instituionByYear, setInstitutionByYear] = useState([]);
  useEffect(() => {
    Promise.all([
      CrudProvider.getAll("StatisticsAPI/GetInstitutionsByYear"),
    ]).then((res) => {
      if (res) {
        if (res[0].statusCode === 200) {
          console.log(res[0].result);
          setInstitutionByYear(res[0].result);
        }
      }
    });
  }, []);
  const labels = Object.keys(instituionByYear);
  const datasets = [
    {
      label: t("Institutions"),
      data: Object.values(instituionByYear).map((count) => {
        console.log(count);
      }),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    },
  ];

  const data = {
    labels,
    datasets,
  };
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='card card-body'>
          <LineChart data={data} />
        </div>
      </div>
    </div>
  );
}
