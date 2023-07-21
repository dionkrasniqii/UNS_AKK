import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../../provider/CrudProvider";
import { toast } from "react-toastify";
import { Modal } from "antd";
import CustomDatePicker from "../../custom/CustomDatePicker";
import CustomSelect from "../../custom/CustomSelect";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CreateDecisionModal({
  applicationId,
  institutionName,
}) {
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const [application, setApplication] = useState({});
  const [showModal, setShowModal] = useState(false);
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
    NoLimitGroups: true,
    NumOfGroups: 0,
    MaximumPeoplePerGroup: "",
    Reaccreditation: false,
    Document: "",
  });
  function formatedDate(date) {
    const [day, month, year] = date.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  useEffect(() => {
    Promise.all([
      CrudProvider.getItemById("ApplicationAPI/GetById", applicationId).then(
        (res) => {
          if (res) {
            if (res.statusCode === 200) {
              const obj = res.result.applicationDTO;
              setApplication(obj);
              setModel({
                ...model,
                InstitutionId: obj.institutionId,
                QualificationId: obj.qualificationId,
                NumOfGroups: obj.numOfGroupsA24,
                MaximumPeoplePerGroup: obj.targetNumberOfCandidatesA24,
              });
            }
          }
        }
      ),
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
    ]);
  }, []);
  useEffect(() => {
    if (application?.qualificationId) {
      CrudProvider.getItemByIdLang(
        "GeneralAPI/GetAllSubQualificationsByQualificationId",
        application?.qualificationId
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setSubQualifications(res.result);
          }
        }
      });
    }
  }, [application?.qualificationId]);
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
          value: obj.qualificationId,
        }))
      : [];
  function changeQualification(e) {
    setModel({
      ...model,
      QualificationId: e,
    });
  }
  const subQualificationsList =
    subQualifications.length > 0
      ? subQualifications.map((obj) => {
          return {
            label: obj.description,
            value: obj.qualificationChild?.qualificationChildId,
          };
        })
      : [];

  function changeSubQualification(e) {
    setModel({
      ...model,
      QualificationChildIds: e,
    });
    formik.setFieldValue("SubQualifications", e);
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
      ProtocolDate: formatedDate(dateString),
    });
    formik.setFieldValue("ProtocolDate", dateString);
  }
  function changeDecisionDate(date, dateString) {
    setModel({
      ...model,
      DecisionDate: formatedDate(dateString),
    });
    formik.setFieldValue("DecisionDate", dateString);
  }
  function changeTermDate(date, dateString) {
    setModel({
      ...model,
      TermDate: formatedDate(dateString),
    });
    formik.setFieldValue("TermDate", dateString);
  }
  async function submitForm() {
    setLoad(true);
    if (model.DecisionDate >= model.TermDate) {
      toast.error("Decision date cannot be greater than term date");
      setLoad(false);
      return;
    }
    await CrudProvider.createItemWithFile(
      "InstitutionDesicionAPI/CreateInstitutionDecision",
      model
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success("Të dhënat u ruajtën me sukses");
          setShowModal(false);
        } else {
          toast.error(res.errorMessages[0]);
        }
      }
      setLoad(false);
    });
  }
  const credits =
    subQualifications.length > 0 &&
    subQualifications
      .filter((obj) =>
        model.QualificationChildIds.includes(
          obj.qualificationChild.qualificationChildId
        )
      )
      .map((obj) => obj.qualificationChild.credits);
  const numbersArray = credits && Array.from(credits, Number);
  let total = 0;
  numbersArray.length > 0 && numbersArray.map((obj) => (total += obj));
  useEffect(() => {
    if (total !== 0) {
      setModel({
        ...model,
        Credits: total,
      });
      formik.setFieldValue("Credits", total);
    } else {
      setModel({
        ...model,
        Credits: "",
      });
      formik.setFieldValue("Credits", "");
    }
  }, [total]);

  const CreateDecisionSchema = Yup.object().shape({
    MunicipalityId: Yup.string().required(t("ChooseMunicipality")),
    Credits: Yup.string().max(20).required(t("CompleteCredits")),
    SubQualifications: Yup.mixed().required(
      t("Choose") + " " + t("SubQualifications").toLowerCase()
    ),
    ProtocolNr: Yup.string().max(20).required(t("CompleteProtocolNumber")),
    ProtocolDate: Yup.mixed().required(t("CompleteProtocolDate")),
    DecisionDate: Yup.mixed().required(t("CompleteStartDateDecision")),
    TermDate: Yup.mixed().required(t("ExpirationDateDecision")),
    Document: Yup.mixed().required(t("UploadDoc")),
  });

  const formik = useFormik({
    initialValues: {},
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: CreateDecisionSchema,
    onSubmit: async () => submitForm(),
  });
  return (
    <>
      <button onClick={() => setShowModal(true)} className='btn btn-warning'>
        <i className='fas fa-file-archive'></i>
      </button>
      <Modal
        title={t("RegisterDecision") + " : " + institutionName}
        centered
        open={showModal}
        className='responsive-modal'
        okText={
          !load ? (
            t("Save")
          ) : (
            <div
              className='spinner-border text-primary m-2 text-center'
              role='status'
            />
          )
        }
        cancelText={t("Discard")}
        onOk={formik.handleSubmit}
        forceRender={true}
        onCancel={() => {
          setShowModal(false);
          formik.resetForm();
        }}
      >
        {Object.keys(application).length > 0 ? (
          <div className='tab-pane active' id='account-2'>
            <div className='row'>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                <label>{t("CityForAccreditation")}:</label>
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
              <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                <label>{t("Qualification")}:</label>
                <CustomSelect
                  onChangeFunction={changeQualification}
                  isMulti={false}
                  hasDefaultValue={true}
                  defaultValue={{
                    label: application.qualificationName,
                    value: application.qualificationId,
                  }}
                  optionsList={qualificationsList}
                />
                {/* {formik.errors.QualificationId && (
                <span className='text-danger'>
                  {formik.errors.QualificationId}
                </span>
              )} */}
              </div>

              <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                <label>{t("SubQualifications")}:</label>
                <CustomSelect
                  onChangeFunction={changeSubQualification}
                  isMulti={true}
                  optionsList={subQualificationsList}
                />
                {formik.errors.SubQualifications && (
                  <span className='text-danger'>
                    {formik.errors.SubQualifications}
                  </span>
                )}
              </div>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                <label>{t("Credits")}:</label>
                {total !== 0 ? (
                  <input
                    type='number'
                    className='form-control'
                    readOnly
                    defaultValue={model.Credits}
                  />
                ) : (
                  <input
                    type='number'
                    className='form-control'
                    defaultValue={""}
                    onChange={(e) => {
                      setModel({
                        ...model,
                        Credits: e.target.value,
                      });
                      formik.setFieldValue("Credits", e.target.value);
                    }}
                  />
                )}
                {formik.errors.Credits && (
                  <span className='text-danger'>{formik.errors.Credits}</span>
                )}
              </div>

              <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                <label>{t("ProtocolDate")}:</label>
                <CustomDatePicker onChangeFunction={changeProtocolDate} />
                {formik.errors.ProtocolDate && (
                  <span className='text-danger'>
                    {formik.errors.ProtocolDate}
                  </span>
                )}
              </div>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                <label>{t("DateIssuanceDecision")}:</label>
                <CustomDatePicker onChangeFunction={changeDecisionDate} />
                {formik.errors.DecisionDate && (
                  <span className='text-danger'>
                    {formik.errors.DecisionDate}
                  </span>
                )}
              </div>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                <label>{t("DateExpirationDecision")}:</label>
                <CustomDatePicker onChangeFunction={changeTermDate} />
                {formik.errors.TermDate && (
                  <span className='text-danger'>{formik.errors.TermDate}</span>
                )}
              </div>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                <label>{t("ProtocolNumber")}:</label>
                <input
                  type='number'
                  min={1}
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
              <div className=' mb-3 col-xxl-2 col-lg-2 col-md-2 col-sm-12'>
                <label>{t("NumberOfGroups")}:</label>
                <input
                  type='number'
                  defaultValue={application.numOfGroupsA24}
                  onChange={(e) => {
                    setModel({
                      ...model,
                      NumOfGroups: e.target.value,
                    });
                  }}
                  className='form-control'
                />
              </div>
              <div className=' mb-3 col-xxl-3 col-lg-4 col-md-4 col-sm-12'>
                <label>{t("MaxPersonsInGroup")}:</label>
                <input
                  type='number'
                  defaultValue={application.targetNumberOfCandidatesA24}
                  onChange={(e) => {
                    setModel({
                      ...model,
                      MaximumPeoplePerGroup: e.target.value,
                    });
                  }}
                  className='form-control'
                />
              </div>
              <div className='col-xxl-2 col-lg-4 col-md-4 col-sm-12'>
                <label>{t("IsReaccrediation")}:</label>
                <div className='row col-12'>
                  <div className='col-3'>
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
                        }}
                      />
                      <label
                        className='form-check-label'
                        htmlFor='customRadio3'
                      >
                        {t("Yes")}
                      </label>
                    </div>
                  </div>
                  <div className='col-9'>
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
                        }}
                      />
                      <label
                        className='form-check-label'
                        htmlFor='customRadio4'
                      >
                        {t("No")}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xxl-4 col-lg-6 col-sm-12 mb-3'>
                <label>{t("UploadDecision")}:</label>
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
                  <span className='text-danger'>{formik.errors.Document}</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            className='spinner-border text-primary m-2 text-center'
            role='status'
          />
        )}
      </Modal>
    </>
  );
}
