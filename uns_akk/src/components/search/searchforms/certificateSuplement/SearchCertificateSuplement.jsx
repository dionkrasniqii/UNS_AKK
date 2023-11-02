import React from "react";
import CustomSelect from "../../../custom/CustomSelect";
import { useTranslation } from "react-i18next";

export default function SearchCertificateSuplement() {
  const { t } = useTranslation();

  return (
    <div className="container mt-5 bg-light-subtle ">
      <div className="card ">
        <div className="card-body">
          <div className="row">
            <div className="col-xxl-6 col-lg-6 col-sm-12 animation">
              <div className="col-xxl-12 col-lg-12 mb-3">
                <label className="">Emri ne anglisht</label>
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-xxl-12 col-lg-12 mb-3">
                <label>Fusha</label>
                <CustomSelect />
              </div>
              <div className="col-xxl-12 col-lg-12 mb-3">
                <label>Nen fusha</label>
                <CustomSelect />
              </div>
            </div>
            <div className="col-xxl-6 col-lg-6 col-sm-12 animation">
              <div className="col-xxl-12 col-lg-12 mb-3">
                <label>Profesioni</label>
                <CustomSelect />
              </div>
              <div className="col-xxl-12 col-lg-12 mb-3">
                <label>Standardi i kualifikimit profesional:</label>
                <CustomSelect />
              </div>
              <div className="col-xxl-12 col-lg-12 mb-3">
                <label>Niveli i KKK:</label>
                <CustomSelect />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-6 col-lg-6 col-sm-12 animation"></div>
    </div>
  );
}
