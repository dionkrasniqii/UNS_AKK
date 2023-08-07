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
import CustomModal from "../../custom/CustomModal";

export default function ExpertReviewApplication() {
  const { id, ApplicationExpertId } = useParams();
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const [logoModal, setLogoModal] = useState(false);
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
              toast.success(t(res.result));
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
            <CustomModal
              showUpload={false}
              docs={data.docs}
              placeHolder={t("LicenseMASHT")}
              typeToFilter={"MASHTLicenseA16"}
            />

            <CustomModal
              showUpload={false}
              docs={data.docs}
              placeHolder={t("RegistrationCertificate")}
              typeToFilter={"CertificateRegisterDocA15"}
            />
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
                <CustomModal
                  showUpload={false}
                  docs={data.docs}
                  placeHolder={t("PreviousDecisionDocs")}
                  typeToFilter={"QualificatinDocsA17"}
                />
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
                  defaultValue={data.applicationDTO.qualificationTitleAndLevel}
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
            <CustomModal
              showUpload={false}
              docs={data.docs}
              placeHolder={t("InstitutionDetailsModal")}
              typeToFilter={"InstitutionDocsA21"}
            />
            <CustomModal
              showUpload={false}
              docs={data.docs}
              placeHolder={t("StaffDataModal")}
              typeToFilter={"StaffA23"}
            />
            <CustomModal
              showUpload={false}
              docs={data.docs}
              placeHolder={t("OtherRequest")}
              typeToFilter={"OtherRequestsA25"}
            />
          </div>
          <hr />
          <div className='row'>
            <div className='row mb-2'>
              <h3 className='card-title text-start '>{t("PartB")}</h3>
              <h5 className='card-title text-start '>{t("PartBFirstDesc")}</h5>
              <h5 className='card-title'>{t("PartBSecondDesc")}</h5>
              <CustomModal
                showUpload={false}
                docs={data.docs}
                placeHolder={t("ManagementOfQuality")}
                typeToFilter={"ManagementOfQualityDocs"}
              />
              <CustomModal
                showUpload={false}
                docs={data.docs}
                placeHolder={t("DataOfAssurance")}
                typeToFilter={"DataOfAssurance"}
              />
              <CustomModal
                showUpload={false}
                docs={data.docs}
                placeHolder={t("ManagementQualityCertification")}
                typeToFilter={"ManagementQualityCertification"}
              />
              <CustomModal
                showUpload={false}
                docs={data.docs}
                placeHolder={t("PoliticsB14")}
                typeToFilter={"PoliticsAndProcedures"}
              />
              <CustomModal
                showUpload={false}
                docs={data.docs}
                placeHolder={t("HandicapesPolitics")}
                typeToFilter={"HandicapDocs"}
              />
              <CustomModal
                showUpload={false}
                docs={data.docs}
                placeHolder={t("PoliticsProcedures")}
                typeToFilter={"PoliticsProceduresDocs"}
              />
              <CustomModal
                showUpload={false}
                docs={data.docs}
                placeHolder={t("SystemCredits")}
                typeToFilter={"SystemCreditsDocs"}
              />
              <CustomModal
                showUpload={false}
                docs={data.docs}
                placeHolder={t("SafeEnviroment")}
                typeToFilter={"EnviromentDocs"}
              />
              <CustomModal
                showUpload={false}
                docs={data.docs}
                placeHolder={t("B1.9")}
                typeToFilter={"CertificateDoc"}
              />
              <CustomModal
                showUpload={false}
                docs={data.docs}
                placeHolder={t("ReportRVV")}
                typeToFilter={"ReportRVVDoc"}
              />
              <CustomModal
                showUpload={false}
                docs={data.docs}
                placeHolder={t("FormatOfModule")}
                typeToFilter={"FormatOfModuleDoc"}
              />
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
