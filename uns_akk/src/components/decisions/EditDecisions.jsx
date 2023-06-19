import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import DataTable from "../custom/DataTable";
import { Link } from "react-router-dom";
import CustomSelect from "../custom/CustomSelect";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function EditDecisions() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const [postLoad, setPostLoad] = useState(false);
  const navigate = useNavigate();
  const [decision, setDecision] = useState({});
  const [documentModal, setDocumentModal] = useState(false);
  const [model, setModel] = useState({
    InstitutionId: "",
    Aktiv: "",
    MunicipalityDecisionId: "",
    QualificationId: "",
    Remark: "",
  });
  const columns = [
    {
      title: t("SubQualifications"),
      dataIndex: "qualificationChildName",
      key: "qualificationChildName",
      responsive: ["sm"],
    },
    {
      title: t("Credits"),
      dataIndex: "credits",
      key: "credits",
      responsive: ["sm"],
    },
  ];
  useEffect(() => {
    setLoad(true);
    CrudProvider.getItemByIdLang("InstitutionDesicionAPI/GetById", id).then(
      (res) => {
        if (res) {
          if (res.statusCode === 200) {
            setDecision(res.result.value);
            setModel({
              ...model,
              InstitutionId: res.result.value.institution.institutionId,
              Aktiv: res.result.value.aktiv,
              MunicipalityDecisionId: res.result.value.municipalityDecisionId,
              QualificationId: res.result.value.qualificationId,
            });
          }
          setLoad(false);
        }
      }
    );
  }, [id]);
  function changeStatus(e) {
    setModel({
      ...model,
      Aktiv: e,
      Remark: "",
    });
    formik.setFieldValue("Status", e);
    if (e === true) {
      formik.setFieldValue("Remark", "not  null");
    }
  }

  const subQualifications =
    Object.keys(decision).length > 0
      ? decision.qualificationChildIds.filter(
          (obj) => obj.qualificationChildId !== null
        )
      : [];
  async function submitForm() {
    setPostLoad(true);
    await CrudProvider.updateItem(
      "InstitutionDesicionAPI/UpdateInstitutionDecision",
      model
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataUpdatedSuccessfully"));
          navigate("/decisions");
        } else {
          toast.error(res.errorMessages[0]);
        }
      }
      setPostLoad(false);
    });
  }

  const schema = Yup.object().shape({
    Status: Yup.boolean().required(t("Choose")),
    Remark: Yup.string().required("Plotësoni vërejtjen"),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => submitForm(),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='card'>
        {Object.keys(decision).length > 0 ? (
          <div className='card-body'>
            <div className='panel-body'>
              <div className='clearfix'>
                <div className='float-start'>
                  <h3>{decision.institution.institutionName}</h3>
                  <label>{decision.municipalityName}</label>
                </div>
                <div className='float-end'>
                  {decision.aktiv ? (
                    <h4 className='text-success'>{t("Active")}</h4>
                  ) : (
                    <h4 className='text-danger'>Pasiv</h4>
                  )}
                </div>
              </div>
              <hr />
              <div className='row'>
                <div className='col-md-12'>
                  <div className='float-start mt-3'>
                    <label className='fs-5'>{t("Qualification")}:</label>
                    <br />
                    {decision.qualificationName}
                    <br />
                    <label className='fs-5'>{t("ProtocolNumber")}:</label>
                    <br />
                    {decision.protocolNr}
                    <br />
                    <label className='fs-5'>{t("ProtocolDate")}:</label>
                    <br />
                    {new Date(
                      decision.protocolDate.split("T")[0]
                    ).toLocaleDateString("en-GB")}
                  </div>
                  <div className='float-start mt-3 ps-5'>
                    <label className='fs-5'>{t("Credits")}:</label>
                    <br />
                    {decision.credits}
                    <br />
                    <label className='fs-5'>{t("GroupLimits")}:</label>
                    <br />
                    {decision.noLimitGroups ? t("Yes") : t("No")}
                    <br />
                    <label className='fs-5'>{t("NumberOfGroups")}:</label>
                    <br />
                    {decision.numOfGroups}
                  </div>
                  <div className='float-start mt-3 ps-5'>
                    <label className='fs-5'>{t("MaxPersonsInGroup")}:</label>
                    <br />
                    {decision.maximumPeoplePerGroup}
                    <br />
                    <label className='fs-5'>{t("IsReaccrediation")}</label>
                    <br />
                    {decision.reaccreditation ? t("Yes") : t("No")}
                    <br />
                    <label className='fs-5'>{t("Municipality")}</label>
                    <br />
                    {decision.municipalityName}
                  </div>
                  <div className='float-start mt-3 ps-5'>
                    <p>
                      <strong>{t("DateIssuanceDecision")}: </strong>
                      {new Date(
                        decision.decisionDate.split("T")[0]
                      ).toLocaleDateString("en-GB")}
                    </p>
                    <p>
                      <strong>{t("ExpirationDate")}: </strong>
                      {new Date(
                        decision.termDate.split("T")[0]
                      ).toLocaleDateString("en-GB")}
                    </p>
                    <Button
                      type='primary'
                      onClick={(e) => setDocumentModal(true)}
                      className=''
                    >
                      {t("Decision")}
                    </Button>
                    <Modal
                      title={t("Decision")}
                      centered
                      style={{ width: "700px" }}
                      okButtonProps={{ style: { display: "none" } }}
                      open={documentModal}
                      onCancel={(e) => setDocumentModal(false)}
                    >
                      {CrudProvider.checkIsPDf(decision.documents.docPath) ==
                      true ? (
                        <iframe
                          src={CrudProvider.documentPath(
                            decision.documents.docPath
                          )}
                          width='800px'
                          height='700px'
                          loading='lazy'
                        ></iframe>
                      ) : (
                        <img
                          src={CrudProvider.documentPath(
                            decision.documents.docPath
                          )}
                          loading='lazy'
                        ></img>
                      )}
                    </Modal>
                  </div>
                </div>
              </div>
              <hr />
              {subQualifications.length > 0 && (
                <>
                  <DataTable
                    columns={columns}
                    dataSource={subQualifications}
                    title={t("SubQualifications")}
                  />
                  <hr />
                </>
              )}
              <div className='row'>
                <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                  <label>{t("ChangeStatus")}:</label>
                  <CustomSelect
                    onChangeFunction={changeStatus}
                    isMulti={false}
                    optionsList={[
                      {
                        label: "Aktiv",
                        value: true,
                      },
                      {
                        label: "Pasiv",
                        value: false,
                      },
                    ]}
                  />
                  {formik.errors.Status && (
                    <span className='text-danger'>{formik.errors.Status}</span>
                  )}
                </div>
                {model.Aktiv === false && (
                  <div className='col-xxl-4 col-lg-4 col-sm-12 mb-3'>
                    <label>{t("Remark")}:</label>
                    <textarea
                      id='textarea'
                      className='form-control'
                      maxLength={5000}
                      rows={3}
                      onChange={(e) => {
                        setModel({
                          ...model,
                          Remark: e.target.value,
                        });
                        formik.setFieldValue("Remark", e.target.value);
                      }}
                    />
                    {formik.errors.Remark && (
                      <span className='text-danger'>
                        {formik.errors.Remark}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <hr />

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
                  {!postLoad ? (
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
          </div>
        ) : (
          load && (
            <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
              <div
                className='spinner-border text-primary m-2 text-center'
                role='status'
              />
            </div>
          )
        )}
      </div>
    </form>
  );
}
