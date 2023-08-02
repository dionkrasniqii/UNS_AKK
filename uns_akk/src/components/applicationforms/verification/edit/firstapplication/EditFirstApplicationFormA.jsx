import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import EditFirstApplicationFormB from "./EditFirstApplicationFormB";
import EditFirstApplicationFormC from "./EditFirstApplicationFormC";
import CrudProvider from "../../../../../provider/CrudProvider";
import CustomModal from "../../../../custom/CustomModal";
import EditSecondApplicationFormB from "../secondapplication/EditSecondApplicationFormB";

export default function EditFirstApplicationFormA() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({});
  const [logoModal, setLogoModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);

  useEffect(() => {
    try {
      setLoad(true);
      CrudProvider.getItemById("ApplicationAPI/GetById", id).then((res) => {
        if (res) {
          switch (res.statusCode) {
            case 200:
              const newData = res.result;
              newData.applicationDTO = {
                ...newData.applicationDTO,
                DeletedDocs: [],
                Docs: [],
              };
              setData(newData);

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
  const handleOptionChange = (option) => {
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        offerNoValidationCertificationA18:
          option === "OfferNoValidationCertificationA18",
        validationCertificationNotOfferA18:
          option === "ValidationCertificationNotOfferA18",
        offerValidationCertificationA18:
          option === "OfferValidationCertificationA18",
      },
    });
  };

  const handleRemoveDocument = (documentId) => {
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        DeletedDocs: [...data.applicationDTO.DeletedDocs, documentId],
      },
    });
    const divToBeRemoved = document.getElementById(documentId);
    divToBeRemoved && divToBeRemoved.classList.add("d-none");
  };
  async function setMASHTLicenseFiles(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "MASHTLicenseA16"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "MASHTLicenseA16",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  async function setRegistrationCertificate(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "CertificateRegisterDocA15"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "CertificateRegisterDocA15",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  async function setEarilerDecisionsFiles(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "QualificatinDocsA17"
    );

    const updatedDocs = Array.from(files).map((file) => ({
      Type: "QualificatinDocsA17",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  async function setInstitutionFiles(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "InstitutionDocsA21"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "InstitutionDocsA21",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  async function setStaffFiles(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "StaffA23"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "StaffA23",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  async function setOtherRequestFiles(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "OtherRequestsA25"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "OtherRequestsA25",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  async function SubmitApplication() {
    await CrudProvider.createItemWithFile(
      "ApplicationAPI/UpdateApplicationData",
      data
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
                    setData({
                      ...data,
                      applicationDTO: {
                        ...data.applicationDTO,
                        fiscalNrA15: e.target.value,
                      },
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
                    setData({
                      ...data,
                      applicationDTO: {
                        ...data.applicationDTO,
                        registerNrA15: e.target.value,
                      },
                    })
                  }
                  defaultValue={data.applicationDTO.registerNrA15}
                />
                <span className='focus-border'></span>
              </div>
            </div>
            <CustomModal
              showUpload={true}
              docs={data.docs}
              placeHolder={t("LicenseMASHT")}
              typeToFilter={"MASHTLicenseA16"}
              removeDoc={handleRemoveDocument}
              onChangeFunction={setMASHTLicenseFiles}
            />
            <CustomModal
              showUpload={true}
              docs={data.docs}
              placeHolder={t("RegistrationCertificate")}
              typeToFilter={"CertificateRegisterDocA15"}
              removeDoc={handleRemoveDocument}
              onChangeFunction={setRegistrationCertificate}
            />
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
                        setData({
                          ...data,
                          applicationDTO: {
                            ...data.applicationDTO,
                            qualificationPeriodA17: e.target.value,
                          },
                        })
                      }
                      defaultValue={data.applicationDTO.qualificationPeriodA17}
                    />
                    <span className='focus-border'></span>
                  </div>
                </div>
                <CustomModal
                  showUpload={true}
                  docs={data.docs}
                  placeHolder={t("PreviousDecisionDocs")}
                  typeToFilter={"QualificatinDocsA17"}
                  removeDoc={handleRemoveDocument}
                  onChangeFunction={setEarilerDecisionsFiles}
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
                  onChange={(e) =>
                    setData({
                      ...data,
                      applicationDTO: {
                        ...data.applicationDTO,
                        equipmentMaterialsQualificationA22: e.target.value,
                      },
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
              <div className='form-group'>
                <label className='text-muted'>{t("Qualification")}:</label>
                <input
                  type='text'
                  onChange={(e) =>
                    setData({
                      ...data,
                      applicationDTO: {
                        ...data.applicationDTO,
                        qualificationTitleAndLevel: e.target.value,
                      },
                    })
                  }
                  defaultValue={data.applicationDTO.qualificationTitleAndLevel}
                />
                <span className='focus-border'></span>
              </div>
              <span className='focus-border'></span>
            </div>
            <div className='col-xxl-2 col-lg-4 col-md-5 col-sm-12 mt-1 text-start'>
              <div className='form-group'>
                <label className='text-muted'>{t("NumberOfGroups")}:</label>
                <input
                  type='text'
                  min={1}
                  onChange={(e) =>
                    setData({
                      ...data,
                      applicationDTO: {
                        ...data.applicationDTO,
                        numOfGroupsA24: e.target.value,
                      },
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
                    setData({
                      ...data,
                      applicationDTO: {
                        ...data.applicationDTO,
                        targetNumberOfCandidatesA24: e.target.value,
                      },
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
                  checked={
                    data.applicationDTO.offerNoValidationCertificationA18
                  }
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
                  checked={
                    data.applicationDTO.validationCertificationNotOfferA18
                  }
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
                  checked={data.applicationDTO.offerValidationCertificationA18}
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
                    setData({
                      ...data,
                      applicationDTO: {
                        ...data.applicationDTO,
                        textA18: e.target.value,
                      },
                    })
                  }
                  defaultValue={data.applicationDTO.textA18}
                />
                <span className='focus-border'></span>
              </div>
            </div>
          </div>
          <div className='row'>
            <CustomModal
              showUpload={true}
              docs={data.docs}
              placeHolder={t("InstitutionDetailsModal")}
              typeToFilter={"InstitutionDocsA21"}
              removeDoc={handleRemoveDocument}
              onChangeFunction={setInstitutionFiles}
            />
            <CustomModal
              showUpload={true}
              docs={data.docs}
              placeHolder={t("StaffDataModal")}
              typeToFilter={"StaffA23"}
              removeDoc={handleRemoveDocument}
              onChangeFunction={setStaffFiles}
            />
            <CustomModal
              showUpload={true}
              docs={data.docs}
              placeHolder={t("OtherRequest")}
              typeToFilter={"OtherRequestsA25"}
              removeDoc={handleRemoveDocument}
              onChangeFunction={setOtherRequestFiles}
            />
            <hr className='mt-5' />
            <EditFirstApplicationFormB
              handleRemoveDocument={handleRemoveDocument}
              data={data}
              setData={setData}
            />
            <hr className='mt-5' />
            <EditFirstApplicationFormC
              handleRemoveDocument={handleRemoveDocument}
              data={data}
              setData={setData}
            />
            <hr className='mt-5' />
            {data.secondApplication && (
              <EditSecondApplicationFormB
                data={data}
                setData={setData}
                handleRemoveDocument={handleRemoveDocument}
              />
            )}
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
