// Person.js

import React, { useEffect, useState } from "react";
import CrudProvider from "../../provider/CrudProvider";
import CustomSelect from "../custom/CustomSelect";
import { useTranslation } from "react-i18next";
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
    if (!e) {
      setShowPersonList(false);
    }
  }

  const handleSearch = () => {
    setShowPersonList(true);
  };

  return (
    <>
      <div className='card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-5'>
              <h5 className='card-title'>{t("Institution")}</h5>
              <div className='form-row align-items-center'>
                <div
                  className='col-sm-6 mb-3'
                  style={{ display: "inline-block", marginRight: "3px" }}
                >
                  <CustomSelect
                    onChangeFunction={changeInstitution}
                    optionsList={institutionPersonList}
                    isMulti={false}
                    placeholder='Choose'
                  />
                </div>

                <button
                  className='btn btn-sm btn-primary'
                  onClick={handleSearch}
                >
                  {t("Search")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPersonList && <PersonList institutionId={model.InstitutionId} />}
    </>
  );
}
