import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../../provider/CrudProvider";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, Modal } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ViewApplication() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({});
  const [logoModal, setLogoModal] = useState(false);
  const [mashtModal, setMashtModal] = useState(false);
  const [certificateModal, setCertificateModal] = useState(false);
  const [previousDecisionModal, setPreviousDecisionModal] = useState(false);
  const [instituonDetailsModal, setInstitutionDetailsModal] = useState(false);
  const [staffModal, setStaffModal] = useState(false);
  const [otherRequestModal, setOtherRequestModal] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [model, setModel] = useState({
    ApplicationId: "",
    StatusId: "",
    ApplicationUserId: decodedToken.UserId,
    Remark: "",
    StatusName: "",
  });
  const [postLoad, setPostLoad] = useState(false);
  const [isSelected, setIsSelected] = useState("");
  useEffect(() => {
    try {
      setLoad(true);
      CrudProvider.getItemById("ApplicationAPI/GetById", id).then((res) => {
        if (res) {
          switch (res.statusCode) {
            case 200:
              setData(res.result);
              setModel({
                ...model,
                ApplicationId: res.result.applicationDTO.applicationId,
              });
              break;
            case "ERR_NETWORK":
              // navigate("/applications");
              toast.error(t("ServerProblems"));
              break;
            default:
              break;
          }
        }
      });
      CrudProvider.getAll("GeneralAPI/GetStatuses").then((res) => {
        if (res) {
          switch (res.statusCode) {
            case 200:
              setStatuses(res.result);
              break;
            case "ERR_NETWORK":
              // navigate("/applications");
              toast.error(t("ServerProblems"));
              break;
            default:
              break;
          }
        }
      });
    } finally {
      setLoad(false);
    }
  }, []);
  async function checkModel(model) {
    if (model.StatusName === "Rikthim") {
      if (model.Remark) {
        return true;
      } else {
        toast.error("Plotësoni vërejtjen");
        return false;
      }
    }
  }

  async function SubmitApplication() {
    await checkModel(model);
    setPostLoad(true);
    await CrudProvider.createItem(
      "ApplicationAPI/UpdateApplicationStatus",
      model
    ).then((res) => {
      if (res) {
        switch (res.statusCode) {
          case 200:
            toast.success(t("DataUpdatedSuccessfully"));
            navigate("/applications");
            setPostLoad(false);
            break;
          default:
            setPostLoad(false);
            break;
        }
      }
    });
  }
  const statusesList =
    statuses.length > 0 &&
    decodedToken &&
    statuses
      .filter((status) => {
        if (decodedToken.role === "KAAPR") {
          if (
            status.description === "Aprovuar" ||
            status.description === "Refuzuar"
          ) {
            return status;
          }
        } else if (decodedToken.role === "Zyrtar") {
          if (
            status.description === "Rikthim" ||
            status.description === "Verifikuar"
          ) {
            return status;
          }
        }
      })
      .sort((a, b) => b.description.localeCompare(a.description));

  const onChange = (e) => {
    if (e.target.checked) {
      !isSelected && setIsSelected(e.target.name);
      setModel({
        ...model,
        StatusId: e.target.value,
        StatusName: e.target.name,
      });
      formik.setFieldValue("StatusId", e.target.value);
    } else {
      setIsSelected(null);
      setModel({
        ...model,
        StatusId: "",
        StatusName: "",
      });
      formik.setFieldValue("StatusId", "");
    }
  };
  const schema = Yup.object().shape({
    StatusId: Yup.string().required(t("ChooseStatus")),
  });
  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    onSubmit: () => SubmitApplication(),
  });
  return Object.keys(data).length > 0 ? (
    <div className='container'>
      <div className='card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-xxl-2 col-lg-2 col-sm-12  mb-sm-'>
              <Link
                to={"/applications"}
                className='text-dark rbt-btn-link-reverse'
              >
                <i>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width={16}
                    height={16}
                    fill='currentColor'
                    className='bi bi-arrow-left'
                    viewBox='0 0 16 16'
                  >
                    <path
                      fillRule='evenodd'
                      d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
                    />
                  </svg>
                </i>
                {t("Back")}
              </Link>
            </div>
            <div className='col-xxl-8 col-lg-8 col-md-12 col-sm-10'>
              <h4 className='card-title text-start'>
                {t("ApplicationByInstitution")}:
                <span className='font-20 ms-1 text-primary '>
                  {data.applicationDTO.institutionName}
                </span>
              </h4>
            </div>
            <div className='col-xxl-2 col-lg-2 col-md-12 col-sm-12'>
              <div className='row'>
                <span className='text-muted'>{t("ApplicationDate")}:</span>
                <span className='text-success'>
                  {new Date(
                    data.applicationDTO.applicationDate.split("T")[0]
                  ).toLocaleDateString("en-GB")}
                </span>
              </div>
            </div>
          </div>
          <hr />
          <div className='row '>
            <h5>{t("InstitutionDetails")}:</h5>
            <div className='col-xxl-2 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("UniqueNumber")}:</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={data.applicationDTO.uniqueNumber}
                />
                <span className='focus-border'></span>
              </div>
            </div>

            <div className='col-xxl-2 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("Municipality")}:</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={data.applicationDTO.municipalityName}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-2 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("PostalCode")}:</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={data.applicationDTO.postalCode}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-2 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("Address")}:</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={data.applicationDTO.address}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-2 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("Email")}:</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={data.applicationDTO.email}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-2 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("PhoneNumber")}:</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={data.applicationDTO.phoneNum}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-2 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("Web")}:</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={data.applicationDTO.web}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-2 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("InstitutionStatus")}:</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={data.applicationDTO.institutionStatusName}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-2 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>
                  {t("InstitutionActivity")}:
                </label>
                <input
                  type='text'
                  readOnly
                  defaultValue={data.applicationDTO.institutionActivityName}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-1 col-lg-2 col-sm-12 mt-2 text-start'>
              <Button className='btn-dark' onClick={(e) => setLogoModal(true)}>
                {t("Logo")}
              </Button>
              <Modal
                title={t("Logo")}
                centered
                className='responsive-modal'
                okButtonProps={{ style: { display: "none" } }}
                open={logoModal}
                onCancel={(e) => setLogoModal(false)}
              >
                {CrudProvider.checkIsPDf(data.applicationDTO.institutionLogo) ==
                true ? (
                  <iframe
                    src={CrudProvider.documentPath(
                      data.applicationDTO.institutionLogo
                    )}
                    width='800px'
                    height='800px'
                    loading='lazy'
                  ></iframe>
                ) : (
                  <img
                    src={CrudProvider.documentPath(
                      data.applicationDTO.institutionLogo
                    )}
                    loading='lazy'
                  ></img>
                )}
              </Modal>
            </div>
          </div>
          <hr />
          <div className='row'>
            <h5>{t("JuridicPersonDetails")}:</h5>
            <div className='col-xxl-3 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("FiscalNumber")}:</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={data.applicationDTO.fiscalNrA15}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-3 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("RegistrationNumber")}:</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={data.applicationDTO.registerNrA15}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-2 col-lg-3 col-md-4 col-sm-12 mt-2'>
              <Button className='btn-dark' onClick={() => setMashtModal(true)}>
                {t("LicenseMASHT")}
              </Button>
              <Modal
                title={t("LicenseMASHT")}
                centered
                className='responsive-modal'
                open={mashtModal}
                okButtonProps={{ style: { display: "none" } }}
                onCancel={() => setMashtModal(false)}
              >
                {data.docs.map((document) => {
                  if (document.type === "MASHTLicenseA16") {
                    return CrudProvider.checkIsPDf(document.docPath) == true ? (
                      <iframe
                        key={document.applicationDocsId}
                        src={CrudProvider.documentPath(document.docPath)}
                        loading='lazy'
                      />
                    ) : (
                      <img
                        key={document.applicationDocsId}
                        src={CrudProvider.documentPath(document.docPath)}
                        loading='lazy'
                      />
                    );
                  }
                })}
              </Modal>
            </div>
            <div className='col-xxl-2 col-lg-3 col-md-4 col-sm-12 mt-2'>
              <Button
                className='btn-dark'
                onClick={() => setCertificateModal(true)}
              >
                {t("RegistrationCertificate")}
              </Button>
              <Modal
                title={t("RegistrationCertificate")}
                centered
                className='responsive-modal'
                open={certificateModal}
                okButtonProps={{ style: { display: "none" } }}
                onCancel={() => setCertificateModal(false)}
              >
                {data.docs.map((document) => {
                  if (document.type === "CertificateRegisterDocA15") {
                    return CrudProvider.checkIsPDf(document.docPath) == true ? (
                      <iframe
                        key={document.applicationDocsId}
                        src={CrudProvider.documentPath(document.docPath)}
                        loading='lazy'
                      />
                    ) : (
                      <img
                        key={document.applicationDocsId}
                        src={CrudProvider.documentPath(document.docPath)}
                        loading='lazy'
                      />
                    );
                  }
                })}
              </Modal>
            </div>
          </div>
          {data.applicationDTO.qualificationPeriodA17 && (
            <>
              <hr />
              <div className='row'>
                <h5>{t("EarilerQualifications")}</h5>
                <div className='col-xxl-2 col-lg-4  col-sm-12 mt-1 text-start'>
                  <div className='form-group'>
                    <label className='text-muted'>{t("NoticePeriod")}:</label>
                    <input
                      type='text'
                      readOnly
                      defaultValue={data.applicationDTO.qualificationPeriodA17}
                    />
                    <span className='focus-border'></span>
                  </div>
                </div>
                <div className='col-xxl-2 col-lg-3 col-md-4 col-sm-12 mt-2'>
                  <Button
                    className='btn-dark'
                    onClick={() => setPreviousDecisionModal(true)}
                  >
                    {t("PreviousDecisionDocs")}
                  </Button>
                  <Modal
                    title={t("PreviousDecisionDocs")}
                    centered
                    className='responsive-modal'
                    open={previousDecisionModal}
                    okButtonProps={{ style: { display: "none" } }}
                    onCancel={() => setPreviousDecisionModal(false)}
                  >
                    {data.docs.map((document) => {
                      if (document.type === "QualificatinDocsA17") {
                        return CrudProvider.checkIsPDf(document.docPath) ==
                          true ? (
                          <iframe
                            key={document.applicationDocsId}
                            src={CrudProvider.documentPath(document.docPath)}
                            loading='lazy'
                          />
                        ) : (
                          <img
                            key={document.applicationDocsId}
                            src={CrudProvider.documentPath(document.docPath)}
                            loading='lazy'
                          />
                        );
                      }
                    })}
                  </Modal>
                </div>
              </div>
            </>
          )}
          <hr />
          <div className='row'>
            <h5>{t("DataForAccreditation")}:</h5>
            <div className='col-xxl-12 col-lg-12 col-sm-12 mt-1 '>
              <div className='form-group'>
                <label className='text-muted'>
                  {t("ToolsForQualification")}:
                </label>
                <textarea
                  readOnly
                  className='mt-2'
                  rows={5}
                  defaultValue={
                    data.applicationDTO.equipmentMaterialsQualificationA22
                  }
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-3 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("Qualification")}:</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={data.applicationDTO.qualificationName}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-2 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("NumberOfGroups")}:</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={data.applicationDTO.numOfGroupsA24}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-2 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("AllCandidates")}:</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={data.applicationDTO.targetNumberOfCandidatesA24}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-3 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>
                  {t("ForDeliveryNotEvaluationAndCertification")}:
                </label>
                <input
                  type='text'
                  readOnly
                  defaultValue={
                    data.applicationDTO.offerNoValidationCertificationA18
                      ? t("Yes")
                      : t("No")
                  }
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-3 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>
                  {t("ForAssessmentAndCertificatioNotDelivery")}:
                </label>
                <input
                  type='text'
                  readOnly
                  defaultValue={
                    data.applicationDTO.validationCertificationNotOfferA18
                      ? t("Yes")
                      : t("No")
                  }
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-3 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>
                  {t("ForAssessmentAndCertificatioDelivery")}:
                </label>
                <input
                  type='text'
                  readOnly
                  defaultValue={
                    data.applicationDTO.offerValidationCertificationA18
                      ? t("Yes")
                      : t("No")
                  }
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-12 col-lg-12 col-md-12 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("AdditionalData")}:</label>
                <textarea
                  className='mt-2'
                  readOnly
                  defaultValue={data.applicationDTO.textA18}
                />
                <span className='focus-border'></span>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xxl-2 col-lg-3 col-sm-12 mt-2 text-center'>
              <Button
                onClick={() => setInstitutionDetailsModal(true)}
                className='btn-dark'
              >
                {t("InstitutionDetailsModal")}
              </Button>
              <Modal
                title={t("InstitutionDetailsModal")}
                centered
                className='responsive-modal'
                open={instituonDetailsModal}
                okButtonProps={{ style: { display: "none" } }}
                onCancel={() => setInstitutionDetailsModal(false)}
              >
                {data.docs.map((document) => {
                  if (document.type === "InstitutionDocsA21") {
                    return CrudProvider.checkIsPDf(document.docPath) == true ? (
                      <iframe
                        key={document.applicationDocsId}
                        src={CrudProvider.documentPath(document.docPath)}
                        loading='lazy'
                      />
                    ) : (
                      <img
                        key={document.applicationDocsId}
                        src={CrudProvider.documentPath(document.docPath)}
                        loading='lazy'
                      />
                    );
                  }
                })}
              </Modal>
            </div>

            <div className='col-xxl-2 col-lg-3 col-sm-12 mt-2 text-center'>
              <Button className=' btn-dark' onClick={() => setStaffModal(true)}>
                {t("StaffDataModal")}
              </Button>
              <Modal
                title={t("StaffDataModal")}
                centered
                className='responsive-modal'
                open={staffModal}
                okButtonProps={{ style: { display: "none" } }}
                onCancel={() => setStaffModal(false)}
              >
                {data.docs.map((document) => {
                  if (document.type === "StaffA23") {
                    return CrudProvider.checkIsPDf(document.docPath) == true ? (
                      <iframe
                        key={document.applicationDocsId}
                        src={CrudProvider.documentPath(document.docPath)}
                        loading='lazy'
                      />
                    ) : (
                      <img
                        key={document.applicationDocsId}
                        src={CrudProvider.documentPath(document.docPath)}
                        loading='lazy'
                      />
                    );
                  }
                })}
              </Modal>
            </div>
            <div className='col-xxl-2 col-lg-3 col-sm-12 mt-2 text-center'>
              <Button
                onClick={() => setOtherRequestModal(true)}
                className=' btn-dark'
              >
                {t("OtherRequest")}
              </Button>
              <Modal
                title={t("OtherRequest")}
                centered
                className='responsive-modal'
                open={otherRequestModal}
                okButtonProps={{ style: { display: "none" } }}
                onCancel={() => setOtherRequestModal(false)}
              >
                {data.docs.map((document) => {
                  if (document.type === "OtherRequestsA25") {
                    return CrudProvider.checkIsPDf(document.docPath) == true ? (
                      <iframe
                        key={document.applicationDocsId}
                        src={CrudProvider.documentPath(document.docPath)}
                        loading='lazy'
                      />
                    ) : (
                      <img
                        key={document.applicationDocsId}
                        src={CrudProvider.documentPath(document.docPath)}
                        loading='lazy'
                      />
                    );
                  }
                })}
              </Modal>
            </div>
          </div>
          <hr />
          <form onSubmit={formik.handleSubmit}>
            <div className='row'>
              {model.StatusName === "Rikthim" && (
                <div className='col-xxl-12 col-lg-12 col-sm-12'>
                  <div className='form-group'>
                    <label>Vërejtje</label>
                    <textarea
                      rows={5}
                      className='mt-2'
                      onChange={(e) =>
                        setModel({
                          ...model,
                          Remark: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              <div className='col-xxl-12 col-lg-12 col-sm-12 text-end'>
                {statusesList.map((item) => (
                  <Checkbox
                    disabled={
                      isSelected ? isSelected !== item.description : false
                    }
                    value={item.statusId}
                    name={item.description}
                    key={item.statusId}
                    onChange={onChange}
                  >
                    {item.description}
                  </Checkbox>
                ))}

                {decodedToken.role !== "Admin" &&
                  isSelected &&
                  (postLoad ? (
                    <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
                      <div
                        className='spinner-border text-primary m-2 text-center'
                        role='status'
                      />
                    </div>
                  ) : (
                    <button
                      type='submit'
                      className='btn btn-soft-primary waves-effect '
                    >
                      {t("Save")}
                    </button>
                  ))}
              </div>
            </div>
          </form>
        </div>
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
  );
}
