import { faPray } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export default function FourthForm({ model, setModel, ...rest }) {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(0);

  useEffect(() => {
    document.getElementById("form4").scrollIntoView();
  }, []);

  const schema = Yup.object().shape({
    TypeOfAccreditation: Yup.boolean().required(
      t("ChooseOneOfAccreditationType")
    ),
    Text: Yup.string().required(t("FillField")),
  });
  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => rest.setShowFifthForm(true),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      id='form4'
      className='animation animation-bot-top'
    >
      <div className='row'>
        <h5 className='card-title text-start '>{t("TypeOfAccredication")}</h5>
        <div className='col-xxl-3 col-lg-4 col-sm-12'>
          <div className='form-check text-start'>
            <input
              key={1}
              type='radio'
              id='customRadio1'
              name='customRadio1'
              checked={model.OfferNoValidationCertificationA18}
              className='form-check-input'
              onChange={(e) => {
                setModel({
                  ...model,
                  OfferNoValidationCertificationA18: true,
                  OfferValidationCertificationA18: false,
                  ValidationCertificationNotOfferA18: false,
                });
                formik.setFieldValue("TypeOfAccreditation", e.target.checked);
              }}
            />
            <label className='form-check-label ps-1' htmlFor='customRadio1'>
              {t("ForDeliveryNotEvaluationAndCertification")}
            </label>
          </div>
        </div>
        <div className='col-xxl-3 col-lg-4 col-sm-12'>
          <div className='form-check text-start'>
            <input
              key={2}
              type='radio'
              id='customRadio2'
              name='customRadio2'
              checked={model.ValidationCertificationNotOfferA18}
              className='form-check-input'
              onChange={(e) => {
                setModel({
                  ...model,
                  OfferNoValidationCertificationA18: false,
                  OfferValidationCertificationA18: false,
                  ValidationCertificationNotOfferA18: true,
                });
                formik.setFieldValue("TypeOfAccreditation", e.target.checked);
              }}
            />
            <label className='form-check-label ps-1' htmlFor='customRadio2'>
              {t("ForAssessmentAndCertificatioNotDelivery")}
            </label>
          </div>
        </div>
        <div className='col-xxl-3 col-lg-4 col-sm-12'>
          <div className='form-check text-start'>
            <input
              key={3}
              type='radio'
              id='customRadio3'
              name='customRadio3'
              checked={model.OfferValidationCertificationA18}
              className='form-check-input'
              onChange={(e) => {
                setModel({
                  ...model,
                  OfferNoValidationCertificationA18: false,
                  OfferValidationCertificationA18: true,
                  ValidationCertificationNotOfferA18: false,
                });
                formik.setFieldValue("TypeOfAccreditation", e.target.checked);
              }}
            />
            <label className='form-check-label ps-1' htmlFor='customRadio3'>
              {t("ForAssessmentAndCertificatioDelivery")}
            </label>
          </div>
        </div>
        {formik.errors.TypeOfAccreditation && (
          <span className='text-danger text-center mt-2 fs-5'>
            {formik.errors.TypeOfAccreditation}
          </span>
        )}
        <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2'>
          <label className='form-label'>{t("OfferAdditionalData")}</label>
          <textarea
            className='form-control'
            rows={5}
            onChange={(e) => {
              setModel({
                ...model,
                TextA18: e.target.value,
              });
              formik.setFieldValue("Text", e.target.value);
            }}
          />
          {formik.errors.Text && (
            <span className='text-danger text-center mt-2 fs-5'>
              {formik.errors.Text}
            </span>
          )}
        </div>
        {!rest.showFifthForm && (
          <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2 text-end'>
            <button
              type='submit'
              className='btn btn btn-primary btn-soft-blue rounded-pill '
            >
              {t("Next")}
            </button>
          </div>
        )}
      </div>
      <hr />
    </form>
  );
}
