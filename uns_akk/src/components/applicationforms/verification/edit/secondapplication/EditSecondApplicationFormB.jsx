import React from "react";
import { useTranslation } from "react-i18next";
import CustomModal from "../../../../custom/CustomModal";

export default function EditSecondApplicationFormB({
  data,
  setData,
  handleRemoveDocument,
}) {
  const { t } = useTranslation();

  async function changeValidationC4Doc(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "ValidationC4Doc"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ValidationC4Doc",
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
  async function changeValidationC4Doc2(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "ValidationC4Doc2"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ValidationC4Doc2",
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
  async function changeValidationC4Doc3(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "ValidationC4Doc3"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ValidationC4Doc3",
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
  async function changeValidationC4Doc4(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "ValidationC4Doc4"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ValidationC4Doc4",
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
  async function changeValidationC4Doc5(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "ValidationC4Doc5"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ValidationC4Doc5",
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
  async function changeValidationC4Doc6(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "ValidationC4Doc6"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ValidationC4Doc6",
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
  async function changeValidationC4Doc7(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "ValidationC4Doc7"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ValidationC4Doc7",
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

  return (
    <div className='row'>
      <h4 className='card-title text-center'>
        B.1 {t("ChooseQualificationApplication")}
      </h4>
      <h4 className='card-title text-start'>{t("PartB")}</h4>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>B.1 {t("ChooseQualificationApplication")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO.qualificationTitleB1
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  qualificationTitleB1: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>B.2 {t("LevelProposedKKK")}</label>
          <input
            type='text'
            defaultValue={data.applicationQualificationValidationDTO.levelB2}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  levelB2: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>B.3 {t("QualificationType")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO.qualificationTypeB3
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  qualificationTypeB3: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <label>B.4 {t("B4Validation")}</label>
        <div className='row mt-2'>
          <div className='col-xxl-4 col-lg-5 col-sm-12'>
            <div className='form-group'>
              <label>{t("PartC4ValidationB41")}</label>
              <input
                type='text'
                defaultValue={
                  data.applicationQualificationValidationDTO
                    .numberOfHoursOfGeneralSubjectsB4
                }
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    applicationQualificationValidationDTO: {
                      ...prevData.applicationQualificationValidationDTO,
                      numberOfHoursOfGeneralSubjectsB4: e.target.value,
                    },
                  }));
                }}
              />
            </div>
          </div>
          <div className='col-xxl-4 col-lg-5 col-sm-12'>
            <div className='form-group'>
              <label>{t("PartC4ValidationB42")}</label>
              <input
                type='text'
                defaultValue={
                  data.applicationQualificationValidationDTO
                    .numberOfHoursOfProfessionalTheoreticalB4
                }
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    applicationQualificationValidationDTO: {
                      ...prevData.applicationQualificationValidationDTO,
                      numberOfHoursOfProfessionalTheoreticalB4: e.target.value,
                    },
                  }));
                }}
              />
            </div>
          </div>
          <div className='col-xxl-4 col-lg-5 col-sm-12'>
            <div className='form-group'>
              <label>{t("PartC4ValidationB43")}</label>
              <input
                type='text'
                defaultValue={
                  data.applicationQualificationValidationDTO
                    .numberOfHoursPracticB4
                }
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    applicationQualificationValidationDTO: {
                      ...prevData.applicationQualificationValidationDTO,
                      numberOfHoursPracticB4: e.target.value,
                    },
                  }));
                }}
              />
            </div>
          </div>
          <div className='col-xxl-4 col-lg-5 col-sm-12'>
            <div className='form-group'>
              <label>{t("PartC4ValidationB44")}</label>
              <input
                type='text'
                defaultValue={
                  data.applicationQualificationValidationDTO
                    .numberOfHoursForEvaluationB4
                }
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    applicationQualificationValidationDTO: {
                      ...prevData.applicationQualificationValidationDTO,
                      numberOfHoursForEvaluationB4: e.target.value,
                    },
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='col-xxl-4 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartC4ValidationB45")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO
                .numberOfHoursForSelfStudyB4
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  numberOfHoursForSelfStudyB4: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-4 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartC4ValidationB46")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO.totalNumberOfCreditsB4
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  totalNumberOfCreditsB4: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <hr />
      <h4 className='card-title text-start'>{t("PartC")}</h4>
      <p className='card-title text-start text-muted'>
        {t("PartCValidationDesc")}
      </p>
      <hr />
      <div className='col-xxl-6 col-lg-6 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartCValidationC1")}</label>
          <input
            type='text'
            readOnly
            defaultValue={
              data.applicationQualificationValidationDTO
                .hasInstitutionDevelopStandartOfJobC1
                ? t("Yes")
                : t("No")
            }
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartCValidationC1")} (Details)</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .hasInstitutionDevelopStandartOfJobTextC1
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  hasInstitutionDevelopStandartOfJobTextC1: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <CustomModal
        showUpload={true}
        docs={data.docs}
        placeHolder={t("Documents")}
        typeToFilter={"ValidationC4Doc"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changeValidationC4Doc}
      />
      <div className='col-xxl-6 col-lg-6 col-sm-12 mt-3'>
        <div className='form-group'>
          <label>{t("PartC4ValidationC2")}</label>
          <input
            type='text'
            readOnly
            defaultValue={
              data.applicationQualificationValidationDTO
                .hasInstitutionDevelopStandartOfJobC2
                ? t("Yes")
                : t("No")
            }
          />
        </div>
      </div>
      <CustomModal
        showUpload={true}
        docs={data.docs}
        placeHolder={t("Documents")}
        typeToFilter={"ValidationC4Doc2"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changeValidationC4Doc2}
      />
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-3'>
        <div className='form-group'>
          <label>{t("PartC4ValidationC2")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .hasInstitutionDevelopStandartOfJobTextC2
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  hasInstitutionDevelopStandartOfJobTextC2: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <hr />
      <h4 className='card-title text-start'>{t("PartD")}</h4>
      <hr />
      <div className='col-xxl-4 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc2")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO.goalsOfQualificationD11
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  goalsOfQualificationD11: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-4 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc3")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO
                .targetGroupInThisQualificationD12
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  targetGroupInThisQualificationD12: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <h5 className='card-title text-start'>D.2 {t("PartDValidationDesc5")}</h5>

      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc6")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .doesQualificationRelateWithOtherJobsD21
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  doesQualificationRelateWithOtherJobsD21: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc7")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .whatThisQualificationEnableD22
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  whatThisQualificationEnableD22: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc8")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .provideDetailsOnInvolvementOfActorsD23
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  provideDetailsOnInvolvementOfActorsD23: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <h5 className='card-title text-start'>D.3 {t("PartDValidationDesc9")}</h5>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc10")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .provideDetailsOnRelateOfModulesD31
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  provideDetailsOnRelateOfModulesD31: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <CustomModal
        showUpload={true}
        docs={data.docs}
        placeHolder={t("PartDValidationDesc11")}
        typeToFilter={"ValidationC4Doc3"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changeValidationC4Doc3}
      />
      <h5 className='card-title text-start mt-4'>
        D.4 {t("PartDValidationDesc12")}
      </h5>

      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc13")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .listModulesOfQualificationD4
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  listModulesOfQualificationD4: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc15")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .inCaseQualificationHasObligativeModulesD4
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  inCaseQualificationHasObligativeModulesD4: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc14")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .submitLogicLinkOfModulesForCertificateD4
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  submitLogicLinkOfModulesForCertificateD4: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc14")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO.listModuletZgjedhoreD4
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  listModuletZgjedhoreD4: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc14")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .provideDataForMethodsOfEvaluationD51
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  provideDataForMethodsOfEvaluationD51: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <CustomModal
        showUpload={true}
        docs={data.docs}
        placeHolder={t("PartDValidationDesc19")}
        typeToFilter={"ValidationC4Doc4"}
        onChangeFunction={changeValidationC4Doc4}
        removeDoc={handleRemoveDocument}
      />
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc20")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .whatKnowledgePracticalCompetencesAreAssessedD52
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  whatKnowledgePracticalCompetencesAreAssessedD52:
                    e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc21")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .minimumRequirementsToAchieveQualificationD53
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  minimumRequirementsToAchieveQualificationD53: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc22")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .whatEquipmentAreUsedForAssessmentD54
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  whatEquipmentAreUsedForAssessmentD54: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <p className='text-muted'>{t("PartDValidationDesc23")}</p>
      <CustomModal
        showUpload={true}
        docs={data.docs}
        placeHolder={t("Documents")}
        typeToFilter={"ValidationC4Doc5"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changeValidationC4Doc5}
      />
      <h5 className='card-title text-start mt-3'>
        D.6 {t("PartDValidationDesc24")}
      </h5>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc26")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .critersAcceptOfCandidatesForQualificationD62
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  critersAcceptOfCandidatesForQualificationD62: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc27")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .isAnyModulPartOfOtherQualificationD63
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  isAnyModulPartOfOtherQualificationD63: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc28")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .doYouRecognizeCreditsFromOtherInstitutionD64
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  doYouRecognizeCreditsFromOtherInstitutionD64: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <p className='text-muted'>{t("PartDValidationDesc29")}</p>
      <CustomModal
        showUpload={true}
        docs={data.docs}
        placeHolder={t("Documents")}
        typeToFilter={"ValidationC4Doc6"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changeValidationC4Doc6}
      />
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc30")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .informationIfThisQualificationEnableProgressD65
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  informationIfThisQualificationEnableProgressD65:
                    e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <h5 className='card-title text-start'>
        D.7 {t("PartDValidationDesc31")}
      </h5>
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc32")}</label>
          <textarea
            rows={5}
            className='mt-2'
            defaultValue={
              data.applicationQualificationValidationDTO
                .provideEvidenceOfInternalAndExternalQualityD71
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  provideEvidenceOfInternalAndExternalQualityD71:
                    e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <p className='text-muted'>{t("PartDValidationDesc33")}</p>
      <CustomModal
        showUpload={true}
        docs={data.docs}
        placeHolder={t("Documents")}
        typeToFilter={"ValidationC4Doc7"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changeValidationC4Doc7}
      />
      <hr className='mt-2' />
      <h4 className='card-title text-start'>{t("PartE")}</h4>
      <p className='card-title text-start text-muted'>
        {t("PartDValidationDesc34")}
      </p>
      <h5 className='card-title text-start '>E1.1 {t("PartC1.1")}</h5>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("Name") + " " + t("Surname")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO.nameSurnameLeaderE11
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  nameSurnameLeaderE11: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("Address")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO.addressLeaderE11
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  addressLeaderE11: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("PhoneNumber")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO.phoneNumberLeaderE11
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  phoneNumberLeaderE11: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("Fax")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO.faxLeaderE11
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  faxLeaderE11: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("Email")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO.emailLeaderE11
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  emailLeaderE11: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <hr />
      <h5 className='card-title text-start '>{t("PartC1.2")}</h5>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("Name") + " " + t("Surname")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO
                .nameSurnameCoordinatorE12
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  nameSurnameCoordinatorE12: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("Email")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO.addressCoordinatorE12
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  addressCoordinatorE12: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("PhoneNumber")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO
                .phoneNumberCoordinatorE12
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  phoneNumberCoordinatorE12: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("Fax")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO.faxCoordinatorE12
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  faxCoordinatorE12: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-3 col-lg-5 col-sm-12'>
        <div className='form-group'>
          <label>{t("Email")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO.emailCoordinatorE12
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  emailCoordinatorE12: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartC1.5")}</label>
          <input
            type='text'
            defaultValue={
              data.applicationQualificationValidationDTO.placeOfApplicationE15
            }
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                applicationQualificationValidationDTO: {
                  ...prevData.applicationQualificationValidationDTO,
                  placeOfApplicationE15: e.target.value,
                },
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
}
