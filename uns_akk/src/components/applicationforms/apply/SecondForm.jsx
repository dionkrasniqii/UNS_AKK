import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Upload } from "antd";

export default function SecondForm({ model, setModel, ...rest }) {
  const { t } = useTranslation();
  useEffect(() => {
    document.getElementById("form2").scrollIntoView();
  }, []);

  async function changeLicenseMASHT(file) {
    const newArray = model.Docs.filter((item) => {
      return item.Type != "MASHTLicenseA16";
    });
    file.status !== "removed" &&
      newArray.push({ Type: "MASHTLicenseA16", Doc: file });
    setModel({
      ...model,
      Docs: [...newArray],
    });
    formik.setFieldValue("MASHTLicense", file);
  }
  async function changeCertificateRegistration(file) {
    const newArray = model.Docs.filter((item) => {
      return item.Type != "CertificateRegisterDocA15";
    });
    file.status !== "removed" &&
      newArray.push({ Type: "CertificateRegisterDocA15", Doc: file });
    setModel({
      ...model,
      Docs: [...newArray],
    });
    formik.setFieldValue("CertificateRegisterDocA15", file);
  }
  const schema = Yup.object().shape({
    RegistrationNumber: Yup.string().required(
      t("PleaseFillRegistartionNumber")
    ),
    // FiscalNumber: Yup.string().required(t("PleaseFillFiscalNumber")),
    CertificateRegisterDocA15: Yup.string().required(t("UploadDoc")),
    MASHTLicense: Yup.string().required(t("UploadDoc")),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => SubmitForm(),
  });

  async function SubmitForm() {
    rest.setShowThirdForm(true);
  }
  return (
    <form
      onSubmit={formik.handleSubmit}
      className='animation animation-bot-top'
      id='form2'
    >
      <div className='row'>
        <h5 className='card-title text-start '>{t("LegalEntityStatus")}</h5>
        <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
          <label className='form-label'>{t("RegistrationNumber")}</label>
          <input
            type='number'
            className='form-control'
            onChange={(e) => {
              setModel({
                ...model,
                RegisterNrA15: e.target.value,
              });
              formik.setFieldValue("RegistrationNumber", e.target.value);
            }}
          />
          {formik.errors.RegistrationNumber && (
            <span className='text-danger'>
              {formik.errors.RegistrationNumber}
            </span>
          )}
        </div>
        <div className='col-xxl-3 col-lg-3 col-sm-12 mt-2'>
          <label className='form-label'>{t("FiscalNumber")}</label>
          <input
            type='number'
            className='form-control'
            onChange={(e) => {
              setModel({
                ...model,
                FiscalNrA15: e.target.value,
              });
              // formik.setFieldValue("FiscalNumber", e.target.value);
            }}
          />
          {/* {formik.errors.FiscalNumber && (
            <span className='text-danger'>{formik.errors.FiscalNumber}</span>
          )} */}
        </div>
        <div className='col-12'>
          <div className='row'>
            <div className='col-xxl-2 col-lg-3 col-md-3 col-sm-12 mt-2 '>
              <label className='form-label text-start'>
                {t("RegistrationCertificate")}
              </label>
              <Upload
                beforeUpload={() => false}
                listType='picture-circle'
                maxCount={1}
                accept='.pdf'
                onChange={(e) => changeCertificateRegistration(e.file)}
              >
                {t("UploadDoc")}
              </Upload>
              {formik.errors.CertificateRegisterDocA15 && (
                <span className='text-danger'>
                  {formik.errors.CertificateRegisterDocA15}
                </span>
              )}
            </div>
            {console.log(model.Docs)}
            <div className='col-xxl-2 col-lg-3 col-md-3 col-sm-12 mt-2 '>
              <label className='form-label text-start'>
                {t("LicenseMASHT")}
              </label>
              <Upload
                beforeUpload={() => false}
                listType='picture-circle'
                maxCount={1}
                accept='.pdf'
                onChange={(e) => changeLicenseMASHT(e.file)}
              >
                {t("UploadDoc")}
              </Upload>
              {formik.errors.MASHTLicense && (
                <span className='text-danger'>
                  {formik.errors.MASHTLicense}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {!rest.showThirdForm && (
        <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2 text-end'>
          <button
            type='submit'
            className='btn btn btn-primary btn-soft-blue rounded-pill '
          >
            {t("Next")}
          </button>
        </div>
      )}
      <hr />
    </form>
  );
}
