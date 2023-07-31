import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomFileInput from "../../custom/CustomFileInput";
export default function ThirdForm({ model, setModel, ...rest }) {
  const { t } = useTranslation();

  useEffect(() => {
    document.getElementById("form2").scrollIntoView();
  }, []);

  async function setFiles(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "QualificatinDocsA17"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "QualificatinDocsA17",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("Docs", files);
  }
  const schema = Yup.object().shape({
    Period: Yup.string().required(t("FillField")),
    Docs: Yup.mixed().required(t("UploadDocuments")),
  });
  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => rest.setShowFourthForm(true),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='animation animation-bot-top'
      id='form3'
    >
      <div className='row'>
        <h5 className='card-title text-start'> {t("EarlierDecisions")}</h5>
        <p className='text-muted'>{t("NecessaryDateForEarlierDecisions")}</p>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='col-xxl-4 col-lg-6 col-sm-12'>
            <div className='form-group'>
              <label>{t("NotePeriod")}</label>
              <input
                type='text'
                onChange={(e) => {
                  setModel({
                    ...model,
                    QualificationPeriodA17: e.target.value,
                  });
                  formik.setFieldValue("Period", e.target.value);
                }}
              />
              {formik.errors.Period && (
                <span className='text-danger'>{formik.errors.Period}</span>
              )}
            </div>
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2'>
          <CustomFileInput
            onChangeFunction={setFiles}
            acceptType={".pdf"}
            isMultiple={true}
          />
          {formik.errors.Docs && (
            <span className='text-danger'>{formik.errors.Docs}</span>
          )}
        </div>
        {!rest.showFourthForm && (
          <div className='col-xxl-12 col-lg-12 col-sm-12 text-end mt-2'>
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
