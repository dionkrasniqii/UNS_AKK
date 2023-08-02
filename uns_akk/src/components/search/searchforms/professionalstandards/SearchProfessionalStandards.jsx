import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AdvancedFilters from "./AdvancedFilters";

export default function SearchProfessionalStandards() {
  const { t } = useTranslation();
  const [lessFilters, setLessFilters] = useState(false);

  return (
    <div className='container mt-5 bg-light-subtle animation'>
      <div className='card '>
        <div className='card-body'>
          <div className='row'>
            <div className='col-xxl-6 col-lg-6 col-sm-12'>
              <form className='form-horizontal'>
                <div className='row mb-3'>
                  <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
                    {t("Name")}:
                  </label>
                  <div className=' col-xl-7'>
                    <input
                      autoComplete='off'
                      type='text'
                      className='form-control'
                      placeholder={t("Name")}
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
                    {t("FieldOfProfessionalActivity")}:
                  </label>
                  <div className=' col-xl-7'>
                    <input
                      autoComplete='off'
                      type='text'
                      className='form-control'
                      placeholder={t("FieldOfProfessionalActivity")}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className='col-xxl-6 col-lg-6 col-sm-12'>
              <form className='form-horizontal'>
                <div className='row mb-3'>
                  <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
                    {t("Specializations")}:
                  </label>
                  <div className=' col-xl-7'>
                    <input
                      autoComplete='off'
                      type='text'
                      className='form-control'
                      placeholder={t("Specializations")}
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className=' col-xl-5 col-form-label text-xl-end text-md-start text-start-sm'>
                    {t("PartialInvitations")}:
                  </label>
                  <div className=' col-xl-7'>
                    <input
                      autoComplete='off'
                      type='text'
                      className='form-control'
                      placeholder={t("PartialInvitations")}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className='col-xxl-12 col-lg-12 col-sm-12'>
              <button
                type='button'
                className='btn btn-bordered-light text-dark shadow-inner'
                onClick={() => setLessFilters(!lessFilters)}
              >
                {!lessFilters ? t("ShowMoreFilters") : t("ShowLessFilters")}
              </button>
            </div>
            {lessFilters && <AdvancedFilters />}
            <div className='col-xxl-12 col-lg-12 col-sm-12 text-end'>
              <div className='button-list text-end'>
                <button
                  type='button'
                  className='btn btn-soft-primary waves-effect waves-light mt-2'
                >
                  {t("Search")}
                </button>
                <button
                  type='button'
                  className='btn btn-soft-secondary waves-effect mt-2'
                  // onClick={clearInputs}
                >
                  {t("Clear")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
