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
import ViewSecondApplication from "./ViewSecondApplication";
import AssignExperts from "./AssignExperts";
import CustomModal from "../../custom/CustomModal";

export default function ViewApplication() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const [logoModal, setLogoModal] = useState(false);
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
  const secondApplication =
    data &&
    Object.keys(data).length > 0 &&
    data.applicationQualificationValidationDTO;
  const [expertReports, setExpertReports] = useState({});
  const [finalExpertReportModal, setFinalExpertReportModal] = useState(false);
  const [expertReportsModal, setExpertsReportsModal] = useState(false);
  async function callExpertReports() {
    await CrudProvider.getItemById("ApplicationAPI/ExpertResults", id).then(
      (res) => {
        if (res) {
          if (res.statusCode === 200) {
            setExpertReports(res.result);
          }
        }
      }
    );
  }

  useEffect(() => {
    callExpertReports();
  }, [data]);

  useEffect(() => {
    Promise.all([
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
      }),
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
      }),
    ]);
  }, []);

  async function checkModel(model) {
    if (model.StatusName === "Rikthim") {
      if (model.Remark) {
        return true;
      } else {
        toast.error("Plotësoni vërejtjen");
        return false;
      }
    } else {
      return true;
    }
  }
  async function SubmitApplication() {
    try {
      setPostLoad(true);
      var check = await checkModel(model);
      if (check) {
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
    } finally {
      setPostLoad(false);
    }
  }
  const statusesList =
    statuses.length > 0 &&
    decodedToken &&
    statuses
      .filter((status) => {
        if (decodedToken.role === "Zyrtar AKK") {
          if (data.step === 7) {
            return status.step === 6 || status.step === 11;
          } else {
            return status.step === 2 || status.step === 3;
          }
        } else if (decodedToken.role === "Bord") {
          return status.step === 9 || status.step === 8;
        }
        return false;
      })
      .sort((a, b) => b.description.localeCompare(a.description));

  const onChange = (e) => {
    if (e.target.checked) {
      !isSelected && setIsSelected(e.target.name);
      setModel({
        ...model,
        StatusId: e.target.value,
        StatusName:
          e.target.name === 3 || e.target.name === 6
            ? "Rikthim"
            : e.target.name,
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
              <button
                className='fs-6  btn2 btn-modal btn-raporti'
                onClick={(e) => setLogoModal(true)}
              >
                {t("Logo")}
              </button>
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
          <h5 className='mt-3 text-muted'>
            {t("ChooseQualificationApplication")}:
          </h5>
          <div className='col-xxl-12 col-lg-12 col-md-12 col-sm-12 mt-1 text-start'>
            <div className='form-group'>
              <textarea
                className='mt-2'
                readOnly
                defaultValue={data.applicationDTO.qualificationTitleAndLevel}
              />
              <span className='focus-border'></span>
            </div>
          </div>
          <div className='row'>
            <h5>{t("JuridicPersonDetails")}:</h5>
            {/* <div className='col-xxl-3 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
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
            </div> */}
            <CustomModal
              showUpload={false}
              docs={data.docs}
              placeHolder={t("RegistrationCertificate")}
              typeToFilter={"CertificateRegisterDocA15"}
            />
            <div className='col-xxl-12 col-lg-12 col-md-12 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <textarea
                  className='mt-2'
                  readOnly
                  defaultValue={data.applicationDTO.juridicPersonA15}
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
          </div>
          {data.applicationDTO.qualificationPeriodA17 && (
            <>
              <hr />
              <div className='row'>
                <h5>{t("EarilerQualifications")}</h5>
                <div className='col-xxl-12 col-lg-12 col-sm-12 mt-1 text-start'>
                  <div className='form-group'>
                    <label className='text-muted'>{t("NoticePeriod")}:</label>
                    <textarea
                      className='mt-2'
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
            {/* <div className='col-xxl-3 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
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
            </div> */}
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
            <div className='col-xxl-12 col-lg-12 col-md-12 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <textarea
                  className='mt-2'
                  readOnly
                  defaultValue={data.applicationDTO.a21Text}
                />
                <span className='focus-border'></span>
              </div>
            </div>
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
            <CustomModal
              showUpload={false}
              docs={data.docs}
              placeHolder={t("StaffDataModal")}
              typeToFilter={"StaffA23"}
            />
            <div className='col-xxl-12 col-lg-12 col-md-12 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <textarea
                  className='mt-2'
                  readOnly
                  defaultValue={data.applicationDTO.a23Text}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-12 col-lg-12 col-sm-12 mt-1 '>
              <div className='form-group'>
                <label className='text-muted'>{t("DataForCandidates")}:</label>
                <textarea
                  readOnly
                  className='mt-2'
                  rows={5}
                  defaultValue={data.applicationDTO.candidatesDataA24}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <CustomModal
              showUpload={false}
              docs={data.docs}
              placeHolder={t("OtherRequest")}
              typeToFilter={"OtherRequestsA25"}
            />
            <div className='col-xxl-12 col-lg-12 col-md-12 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <textarea
                  className='mt-2'
                  readOnly
                  defaultValue={data.applicationDTO.a25Text}
                />
                <span className='focus-border'></span>
              </div>
            </div>
          </div>
          <hr />
          <form onSubmit={formik.handleSubmit}>
            <div className='row'>
              <div className='row mb-2'>
                <h3 className='card-title text-start '>{t("PartB")}</h3>
                <h5 className='card-title text-start '>
                  {t("PartBFirstDesc")}
                </h5>
                <h5 className='card-title'>{t("PartBSecondDesc")}</h5>
                <CustomModal
                  showUpload={false}
                  docs={data.docs}
                  placeHolder={t("ManagementOfQuality")}
                  typeToFilter={"ManagementOfQualityDocs"}
                />
                <div className='col-xxl-12 col-lg-12 col-md-12 col-sm-12 mt-1 text-start'>
                  <div className='form-group'>
                    <textarea
                      className='mt-2'
                      readOnly
                      defaultValue={data.applicationDTO.b11Text}
                    />
                    <span className='focus-border'></span>
                  </div>
                </div>
                <CustomModal
                  showUpload={false}
                  docs={data.docs}
                  placeHolder={t("DataOfAssurance")}
                  typeToFilter={"DataOfAssurance"}
                />
                <div className='col-xxl-12 col-lg-12 col-md-12 col-sm-12 mt-1 text-start'>
                  <div className='form-group'>
                    <textarea
                      className='mt-2'
                      readOnly
                      defaultValue={data.applicationDTO.b12Text}
                    />
                    <span className='focus-border'></span>
                  </div>
                </div>
                <CustomModal
                  showUpload={false}
                  docs={data.docs}
                  placeHolder={t("ManagementQualityCertification")}
                  typeToFilter={"ManagementQualityCertification"}
                />
                <div className='col-xxl-12 col-lg-12 col-md-12 col-sm-12 mt-1 text-start'>
                  <div className='form-group'>
                    <textarea
                      className='mt-2'
                      readOnly
                      defaultValue={data.applicationDTO.b13Text}
                    />
                    <span className='focus-border'></span>
                  </div>
                </div>
                <CustomModal
                  showUpload={false}
                  docs={data.docs}
                  placeHolder={t("PoliticsB14")}
                  typeToFilter={"PoliticsAndProcedures"}
                />
                <div className='col-xxl-12 col-lg-12 col-md-12 col-sm-12 mt-1 text-start'>
                  <div className='form-group'>
                    <textarea
                      className='mt-2'
                      readOnly
                      defaultValue={data.applicationDTO.b14Text}
                    />
                    <span className='focus-border'></span>
                  </div>
                </div>
                <CustomModal
                  showUpload={false}
                  docs={data.docs}
                  placeHolder={t("HandicapesPolitics")}
                  typeToFilter={"HandicapDocs"}
                />
                <div className='col-xxl-12 col-lg-12 col-md-12 col-sm-12 mt-1 text-start'>
                  <div className='form-group'>
                    <textarea
                      className='mt-2'
                      readOnly
                      defaultValue={data.applicationDTO.b15Text}
                    />
                    <span className='focus-border'></span>
                  </div>
                </div>
                <CustomModal
                  showUpload={false}
                  docs={data.docs}
                  placeHolder={t("PoliticsProcedures")}
                  typeToFilter={"PoliticsProceduresDocs"}
                />
                <div className='col-xxl-12 col-lg-12 col-md-12 col-sm-12 mt-1 text-start'>
                  <div className='form-group'>
                    <textarea
                      className='mt-2'
                      readOnly
                      defaultValue={data.applicationDTO.b16Text}
                    />
                    <span className='focus-border'></span>
                  </div>
                </div>
                <CustomModal
                  showUpload={false}
                  docs={data.docs}
                  placeHolder={t("SystemCredits")}
                  typeToFilter={"SystemCreditsDocs"}
                />
                <div className='col-xxl-12 col-lg-12 col-md-12 col-sm-12 mt-1 text-start'>
                  <div className='form-group'>
                    <textarea
                      className='mt-2'
                      readOnly
                      defaultValue={data.applicationDTO.b17Text}
                    />
                    <span className='focus-border'></span>
                  </div>
                </div>
                <CustomModal
                  showUpload={false}
                  docs={data.docs}
                  placeHolder={t("SafeEnviroment")}
                  typeToFilter={"EnviromentDocs"}
                />
                <div className='col-xxl-12 col-lg-12 col-md-12 col-sm-12 mt-1 text-start'>
                  <div className='form-group'>
                    <textarea
                      className='mt-2'
                      readOnly
                      defaultValue={data.applicationDTO.b18Text}
                    />
                    <span className='focus-border'></span>
                  </div>
                </div>
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
                          defaultValue={
                            data.applicationDTO.nameSurnameLeaderC11
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
                          defaultValue={
                            data.applicationDTO.phoneNumberLeaderC11
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
                          defaultValue={
                            data.applicationDTO.addressCoordinatorC12
                          }
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
              {expertReports && Object.keys(expertReports).length > 0 && (
                <>
                  <h5 className='card-title text-start '>
                    {t("ExpertReports")}
                  </h5>

                  <div className='col-xxl-12 col-lg-12 col-sm-12 mb-2'>
                    <div className='row'>
                      <div className='col-xxl-6 col-lg-6 col-sm-12'>
                        <button
                          type='button'
                          className=' fs-6  btn2 btn-modal btn-raporti'
                          onClick={() => setExpertsReportsModal(true)}
                        >
                          {t("ExpertReports")}
                        </button>
                        <Modal
                          title={t("ExpertReports")}
                          centered
                          className='responsive-modal'
                          open={expertReportsModal}
                          okButtonProps={{ style: { display: "none" } }}
                          onCancel={() => setExpertsReportsModal(false)}
                        >
                          <div className='row'>
                            {expertReports?.expertReports?.map((document) => {
                              return (
                                <>
                                  <h5 className='card-title'>
                                    {t("Name") +
                                      " " +
                                      t("Surname").toLowerCase() +
                                      " " +
                                      t("Expert").toLowerCase()}
                                    : {document.expertNameSurname}
                                  </h5>
                                  {document.reportiPerAkreditimPath && (
                                    <div className='col-xxl-6 col-lg-6 col-sm-12'>
                                      <iframe
                                        src={CrudProvider.documentPath(
                                          document.reportiPerAkreditimPath
                                        )}
                                        loading='lazy'
                                      />
                                    </div>
                                  )}
                                  {document.reportiPerValidimPath && (
                                    <div className='col-xxl-6 col-lg-6 col-sm-12'>
                                      <iframe
                                        src={CrudProvider.documentPath(
                                          document.reportiPerValidimPath
                                        )}
                                        loading='lazy'
                                      />
                                    </div>
                                  )}
                                  <hr className='mb-2' />
                                </>
                              );
                            })}
                          </div>
                        </Modal>
                      </div>
                      {expertReports.finalReportPath && (
                        <div className='col-xxl-6 col-lg-6 col-sm-12'>
                          <button
                            className=' fs-6  btn2 btn-modal btn-raporti'
                            onClick={() => setFinalExpertReportModal(true)}
                          >
                            {t("FinalExpertReport")}
                          </button>
                          <Modal
                            title={t("ExpertReports")}
                            centered
                            className='responsive-modal'
                            open={finalExpertReportModal}
                            okButtonProps={{ style: { display: "none" } }}
                            onCancel={() => setFinalExpertReportModal(false)}
                          >
                            <h5 className='card-title'>
                              {t("Name") +
                                " " +
                                t("Surname").toLowerCase() +
                                " " +
                                t("Expert").toLowerCase()}
                              : {expertReports.finalExpertNameSurname}
                            </h5>
                            <iframe
                              src={CrudProvider.documentPath(
                                expertReports.finalReportPath
                              )}
                              loading='lazy'
                            />
                          </Modal>
                        </div>
                      )}
                    </div>
                  </div>
                  <hr />
                </>
              )}
              {model.StatusName === "Rikthim" && (
                <>
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
                  <hr />
                </>
              )}
              {data.step !== 8 && (
                <div className='col-xxl-12 col-lg-12 col-sm-12 text-end'>
                  {statusesList.map((item) => (
                    <Checkbox
                      disabled={isSelected ? isSelected !== item.step : false}
                      value={item.statusId}
                      name={item.step}
                      key={item.statusId}
                      onChange={onChange}
                    >
                      {item.step === 2
                        ? "Verifiko"
                        : item.step === 3
                        ? "Rikthim"
                        : item.step === 4
                        ? "Aprovo"
                        : item.step === 8
                        ? "APROVIMI FINAL"
                        : item.step === 9
                        ? "REFUZIMI FINAL"
                        : item.step === 6
                        ? "Rikthim tek ekspertët"
                        : item.step === 11
                        ? "Dërgo tek bordi për verifikim"
                        : "Refuzo"}
                    </Checkbox>
                  ))}
                  {decodedToken.role === "Zyrtar per caktimin e eksperteve" && (
                    <AssignExperts
                      applicationId={id}
                      decodedToken={decodedToken}
                    />
                  )}
                  {decodedToken.role !== "Admin" ||
                    (isSelected &&
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
                      )))}
                </div>
              )}
            </div>
          </form>
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
