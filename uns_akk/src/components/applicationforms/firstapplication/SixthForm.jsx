import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import CustomFileInput from "../../custom/CustomFileInput";

export default function SixthForm({ model, setModel, ...rest }) {
  const { t } = useTranslation();

  useEffect(() => {
    document.getElementById("form6").scrollIntoView();
  }, []);

  async function changeManagementOfQualityDocs(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "ManagementOfQualityDocs"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ManagementOfQualityDocs",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("ManagementOfQualityDocs", 1);
  }

  async function changeDataOfAssuranceDocs(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "DataOfAssurance"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "DataOfAssurance",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("DataOfAssurance", 1);
  }

  async function changeManagementQualityCertificationFiles(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "ManagementQualityCertification"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ManagementQualityCertification",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("ManagementQualityCertification", files);
  }
  async function changePoliticsAndProcedures(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "PoliticsAndProcedures"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "PoliticsAndProcedures",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("PoliticsAndProcedures", files);
  }
  async function changeHandicapDocs(files) {
    const newArray = model.Docs.filter((file) => file.Type != "HandicapDocs");
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "HandicapDocs",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("HandicapDocs", files);
  }
  async function changePoliticsProceduresDocs(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "PoliticsProceduresDocs"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "PoliticsProceduresDocs",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("PoliticsProceduresDocs", files);
  }
  async function changeSystemCreditsDocs(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "SystemCreditsDocs"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "SystemCreditsDocs",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("SystemCreditsDocs", files);
  }
  async function changeEnviromentDocs(files) {
    const newArray = model.Docs.filter((file) => file.Type != "EnviromentDocs");
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "EnviromentDocs",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("EnviromentDocs", files);
  }
  async function changeCertificateDoc(files) {
    const newArray = model.Docs.filter((file) => file.Type != "CertificateDoc");
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "CertificateDoc",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("CertificateDoc", files);
  }
  async function changeReportRVVDoc(files) {
    const newArray = model.Docs.filter((file) => file.Type != "ReportRVVDoc");
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ReportRVVDoc",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("ReportRVVDoc", files);
  }
  async function changeFormatOfModuleDoc(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "FormatOfModuleDoc"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "FormatOfModuleDoc",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("FormatOfModuleDoc", files);
  }

  const schema = Yup.object().shape({
    ManagementOfQualityDocs: Yup.mixed().required(t("UploadDocuments")),
    DataOfAssurance: Yup.mixed().required(t("UploadDocuments")),
    ManagementQualityCertification: Yup.mixed().required(t("UploadDocuments")),
    PoliticsAndProcedures: Yup.mixed().required(t("UploadDocuments")),
    HandicapDocs: Yup.mixed().required(t("UploadDocuments")),
    PoliticsProceduresDocs: Yup.mixed().required(t("UploadDocuments")),
    SystemCreditsDocs: Yup.mixed().required(t("UploadDocuments")),
    EnviromentDocs: Yup.mixed().required(t("UploadDocuments")),
    CertificateDoc: Yup.mixed().required(t("UploadDocuments")),
    ReportRVVDoc: Yup.mixed().required(t("UploadDocuments")),
    FormatOfModuleDoc: Yup.mixed().required(t("UploadDocuments")),
    B11Text: Yup.string().required(t("FillField")),
    B12Text: Yup.string().required(t("FillField")),
    B13Text: Yup.string().required(t("FillField")),
    B14Text: Yup.string().required(t("FillField")),
    B15Text: Yup.string().required(t("FillField")),
    B16Text: Yup.string().required(t("FillField")),
    B17Text: Yup.string().required(t("FillField")),
    B18Text: Yup.string().required(t("FillField")),
  });
  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => rest.setShowSeventhForm(true),
  });

  return (
    <form
      id='form6'
      onSubmit={formik.handleSubmit}
      className='animation animation-bot-top'
    >
      <div className='row'>
        <h3 className='card-title text-start '>{t("PartB")}</h3>
        <h4 className='card-title text-start '>{t("PartBFirstDesc")}</h4>
        <h4 className='card-title'>B.1 {t("PartBSecondDesc")}</h4>
        <hr />
        <h5 className='card-title'>B.1.1 {t("ManagementOfQuality")}</h5>
        <p className='text-muted'>
          {t("DataIncludes")}
          <br />• {t("ImplementationPlan")},
          <br />• {t("InsidePolitics")},
          <br /> • {t("VerifyPolitics")}.
        </p>
        <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 '>
          <textarea
            type='text'
            rows={3}
            className='form-control mb-3'
            onChange={(e) => {
              setModel({
                ...model,
                B11Text: e.target.value,
              });
              formik.setFieldValue("B11Text", e.target.value);
            }}
          />
          {formik.errors.B11Text && (
            <span className='text-danger'>{formik.errors.B11Text}</span>
          )}
        </div>
        <CustomFileInput
          onChangeFunction={changeManagementOfQualityDocs}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {formik.errors.ManagementOfQualityDocs && (
          <span className='text-danger mt-2 '>
            {formik.errors.ManagementOfQualityDocs}
          </span>
        )}
        <hr className='mt-2' />
        <h5 className='card-title text-start'>B.1.2 {t("DataOfAssurance")}.</h5>
        <p className='text-muted'>
          {t("DataAssurance1")}:
          <br />• {t("DataAssurance2")},
          <br />• {t("DataAssurance3")},
          <br />• {t("DataAssurance4")},
          <br />• {t("DataAssurance5")}.
        </p>
        <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 '>
          <textarea
            type='text'
            rows={3}
            className='form-control mb-3'
            onChange={(e) => {
              setModel({
                ...model,
                B12Text: e.target.value,
              });
              formik.setFieldValue("B12Text", e.target.value);
            }}
          />
          {formik.errors.B12Text && (
            <span className='text-danger'>{formik.errors.B12Text}</span>
          )}
        </div>
        <CustomFileInput
          onChangeFunction={changeDataOfAssuranceDocs}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {formik.errors.DataOfAssurance && (
          <span className='text-danger mt-2'>
            {formik.errors.DataOfAssurance}
          </span>
        )}
        <hr className='mt-2' />
        <h5 className='card-title text-start '>
          B.1.3 {t("ManagementQualityCertification")}
        </h5>
        <p className='text-muted'>
          {t("Declare")}:
          <br />• {t("Declare1")},
          <br />• {t("Declare2")},
          <br />• {t("Declare3")}.
        </p>
        <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 '>
          <textarea
            type='text'
            rows={3}
            className='form-control mb-3'
            onChange={(e) => {
              setModel({
                ...model,
                B13Text: e.target.value,
              });
              formik.setFieldValue("B13Text", e.target.value);
            }}
          />
          {formik.errors.B13Text && (
            <span className='text-danger'>{formik.errors.B13Text}</span>
          )}
        </div>
        <CustomFileInput
          onChangeFunction={changeManagementQualityCertificationFiles}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {formik.errors.ManagementQualityCertification && (
          <span className='text-danger mt-2'>
            {formik.errors.ManagementQualityCertification}
          </span>
        )}
        <hr className='mt-2' />
        <h5 className='card-title text-start '>B.1.4 {t("PoliticsB14")}</h5>
        <p className='text-muted'>
          {t("Declare")}:
          <br />• {t("Proves")},
          <br />• {t("DevelopmentPolitics")},
          <br />• {t("DocsForPerformance")}.
        </p>
        <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 '>
          <textarea
            type='text'
            rows={3}
            className='form-control mb-3'
            onChange={(e) => {
              setModel({
                ...model,
                B14Text: e.target.value,
              });
              formik.setFieldValue("B14Text", e.target.value);
            }}
          />
          {formik.errors.B14Text && (
            <span className='text-danger'>{formik.errors.B14Text}</span>
          )}
        </div>
        <CustomFileInput
          onChangeFunction={changePoliticsAndProcedures}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {formik.errors.PoliticsAndProcedures && (
          <span className='text-danger mt-2'>
            {formik.errors.PoliticsAndProcedures}
          </span>
        )}
        <hr className='mt-2' />
        <h5 className='card-title text-start '>
          B.1.5 {t("HandicapesPolitics")}
        </h5>
        <p className='text-muted'>
          {t("Declare")}:
          <br />• {t("Proves")},
          <br />• {t("Handicapes1")},
          <br />• {t("Handicapes2")},
          <br />• {t("Handicapes3")},
          <br />• {t("Handicapes4")},
          <br />• {t("Handicapes5")}.
        </p>
        <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 '>
          <textarea
            type='text'
            rows={3}
            className='form-control mb-3'
            onChange={(e) => {
              setModel({
                ...model,
                B15Text: e.target.value,
              });
              formik.setFieldValue("B15Text", e.target.value);
            }}
          />
          {formik.errors.B15Text && (
            <span className='text-danger'>{formik.errors.B15Text}</span>
          )}
        </div>
        <CustomFileInput
          onChangeFunction={changeHandicapDocs}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {formik.errors.HandicapDocs && (
          <span className='text-danger mt-2'>{formik.errors.HandicapDocs}</span>
        )}
        <hr className='mt-2' />
        <h5 className='card-title text-start '>
          B.1.6 {t("PoliticsProcedures")}
        </h5>
        <p className='text-muted'>
          {t("Declare")}:
          <br />• {t("PoliticsProcedures1")},
          <br />• {t("PoliticsProcedures2")},
          <br />• {t("PoliticsProcedures3")}.
        </p>
        <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 '>
          <textarea
            type='text'
            rows={3}
            className='form-control mb-3'
            onChange={(e) => {
              setModel({
                ...model,
                B16Text: e.target.value,
              });
              formik.setFieldValue("B16Text", e.target.value);
            }}
          />
          {formik.errors.B16Text && (
            <span className='text-danger'>{formik.errors.B16Text}</span>
          )}
        </div>
        <CustomFileInput
          onChangeFunction={changePoliticsProceduresDocs}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {formik.errors.PoliticsProceduresDocs && (
          <span className='text-danger mt-2'>
            {formik.errors.PoliticsProceduresDocs}
          </span>
        )}
        <hr className='mt-2' />
        <h5 className='card-title text-start '>B.1.7 {t("SystemCredits")}</h5>
        <p className='text-muted'>
          {t("Declare")}:
          <br />• {t("SystemCredits1")}.
        </p>
        <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 '>
          <textarea
            type='text'
            rows={3}
            className='form-control mb-3'
            onChange={(e) => {
              setModel({
                ...model,
                B17Text: e.target.value,
              });
              formik.setFieldValue("B17Text", e.target.value);
            }}
          />
          {formik.errors.B17Text && (
            <span className='text-danger'>{formik.errors.B17Text}</span>
          )}
        </div>
        <CustomFileInput
          onChangeFunction={changeSystemCreditsDocs}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {formik.errors.SystemCreditsDocs && (
          <span className='text-danger mt-2'>
            {formik.errors.SystemCreditsDocs}
          </span>
        )}
        <hr className='mt-2' />
        <h5 className='card-title text-start '>B.1.8 {t("SafeEnviroment")}</h5>
        <p className='text-muted'>
          {t("Declare")}:
          <br />• {t("SafeEnviroment1")},
          <br />• {t("SafeEnviroment2")},
          <br />• {t("SafeEnviroment3")},
          <br />• {t("SafeEnviroment4")}.
        </p>
        <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 '>
          <textarea
            type='text'
            rows={3}
            className='form-control mb-3'
            onChange={(e) => {
              setModel({
                ...model,
                B18Text: e.target.value,
              });
              formik.setFieldValue("B18Text", e.target.value);
            }}
          />
          {formik.errors.B18Text && (
            <span className='text-danger'>{formik.errors.B18Text}</span>
          )}
        </div>
        <CustomFileInput
          onChangeFunction={changeEnviromentDocs}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {formik.errors.EnviromentDocs && (
          <span className='text-danger mt-2'>
            {formik.errors.EnviromentDocs}
          </span>
        )}
        <hr className='mt-2' />
        <h5 className='card-title text-start '>B.1.9 {t("B1.9")}</h5>
        <p className='text-muted'>{t("ModelOfCertificate")}.</p>
        <CustomFileInput
          onChangeFunction={changeCertificateDoc}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {formik.errors.CertificateDoc && (
          <span className='text-danger mt-2'>
            {formik.errors.CertificateDoc}
          </span>
        )}
        <hr className='mt-2' />
        <h5 className='card-title text-start '>{t("ReportRVV")}</h5>
        <CustomFileInput
          onChangeFunction={changeReportRVVDoc}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {formik.errors.ReportRVVDoc && (
          <span className='text-danger mt-2'>{formik.errors.ReportRVVDoc}</span>
        )}
        <hr className='mt-2' />
        <h5 className='card-title text-start '>{t("FormatOfModule")}</h5>
        <CustomFileInput
          onChangeFunction={changeFormatOfModuleDoc}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {formik.errors.FormatOfModuleDoc && (
          <span className='text-danger mt-2'>
            {formik.errors.FormatOfModuleDoc}
          </span>
        )}
        <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2 text-end'>
          {!rest.showSeventhForm && (
            <button
              type='submit'
              className='btn btn btn-primary btn-soft-blue rounded-pill '
            >
              {t("Next")}
            </button>
          )}
        </div>
      </div>
      <hr />
    </form>
  );
}
