import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProgressBar from "../custom/ProgressBar";
import { Link, useNavigate } from "react-router-dom";
import CustomSelect from "../custom/CustomSelect";
import CustomDatePicker from "../custom/CustomDatePicker";
import CrudProvider from "../../provider/CrudProvider";
import { mode } from "crypto-js";
import { toast } from "react-toastify";
import * as Yup from "yup";
export default function CreateDecisions() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [subQualifications, setSubQualifications] = useState([]);
  const [model, setModel] = useState({
    InstitutionId: "",
    MunicipalityId: "",
    QualificationId: "",
    QualificationChildIds: [],
    Credits: "",
    ProtocolNr: "",
    ProtocolDate: "",
    DecisionDate: "",
    TermDate: "",
    NoLimitGroups: false,
    NumOfGroups: "",
    MaximumPeoplePerGroup: "",
    Reaccreditation: false,
    Document: "",
  });

  useEffect(() => {
    Promise.all([
      CrudProvider.getAllWithLang("InstitutionAPI/GetAll").then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setInstitutions(res.result);
          }
        }
      }),
      CrudProvider.getAllWithLang("GeneralAPI/GetAllMunicipalities").then(
        (res) => {
          if (res) {
            if (res.statusCode === 200) {
              setMunicipalities(res.result);
            }
          }
        }
      ),
      CrudProvider.getAllWithLang("QualificationAPI/GetAll").then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setQualifications(res.result);
          }
        }
      }),
      CrudProvider.getAllWithLang("QualificationChildAPI/GetAll").then(
        (res) => {
          if (res) {
            if (res.statusCode === 200) {
              setSubQualifications(res.result);
            }
          }
        }
      ),
    ]);
  }, []);

  const institutionsList =
    institutions.length > 0
      ? institutions.map((obj) => ({
          label: obj.institutionName,
          value: obj.institutionId,
        }))
      : [];
  function changeInstitution(e) {
    setModel({
      ...model,
      InstitutionId: e,
    });
    formik.setFieldValue("InstitutionId", e);
  }
  const municipalitiesList =
    municipalities.length > 0
      ? municipalities.map((obj) => ({
          label: obj.municipalityName,
          value: obj.municipality.municipalityId,
        }))
      : [];
  function changeMunicipality(e) {
    setModel({
      ...model,
      MunicipalityId: e,
    });
    formik.setFieldValue("MunicipalityId", e);
  }

  const qualificationsList =
    qualifications.length > 0
      ? qualifications.map((obj) => ({
          label: obj.qualificationName,
          value: obj.qualification.qualificationId,
        }))
      : [];
  function changeQualification(e) {
    setModel({
      ...model,
      QualificationId: e,
    });
    formik.setFieldValue("QualificationId", e);
  }
  const subQualificationsList =
    subQualifications.length > 0
      ? subQualifications.map((obj) => ({
          label: obj.description,
          value: obj.qualificationChild.qualificationChildId,
        }))
      : [];
  function changeSubQualification(e) {
    setModel({
      ...model,
      QualificationChildIds: e,
    });
  }
  function changeProtocolDate(e) {
    setModel({
      ...model,
      ProtocolDate: e,
    });
  }
  function changeProtocolDate(date, dateString) {
    setModel({
      ...model,
      ProtocolDate: dateString,
    });
    formik.setFieldValue("ProtocolDate", dateString);
  }
  function changeDecisionDate(date, dateString) {
    setModel({
      ...model,
      DecisionDate: dateString,
    });
    formik.setFieldValue("DecisionDate", dateString);
  }
  function changeTermDate(date, dateString) {
    setModel({
      ...model,
      TermDate: dateString,
    });
    formik.setFieldValue("TermDate", dateString);
  }
  async function submitForm() {
    setLoad(true);
    await CrudProvider.createItemWithFile(
      "InstitutionDesicionAPI/CreateInstitutionDecision",
      model
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          navigate("/decisions");
          toast.success("Të dhënat u ruajtën me sukses");
        } else {
          toast.error(res.errorMessages[0]);
        }
      }
      setLoad(false);
    });
  }
  const CreateDecisionSchema = Yup.object().shape({
    InstitutionId: Yup.string().required("Zgjedhni institucionin"),
    MunicipalityId: Yup.string().required("Zgjedhni komunën"),
    QualificationId: Yup.string().required("Zgjedhni kualifikimin"),
    Credits: Yup.string().required("Plotësoni kredit"),
    ProtocolNr: Yup.string().required("Plotësoni numrin e protokolit"),
    ProtocolDate: Yup.mixed().required("Zgjedhni datën e protokolit"),
    DecisionDate: Yup.string().required("Zgjedhni datën e vendimit"),
    TermDate: Yup.mixed().required(
      "Zgjedhni datën deri kur është valid vendimi"
    ),
    NumOfGroups: Yup.number()
      .positive("Numri duhet të jetë pozitiv")
      .required("Vendosni numrin e grupeve"),
    NoLimitGroups: Yup.boolean().required("Zgjedhni"),
    MaximumPeoplePerGroup: Yup.string().required(
      "Vendosni numrin e antarëve për grup"
    ),
    Reaccreditation: Yup.string().required("Zgjedhni"),
    Document: Yup.string().required("Ngarkoni dokumentin"),
  });

  const formik = useFormik({
    initialValues: {
      MaximumPeoplePerGroup: "1",
      NumOfGroups: "1",
      NoLimitGroups: false,
      Reaccreditation: false,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: CreateDecisionSchema,
    onSubmit: () => submitForm(),
  });
  return (
    <div className='col-xl-12'>
      <div className='card'>
        <div className='card-body'>
          <h3 className=' mb-3'>Regjistro vendimin</h3>
          <form onSubmit={formik.handleSubmit}>
            <div id='progressbarwizard'>
              <div className='tab-content b-0 mb-0 pt-0'>
                <ProgressBar model={model} />
                <div className='tab-pane active' id='account-2'>
                  <div className='row'>
                    <div className='row mb-3'>
                      <label className='col-md-3 col-form-label'>
                        Institucioni:
                      </label>
                      <div className='col-md-9'>
                        <CustomSelect
                          onChangeFunction={changeInstitution}
                          isMulti={false}
                          optionsList={institutionsList}
                        />
                        {formik.errors.InstitutionId && (
                          <span className='text-danger'>
                            {formik.errors.InstitutionId}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-md-3 col-form-label'>
                        {t("Municipality")}
                      </label>
                      <div className='col-md-9'>
                        <CustomSelect
                          onChangeFunction={changeMunicipality}
                          isMulti={false}
                          optionsList={municipalitiesList}
                        />
                        {formik.errors.MunicipalityId && (
                          <span className='text-danger'>
                            {formik.errors.MunicipalityId}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-md-3 col-form-label'>
                        Kualifikimi
                      </label>
                      <div className='col-md-9'>
                        <CustomSelect
                          onChangeFunction={changeQualification}
                          isMulti={false}
                          optionsList={qualificationsList}
                        />
                        {formik.errors.QualificationId && (
                          <span className='text-danger'>
                            {formik.errors.QualificationId}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-md-3 col-form-label'>
                        Nën kualifikimet:
                      </label>
                      <div className='col-md-9'>
                        <CustomSelect
                          onChangeFunction={changeSubQualification}
                          isMulti={true}
                          optionsList={subQualificationsList}
                        />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-md-3 col-form-label'>Kredit:</label>
                      <div className='col-md-9'>
                        <input
                          type='number'
                          className='form-control'
                          onChange={(e) => {
                            setModel({
                              ...model,
                              Credits: e.target.value,
                            });
                            formik.setFieldValue("Credits", e.target.value);
                          }}
                        />
                        {formik.errors.Credits && (
                          <span className='text-danger'>
                            {formik.errors.Credits}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-md-3 col-form-label'>
                        Nr Protokolit
                      </label>
                      <div className='col-md-9'>
                        <input
                          type='text'
                          className='form-control'
                          onChange={(e) => {
                            setModel({
                              ...model,
                              ProtocolNr: e.target.value,
                            });
                            formik.setFieldValue("ProtocolNr", e.target.value);
                          }}
                        />
                        {formik.errors.ProtocolNr && (
                          <span className='text-danger'>
                            {formik.errors.ProtocolNr}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='col-xxl-4 col-lg-4 col-md-4 col-sm-12 mb-3'>
                      <label>Data Protokolit</label>
                      <div className='col-lg-7 col-xxl-7'>
                        <CustomDatePicker
                          onChangeFunction={changeProtocolDate}
                        />
                      </div>
                      {formik.errors.ProtocolDate && (
                        <span className='text-danger'>
                          {formik.errors.ProtocolDate}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-4 col-lg-4 col-md-4 col-sm-12 mb-3'>
                      <label> Data e lëshimit të vendimit</label>
                      <div className='col-lg-7 col-xxl-7'>
                        <CustomDatePicker
                          onChangeFunction={changeDecisionDate}
                        />
                      </div>
                      {formik.errors.DecisionDate && (
                        <span className='text-danger'>
                          {formik.errors.DecisionDate}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-4 col-lg-4 col-md-4 col-sm-12 mb-3'>
                      <label> Data e skadimit të vendimit</label>
                      <div className='col-lg-7 col-xxl-7'>
                        <CustomDatePicker onChangeFunction={changeTermDate} />
                      </div>
                      {formik.errors.TermDate && (
                        <span className='text-danger'>
                          {formik.errors.TermDate}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-2 col-md-3 col-lg-3 col-sm-12 mb-3'>
                      <div className='row'>
                        <label>A ka grupe të limituara:</label>
                        <div className='form-check ps-4'>
                          <input
                            type='radio'
                            id='customRadio1'
                            name='customRadio'
                            defaultChecked={
                              model.NoLimitGroups === true ? true : false
                            }
                            onChange={(e) => {
                              setModel({
                                ...model,
                                NoLimitGroups: !model.NoLimitGroups,
                              });
                              formik.setFieldValue("NoLimitGroups", true);
                              formik.setFieldValue("NumOfGroups", null);
                              formik.setFieldValue(
                                "MaximumPeoplePerGroup",
                                null
                              );
                            }}
                            className='form-check-input'
                          />
                          <label
                            className='form-check-label'
                            htmlFor='customRadio1'
                          >
                            Po
                          </label>
                        </div>
                        <div className='form-check ps-4'>
                          <input
                            type='radio'
                            id='customRadio2'
                            name='customRadio'
                            defaultChecked={
                              model.NoLimitGroups === false ? true : false
                            }
                            className='form-check-input'
                            onChange={(e) => {
                              setModel({
                                ...model,
                                NoLimitGroups: !model.NoLimitGroups,
                              });
                              formik.setFieldValue("NoLimitGroups", false);
                            }}
                          />
                          <label
                            className='form-check-label'
                            htmlFor='customRadio2'
                          >
                            Jo
                          </label>
                        </div>
                      </div>
                    </div>
                    {model.NoLimitGroups === true && (
                      <>
                        <div className=' mb-3 col-xxl-1 col-lg-2 col-md-2 col-sm-12'>
                          <label>Numri i grupeve</label>
                          <input
                            type='number'
                            onChange={(e) => {
                              setModel({
                                ...model,
                                NumOfGroups: e.target.value,
                              });
                              formik.setFieldValue(
                                "NumOfGroups",
                                e.target.value
                              );
                            }}
                            className='form-control'
                          />
                          {formik.errors.NumOfGroups && (
                            <span className='text-danger'>
                              {formik.errors.NumOfGroups}
                            </span>
                          )}
                        </div>
                        <div className=' mb-3 col-xxl-3 col-lg-3 col-md-4 col-sm-12'>
                          <label>Numri maksimal i personave në grup</label>
                          <input
                            type='number'
                            onChange={(e) => {
                              setModel({
                                ...model,
                                MaximumPeoplePerGroup: e.target.value,
                              });
                              formik.setFieldValue(
                                "MaximumPeoplePerGroup",
                                e.target.value
                              );
                            }}
                            className='form-control'
                          />
                          {formik.errors.MaximumPeoplePerGroup && (
                            <span className='text-danger'>
                              {formik.errors.MaximumPeoplePerGroup}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                    <div className=' mb-3 col-xxl-1 col-lg-2 col-md-2 col-sm-12'>
                      <label>Është riakreditim</label>
                      <div className='form-check ps-4'>
                        <input
                          type='radio'
                          id='customRadio3'
                          name='customRadio2'
                          defaultChecked={
                            model.Reaccreditation === true ? true : false
                          }
                          className='form-check-input'
                          onChange={(e) => {
                            setModel({
                              ...model,
                              Reaccreditation: !model.Reaccreditation,
                            });
                            formik.setFieldValue(
                              "Reaccreditation",
                              e.target.checked
                            );
                          }}
                        />
                        <label
                          className='form-check-label'
                          htmlFor='customRadio3'
                        >
                          Po
                        </label>
                      </div>
                      <div className='form-check ps-4'>
                        <input
                          type='radio'
                          id='customRadio4'
                          name='customRadio2'
                          defaultChecked={
                            model.Reaccreditation === false ? true : false
                          }
                          className='form-check-input'
                          onChange={(e) => {
                            setModel({
                              ...model,
                              Reaccreditation: !model.Reaccreditation,
                            });
                            formik.setFieldValue(
                              "Reaccreditation",
                              e.target.checked
                            );
                          }}
                        />
                        <label
                          className='form-check-label'
                          htmlFor='customRadio4'
                        >
                          Jo
                        </label>
                      </div>
                      {formik.errors.Reaccreditation && (
                        <span className='text-danger'>
                          {formik.errors.Reaccreditation}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-3'>
                      <label>Ngarko vendimin</label>
                      <input
                        type='file'
                        accept='application/pdf'
                        onChange={(e) => {
                          setModel({
                            ...model,
                            Document: e.target.files[0],
                          });
                          formik.setFieldValue("Document", e.target.files[0]);
                        }}
                        className='form-control'
                      />
                      {formik.errors.Document && (
                        <span className='text-danger'>
                          {formik.errors.Document}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <ul className='list-inline mb-0 wizard'>
                <Link
                  to='/decisions'
                  className='btn btn-danger waves-effect waves-light float-start'
                >
                  <span className='btn-label'>
                    <i className='fe-arrow-left'></i>
                  </span>
                  {t("Discard")}
                </Link>
                <li className='next list-inline-item float-end'>
                  {!load ? (
                    <button
                      type='submit'
                      className='btn btn-success waves-effect waves-light'
                    >
                      <span className='btn-label'>
                        <i className='fe-check'></i>
                      </span>
                      {t("Save")}
                    </button>
                  ) : (
                    <div
                      className='spinner-border text-primary m-2 text-center'
                      role='status'
                    />
                  )}
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export const CreateDecisionSchema = Yup.object().shape({
  InstitutionId: Yup.string().required("Zgjedhni institucionin"),
  MunicipalityId: Yup.string().required("Zgjedhni komunën"),
  QualificationId: Yup.string().required("Zgjedhni kualifikimin"),
  Credits: Yup.string().required("Plotësoni kredit"),
  ProtocolNr: Yup.string().required("Plotësoni numrin e protokolit"),
  ProtocolDate: Yup.mixed().required("Zgjedhni datën e protokolit"),
  DecisionDate: Yup.string().required("Zgjedhni datën e vendimit"),
  TermDate: Yup.mixed().required("Zgjedhni datën deri kur është valid vendimi"),
  NumOfGroups: Yup.number()
    .positive("Numri duhet të jetë pozitiv")
    .required("Vendosni numrin e grupeve"),
  NoLimitGroups: Yup.boolean().required("Zgjedhni"),
  MaximumPeoplePerGroup: Yup.string().required(
    "Vendosni numrin e antarëve për grup"
  ),
  Reaccreditation: Yup.string().required("Zgjedhni"),
  Document: Yup.string().required("Ngarkoni dokumentin"),
});
