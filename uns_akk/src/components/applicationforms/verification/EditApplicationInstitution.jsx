import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../../provider/CrudProvider";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import CustomSelect from "../../custom/CustomSelect";
import CustomFileInput from "../../custom/CustomFileInput";

export default function EditApplicationInstitution() {
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
  const navigate = useNavigate();
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [qualifications, setQualifications] = useState([]);
  const [model, setModel] = useState({
    ApplicationId: "",
    QualificationId: "",
    QualificationPeriodA17: "",
    OfferNoValidationCertificationA18: "",
    TextA18: "",
    ValidationCertificationNotOfferA18: "",
    OfferValidationCertificationA18: "",
    TargetNumberOfCandidatesA24: "",
    NumOfGroupsA24: "",
    EquipmentMaterialsQualificationA22: "",
    Docs: [],
    RegisterNrA15: "",
    FiscalNrA15: "",
    DeletedDocs: [],
  });
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
                QualificationId: res.result.applicationDTO.qualificationId,
                QualificationPeriodA17:
                  res.result.applicationDTO.qualificationPeriodA17,
                OfferNoValidationCertificationA18:
                  res.result.applicationDTO.offerNoValidationCertificationA18,
                TextA18: res.result.applicationDTO.textA18,
                ValidationCertificationNotOfferA18:
                  res.result.applicationDTO.validationCertificationNotOfferA18,
                OfferValidationCertificationA18:
                  res.result.applicationDTO.offerValidationCertificationA18,
                TargetNumberOfCandidatesA24:
                  res.result.applicationDTO.targetNumberOfCandidatesA24,
                NumOfGroupsA24: res.result.applicationDTO.numOfGroupsA24,
                EquipmentMaterialsQualificationA22:
                  res.result.applicationDTO.equipmentMaterialsQualificationA22,
                RegisterNrA15: res.result.applicationDTO.registerNrA15,
                FiscalNrA15: res.result.applicationDTO.fiscalNrA15,
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
      CrudProvider.getAllWithLang("QualificationAPI/GetAll").then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            const mappedQualifications = res.result.map((obj) => ({
              label: obj.qualificationName,
              value: obj.qualificationId,
            }));
            setQualifications(mappedQualifications);
          }
        }
      });
    } finally {
      setLoad(false);
    }
  }, []);
  const handleOptionChange = (option) => {
    setModel({
      ...model,
      OfferNoValidationCertificationA18:
        option === "OfferNoValidationCertificationA18",
      ValidationCertificationNotOfferA18:
        option === "ValidationCertificationNotOfferA18",
      OfferValidationCertificationA18:
        option === "OfferValidationCertificationA18",
    });
  };

  const defaultQualificationSelect = Object.keys(data).length > 0 && {
    label: data.applicationDTO.qualificationName,
    value: data.applicationDTO.qualificationId,
  };
  async function changeQualification(e) {
    setModel({
      ...model,
      QualificationId: e,
    });
  }
  const handleRemoveDocument = (documentId) => {
    setModel({
      ...model,
      DeletedDocs: [...model.DeletedDocs, documentId],
    });
    // const iframeToBeRemoved = document.getElementById(`iframe-${documentId}`);
    // const iframeDocument = iframeToBeRemoved?.contentWindow?.document;
    // iframeToBeRemoved &&
    //   iframeDocument &&
    //   iframeToBeRemoved.classList.add("d-none");
    const divToBeRemoved = document.getElementById(documentId);
    divToBeRemoved && divToBeRemoved.classList.add("d-none");
  };
  async function setMASHTLicenseFiles(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "MASHTLicenseA16"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "MASHTLicenseA16",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
  }
  async function setRegistrationCertificate(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "CertificateRegisterDocA15"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "CertificateRegisterDocA15",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
  }
  async function setEarilerDecisionsFiles(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "QualificatinDocsA17"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "QualificatinDocsA17",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
  }
  async function setInstitutionFiles(files) {
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
  }
  async function setStaffFiles(files) {
    const newArray = model.Docs.filter((file) => file.Type != "StaffA23");
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "StaffA23",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
  }
  async function setOtherRequestFiles(files) {
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
  async function SubmitApplication() {
    await CrudProvider.createItemWithFile(
      "ApplicationAPI/UpdateApplicationData",
      model
    ).then((res) => {
      if (res) {
        switch (res.statusCode) {
          case 200:
            toast.success(t("DataUpdatedSuccessfully"));
            navigate("/applications-list");
            break;
          default:
            break;
        }
      }
    });
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
            <div className='col-xxl-12 col-lg-12 col-sm-12'>
              <div className='form-group'>
                <label>{t("Remark")}</label>
                <textarea
                  readOnly
                  className='mt-2'
                  rows={5}
                  defaultValue={data.applicationDTO.remark}
                />
              </div>
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
            <div className='col-xxl-1 col-lg-2 col-sm-12 mt-2 text-start divForUpload'>
              <button
                className=' fs-6  btn2 btn-modal btn-raporti'
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
                    loading='lazy'
                    title='Logo'
                  ></iframe>
                ) : (
                  <img
                    src={CrudProvider.documentPath(
                      data.applicationDTO.institutionLogo
                    )}
                    loading='lazy'
                    alt='logo'
                  ></img>
                )}
              </Modal>
            </div>
          </div>
          <hr />
          <div className='row'>
            <h5>{t("JuridicPersonDetails")}:</h5>
            <div
              className='alert alert-light bg-light text-dark border-0'
              role='alert'
            >
              {t("DeleteOldDocs")} -
              <strong>
                <svg
                  type='button'
                  xmlns='http://www.w3.org/2000/svg'
                  width={16}
                  height={16}
                  fill='currentColor'
                  className='bi bi-x-circle icon-close'
                  viewBox='0 0 16 16'
                >
                  <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                  <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                </svg>
              </strong>
            </div>
            <div
              className='alert alert-light bg-light text-dark border-0'
              role='alert'
            >
              {t("ToUploadNewDocs")} -
              <strong>
                <svg
                  width={16}
                  height={16}
                  viewBox='0 0 66 57'
                  fill='none'
                  className='bi bi-x-circle icon-close'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M2.70977 0H19.4194C20.2733 0 21.0742 0.402215 21.5857 1.08315L25.3821 6.14266C25.8937 6.82361 26.6946 7.22581 27.5484 7.22581H62.3226C63.8185 7.22581 65.0323 8.43956 65.0323 9.93548V53.2903C65.0323 54.7862 63.8185 56 62.3226 56H2.70968C1.21376 56 0 54.7862 0 53.2903V2.70968C0 1.21375 1.21385 0 2.70977 0Z'
                    transform='translate(0.0177612 0.740387)'
                    fill='#4F8AFE'
                  />
                </svg>
              </strong>
            </div>
            <div className='col-xxl-4 col-lg-5 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("FiscalNumber")}:</label>
                <input
                  type='text'
                  defaultValue={data.applicationDTO.fiscalNrA15}
                  onChange={(e) =>
                    setModel({
                      ...model,
                      FiscalNrA15: e.target.value,
                    })
                  }
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-4 col-lg-5 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("RegistrationNumber")}:</label>
                <input
                  type='text'
                  onChange={(e) =>
                    setModel({
                      ...model,
                      RegisterNrA15: e.target.value,
                    })
                  }
                  defaultValue={data.applicationDTO.registerNrA15}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 text-center divForUpload'>
              <button
                className=' fs-6  btn2 btn-modal btn-raporti'
                onClick={() => setMashtModal(true)}
              >
                {t("LicenseMASHT")}
              </button>
              {data.docs
                .filter((document) => document.type === "MASHTLicenseA16")
                .map((obj, index) => {
                  return (
                    <div
                      className='w-100'
                      key={index}
                      id={obj.applicationDocsId}
                    >
                      <span className='upload-filename'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-link-45deg svg-link'
                          viewBox='0 0 16 16'
                        >
                          <path d='M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z' />
                          <path d='M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z' />
                        </svg>

                        {obj.docPath.split("$$")[1]}
                        <svg
                          type='button'
                          onClick={() =>
                            handleRemoveDocument(obj.applicationDocsId)
                          }
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-x-circle icon-close'
                          viewBox='0 0 16 16'
                        >
                          <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                          <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                        </svg>
                      </span>
                    </div>
                  );
                })}
              <div className='col-xxl-12 col-lg-12 col-sm-12 d-flex justify-content-center mt-2'>
                <div className='col-xxl-8 col-lg-10 col-sm-12'>
                  <CustomFileInput
                    onChangeFunction={setMASHTLicenseFiles}
                    acceptType={".pdf"}
                    isMultiple={true}
                  />
                </div>
              </div>
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
                        id={document.applicationDocsId}
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
            <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 text-center divForUpload'>
              <button
                className=' fs-6  btn2 btn-modal btn-raporti'
                onClick={() => setCertificateModal(true)}
              >
                {t("RegistrationCertificate")}
              </button>
              {data.docs
                .filter(
                  (document) => document.type === "CertificateRegisterDocA15"
                )
                .map((obj, index) => {
                  return (
                    <div
                      className='w-100'
                      key={index}
                      id={obj.applicationDocsId}
                    >
                      <span className='upload-filename'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-link-45deg svg-link'
                          viewBox='0 0 16 16'
                        >
                          <path d='M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z' />
                          <path d='M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z' />
                        </svg>

                        {obj.docPath.split("$$")[1]}
                        <svg
                          type='button'
                          onClick={() =>
                            handleRemoveDocument(obj.applicationDocsId)
                          }
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-x-circle icon-close'
                          viewBox='0 0 16 16'
                        >
                          <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                          <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                        </svg>
                      </span>
                    </div>
                  );
                })}
              <div className='col-xxl-12 col-lg-12 col-sm-12 d-flex justify-content-center mt-2'>
                <div className='col-xxl-8 col-lg-10 col-sm-12'>
                  <CustomFileInput
                    onChangeFunction={setRegistrationCertificate}
                    acceptType={".pdf"}
                    isMultiple={true}
                  />
                </div>
              </div>
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
                <div className='col-xxl-6 col-lg-6  col-sm-12 mt-1 text-start'>
                  <div className='form-group'>
                    <label className='text-muted'>{t("NoticePeriod")}:</label>
                    <input
                      type='text'
                      onChange={(e) =>
                        setModel({
                          ...model,
                          QualificationPeriodA17: e.target.value,
                        })
                      }
                      defaultValue={data.applicationDTO.qualificationPeriodA17}
                    />
                    <span className='focus-border'></span>
                  </div>
                </div>
                <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 text-center divForUpload'>
                  <button
                    className=' fs-6  btn2 btn-modal btn-raporti'
                    onClick={() => setPreviousDecisionModal(true)}
                  >
                    {t("PreviousDecisionDocs")}
                  </button>
                  {data.docs
                    .filter(
                      (document) => document.type === "QualificatinDocsA17"
                    )
                    .map((obj, index) => {
                      return (
                        <div
                          className='w-100'
                          key={index}
                          id={obj.applicationDocsId}
                        >
                          <span className='upload-filename'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              fill='currentColor'
                              className='bi bi-link-45deg svg-link'
                              viewBox='0 0 16 16'
                            >
                              <path d='M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z' />
                              <path d='M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z' />
                            </svg>

                            {obj.docPath.split("$$")[1]}
                            <svg
                              type='button'
                              onClick={() =>
                                handleRemoveDocument(obj.applicationDocsId)
                              }
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              fill='currentColor'
                              className='bi bi-x-circle icon-close'
                              viewBox='0 0 16 16'
                            >
                              <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                              <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                            </svg>
                          </span>
                        </div>
                      );
                    })}
                  <div className='col-xxl-12 col-lg-12 col-sm-12 d-flex justify-content-center mt-2'>
                    <div className='col-xxl-8 col-lg-10 col-sm-12'>
                      <CustomFileInput
                        onChangeFunction={setEarilerDecisionsFiles}
                        acceptType={".pdf"}
                        isMultiple={true}
                      />
                    </div>
                  </div>
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
                  onChange={(e) =>
                    setModel({
                      ...model,
                      EquipmentMaterialsQualificationA22: e.target.value,
                    })
                  }
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
              <label className='text-muted'>{t("Qualification")}:</label>
              <CustomSelect
                optionsList={qualifications}
                hasDefaultValue={true}
                onChangeFunction={changeQualification}
                defaultValue={defaultQualificationSelect}
                isMulti={false}
              />
              <span className='focus-border'></span>
            </div>
            <div className='col-xxl-2 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("NumberOfGroups")}:</label>
                <input
                  type='text'
                  min={1}
                  onChange={(e) =>
                    setModel({
                      NumOfGroupsA24: e.target.value,
                    })
                  }
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
                  min={1}
                  onChange={(e) =>
                    setModel({
                      ...model,
                      TargetNumberOfCandidatesA24: e.target.value,
                    })
                  }
                  defaultValue={data.applicationDTO.targetNumberOfCandidatesA24}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <div className='col-xxl-3 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-check text-start'>
                <input
                  type='radio'
                  id='1CheckBox'
                  checked={model.OfferNoValidationCertificationA18}
                  className='form-check-input'
                  onChange={() =>
                    handleOptionChange("OfferNoValidationCertificationA18")
                  }
                />
                <label className='text-muted'>
                  {t("ForDeliveryNotEvaluationAndCertification")}:
                </label>
              </div>
            </div>
            <div className='col-xxl-3 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-check text-start'>
                <input
                  type='radio'
                  id='2CheckBox'
                  checked={model.ValidationCertificationNotOfferA18}
                  className='form-check-input'
                  onChange={() =>
                    handleOptionChange("ValidationCertificationNotOfferA18")
                  }
                />
                <label className='text-muted'>
                  {t("ForAssessmentAndCertificatioNotDelivery")}:
                </label>
              </div>
            </div>
            <div className='col-xxl-3 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-check text-start'>
                <input
                  type='radio'
                  id='3CheckBox'
                  checked={model.OfferValidationCertificationA18}
                  className='form-check-input'
                  onChange={() =>
                    handleOptionChange("OfferValidationCertificationA18")
                  }
                />
                <label className='text-muted'>
                  {t("ForAssessmentAndCertificatioDelivery")}:
                </label>
              </div>
            </div>
            <div className='col-xxl-12 col-lg-12 col-md-12 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("AdditionalData")}:</label>
                <textarea
                  className='mt-2'
                  onChange={(e) =>
                    setModel({
                      ...model,
                      TextA18: e.target.value,
                    })
                  }
                  defaultValue={data.applicationDTO.textA18}
                />
                <span className='focus-border'></span>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 text-center divForUpload'>
              <button
                className=' fs-6  btn2 btn-modal btn-raporti'
                onClick={(e) => setInstitutionDetailsModal(true)}
              >
                {t("InstitutionDetailsModal")}
              </button>
              {data.docs
                .filter((document) => document.type === "InstitutionDocsA21")
                .map((obj, index) => {
                  return (
                    <div
                      className='w-100'
                      key={index}
                      id={obj.applicationDocsId}
                    >
                      <span className='upload-filename'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-link-45deg svg-link'
                          viewBox='0 0 16 16'
                        >
                          <path d='M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z' />
                          <path d='M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z' />
                        </svg>

                        {obj.docPath.split("$$")[1]}
                        <svg
                          type='button'
                          onClick={() =>
                            handleRemoveDocument(obj.applicationDocsId)
                          }
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-x-circle icon-close'
                          viewBox='0 0 16 16'
                        >
                          <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                          <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                        </svg>
                      </span>
                    </div>
                  );
                })}
              <div className='col-xxl-12 col-lg-12 col-sm-12 d-flex justify-content-center mt-2'>
                <div className='col-xxl-8 col-lg-10 col-sm-12'>
                  <CustomFileInput
                    onChangeFunction={setInstitutionFiles}
                    acceptType={".pdf"}
                    isMultiple={true}
                  />
                </div>
              </div>
              <Modal
                title={t("InstitutionDetailsModal")}
                centered
                open={instituonDetailsModal}
                className='responsive-modal'
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
            <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 text-center divForUpload'>
              <button
                className=' fs-6  btn2 btn-modal btn-raporti'
                onClick={() => setStaffModal(true)}
              >
                {t("StaffDataModal")}
              </button>{" "}
              {data.docs
                .filter((document) => document.type === "StaffA23")
                .map((obj, index) => {
                  return (
                    <div
                      className='w-100'
                      key={index}
                      id={obj.applicationDocsId}
                    >
                      <span className='upload-filename'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-link-45deg svg-link'
                          viewBox='0 0 16 16'
                        >
                          <path d='M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z' />
                          <path d='M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z' />
                        </svg>

                        {obj.docPath.split("$$")[1]}
                        <svg
                          type='button'
                          onClick={() =>
                            handleRemoveDocument(obj.applicationDocsId)
                          }
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-x-circle icon-close'
                          viewBox='0 0 16 16'
                        >
                          <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                          <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                        </svg>
                      </span>
                    </div>
                  );
                })}
              <div className='col-xxl-12 col-lg-12 col-sm-12 d-flex justify-content-center mt-2'>
                <div className='col-xxl-8 col-lg-10 col-sm-12'>
                  <CustomFileInput
                    onChangeFunction={setStaffFiles}
                    acceptType={".pdf"}
                    isMultiple={true}
                  />
                </div>
              </div>
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

            <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 text-center divForUpload'>
              <button
                className=' fs-6  btn2 btn-modal btn-raporti'
                onClick={(e) => setOtherRequestModal(true)}
              >
                {t("OtherRequest")}
              </button>
              {data.docs
                .filter((document) => document.type === "OtherRequestsA25")
                .map((obj, index) => {
                  return (
                    <div
                      className='w-100'
                      key={index}
                      id={obj.applicationDocsId}
                    >
                      <span className='upload-filename'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-link-45deg svg-link'
                          viewBox='0 0 16 16'
                        >
                          <path d='M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z' />
                          <path d='M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z' />
                        </svg>

                        {obj.docPath.split("$$")[1]}
                        <svg
                          type='button'
                          onClick={() =>
                            handleRemoveDocument(obj.applicationDocsId)
                          }
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-x-circle icon-close'
                          viewBox='0 0 16 16'
                        >
                          <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                          <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                        </svg>
                      </span>
                    </div>
                  );
                })}
              <div className='col-xxl-12 col-lg-12 col-sm-12 d-flex justify-content-center mt-2 '>
                <div className='col-xxl-8 col-lg-10 col-sm-12'>
                  <CustomFileInput
                    onChangeFunction={setOtherRequestFiles}
                    acceptType={".pdf"}
                    isMultiple={true}
                  />
                </div>
              </div>
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
          <div className='col-xxl-12 col-lg-12 col-sm-12 text-end'>
            {decodedToken.role !== "Admin" && (
              <button
                type='button'
                onClick={SubmitApplication}
                className='btn btn-soft-primary waves-effect '
              >
                {t("Save")}
              </button>
            )}
          </div>
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
