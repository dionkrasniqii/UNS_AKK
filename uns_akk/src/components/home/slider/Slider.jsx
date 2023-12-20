import React, { useEffect } from "react";
import "./style.css";
import firstImage from "../../../assets/images/1.png";
import secondImage from "../../../assets/images/2.png";
import thirdImage from "../../../assets/images/3.png";
import fourthImage from "../../../assets/images/4.png";
import fifthImage from "../../../assets/images/5.png";
export default function Slider() {
  useEffect(() => {
    const slider = document.querySelector(".slider");
    function activate(e) {
      const items = document.querySelectorAll(".item");
      e.target.matches(".next") && slider.appendChild(items[0]);
      e.target.matches(".prev") &&
        slider.insertBefore(items[items.length - 1], slider.firstChild);
    }
    document.addEventListener("click", activate, false);
    return () => {
      document.removeEventListener("click", activate, false);
    };
  }, []);
  useEffect(() => {
    const slider = document.querySelector(".slider");

    function activate() {
      const items = document.querySelectorAll(".item");
      slider.appendChild(items[0]);
    }

    const intervalId = setInterval(activate, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const photos = [
    {
      Title: "Titulli 1",
      Description:
        "Kualifikimi i referohet një certifikimi formal që një person ka arritur me sukses rezultate specifike të të nxënit që lidhen me kërkesat e identifikuara akademike, të industrisë ose të komunitetit.",
      Photo: firstImage,
    },
    {
      Title: "Titulli 1",
      Description:
        "Sistemi kombëtar i kualifikimeve në Kosovë bazohet në Kornizën Kombëtare të Kualifikimeve (KKK) që është themeluar dhe mirëmbahet nga Autoriteti Kombëtar i Kualifikimeve (AKK).",
      Photo: secondImage,
    },
    {
      Title: "Titulli 1",
      Description:
        "Zhvillimi i bazave të të dhënave ose Regjistrave të kualifikimeve në nivel kombëtar kontribuon në funksionalizimin e Kornizave Kombëtare të Kualifikimeve (KKK), rrit transparencën, shpërndarjen dhe përdorimin nga publiku.",
      Photo: thirdImage,
    },
    {
      Title: "Titulli 1",
      Description:
        "Regjistri i Kualifikimeve të Kosovës (RKK) është një regjistër gjithëpërfshirës, i integruar, që mbulon të gjitha nivelet e Kornizës Kombëtare të Kualifikimeve (KKK). Ai është zhvilluar me qëllim që të jetë i dobishëm për nxënësit/kandidatët, punëdhënësit, ofruesit e trajnimeve, shkollat, kolegjet, agjencitë përkatëse, ministritë dhe partnerët e tjerë përkatës të brendshëm dhe të jashtëm.",
      Photo: fourthImage,
    },
    {
      Title: "Titulli 1",
      Description:
        "Çdo kualifikim, formal dhe joformal në RKK do të lidhet me një nivel adekuat të KKK.",
      Photo: fifthImage,
    },
    {
      Title: "Titulli 1",
      Description:
        "Struktura e Regjistrit të Kualifikimeve të Kosovës përbëhet nga informatat dhe mjetet e nevojshme në mënyrë që të jetë mbështetëse për partnerët dhe përdoruesit përkatës.",
      Photo: thirdImage,
    },
  ];

  return (
    <>
      <ul className="slider">
        {photos.map((obj, index) => {
          return (
            <li
              key={index}
              className="item"
              style={{
                backgroundImage: `url(${obj.Photo})`,
              }}
            >
              <div className="content-main bg-blur-slider">
                <p className="description fs-5">•	Regjistri i Kualifikimeve të Kosovës (RKK)  është sistem gjithëpërfshirës, i integruar, që përfshinë të gjitha nivelet e Kornizës Kombëtare të Kualifikimeve (KKK). RKK është zhvilluar me qëllim që të jetë i përdorshëm për nxënësit/kandidatët, punëdhënësit, ofruesit e trajnimeve, shkollat, kolegjet, agjencitë përkatëse, ministritë dhe partnerët e tjerë përkatës të brendshëm dhe të jashtëm.</p>
                <p className="description fs-5">{obj.Description}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <nav className="nav">
        <i className="fe-arrow-left btn prev " name="arrow-back-outline"></i>
        <i
          className="fe-arrow-right btn next "
          name="arrow-forward-outline"
        ></i>
      </nav>
    </>
  );
}
