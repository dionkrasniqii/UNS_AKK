import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import CustomFileInput from "../../custom/CustomFileInput";

export default function SecondForm({ model, setModel, ...rest }) {
  const { t } = useTranslation();
  useEffect(() => {
    document.getElementById("form2").scrollIntoView();
  }, []);

  const schema = Yup.object().shape({
    RegistrationNumber: Yup.string().required(
      t("PleaseFillRegistartionNumber")
    ),
    FiscalNumber: Yup.string().required(t("PleaseFillFiscalNumber")),
    CertificateRegisterDocA15: Yup.string().required(t("UploadDoc")),
    MASHTLicense: Yup.string().required(t("UploadDoc")),
  });

  async function setMASHTLicenseFiles(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "MASHTLicenseA16"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "MASHTLicenseA16",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("MASHTLicense", files);
  }
  async function setCertificateFiles(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "CertificateRegisterDocA15"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "CertificateRegisterDocA15",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("CertificateRegisterDocA15", files);
  }
  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => rest.setShowThirdForm(true),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="animation animation-bot-top"
      id="form2"
    >
      <div className="row">
        <h5 className="card-title text-start ">
          A.1.5 {t("LegalEntityStatus")}
        </h5>
        <div className="col-xxl-3 col-lg-3 col-sm-12 mt-2">
          <label className="form-label">{t("RegistrationNumber")}</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => {
              setModel({
                ...model,
                RegisterNrA15: e.target.value,
              });
              formik.setFieldValue("RegistrationNumber", e.target.value);
            }}
          />
          {formik.errors.RegistrationNumber && (
            <span className="text-danger">
              {formik.errors.RegistrationNumber}
            </span>
          )}
        </div>
        <div className="col-xxl-3 col-lg-3 col-sm-12 mt-2">
          <label className="form-label">{t("FiscalNumber")}</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => {
              setModel({
                ...model,
                FiscalNrA15: e.target.value,
              });
              formik.setFieldValue("FiscalNumber", e.target.value);
            }}
          />
          {formik.errors.FiscalNumber && (
            <span className="text-danger">{formik.errors.FiscalNumber}</span>
          )}
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-xxl-6 col-lg-6 col-sm-12 mt-2 ">
              <label className="form-label text-start">
                {t("RegistrationCertificate")}
              </label>
              <textarea
                type="text"
                rows={3}
                className="form-control mb-3"
                // onChange={(e) => {
                //   setModel({
                //     ...model,
                //     QualificationName: e.target.value,
                //   });
                //   formik.setFieldValue("QualificationName", e.target.value);
                // }}
              />
              <CustomFileInput
                onChangeFunction={setCertificateFiles}
                acceptType={".pdf"}
                isMultiple={true}
              />
              {formik.errors.CertificateRegisterDocA15 && (
                <span className="text-danger">
                  {formik.errors.CertificateRegisterDocA15}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-3" />
      <div className="row">
        <h5 className="card-title text-start ">
          A.1.6{" "}
          {t(
            "Nëse jeni të licencuar si ofrues i arsimit nga MASHT, ofroni dëshmi."
          )}
        </h5>
        <div className="col-xxl-6 col-lg-6 col-sm-12 mt-2 ">
          <label className="form-label text-start">{t("LicenseMASHT")}</label>
          <textarea
            type="text"
            rows={3}
            className="form-control mb-3"
            // onChange={(e) => {
            //   setModel({
            //     ...model,
            //     QualificationName: e.target.value,
            //   });
            //   formik.setFieldValue("QualificationName", e.target.value);
            // }}
          />
          <CustomFileInput
            onChangeFunction={setMASHTLicenseFiles}
            acceptType={".pdf"}
            isMultiple={true}
          />
          {formik.errors.MASHTLicense && (
            <span className="text-danger">{formik.errors.MASHTLicense}</span>
          )}
        </div>
      </div>
      {!rest.showThirdForm && (
        <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2 text-end">
          <button
            type="submit"
            className="btn btn btn-primary btn-soft-blue rounded-pill "
          >
            {t("Next")}
          </button>
        </div>
      )}
      <hr />
    </form>
  );
}
