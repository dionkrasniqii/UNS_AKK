import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../../provider/CrudProvider";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import ViewSecondApplication from "./ViewSecondApplication";
import { Button, Modal, Upload } from "antd";
import { Link } from "react-router-dom";

export default function ExpertReviewApplication() {
  const { id, ApplicationExpertId } = useParams();
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const [logoModal, setLogoModal] = useState(false);
  const [mashtModal, setMashtModal] = useState(false);
  const [certificateModal, setCertificateModal] = useState(false);
  const [previousDecisionModal, setPreviousDecisionModal] = useState(false);
  const [instituonDetailsModal, setInstitutionDetailsModal] = useState(false);
  const [staffModal, setStaffModal] = useState(false);
  const [otherRequestModal, setOtherRequestModal] = useState(false);
  const [managementOfQualityModal, setManagementOfQualityModal] =
    useState(false);
  const [dataOfAssuranceModal, setDataOfAssuranceModal] = useState(false);
  const [
    managementQualityCertificationModal,
    setManagementQualityCertificationModal,
  ] = useState(false);
  const [politicsB14Modal, setPoliticsB14Modal] = useState(false);
  const [handicapesB15Modal, setHandicapeB15Modal] = useState(false);
  const [politicsB16Modal, setPoliticsB16Modal] = useState(false);
  const [systemCreditsModal, setSystemCreditsModal] = useState(false);
  const [enviromentModal, setEnviromentModal] = useState(false);
  const [modelOfCertificateModal, setModelOfCertificateModal] = useState(false);
  const [modalOfRVV, setModalOfRVV] = useState(false);
  const [formatOfModule, setFormatOfModule] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [model, setModel] = useState({
    ApplicationExpertId: ApplicationExpertId,
    RaportiPerAkreditim: "",
    RaportiPerValidim: "",
  });
  const [finalModel, setFinalModel] = useState({
    ApplicationId: id,
    ApplicationUserId: decodedToken.UserId,
    FinalReportPath: "",
  });
  console.log(finalModel);
  const secondApplication =
    data &&
    Object.keys(data).length > 0 &&
    data.applicationQualificationValidationDTO;

  const [postLoad, setPostLoad] = useState(false);
  const [hasExpertsUploadedAllFiles, setHasExpertsUploadedAllFiles] =
    useState(false);

  useEffect(() => {
    Promise.all([
      CrudProvider.getItemById("ApplicationAPI/GetById", id).then((res) => {
        if (res) {
          switch (res.statusCode) {
            case 200:
              setData(res.result);
              break;
            case "ERR_NETWORK":
              toast.error(t("ServerProblems"));
              break;
            default:
              break;
          }
        }
      }),
      CrudProvider.getItemById(
        "ApplicationAPI/HasExpertsUplodedTheirReview",
        id
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setHasExpertsUploadedAllFiles(res.result);
          }
        }
      }),
    ]);
  }, []);

  async function PostReports() {
    try {
      setPostLoad(true);
      await CrudProvider.createItemWithFile(
        "ApplicationAPI/PostApplicationExpertReviewReport",
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
    } finally {
      setPostLoad(false);
    }
  }
  async function PostFinalReview() {
    try {
      setPostLoad(true);
      await CrudProvider.createItemWithFile(
        "ApplicationAPI/PostApplicationExpertFinalReviewReport",
        finalModel
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
    } finally {
      setPostLoad(false);
    }
  }

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
            <h3 className='card-title text-start '>{t("PartA")}</h3>
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
          <div className='row'>
            <div className='row mb-2'>
              <h3 className='card-title text-start '>{t("PartB")}</h3>
              <h5 className='card-title text-start '>{t("PartBFirstDesc")}</h5>
              <h5 className='card-title'>{t("PartBSecondDesc")}</h5>
              <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2'>
                <h5 className='card-title'>B.1.1 {t("ManagementOfQuality")}</h5>
                <Button
                  onClick={() => setManagementOfQualityModal(true)}
                  className=' btn-dark'
                >
                  {t("Documents")}
                </Button>
                <Modal
                  title={t("ManagementOfQuality")}
                  centered
                  className='responsive-modal'
                  open={managementOfQualityModal}
                  okButtonProps={{ style: { display: "none" } }}
                  onCancel={() => setManagementOfQualityModal(false)}
                >
                  {data.docs.map((document) => {
                    if (document.type === "ManagementOfQualityDocs") {
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
              <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2'>
                <h5 className='card-title'>B.1.2 {t("DataOfAssurance")}</h5>
                <Button
                  onClick={() => setDataOfAssuranceModal(true)}
                  className=' btn-dark'
                >
                  {t("Documents")}
                </Button>
                <Modal
                  title={t("DataOfAssurance")}
                  centered
                  className='responsive-modal'
                  open={dataOfAssuranceModal}
                  okButtonProps={{ style: { display: "none" } }}
                  onCancel={() => setDataOfAssuranceModal(false)}
                >
                  {data.docs.map((document) => {
                    if (document.type === "DataOfAssurance") {
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
              <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2'>
                <h5 className='card-title'>
                  B.1.3 {t("ManagementQualityCertification")}
                </h5>
                <Button
                  onClick={() => setManagementQualityCertificationModal(true)}
                  className=' btn-dark'
                >
                  {t("Documents")}
                </Button>
                <Modal
                  title={t("ManagementQualityCertification")}
                  centered
                  className='responsive-modal'
                  open={managementQualityCertificationModal}
                  okButtonProps={{ style: { display: "none" } }}
                  onCancel={() => setManagementQualityCertificationModal(false)}
                >
                  {data.docs.map((document) => {
                    if (document.type === "ManagementQualityCertification") {
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
              <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2'>
                <h5 className='card-title'>B.1.4 {t("PoliticsB14")}</h5>
                <Button
                  onClick={() => setPoliticsB14Modal(true)}
                  className=' btn-dark'
                >
                  {t("Documents")}
                </Button>
                <Modal
                  title={t("PoliticsB14")}
                  centered
                  className='responsive-modal'
                  open={politicsB14Modal}
                  okButtonProps={{ style: { display: "none" } }}
                  onCancel={() => setPoliticsB14Modal(false)}
                >
                  {data.docs.map((document) => {
                    if (document.type === "PoliticsAndProcedures") {
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
              <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2'>
                <h5 className='card-title'>B.1.5 {t("HandicapesPolitics")}</h5>
                <Button
                  onClick={() => setHandicapeB15Modal(true)}
                  className=' btn-dark'
                >
                  {t("Documents")}
                </Button>
                <Modal
                  title={t("HandicapesPolitics")}
                  centered
                  className='responsive-modal'
                  open={handicapesB15Modal}
                  okButtonProps={{ style: { display: "none" } }}
                  onCancel={() => setHandicapeB15Modal(false)}
                >
                  {data.docs.map((document) => {
                    if (document.type === "HandicapDocs") {
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
              <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2'>
                <h5 className='card-title'>B.1.6 {t("PoliticsProcedures")}</h5>
                <Button
                  onClick={() => setPoliticsB16Modal(true)}
                  className=' btn-dark'
                >
                  {t("Documents")}
                </Button>
                <Modal
                  title={t("PoliticsProcedures")}
                  centered
                  className='responsive-modal'
                  open={politicsB16Modal}
                  okButtonProps={{ style: { display: "none" } }}
                  onCancel={() => setPoliticsB16Modal(false)}
                >
                  {data.docs.map((document) => {
                    if (document.type === "PoliticsProceduresDocs") {
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
              <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2'>
                <h5 className='card-title'>B.1.7 {t("SystemCredits")}</h5>
                <Button
                  onClick={() => setSystemCreditsModal(true)}
                  className=' btn-dark'
                >
                  {t("Documents")}
                </Button>
                <Modal
                  title={t("SystemCredits")}
                  centered
                  className='responsive-modal'
                  open={systemCreditsModal}
                  okButtonProps={{ style: { display: "none" } }}
                  onCancel={() => setSystemCreditsModal(false)}
                >
                  {data.docs.map((document) => {
                    if (document.type === "SystemCreditsDocs") {
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
              <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2'>
                <h5 className='card-title'>B.1.8 {t("SafeEnviroment")}</h5>
                <Button
                  onClick={() => setEnviromentModal(true)}
                  className=' btn-dark'
                >
                  {t("Documents")}
                </Button>
                <Modal
                  title={t("SafeEnviroment")}
                  centered
                  className='responsive-modal'
                  open={enviromentModal}
                  okButtonProps={{ style: { display: "none" } }}
                  onCancel={() => setEnviromentModal(false)}
                >
                  {data.docs.map((document) => {
                    if (document.type === "EnviromentDocs") {
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
              <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2'>
                <h5 className='card-title'>B.1.9 {t("B1.9")}.</h5>
                <Button
                  onClick={() => setModelOfCertificateModal(true)}
                  className=' btn-dark'
                >
                  {t("Documents")}
                </Button>
                <Modal
                  title={t("SafeEnviroment")}
                  centered
                  className='responsive-modal'
                  open={modelOfCertificateModal}
                  okButtonProps={{ style: { display: "none" } }}
                  onCancel={() => setModelOfCertificateModal(false)}
                >
                  {data.docs.map((document) => {
                    if (document.type === "CertificateDoc") {
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
              <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2'>
                <h5 className='card-title'>{t("ReportRVV")}.</h5>
                <Button
                  onClick={() => setModalOfRVV(true)}
                  className=' btn-dark'
                >
                  {t("Documents")}
                </Button>
                <Modal
                  title={t("ReportRVV")}
                  centered
                  className='responsive-modal'
                  open={modalOfRVV}
                  okButtonProps={{ style: { display: "none" } }}
                  onCancel={() => setModalOfRVV(false)}
                >
                  {data.docs.map((document) => {
                    if (document.type === "ReportRVVDoc") {
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
              <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2'>
                <h5 className='card-title'>{t("FormatOfModule")}.</h5>
                <Button
                  onClick={() => setFormatOfModule(true)}
                  className=' btn-dark'
                >
                  {t("Documents")}
                </Button>
                <Modal
                  title={t("FormatOfModule")}
                  centered
                  className='responsive-modal'
                  open={formatOfModule}
                  okButtonProps={{ style: { display: "none" } }}
                  onCancel={() => setFormatOfModule(false)}
                >
                  {data.docs.map((document) => {
                    if (document.type === "FormatOfModuleDoc") {
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
            <hr />
            <div className='row mb-2'>
              <h3 className='card-title text-start '>{t("PartC")}</h3>
              <h4 className='card-title text-start '>{t("PartC.1")}</h4>
              <hr />
              <h5 className='card-title text-start '>{t("PartC1.1")}</h5>
              <div className='col-xxl-12 col-lg-12 col-sm-12'>
                <div className='row'>
                  <div className='col-xxl-3 col-lg-5 col-sm-12'>
                    <div className='form-group'>
                      <label>{t("Name") + " " + t("Surname")}</label>
                      <input
                        type='text'
                        readOnly
                        defaultValue={data.applicationDTO.nameSurnameLeaderC11}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-3 col-lg-5 col-sm-12'>
                    <div className='form-group'>
                      <label>{t("Address")}</label>
                      <input
                        type='text'
                        readOnly
                        defaultValue={data.applicationDTO.addressLeaderC11}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-3 col-lg-5 col-sm-12'>
                    <div className='form-group'>
                      <label>{t("PhoneNumber")}</label>
                      <input
                        type='text'
                        readOnly
                        defaultValue={data.applicationDTO.phoneNumberLeaderC11}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-3 col-lg-5 col-sm-12'>
                    <div className='form-group'>
                      <label>{t("Fax")}</label>
                      <input
                        type='text'
                        readOnly
                        defaultValue={data.applicationDTO.faxLeaderC11}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-3 col-lg-5 col-sm-12'>
                    <div className='form-group'>
                      <label>{t("Email")}</label>
                      <input
                        type='text'
                        readOnly
                        defaultValue={data.applicationDTO.emailLeaderC11}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <h5 className='card-title text-start '>{t("PartC1.2")}</h5>
              <div className='col-xxl-12 col-lg-12 col-sm-12'>
                <div className='row'>
                  <div className='col-xxl-3 col-lg-5 col-sm-12'>
                    <div className='form-group'>
                      <label>{t("Name") + " " + t("Surname")}</label>
                      <input
                        type='text'
                        readOnly
                        defaultValue={
                          data.applicationDTO.nameSurnameCoordinatorC12
                        }
                      />
                    </div>
                  </div>
                  <div className='col-xxl-3 col-lg-5 col-sm-12'>
                    <div className='form-group'>
                      <label>{t("Address")}</label>
                      <input
                        type='text'
                        readOnly
                        defaultValue={data.applicationDTO.addressCoordinatorC12}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-3 col-lg-5 col-sm-12'>
                    <div className='form-group'>
                      <label>{t("PhoneNumber")}</label>
                      <input
                        type='text'
                        readOnly
                        defaultValue={
                          data.applicationDTO.phoneNumberCoordinatorC12
                        }
                      />
                    </div>
                  </div>
                  <div className='col-xxl-3 col-lg-5 col-sm-12'>
                    <div className='form-group'>
                      <label>{t("Fax")}</label>
                      <input
                        type='text'
                        readOnly
                        defaultValue={data.applicationDTO.faxCoordinatorC12}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-3 col-lg-5 col-sm-12'>
                    <div className='form-group'>
                      <label>{t("Email")}</label>
                      <input
                        type='text'
                        readOnly
                        defaultValue={data.applicationDTO.emailCoordinatorC12}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-xxl-12 col-lg-12 col-sm-12'>
                  <div className='form-group'>
                    <label>C1.5 {t("PartC1.5")}</label>
                    <input
                      type='text'
                      readOnly
                      defaultValue={data.applicationDTO.placeOfApplicationC15}
                    />
                  </div>
                </div>
              </div>
            </div>

            {data.secondApplication && (
              <>
                <hr />
                <ViewSecondApplication
                  secondApplication={secondApplication}
                  docs={data.docs}
                />
              </>
            )}

            <hr />
            <div className='row'>
              {hasExpertsUploadedAllFiles ? (
                <>
                  <div className='col-xxl-12 col-lg-12 col-sm-12'>
                    <div
                      className='alert alert-primary text-dark border-0'
                      role='alert'
                    >
                      Raportin final mund ta ngarkoni, pasi të gjitha raportet
                      janë ngarkuar tashmë nga ekspertët tjerë.
                    </div>
                  </div>
                  <div className='col-xxl-2 col-lg-4 col-sm-6'>
                    <label>Ngarkoni raportin final:</label>
                    <Upload
                      beforeUpload={() => false}
                      listType='picture-circle'
                      maxCount={1}
                      accept='.pdf'
                      onChange={(e) => {
                        if (e.file.status !== "removed") {
                          setFinalModel({
                            ...finalModel,
                            FinalReportPath: e.file,
                          });
                        } else {
                          setFinalModel({
                            ...finalModel,
                            FinalReportPath: "",
                          });
                        }
                      }}
                    >
                      {t("UploadDoc")}
                    </Upload>
                  </div>
                </>
              ) : (
                <>
                  <div className='col-xxl-2 col-lg-4 col-sm-6'>
                    <label>Raporti për akreditim:</label>
                    <Upload
                      beforeUpload={() => false}
                      listType='picture-circle'
                      maxCount={1}
                      accept='.pdf'
                      onChange={(e) => {
                        if (e.file.status !== "removed") {
                          setModel({
                            ...model,
                            RaportiPerAkreditim: e.file,
                          });
                        } else {
                          setModel({
                            ...model,
                            RaportiPerAkreditim: "",
                          });
                        }
                      }}
                    >
                      {t("UploadDoc")}
                    </Upload>
                  </div>
                  {secondApplication && (
                    <div className='col-xxl-2 col-lg-4 col-sm-6'>
                      <label>Raporti për validim:</label>
                      <Upload
                        beforeUpload={() => false}
                        listType='picture-circle'
                        maxCount={1}
                        accept='.pdf'
                        onChange={(e) => {
                          if (e.file.status !== "removed") {
                            setModel({
                              ...model,
                              RaportiPerValidim: e.file,
                            });
                          } else {
                            setModel({
                              ...model,
                              RaportiPerValidim: "",
                            });
                          }
                        }}
                      >
                        {t("UploadDoc")}
                      </Upload>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className='col-xxl-12 col-lg-12 col-sm-12 text-end'>
              {postLoad ? (
                <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
                  <div
                    className='spinner-border text-primary m-2 text-center'
                    role='status'
                  />
                </div>
              ) : (
                <button
                  onClick={
                    hasExpertsUploadedAllFiles ? PostFinalReview : PostReports
                  }
                  className='btn btn-soft-primary waves-effect '
                >
                  {t("Save")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='card'>
      <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
        <div
          className='spinner-border text-primary m-2 text-center'
          role='status'
        />
      </div>
    </div>
  );
}
