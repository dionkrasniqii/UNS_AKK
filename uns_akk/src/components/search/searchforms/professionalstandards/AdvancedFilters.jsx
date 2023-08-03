import React from "react";
import { useTranslation } from "react-i18next";

export default function AdvancedFilters({ model, setModel }) {
  const { t } = useTranslation();

  return (
    <>
      <div className='col-xxl-6 col-lg-6 col-sm-12 animation'>
        <form className='form-horizontal'>
          <div className='row mb-3'>
            <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
              {t("Field")}:
            </label>
            <div className=' col-xl-7'>
              <input
                autoComplete='off'
                type='text'
                className='form-control'
                placeholder={t("Field")}
              />
            </div>
          </div>
          <div className='row mb-3'>
            <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
              {t("Profession")}
            </label>
            <div className=' col-xl-7'>
              <input
                autoComplete='off'
                type='text'
                className='form-control'
                placeholder={t("Profession")}
              />
            </div>
          </div>
          <div className='row mb-3'>
            <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
              {t("InvitationGroup")}:
            </label>
            <div className=' col-xl-7'>
              <input
                autoComplete='off'
                type='text'
                className='form-control'
                placeholder={t("InvitationGroup")}
              />
            </div>
          </div>
          <div className='row mb-3'>
            <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
              {t("CurriculumNameAndCode")}:
            </label>
            <div className=' col-xl-7'>
              <input
                autoComplete='off'
                type='text'
                className='form-control'
                placeholder={t("CurriculumNameAndCode")}
              />
            </div>
          </div>
          <div className='row mb-3'>
            <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
              {t("TheCallingCanBeLearned")}:
            </label>
            <div className=' col-xl-7'>
              <input
                autoComplete='off'
                type='text'
                className='form-control'
                placeholder={t("TheCallingCanBeLearned")}
              />
            </div>
          </div>
          <div className='row mb-3'>
            <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
              {t("Type")}:
            </label>
            <div className=' col-xl-7'>
              <input
                autoComplete='off'
                type='text'
                className='form-control'
                placeholder={t("Type")}
              />
            </div>
          </div>
        </form>
      </div>
      <div className='col-xxl-6 col-lg-6 col-sm-12 animation'>
        <form className='form-horizontal'>
          <div className='row mb-3'>
            <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
              {t("EQFLevel")}:
            </label>
            <div className=' col-xl-7'>
              <input
                autoComplete='off'
                type='text'
                className='form-control'
                placeholder={t("EQFLevel")}
              />
            </div>
          </div>
          <div className='row mb-3'>
            <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
              {t("ISCO")}:
            </label>
            <div className=' col-xl-7'>
              <input
                autoComplete='off'
                type='text'
                className='form-control'
                placeholder={t("ISCO")}
              />
            </div>
          </div>
          <div className='row mb-3'>
            <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
              {t("ISCED")}:
            </label>
            <div className=' col-xl-7'>
              <input
                autoComplete='off'
                type='text'
                className='form-control'
                placeholder={t("ISCED")}
              />
            </div>
          </div>
          <div className='row mb-3'>
            <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
              {t("EMTAK")}:
            </label>
            <div className=' col-xl-7'>
              <input
                autoComplete='off'
                type='text'
                className='form-control'
                placeholder={t("EMTAK")}
              />
            </div>
          </div>
          <div className='row mb-3'>
            <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
              {t("Status")}:
            </label>
            <div className=' col-xl-7'>
              <input
                autoComplete='off'
                type='text'
                className='form-control'
                placeholder={t("Status")}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
