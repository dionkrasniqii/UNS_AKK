import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import CustomFileInput from "../../custom/CustomFileInput";

export default function FifthForm({ model, setModel, ...rest }) {
  const { t } = useTranslation();

  useEffect(() => {
    document.getElementById("form5").scrollIntoView();
  }, []);
  const schema = Yup.object().shape({
    InstitutionsDocs: Yup.mixed().required(t("UploadDocuments")),
    Tools: Yup.mixed().required(t("UploadDocuments")),
    Staff: Yup.mixed().required(t("UploadDocuments")),
  });
  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => SubmitForm(),
  });
  async function SubmitForm() {
    rest.submit();
  }

  async function changeInstitutionsDocs(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "InstitutionDocsA21"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "InstitutionDocsA21",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("InstitutionsDocs", 1);
  }
  async function changeTools(files) {
    const newArray = model.Docs.filter((file) => file.Type != "ToolsA22");
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ToolsA22",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("Tools", 1);
  }
  async function changeStaff(files) {
    const newArray = model.Docs.filter((file) => file.Type != "StaffA23");
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "StaffA23",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("Staff", 1);
  }

  async function changeOtherRequests(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "OtherRequestsA25"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "OtherRequestsA25",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
  }
  return (
    <form
      id='form5'
      onSubmit={formik.handleSubmit}
      className='animation animation-bot-top'
    >
      <div className='row'>
        <h4 className='card-title text-start '>
          {t(
            "Data on resources for fulfilling the criteria for the qualification/module"
          )}
        </h4>
        <h5 className='card-title'>
          {t(
            "Data on the institution, including management and financial status"
          )}
        </h5>
        <p className='text-muted'>
          {t("FirstDesc5")}
          <br />
          {t("SecondDesc5")}
          <br />• {t("Spaces")},
          <br /> • {t("StructureAndNumberOfEmployees")},
          <br /> • {t("WorkRegulations")},
          <br />• {t("CopyContrant")},
          <br /> • {t("CandidatePortofolio")}
          <br />• {t("FinancialReports")},
          <br />• {t("StrategicPlan")},
          <br />• {t("BusinessPlan")}.
        </p>

        <CustomFileInput
          onChangeFunction={changeInstitutionsDocs}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {formik.errors.InstitutionsDocs && (
          <span className='text-danger mt-2 '>
            {formik.errors.InstitutionsDocs}
          </span>
        )}
        <hr className='mt-2' />
        <h5 className='card-title text-start '>{t("ToolsForQualification")}</h5>
        <p className='text-muted'>{t("ToolsDesc")}</p>
        <CustomFileInput
          onChangeFunction={changeTools}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {formik.errors.Tools && (
          <span className='text-danger mt-2'>{formik.errors.Tools}</span>
        )}
        <hr className='mt-2' />
        <h5 className='card-title text-start '>{t("StaffData")}.</h5>
        <p className='text-muted'>
          {t("Append")}:
          <br />• {t("StaffDesc1")},
          <br />• {t("StaffDesc2")}
          <br />• {t("StaffDesc3")}.
        </p>
        <CustomFileInput
          onChangeFunction={changeStaff}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {formik.errors.Staff && (
          <span className='text-danger mt-2'>{formik.errors.Staff}</span>
        )}
        <hr className='mt-2' />
        <h5 className='card-title text-start '>{t("OtherRequest")}</h5>
        <p className='text-muted'>{t("OtherRequestDesc")}</p>
        <CustomFileInput
          onChangeFunction={changeOtherRequests}
          acceptType={".pdf"}
          isMultiple={true}
        />
        <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2 text-end'>
          {!rest.load ? (
            <button
              type='submit'
              className='btn btn btn-primary btn-soft-blue rounded-pill '
            >
              {t("Apply")}
            </button>
          ) : (
            <div
              className='spinner-border text-primary m-2 text-center'
              role='status'
            />
          )}
        </div>
      </div>
      <hr />
    </form>
  );
}
