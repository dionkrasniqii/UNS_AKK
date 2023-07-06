import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import CustomFileInput from "../../custom/CustomFileInput";

export default function FifthForm({ model, setModel, ...rest }) {
  const { t } = useTranslation();
  const schema = Yup.object().shape({
    InstitutionsDocs: Yup.mixed().required(t("UploadDocuments")),
    Tools: Yup.mixed().required(t("UploadDocuments")),
    Staff: Yup.mixed().required(t("UploadDocuments")),
    Candidates: Yup.mixed().required(t("UploadDocuments")),
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
  async function changeCandidates(files) {
    const newArray = model.Docs.filter((file) => file.Type != "CandidatesA24");
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "CandidatesA24",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
    formik.setFieldValue("Candidates", 1);
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
      onSubmit={formik.handleSubmit}
      className='animation animation-bot-top'
    >
      <div className='row'>
        <h4 className='card-title text-start '>
          A2 Të dhënat mbi resurset për plotësimin e kritereve për
          kualifikimin/modulin
        </h4>
        <h5 className='card-title'>
          A2.1 Të dhënat për institucionin, përfshirë menaxhimin dhe gjendjen
          financiare
        </h5>
        <p className='text-muted'>
          Shënim: Kriteret për akreditim kërkojnë që institucionet të kenë
          strukturë të përshtatshme e cila funksionon në baza të qëndrueshme
          financiare. Të dhënat përfshijnë:,
          <br />
          • Dëshmitë për pronësinë/ marrjen në shfrytëzim (objektit, pajisjeve,
          etj.), kohëzgjatja t’i përgjigjet periudhës së akreditimit.
          <br />• Hapësirat,
          <br /> • Strukturën organizative dhe numrin e të punësuarve,
          <br /> • Rregulloren e punës,
          <br />• Kopjen e kontratës ndërmjet institucionit, kandidatit/prindit
          <br /> • Portfolio e kandidatit nga regjistrimi deri ne certifikim
          <br />• Raportet financiare për tri vitet e fundit,
          <br />• Planin strategjik për tri vitet e fundit,
          <br />• Planin e biznesit.
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
        <h5 className='card-title text-start '>
          A2.2 Pajisjet dhe materialet për kualifikim/modul
        </h5>
        <p className='text-muted'>
          Paraqit të dhënat për pajisjet dhe materialet në dispozicion për
          ofrimin, vlerësimin dhe certifikimin e kualifikimit/modulit.
        </p>
        <CustomFileInput
          onChangeFunction={changeTools}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {formik.errors.Tools && (
          <span className='text-danger mt-2'>{formik.errors.Tools}</span>
        )}
        <hr className='mt-2' />
        <h5 className='card-title text-start '>
          A2.3 Të dhënat për stafin, për ofrim, vlerësim dhe certifikim të
          kualifikimit/modulit
        </h5>
        <p className='text-muted'>
          Paraqit:
          <br />• Listën e stafit menaxhues dhe profesional që përfshihen në
          ofrimin, vlerësimin dhe certifikimin e kualifikimit/modulit (CV-të
          sipas formatit Europass),
          <br />• Kontratat e punës kohëzgjatja e së cilës përputhet me kohën e
          kërkuar për akreditim
          <br />• Vendimin për përcaktimin e koordinatorit për sigurimin e
          cilësisë.
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
        <h5 className='card-title text-start '>
          A2.4 Të dhënat për kandidatët/nxënësit të përfshirë në ketë kualifikim
        </h5>
        <p className='text-muted'>
          Paraqit:
          <br />
          •• Paraqit numrin e synuar për kandidatët/nxënësit brenda një grupi
          <br />• Paraqit numrin e grupeve brenda një cikli të certifikimeve
        </p>
        <CustomFileInput
          onChangeFunction={changeCandidates}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {formik.errors.Candidates && (
          <span className='text-danger mt-2'>{formik.errors.Candidates}</span>
        )}
        <hr className='mt-2' />
        <h5 className='card-title text-start '>A2.5 Kërkesat tjera</h5>
        <p className='text-muted'>
          Paraqit memorandumet e bashkëpunimit, projektet, detyrat dhe praktikat
          e realizuara nga kandidatët, brenda dhe jashtë institucionit (kompani,
          organizatë, etj.)
        </p>
        <CustomFileInput
          onChangeFunction={changeOtherRequests}
          acceptType={".pdf"}
          isMultiple={true}
        />
        {!rest.showFourthForm && (
          <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2 text-end'>
            <button
              type='submit'
              className='btn btn btn-primary btn-soft-blue rounded-pill '
            >
              {t("Apply")}
            </button>
          </div>
        )}
      </div>
      <hr />
    </form>
  );
}
