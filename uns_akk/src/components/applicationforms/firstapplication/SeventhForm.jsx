import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function SeventhForm({ model, setModel, ...rest }) {
  const { t } = useTranslation();

  useEffect(() => {
    document.getElementById("form7").scrollIntoView();
  }, []);

  const schema = Yup.object().shape({
    NameSurnameLeader: Yup.string().required(t("FillField")),
    AddressLeader: Yup.string().required(t("FillField")),
    PhoneNumberLeader: Yup.string().required(t("FillField")),
    FaxLeader: Yup.string().required(t("FillField")),
    EmailLeader: Yup.string().required(t("FillField")),
    NameSurnameCoordinator: Yup.string().required(t("FillField")),
    AddressCoordinator: Yup.string().required(t("FillField")),
    PhoneNumberCoordinator: Yup.string().required(t("FillField")),
    FaxCoordinator: Yup.string().required(t("FillField")),
    EmailCoordinator: Yup.string().required(t("FillField")),
    PlaceOfApplication: Yup.string().required(t("FillField")),
  });
  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    // onSubmit: () => rest.setShowEighthForm(true),
    onSubmit: () => rest.submit(),
  });
  return (
    <form
      id='form7'
      onSubmit={formik.handleSubmit}
      className='animation animation-bot-top'
    >
      <div className='row'>
        <h3 className='card-title text-start '>{t("PartC")}</h3>
        <h4 className='card-title text-start '>{t("PartC.1")}</h4>
        <hr />
        <h5 className='card-title text-start '>C1.1{t("PartC1.1")}</h5>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='row'>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Name") + " " + t("Surname")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setModel((prev) => ({
                      ...prev,
                      NameSurnameLeader: e.target.value,
                    }));
                    formik.setFieldValue("NameSurnameLeader", e.target.value);
                  }}
                />
                {formik.errors.NameSurnameLeader && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.NameSurnameLeader}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Address")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setModel((prev) => ({
                      ...prev,
                      AddressLeader: e.target.value,
                    }));
                    formik.setFieldValue("AddressLeader", e.target.value);
                  }}
                />
                {formik.errors.NameSurnameLeader && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.NameSurnameLeader}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("PhoneNumber")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setModel((prev) => ({
                      ...prev,
                      PhoneNumberLeader: e.target.value,
                    }));
                    formik.setFieldValue("PhoneNumberLeader", e.target.value);
                  }}
                />
                {formik.errors.PhoneNumberLeader && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.PhoneNumberLeader}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Fax")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setModel((prev) => ({
                      ...prev,
                      FaxLeader: e.target.value,
                    }));
                    formik.setFieldValue("FaxLeader", e.target.value);
                  }}
                />
                {formik.errors.FaxLeader && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.FaxLeader}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Email")}</label>
                <input
                  type='email'
                  onChange={(e) => {
                    setModel((prev) => ({
                      ...prev,
                      EmailLeader: e.target.value,
                    }));
                    formik.setFieldValue("EmailLeader", e.target.value);
                  }}
                />
                {formik.errors.EmailLeader && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.EmailLeader}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr />

        <h5 className='card-title text-start '>C1.2 {t("PartC1.2")}</h5>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='row'>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Name") + " " + t("Surname")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setModel((prev) => ({
                      ...prev,
                      NameSurnameCoordinator: e.target.value,
                    }));
                    formik.setFieldValue(
                      "NameSurnameCoordinator",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.NameSurnameCoordinator && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.NameSurnameCoordinator}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Address")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setModel((prev) => ({
                      ...prev,
                      AddressCoordinator: e.target.value,
                    }));
                    formik.setFieldValue("AddressCoordinator", e.target.value);
                  }}
                />
                {formik.errors.NameSurnameCoordinator && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.NameSurnameCoordinator}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("PhoneNumber")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setModel((prev) => ({
                      ...prev,
                      PhoneNumberCoordinator: e.target.value,
                    }));
                    formik.setFieldValue(
                      "PhoneNumberCoordinator",
                      e.target.value
                    );
                  }}
                />
                {formik.errors.PhoneNumberCoordinator && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.PhoneNumberCoordinator}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Fax")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setModel((prev) => ({
                      ...prev,
                      FaxCoordinator: e.target.value,
                    }));
                    formik.setFieldValue("FaxCoordinator", e.target.value);
                  }}
                />
                {formik.errors.FaxCoordinator && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.FaxCoordinator}
                  </span>
                )}
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Email")}</label>
                <input
                  type='text'
                  onChange={(e) => {
                    setModel((prev) => ({
                      ...prev,
                      EmailCoordinator: e.target.value,
                    }));
                    formik.setFieldValue("EmailCoordinator", e.target.value);
                  }}
                />
                {formik.errors.EmailCoordinator && (
                  <span className='text-danger mt-2 '>
                    {formik.errors.EmailCoordinator}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr />

        <h5 className='card-title text-start '>C1.5 {t("PartC1.5")}</h5>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='col-xxl-3 col-lg-5 col-sm-12'>
            <div className='form-group'>
              <input
                type='text'
                onChange={(e) => {
                  setModel((prev) => ({
                    ...prev,
                    PlaceOfApplication: e.target.value,
                  }));
                  formik.setFieldValue("PlaceOfApplication", e.target.value);
                }}
              />
              {formik.errors.PlaceOfApplication && (
                <span className='text-danger mt-2 '>
                  {formik.errors.PlaceOfApplication}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2 text-end'>
          <div className='button-list'>
            <button
              type='button'
              onClick={(e) =>
                rest.setShowValidationForm(!rest.showValidationForm)
              }
              className='btn btn-warning rounded-pill '
            >
              Aplikimi per validim
            </button>
            {!rest.showValidationForm && (
              <button
                type='submit'
                className='btn btn btn-primary btn-soft-blue rounded-pill '
              >
                {t("Apply")}
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
