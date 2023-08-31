import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomModal from "../../custom/CustomModal";

export default function ViewSecondApplication({ secondApplication, docs }) {
  const { t } = useTranslation();

  return (
    <div className='row'>
      <h4 className='card-title text-center'>{t("ValidationApplication")}</h4>
      <hr />
      <h4 className='card-title text-start'>{t("PartB")}</h4>
      <hr />
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>B.1 {t("ChooseQualificationApplication")}</label>
          <textarea
            className='mt-3'
            rows={5}
            readOnly
            defaultValue={secondApplication.qualificationTitleB1}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>B.2 {t("LevelProposedKKK")}</label>
          <textarea
            className='mt-3'
            rows={5}
            readOnly
            defaultValue={secondApplication.levelB2}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>B.3 {t("QualificationType")}</label>
          <textarea
            className='mt-3'
            rows={5}
            readOnly
            defaultValue={secondApplication.numberOfHoursOfGeneralSubjectsB4}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>B.4 {t("B4Validation")}</label>
          <textarea
            className='mt-3'
            rows={5}
            readOnly
            defaultValue={secondApplication.qualificationTypeB3}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>B.4 {t("B4Validation")}</label>
          <textarea
            className='mt-3'
            rows={5}
            readOnly
            defaultValue={secondApplication.qualificationTypeB3}
          />
        </div>
      </div>
      <div className='col-xxl-4 col-lg-4 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartC4ValidationB41")}</label>
          <input
            type='text'
            readOnly
            defaultValue={secondApplication.numberOfHoursOfGeneralSubjectsB4}
          />
        </div>
      </div>
      <div className='col-xxl-4 col-lg-4 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartC4ValidationB42")}</label>
          <input
            type='text'
            readOnly
            defaultValue={
              secondApplication.numberOfHoursOfProfessionalTheoreticalB4
            }
          />
        </div>
      </div>
      <div className='col-xxl-4 col-lg-4 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartC4ValidationB43")}</label>
          <input
            type='text'
            readOnly
            defaultValue={secondApplication.numberOfHoursPracticB4}
          />
        </div>
      </div>
      <div className='col-xxl-4 col-lg-4 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartC4ValidationB44")}</label>
          <input
            type='text'
            readOnly
            defaultValue={secondApplication.numberOfHoursForEvaluationB4}
          />
        </div>
      </div>
      <div className='col-xxl-4 col-lg-4 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartC4ValidationB45")}</label>
          <input
            type='text'
            readOnly
            defaultValue={secondApplication.numberOfHoursForSelfStudyB4}
          />
        </div>
      </div>
      <div className='col-xxl-4 col-lg-4 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartC4ValidationB46")}</label>
          <input
            type='text'
            readOnly
            defaultValue={secondApplication.totalNumberOfCreditsB4}
          />
        </div>
      </div>
      <hr />
      <h4 className='card-title text-start'>{t("PartC")}</h4>
      <hr />
      <div className='col-xxl-6 col-lg-6 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartCValidationC1")}</label>
          <input
            type='text'
            readOnly
            defaultValue={
              secondApplication.hasInstitutionDevelopStandartOfJobC1
                ? t("Yes")
                : t("No")
            }
          />
        </div>
      </div>
      <CustomModal
        showUpload={false}
        docs={docs}
        placeHolder={t("Documents")}
        typeToFilter={"ValidationC4Doc"}
      />

      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartCValidationC1")} (Details)</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={
              secondApplication.hasInstitutionDevelopStandartOfJobTextC1
            }
          />
        </div>
      </div>

      <div className='col-xxl-6 col-lg-6 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartC4ValidationC2")}</label>
          <input
            type='text'
            readOnly
            defaultValue={
              secondApplication.hasInstitutionDevelopStandartOfJobC2
                ? t("Yes")
                : t("No")
            }
          />
        </div>
      </div>
      <CustomModal
        showUpload={false}
        docs={docs}
        placeHolder={t("Documents")}
        typeToFilter={"ValidationC4Doc2"}
      />

      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartC4ValidationC2")} (Details)</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={
              secondApplication.hasInstitutionDevelopStandartOfJobTextC2
            }
          />
        </div>
      </div>
      <hr />
      <h4 className='card-title text-start'>{t("PartD")}</h4>
      <hr />
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>D1.1 {t("PartDValidationDesc2")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={secondApplication.goalsOfQualificationD11}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>D1.2 {t("PartDValidationDesc3")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={secondApplication.targetGroupInThisQualificationD12}
          />
        </div>
      </div>

      <h5 className='card-title text-start'>D.2 {t("PartDValidationDesc5")}</h5>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label className=''>D2.1 {t("PartDValidationDesc6")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={
              secondApplication.doesQualificationRelateWithOtherJobsD21
            }
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>D2.2 {t("PartDValidationDesc7")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={secondApplication.whatThisQualificationEnableD22}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>D2.3 {t("PartDValidationDesc8")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={
              secondApplication.provideDetailsOnInvolvementOfActorsD23
            }
          />
        </div>
      </div>
      <h5 className='card-title text-start'>D.3 {t("PartDValidationDesc9")}</h5>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>D3.1 {t("PartDValidationDesc10")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={secondApplication.provideDetailsOnRelateOfModulesD31}
          />
        </div>
      </div>
      <CustomModal
        showUpload={false}
        docs={docs}
        placeHolder={t("PartDValidationDesc11")}
        typeToFilter={"ValidationC4Doc3"}
      />
      <h5 className='card-title text-start mt-4'>
        D.4 {t("PartDValidationDesc12")}
      </h5>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc13")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={secondApplication.listModulesOfQualificationD4}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc15")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={
              secondApplication.inCaseQualificationHasObligativeModulesD4
            }
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc14")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={
              secondApplication.submitLogicLinkOfModulesForCertificateD4
            }
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>{t("PartDValidationDesc16")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={secondApplication.listModuletZgjedhoreD4}
          />
        </div>
      </div>
      <h5 className='card-title text-start'>
        D.5 {t("PartDValidationDesc17")}
      </h5>
      <div className='col-xxl-12 col-lg-12 col-sm-12'>
        <div className='form-group'>
          <label>D.5.1 {t("PartDValidationDesc18")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={
              secondApplication.provideDataForMethodsOfEvaluationD51
            }
          />
        </div>
      </div>
      <CustomModal
        showUpload={false}
        docs={docs}
        placeHolder={t("PartDValidationDesc19")}
        typeToFilter={"ValidationC4Doc4"}
      />
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-3'>
        <div className='form-group'>
          <label>D.5.2 {t("PartDValidationDesc20")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={
              secondApplication.whatKnowledgePracticalCompetencesAreAssessedD52
            }
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-3'>
        <div className='form-group'>
          <label>D.5.3 {t("PartDValidationDesc21")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={
              secondApplication.minimumRequirementsToAchieveQualificationD53
            }
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-3'>
        <div className='form-group'>
          <label>D.5.4 {t("PartDValidationDesc22")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={
              secondApplication.whatEquipmentAreUsedForAssessmentD54
            }
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2 text-start'>
        <p className='text-muted'>{t("PartDValidationDesc23")}</p>
        <CustomModal
          showUpload={false}
          docs={docs}
          placeHolder={t("Documents")}
          typeToFilter={"ValidationC4Doc5"}
        />
      </div>
      <h5 className='card-title text-start mt-3'>
        D.6 {t("PartDValidationDesc24")}
      </h5>
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-3'>
        <div className='form-group'>
          <label>D.6.1 {t("PartDValidationDesc25")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={secondApplication.entryRequirementsInQualificationD61}
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-3'>
        <div className='form-group'>
          <label>D.6.2 {t("PartDValidationDesc26")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={
              secondApplication.critersAcceptOfCandidatesForQualificationD62
            }
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-3'>
        <div className='form-group'>
          <label>D.6.3 {t("PartDValidationDesc27")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={
              secondApplication.isAnyModulPartOfOtherQualificationD63
            }
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-3'>
        <div className='form-group'>
          <label>D.6.4 {t("PartDValidationDesc28")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={
              secondApplication.doYouRecognizeCreditsFromOtherInstitutionD64
            }
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2 text-start'>
        <p className='text-muted'>{t("PartDValidationDesc29")}</p>
        <CustomModal
          showUpload={false}
          docs={docs}
          placeHolder={t("Documents")}
          typeToFilter={"ValidationC4Doc6"}
        />
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-3'>
        <div className='form-group'>
          <label>D.6.5 {t("PartDValidationDesc30")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={
              secondApplication.informationIfThisQualificationEnableProgressD65
            }
          />
        </div>
      </div>
      <h5 className='card-title text-start'>
        D.7 {t("PartDValidationDesc31")}
      </h5>
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-3'>
        <div className='form-group'>
          <label>D.7.1 {t("PartDValidationDesc32")}</label>
          <textarea
            rows={5}
            readOnly
            className='mt-2'
            defaultValue={
              secondApplication.provideEvidenceOfInternalAndExternalQualityD71
            }
          />
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2 text-start'>
        <p className='text-muted'>{t("PartDValidationDesc33")}</p>
        <CustomModal
          showUpload={false}
          docs={docs}
          placeHolder={t("Documents")}
          typeToFilter={"ValidationC4Doc7"}
        />
      </div>
      <hr className='mt-2' />
    </div>
  );
}
