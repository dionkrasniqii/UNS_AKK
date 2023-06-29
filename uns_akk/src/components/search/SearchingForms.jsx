import React, { useState } from "react";
import SearchCertificate from "../search/SearchCertificate";
import { useTranslation } from "react-i18next";
import SearchInstitution from "../search/SearchInstitution";
export default function SearchingForms() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  return (
    <div className='container card mt-5'>
      <div className='card-body'>
        <h4 className='header-title mb-4 text-uppercase'>
          {t("FormsForSearch")}
        </h4>
        <ul className='nav nav-pills navtab-bg nav-justified'>
          <li className='nav-item'>
            <a
              type='button'
              onClick={() => handleTabClick("1")}
              aria-expanded={activeTab === "1" ? "true" : "false"}
              className={`nav-link ${activeTab === "1" ? " active" : ""}`}
            >
              {t("Certificate")}
            </a>
          </li>
          <li className='nav-item'>
            <a
              type='button'
              onClick={() => handleTabClick("2")}
              data-bs-toggle='tab'
              aria-expanded={activeTab === "2" ? "true" : "false"}
              className={`nav-link ${activeTab === "2" ? " active" : ""}`}
            >
              {t("Institucion1")}
            </a>
          </li>
        </ul>
        <div className='tab-content'>
          <div
            className={`tab-pane animation animation-reverse ${
              activeTab === "1" ? "show active" : ""
            }`}
          >
            <SearchCertificate />
          </div>
          <div
            className={`tab-pane animation ${
              activeTab === "2" ? "show active" : ""
            }`}
          >
            <SearchInstitution />
          </div>
        </div>
      </div>
    </div>
  );
}
