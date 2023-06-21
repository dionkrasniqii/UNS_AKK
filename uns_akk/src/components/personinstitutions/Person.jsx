// Person.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CrudProvider from "../../provider/CrudProvider";
import ProgressBar from "../custom/ProgressBar";
import CustomSelect from "../custom/CustomSelect";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import PersonList from "../personinstitutions/PersonList";

export default function Person() {
  const { t } = useTranslation();
  const [institution, setInstitution] = useState([]);
  const [model, setModel] = useState({
    InstitutionId: "",
  });
  const [showPersonList, setShowPersonList] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    CrudProvider.getAll("PersonAPI/GetInstitutionPerson").then((res) => {
      if (res) {
        switch (res.statusCode) {
          case 200:
            setInstitution(res.result);
            setLoading(false);
            break;
          default:
            setLoading(false);
            break;
        }
      }
    });
  }, []);

  const institutionPersonList =
    institution &&
    institution.length > 0 &&
    institution
      .map((obj) => {
        return {
          value: obj.institutionId,
          label: obj.institutionName,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

  function changeInstitution(e) {
    setModel({
      ...model,
      InstitutionId: e,
    });
  }

  const handleSearch = () => {
    setShowPersonList(true);
  };

  return (
    <>
      <div className="card-body">
        <div className="row">
          <div className="col-md-5">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{t("Instuticionet")}</h5>
                <div className="form-row align-items-center">
                  <div
                    className="col-sm-6 mb-3"
                    style={{ display: "inline-block", marginRight: "3px" }}
                  >
                    <CustomSelect
                      onChangeFunction={changeInstitution}
                      optionsList={institutionPersonList}
                      isMulti={false}
                      placeholder="Choose"
                    />
                  </div>
                  <div
                    className="col-sm-3"
                    style={{ display: "inline-block", marginLeft: "5px" }}
                  >
                    <button className="btn btn-primary" onClick={handleSearch}>
                      {t("Search")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPersonList && <PersonList institutionId={model.InstitutionId} />}
    </>
  );
}
