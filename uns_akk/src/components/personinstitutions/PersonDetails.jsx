import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import { Link } from "react-router-dom";

export default function PersonDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [candidate, setCandidate] = useState({});
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoad(true);
    if (id) {
      CrudProvider.getItemById("PersonAPI/GetPersonByPersonId", id).then(
        (res) => {
          if (res) {
            switch (res.statusCode) {
              case 200:
                setCandidate(res.result);
                setLoad(false);
                break;
              default:
                break;
            }
          }
        }
      );
    }
  }, [id]);
  return (
    <div className='card'>
      {Object.keys(candidate).length > 0 && !load ? (
        <>
          <div className='card-header-title text-center'>
            <h3 className='title text-upper'>
              Të dhënat e kandidatit{" "}
              {candidate.person.name + " " + candidate.person.surname}
            </h3>
          </div>
          <div className='card-body'>
            <div className='tab-content b-0 mb-0 pt-0'>
              <div className='tab-pane active' id='account-2'>
                <div className='row'>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("Email")}:</label>
                    <input
                      type='email'
                      className='form-control'
                      defaultValue={candidate.person.email}
                      readOnly
                    />
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("PersonalNr")}:</label>
                    <input
                      type='text'
                      className='form-control'
                      defaultValue={candidate.person.personalNr}
                      readOnly
                    />
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("BirthDate")}:</label>
                    <input
                      type='text'
                      className='form-control'
                      defaultValue={new Date(
                        candidate?.person?.birthDate?.split("T")[0]
                      ).toLocaleDateString("en-GB")}
                      readOnly
                    />
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("Country")}:</label>
                    {candidate.person.countryForeign !== null ? (
                      <input
                        type='text'
                        className='form-control'
                        defaultValue={candidate.CountryForeign}
                        readOnly
                      />
                    ) : (
                      <input
                        type='text'
                        className='form-control'
                        defaultValue='Kosovë'
                      />
                    )}
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("Municipality")}:</label>
                    {candidate.person.municipalityForeign !== null ? (
                      <input
                        className='form-control'
                        defaultValue={candidate.person.municipalityForeign}
                        readOnly
                      />
                    ) : (
                      <input
                        className='form-control'
                        defaultValue={
                          candidate.person?.municipality
                            ?.municipalityLanguages[0].municipalityName
                        }
                        readOnly
                      />
                    )}
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("Residence")}:</label>
                    {candidate.person.residenceForeign !== null ? (
                      <input
                        type='text'
                        defaultValue={candidate.person.residenceForeign}
                        className='form-control'
                      />
                    ) : (
                      <input
                        type='text'
                        defaultValue={
                          candidate?.person?.residence?.residenceLanguage[0]
                            .residenceName
                        }
                        className='form-control'
                      />
                    )}
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("Address")}:</label>
                    <input
                      type='text'
                      className='form-control'
                      defaultValue={candidate.person.address}
                    />
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("PhoneNumber")}:</label>
                    <input
                      type='text'
                      className='form-control'
                      defaultValue={candidate.person.phoneNum}
                    />
                  </div>
                  <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                    <label>{t("RegisterDate")}:</label>
                    <input
                      type='text'
                      readOnly
                      className='form-control'
                      defaultValue={new Date(
                        candidate?.registeredDate.split("T")[0]
                      ).toLocaleDateString("en-GB")}
                    />
                  </div>
                  {candidate.graduated && (
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("GraduationDate")}:</label>
                      <input
                        type='text'
                        readOnly
                        className='form-control'
                        defaultValue={new Date(
                          candidate?.graduationDate.split("T")[0]
                        ).toLocaleDateString("en-GB")}
                      />
                    </div>
                  )}

                  {candidate.unregistered && (
                    <>
                      <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                        <label>{t("UnregistredDate")}:</label>
                        <input
                          type='text'
                          defaultValue={new Date(
                            candidate?.unregisteredDate.split("T")[0]
                          ).toLocaleDateString("en-GB")}
                          className='form-control'
                          readOnly
                        />
                      </div>
                      <div className='col-xxl-12 col-lg-12 col-sm-12 mb-3'>
                        <label>{t("Remark")}:</label>
                        <textarea
                          type='text'
                          rows={6}
                          defaultValue={candidate.remark}
                          className='form-control'
                          readOnly
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <Link
              to='/person'
              className='btn btn-secondary waves-effect waves-light float-start'
            >
              <span className='btn-label'>
                <i className='fe-arrow-left'></i>
              </span>
              {t("Back")}
            </Link>
          </div>
        </>
      ) : (
        <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
          <div
            className='spinner-border text-primary m-2 text-center'
            role='status'
          />
        </div>
      )}
    </div>
  );
}
