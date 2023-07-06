import React from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomFileInput from "../../custom/CustomFileInput";
export default function ThirdForm({ model, setModel, ...rest }) {
  const { t } = useTranslation();
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
  }
  const schema = Yup.object().shape({});
  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => SubmitForm(),
  });
  async function SubmitForm() {
    rest.setShowFourthForm(true);
  }
  return (
    <form
      onSubmit={formik.handleSubmit}
      className='animation animation-bot-top'
    >
      <div className='row'>
        <h5 className='card-title text-start'>A1.7 {t("EarlierDecisions")}</h5>
        <p className='text-muted'>{t("NecessaryDateForEarlierDecisions")}</p>
        <CustomFileInput
          onChangeFunction={setFiles}
          acceptType={".pdf"}
          isMultiple={true}
        />
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
