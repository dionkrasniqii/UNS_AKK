import React from "react";
import { useTranslation } from "react-i18next";

export default function EditFirstApplicationFormC({
  setData,
  data,
  handleRemoveDocument,
}) {
  const { t } = useTranslation();

  return (
    <div className='row'>
      <h4>{t("PartC")}</h4>
      <h5 className='card-title text-start '>{t("PartC.1")}</h5>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("Name") + " " + t("Surname")}</label>
          <input
            type='text'
            defaultValue={data.applicationDTO.nameSurnameLeaderC11}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                applicationDTO: {
                  ...prev.applicationDTO,
                  nameSurnameLeaderC11: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("Address")}</label>
          <input
            type='text'
            defaultValue={data.applicationDTO.addressLeaderC11}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                applicationDTO: {
                  ...prev.applicationDTO,
                  addressLeaderC11: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("PhoneNumber")}</label>
          <input
            type='text'
            defaultValue={data.applicationDTO.phoneNumberLeaderC11}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                applicationDTO: {
                  ...prev.applicationDTO,
                  phoneNumberLeaderC11: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("Fax")}</label>
          <input
            type='text'
            defaultValue={data.applicationDTO.faxLeaderC11}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                applicationDTO: {
                  ...prev.applicationDTO,
                  faxLeaderC11: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("Email")}</label>
          <input
            type='text'
            defaultValue={data.applicationDTO.emailLeaderC11}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                applicationDTO: {
                  ...prev.applicationDTO,
                  emailLeaderC11: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <hr />
      <h5 className='card-title text-start '>C1.2 {t("PartC1.2")}</h5>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("Name") + " " + t("Surname")}</label>
          <input
            type='text'
            defaultValue={data.applicationDTO.nameSurnameCoordinatorC12}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                applicationDTO: {
                  ...prev.applicationDTO,
                  nameSurnameCoordinatorC12: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("Address")}</label>
          <input
            type='text'
            defaultValue={data.applicationDTO.addressCoordinatorC12}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                applicationDTO: {
                  ...prev.applicationDTO,
                  addressCoordinatorC12: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("PhoneNumber")}</label>
          <input
            type='text'
            defaultValue={data.applicationDTO.phoneNumberCoordinatorC12}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                applicationDTO: {
                  ...prev.applicationDTO,
                  phoneNumberCoordinatorC12: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("Fax")}</label>
          <input
            type='text'
            defaultValue={data.applicationDTO.faxCoordinatorC12}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                applicationDTO: {
                  ...prev.applicationDTO,
                  faxCoordinatorC12: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("Email")}</label>
          <input
            type='text'
            defaultValue={data.applicationDTO.emailCoordinatorC12}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                applicationDTO: {
                  ...prev.applicationDTO,
                  emailCoordinatorC12: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <hr />
      <h5 className='card-title text-start '>C1.5 {t("PartC1.5")}</h5>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <input
            type='text'
            defaultValue={data.applicationDTO.placeOfApplicationC15}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                applicationDTO: {
                  ...prev.applicationDTO,
                  placeOfApplicationC15: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
}
