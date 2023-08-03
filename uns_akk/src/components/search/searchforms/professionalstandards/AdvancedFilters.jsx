import React from "react";
import { useTranslation } from "react-i18next";

export default function AdvancedFilters({ model, setModel }) {
  const { t } = useTranslation();
  async function checkNullAttributes(model) {
    let count = 0;
    Object.keys(model).forEach((key) => {
      if (key !== "LangId") {
        model[key] && count++;
      }
    });
    return count > 0 ? false : true;
  }
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
                onChange={(e) =>
                  setModel((prev) => ({
                    ...prev,
                    Field: e.target.value,
                  }))
                }
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
                onChange={(e) =>
                  setModel((prev) => ({
                    ...prev,
                    Profession: e.target.value,
                  }))
                }
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
                onChange={(e) =>
                  setModel((prev) => ({
                    ...prev,
                    ISCO: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </form>
      </div>
      <div className='col-xxl-6 col-lg-6 col-sm-12 animation'>
        <form className='form-horizontal'>
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
                onChange={(e) =>
                  setModel((prev) => ({
                    ...prev,
                    ISCED: e.target.value,
                  }))
                }
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
                onChange={(e) =>
                  setModel((prev) => ({
                    ...prev,
                    Status: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
