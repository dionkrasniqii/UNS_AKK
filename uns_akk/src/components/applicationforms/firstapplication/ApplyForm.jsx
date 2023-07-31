import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import FirstForm from "./FirstForm";
import SecondForm from "./SecondForm";
import ThirdForm from "./ThirdForm";
import FourthForm from "./FourthForm";
import FifthForm from "./FifthForm";
import CrudProvider from "../../../provider/CrudProvider";
import { toast } from "react-toastify";
import SixthForm from "./SixthForm";
import SeventhForm from "./SeventhForm";
import SecondApplyForm from "../secondapplication/SecondApplyForm";
export default function ApplyForm({ authState }) {
  const { t } = useTranslation();
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [showThirdForm, setShowThirdForm] = useState(false);
  const [showFourthForm, setShowFourthForm] = useState(false);
  const [showFifthForm, setShowFifthForm] = useState(false);
  const [showSixthForm, setShowSixthForm] = useState(false);
  const [showSeventhForm, setShowSeventhForm] = useState(false);
  const [showValidationForm, setShowValidationForm] = useState(false);
  const [model, setModel] = useState({
    InstitutionId: authState ? decodedToken.groupsid : "",
    InstitutionName: "",
    UniqueNumber: "",
    MunicipalityName: "",
    MunicipalityId: "",
    Address: "",
    PhoneNum: "",
    PostalCode: "",
    Email: "",
    Web: "",
    InstitutionLogo: "",
    QualificationTitleAndLevel: "",
    InstitutionActivityId: "",
    InstitutionActivityName: "",
    QualificationPeriodA17: "",
    MASHTLicenseA16: "",
    OfferNoValidationCertificationA18: false,
    ValidationCertificationNotOfferA18: false,
    OfferValidationCertificationA18: false,
    EquipmentMaterialsQualificationA22: "",
    TextA18: "",
    TargetNumberOfCandidatesA24: "",
    NumOfGroupsA24: "",
    CertificateRegisterDocA15: "",
    RegisterNrA15: "",
    FiscalNrA15: "",
    InstitutionStatusId: "",
    InstitutionStatusName: "",
    Docs: [],
    IsLoggedIn: authState,
  });
  const [secondApplication, setSecondApplication] = useState({
    QualificationTitleB1: "",
    LevelB2: "",
    QualificationTypeB3: "",
    NumberOfHoursOfGeneralSubjectsB4: "",
    NumberOfHoursOfProfessionalTheoreticalB4: "",
    NumberOfHoursPracticB4: "",
    NumberOfHoursForEvaluationB4: "",
    NumberOfHoursForSelfStudyB4: "",
    TotalNumberOfCreditsB4: "",
    HasInstitutionDevelopStandartOfJobC1: false,
    HasInstitutionDevelopStandartOfJobTextC1: "",
    HasInstitutionDevelopQualificationC2: false,
    HasInstitutionDevelopQualificationTextC2: "",
    GoalsOfQualificationD11: "",
    TargetGroupInThisQualificationD12: "",
    DoesQualificationRelateWithOtherJobsD21: "",
    WhatThisQualificationEnableD22: "",
    ProvideDetailsOnInvolvementOfActorsD23: "",
    ProvideDetailsOnRelateOfModulesD31: "",
    ListModulesOfQualificationD4: "",
    InCaseQualificationHasObligativeModulesD4: "",
    SubmitLogicLinkOfModulesForCertificateD4: "",
    ListModuletZgjedhoreD4: "",
    ProvideDataForMethodsOfEvaluationD51: "",
    WhatKnowledgePracticalCompetencesAreAssessedD52: "",
    MinimumRequirementsToAchieveQualificationD53: "",
    WhatEquipmentAreUsedForAssessmentD54: "",
    EntryRequirementsInQualificationD61: "",
    CritersAcceptOfCandidatesForQualificationD62: "",
    IsAnyModulPartOfOtherQualificationD63: "",
    DoYouRecognizeCreditsFromOtherInstitutionD64: "",
    InformationIfThisQualificationEnableProgressD65: "",
    ProvideEvidenceOfInternalAndExternalQualityD71: "",
    NameSurnameLeaderE11: "",
    AddressLeaderE11: "",
    PhoneNumberLeaderE11: "",
    FaxLeaderE11: "",
    EmailLeaderE11: "",
    NameSurnameCoordinatorE12: "",
    AddressCoordinatorE12: "",
    PhoneNumberCoordinatorE12: "",
    FaxCoordinatorE12: "",
    EmailCoordinatorE12: "",
    PlaceOfApplicationE15: "",
  });
  async function SubmitApplication() {
    try {
      setLoad(true);
      await CrudProvider.postApplication(
        "ApplicationAPI/ApplicationPost",
        model,
        secondApplication,
        showValidationForm
      ).then((res) => {
        if (res) {
          switch (res.statusCode) {
            case 200:
              toast.success("Aplikimi u regjistrua me sukses");
              return authState ? navigate("/applications-list") : navigate("/");
            default:
              toast.error(res.errorMessages[0]);
              break;
          }
        }
      });
    } finally {
      setLoad(false);
    }
  }
  return (
    <div className='container mt-5'>
      <div className='card'>
        <div className='card-body'>
          <h4 className='card-title text-center'>
            {t("FirstApplicationName")}
          </h4>
          {/* <ProgressBar model={model} /> */}
          <hr />
          <FirstForm
            authState={authState}
            model={model}
            setModel={setModel}
            setShowSecondForm={setShowSecondForm}
            showSecondForm={showSecondForm}
          />
          {!showSecondForm && (
            <SecondForm
              model={model}
              setModel={setModel}
              setShowThirdForm={setShowThirdForm}
              showThirdForm={showThirdForm}
            />
          )}
          {!showThirdForm && (
            <ThirdForm
              model={model}
              setModel={setModel}
              setShowFourthForm={setShowFourthForm}
              showFourthForm={showFourthForm}
            />
          )}
          {!showFourthForm && (
            <FourthForm
              model={model}
              setModel={setModel}
              showFifthForm={showFifthForm}
              setShowFifthForm={setShowFifthForm}
            />
          )}
          {!showFifthForm && (
            <FifthForm
              model={model}
              setModel={setModel}
              showSixthForm={showSixthForm}
              setShowSixthForm={setShowSixthForm}
            />
          )}
          {!showSixthForm && (
            <SixthForm
              model={model}
              setModel={setModel}
              showSeventhForm={showSeventhForm}
              setShowSeventhForm={setShowSeventhForm}
            />
          )}
          {!showSeventhForm && (
            <SeventhForm
              model={model}
              setModel={setModel}
              showValidationForm={showValidationForm}
              setShowValidationForm={setShowValidationForm}
              submit={SubmitApplication}
            />
          )}
          {!showValidationForm && (
            <SecondApplyForm
              model={model}
              setModel={setModel}
              secondApplication={secondApplication}
              setSecondApplication={setSecondApplication}
              submit={SubmitApplication}
            />
          )}
        </div>
      </div>
    </div>
  );
}
