import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../../provider/CrudProvider";
import { Button, Modal } from "antd";

export default function ViewSecondApplication({ secondApplication, docs }) {
  const { t } = useTranslation();
  const [firstModal, setFirstModal] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [thirdModal, setThirdModal] = useState(false);
  const [fourthModal, setFourthModal] = useState(false);
  const [fifthModal, setFifthModal] = useState(false);
  const [sixthModal, setSixthModal] = useState(false);
  const [seventhModal, setSeventhModal] = useState(false);

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
      <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 text-start'>
        <Button className='btn-dark' onClick={(e) => setFirstModal(true)}>
          {t("Documents")}
        </Button>
        <Modal
          title={t("PartC4ValidationC1Docs")}
          centered
          className='responsive-modal'
          okButtonProps={{ style: { display: "none" } }}
          open={firstModal}
          onCancel={(e) => setFirstModal(false)}
        >
          {docs.map((document) => {
            if (document.type === "ValidationC4Doc") {
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
      <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 text-start'>
        <Button className='btn-dark' onClick={(e) => setSeventhModal(true)}>
          {t("Documents")}
        </Button>
        <Modal
          title={t("PartC4ValidationC1Docs")}
          centered
          className='responsive-modal'
          okButtonProps={{ style: { display: "none" } }}
          open={seventhModal}
          onCancel={(e) => setSeventhModal(false)}
        >
          {docs.map((document) => {
            if (document.type === "ValidationC4Doc2") {
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
      <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 text-start'>
        <p className='text-muted'>{t("PartDValidationDesE11")}</p>

        <Button className='btn-dark' onClick={(e) => setSecondModal(true)}>
          {t("Documents")}
        </Button>
        <Modal
          title={t("PartDValidationDesE11")}
          centered
          className='responsive-modal'
          okButtonProps={{ style: { display: "none" } }}
          open={secondModal}
          onCancel={(e) => setSecondModal(false)}
        >
          {docs.map((document) => {
            if (document.type === "ValidationC4Doc3") {
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
      <h5 className='card-title text-start mt-4'>
        D.4 {t("PartDValidationDesE12")}
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
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2 text-start'>
        <p className='text-muted'>{t("PartDValidationDesc19")}</p>
        <Button className='btn-dark' onClick={(e) => setThirdModal(true)}>
          {t("Documents")}
        </Button>
        <Modal
          title={t("PartDValidationDesc19")}
          centered
          className='responsive-modal'
          okButtonProps={{ style: { display: "none" } }}
          open={thirdModal}
          onCancel={(e) => setThirdModal(false)}
        >
          {docs.map((document) => {
            if (document.type === "ValidationC4Doc4") {
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
        <Button className='btn-dark' onClick={(e) => setFourthModal(true)}>
          {t("Documents")}
        </Button>
        <Modal
          title={t("PartDValidationDesc23")}
          centered
          className='responsive-modal'
          okButtonProps={{ style: { display: "none" } }}
          open={fourthModal}
          onCancel={(e) => setFourthModal(false)}
        >
          {docs.map((document) => {
            if (document.type === "ValidationC4Doc5") {
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
        <Button className='btn-dark' onClick={(e) => setFifthModal(true)}>
          {t("Documents")}
        </Button>
        <Modal
          title={t("PartDValidationDesc29")}
          centered
          className='responsive-modal'
          okButtonProps={{ style: { display: "none" } }}
          open={fifthModal}
          onCancel={(e) => setFifthModal(false)}
        >
          {docs.map((document) => {
            if (document.type === "ValidationC4Doc6") {
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
        <Button className='btn-dark' onClick={(e) => setSixthModal(true)}>
          {t("Documents")}
        </Button>
        <Modal
          title={t("PartDValidationDesc33")}
          centered
          className='responsive-modal'
          okButtonProps={{ style: { display: "none" } }}
          open={sixthModal}
          onCancel={(e) => setSixthModal(false)}
        >
          {docs.map((document) => {
            if (document.type === "ValidationC4Doc7") {
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
      <hr className='mt-2' />
      <h4 className='card-title text-start'>{t("PartE")}</h4>
      <div className='row mb-2'>
        <p className='card-title text-start text-muted'>
          {t("PartDValidationDesc34")}
        </p>
        <h5 className='card-title text-start '>E1.1 {t("PartC1.1")}</h5>
        <div className='col-xxl-12 col-lg-12 col-sm-12'>
          <div className='row'>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Name") + " " + t("Surname")}</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={secondApplication.nameSurnameLeaderE11}
                />
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Address")}</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={secondApplication.addressLeaderE11}
                />
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("PhoneNumber")}</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={secondApplication.phoneNumberLeaderE11}
                />
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Fax")}</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={secondApplication.faxLeaderE11}
                />
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Email")}</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={secondApplication.emailLeaderE11}
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
                  defaultValue={secondApplication.nameSurnameCoordinatorE12}
                />
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Address")}</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={secondApplication.addressCoordinatorE12}
                />
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("PhoneNumber")}</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={secondApplication.phoneNumberCoordinatorE12}
                />
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Fax")}</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={secondApplication.faxCoordinatorE12}
                />
              </div>
            </div>
            <div className='col-xxl-3 col-lg-5 col-sm-12'>
              <div className='form-group'>
                <label>{t("Email")}</label>
                <input
                  type='text'
                  readOnly
                  defaultValue={secondApplication.emailCoordinatorE12}
                />
              </div>
            </div>
          </div>
          <div className='col-xxl-12 col-lg-12 col-sm-12'>
            <div className='form-group'>
              <label>E1.5 {t("PartC1.5")}</label>
              <input
                type='text'
                readOnly
                defaultValue={secondApplication.placeOfApplicationE15}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
