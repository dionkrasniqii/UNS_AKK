import { Route, Routes, useLocation } from "react-router";
import Home from "../components/home/Home";
import Login from "../components/login/Login";
import PrivateRoute from "../auth/PrivateRoute";
import Level from "../components/level/Level";
import CreateLevel from "../components/level/CreateLevel";
import EditLevel from "../components/level/EditLevel";
import Institutions from "../components/institutions/Institutions";
import CreateInstitutions from "../components/institutions/CreateInstitutions";
import EditInstitution from "../components/institutions/EditInstitutions";
import Qualifications from "../components/qualifications/Qualifications";
import CreateQualifications from "../components/qualifications/CreateQualifications";
import EditQualifications from "../components/qualifications/EditQualifications";
import Decisions from "../components/decisions/Decisions";
import CreateDecisions from "../components/decisions/CreateDecisions";
import EditDecisions from "../components/decisions/EditDecisions";
import SubQualifications from "../components/subqualifications/SubQualifications";
import CreateSubQualification from "../components/subqualifications/CreateSubQualification";
import EditSubQualification from "../components/subqualifications/EditSubQualification";
import Profile from "../components/profile/Profile";
import Students from "../components/students/Students";
import CreateStudents from "../components/students/CreateStudents";
import EditStudents from "../components/students/EditStudents";
import Groups from "../components/groups/Groups";
import CreateGroup from "../components/groups/CreateGroup";
import Landing from "../components/home/Landing";
import Person from "../components/personinstitutions/Person";
import PersonList from "../components/personinstitutions/PersonList";
import Reports from "../components/reports/Reports";
import StatisticReports from "../components/reports/StatisticReports";
import ApplicationsList from "../components/applicationforms/verification/ApplicationsList";
import InstitutionUser from "../components/institutionuser/InstitutionUser";
import CreateInstitutionUser from "../components/institutionuser/CreateInstitutionUser";
import EditInstitutionUser from "../components/institutionuser/EditInstitutionUser";
import ApplicationListInstitutions from "../components/applicationforms/verification/ApplicationListInstitutions";
import ViewApplication from "../components/applicationforms/verification/ViewApplication";
import QualificationType from "../components/qualificationtype/QualificationType";
import CreateQualificationType from "../components/qualificationtype/CreateQualificationType";
import EditQualificationType from "../components/qualificationtype/EditQualificationType";
import ExpertReviewApplication from "../components/applicationforms/verification/ExpertReviewApplication";
import Competences from "../components/competences/Competences";
import CreateCompetences from "../components/competences/CreateCompetences";
import EditCompetences from "../components/competences/EditCompetences";
import EditFirstApplicationFormA from "../components/applicationforms/verification/edit/firstapplication/EditFirstApplicationFormA";
import ApplyForm from "../components/applicationforms/ApplyForm";
import CertificateDetails from "../components/search/details/certificate/CertificateDetails";
import QualificationDetails from "../components/search/details/qualification/QualificationDetails";
import LevelDetails from "../components/search/details/level/LevelDetails";
import DecisionDetails from "../components/search/details/decision/DecisionDetails";
import InstitutionDetails from "../components/search/details/institution/InstitutionDetails";
import PersonDetails from "../components/personinstitutions/PersonDetails";
import SearchProfessionalStandards from "../components/search/searchforms/professionalstandards/SearchProfessionalStandards";
import SearchCompetencies from "../components/search/searchforms/competencies/SearchCompetencies";
import QualificationStandart from "../components/qualificationstandarts/QualificationStandart";
import CreateQualificationStandart from "../components/qualificationstandarts/CreateQualificationStandart";
import EditQualificationStandart from "../components/qualificationstandarts/EditQualificationStandart";
import ComptenceDetails from "../components/search/details/competence/CompetenceDetails";
import SubmitEmail from "../components/forgotpassword/SubmitEmail";
import ForgotPassword from "../components/forgotpassword/ForgotPassword";
import ApplicationForUser from "../components/institutions/applicationsforuser/ApplicationForUser";
import CheckApplicationForUser from "../components/institutions/applicationsforuser/CheckApplicationForUser";
import SearchOccupationalQualificationCouncil from "../components/search/searchforms/occupationalQualificationCouncils/SearchOccupationalQualificationCouncil";
import SearchCertificateSuplement from "../components/search/searchforms/certificateSuplement/SearchCertificateSuplement";
import SearchInstitution from "../components/search/searchforms/certificateAndinstitution/SearchInstitution";
import SearchCertificate from "../components/search/searchforms/certificateAndinstitution/SearchCertificate";
import ListOfProfessions from "../components/search/searchforms/professionClassification/ListOfProfessions";
import ApplicationForRegister from "../components/applicationForRegister/applyforms/ApplicationForRegister";
import ApplicationsForRegisterListInstitution from "../components/applicationForRegister/applicationsList/ApplicationsForRegisterListInstitution";
import ViewRegisterApplication from "../components/applicationForRegister/view/ViewRegisterApplication";
import ApplicationsForRegisterListAKK from "../components/applicationForRegister/applicationsList/ApplicationsForRegisterListAKK";
import SearchQualifications from "../components/search/searchforms/qualifications/SearchQualifications";
import SuplementDetails from "../components/search/details/suplement/SuplementDetails";
import SearchQualificationStandart from "../components/search/searchforms/searchQualificationStandards/SearchQualificationStandard";
import ProfessionalStandartDetails from "../components/search/details/professionalStandards/ProfessionalStandartDetails";
import QualificationStandardsDetails from "../components/search/details/qualificationStandards/QualificationStandardsDetails";
import CouncilDetails from "../components/search/details/council/CouncilDetails";
import SearchPartialCertificate from "../components/search/searchforms/searchPartialCertificate/SearchPartialCertificate";
import { useEffect } from "react";

export const AppRoutes = (props) => {
  const location = useLocation();
  const ROLES = {
    ADMIN: "Admin",
    INSTITUTION: "Institution",
    MANAGER: "Manager",
    MODERATOR: "Moderator",
    ZyrtarPerCaktiminEksperteve: "Zyrtar per caktimin e eksperteve",
    ZyrtarAKK: "Zyrtar AKK",
    Bord: "Bord",
    EKSPERT: "Ekspert",
  };

  return (
    <div
      className={`content-page mt-2 ${
        props.authState ? "" : "content-page-no-margin "
      }`}
    >
      {/* <div className={`content ${props.authState ? "" : "contentLanding"}`}> */}
      <div
        className={`content content-exclude-landing ${
          props.authState ? "" : "contentLanding"
        } `}
      >
        <Routes>
          <Route
            path="*"
            element={
              props.authState ? (
                <PrivateRoute
                  setAuthState={props.setAuthState}
                  authState={props.authState}
                  allowedRoles={[
                    ROLES.ADMIN,
                    ROLES.ZyrtarAKK,
                    ROLES.ZyrtarPerCaktiminEksperteve,
                  ]}
                  component={Home}
                />
              ) : (
                <Landing
                  authState={props.authState}
                  setAuthState={props.setAuthState}
                />
              )
            }
          />
          <Route
            path="/"
            element={
              props.authState ? (
                <PrivateRoute
                  setAuthState={props.setAuthState}
                  authState={props.authState}
                  allowedRoles={[
                    ROLES.ADMIN,
                    ROLES.ZyrtarAKK,
                    ROLES.ZyrtarPerCaktiminEksperteve,
                  ]}
                  component={Home}
                />
              ) : (
                <Landing
                  authState={props.authState}
                  setAuthState={props.setAuthState}
                />
              )
            }
          />
          {/* Institutions */}
          <Route
            path="/institutions"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={Institutions}
              />
            }
          />
          {/* <Route
            path='/createinstitutions'
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={CreateInstitutions}
              />
            }
          /> */}
          <Route
            path="/createinstitutions"
            element={
              <CreateInstitutions
                setAuthState={props.setAuthState}
                authState={props.authState}
              />
            }
          />
          <Route
            path="/editinstitutions/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={EditInstitution}
              />
            }
          />
          {/* Levels */}
          <Route
            path="/level"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={Level}
              />
            }
          />
          <Route
            path="/createlevel"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={CreateLevel}
              />
            }
          />
          <Route
            path="/editlevel/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={EditLevel}
              />
            }
          />
          {/* Decisions */}
          <Route
            path="/decisions"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={Decisions}
              />
            }
          />
          <Route
            path="/createdecisions"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={CreateDecisions}
              />
            }
          />
          <Route
            path="/editdecisions/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={EditDecisions}
              />
            }
          />
          {/* Qualifications */}
          <Route
            path="/qualifications"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={Qualifications}
              />
            }
          />
          <Route
            path="/createqualifications"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={CreateQualifications}
              />
            }
          />
          <Route
            path="/editqualifications/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={EditQualifications}
              />
            }
          />
          {/* QualificationChildren */}
          <Route
            path="/subqualifications/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={SubQualifications}
              />
            }
          />
          <Route
            path="/createsubqualifications/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={CreateSubQualification}
              />
            }
          />
          <Route
            path="/editsubqualifications/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={EditSubQualification}
              />
            }
          />
          {/* Students */}
          <Route
            path="/students"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[
                  ROLES.INSTITUTION,
                  ROLES.MANAGER,
                  ROLES.MODERATOR,
                ]}
                component={Students}
              />
            }
          />
          <Route
            path="/createstudents"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[
                  ROLES.INSTITUTION,
                  ROLES.MANAGER,
                  ROLES.MODERATOR,
                ]}
                component={CreateStudents}
              />
            }
          />
          <Route
            path="/editstudent/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[
                  ROLES.INSTITUTION,
                  ROLES.MANAGER,
                  ROLES.MODERATOR,
                ]}
                component={EditStudents}
              />
            }
          />
          {/* Groups */}
          <Route
            path="/groups"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.INSTITUTION, ROLES.MANAGER]}
                component={Groups}
              />
            }
          />
          <Route
            path="/creategroup"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.INSTITUTION, ROLES.MANAGER]}
                component={CreateGroup}
              />
            }
          />
          {/* Profile */}
          <Route
            path="/profile"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[
                  ROLES.INSTITUTION,
                  ROLES.ZyrtarAKK,
                  ROLES.ZyrtarPerCaktiminEksperteve,
                  ROLES.MANAGER,
                  ROLES.MODERATOR,
                  ROLES.EKSPERT,
                  ROLES.Bord,
                ]}
                component={Profile}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                authState={props.authState}
                setAuthState={props.setAuthState}
              />
            }
          />
          {/* Certification */}
          <Route
            path="/certificationdetails/:id"
            element={<CertificateDetails />}
          />
          {/* Qualification */}
          <Route
            path="/qualificationdetails/:qualificationId"
            element={<QualificationDetails />}
          />
          {/* Level */}
          <Route path="/leveldetails/:id" element={<LevelDetails />} />
          {/*Decision */}
          <Route path="/decisiondetails/:id" element={<DecisionDetails />} />
          <Route
            path="/institutiondetails/:id"
            element={<InstitutionDetails />}
          />
          {/* {/ PersonList /} */}
          <Route
            path="/person"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={Person}
              />
            }
          />
          <Route
            path="/personlist"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={PersonList}
              />
            }
          />
          <Route
            path="/persondetails/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={PersonDetails}
              />
            }
          />
          {/* Reports */}
          <Route
            path="/reports"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={Reports}
              />
            }
          />
          <Route
            path="/statisticsReports"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={StatisticReports}
              />
            }
          />
          {/* Searching Forms */}
          <Route path="/search-awardingbody" element={<SearchCertificate />} />
          <Route
            path="/professional-standards-search"
            element={<SearchProfessionalStandards />}
          />
          <Route
            path="/qualification-standards-search"
            element={<SearchQualificationStandart />}
          />
          <Route
            path="/qualification-standards-details/:id"
            element={<QualificationStandardsDetails />}
          />
          <Route
            path="/search-partial-certificate"
            element={<SearchPartialCertificate />}
          />
          <Route
            path="/compentencies-search"
            element={<SearchCompetencies />}
          />
          <Route
            path="/classification-of-professions"
            element={<ListOfProfessions />}
          />
          <Route
            path="/qualifications-search"
            element={<SearchQualifications />}
          />
          {/* Apply Forms */}
          {/* <Route
            path="/application-form"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.INSTITUTION, ROLES.MANAGER]}
                component={ApplyForm}
              />
            }
          /> */}
          <Route
            path="/application-form"
            element={
              <ApplyForm
                setAuthState={props.setAuthState}
                authState={props.authState}
              />
            }
          />
          <Route
            path="/application-for-register/:IsAccreditatedBefore"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.INSTITUTION, ROLES.MANAGER]}
                component={ApplicationForRegister}
              />
            }
          />
          <Route
            path="/register-applications-list"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.INSTITUTION, ROLES.MANAGER]}
                component={ApplicationsForRegisterListInstitution}
              />
            }
          />
          <Route
            path="/applications-register-list"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[
                  ROLES.ADMIN,
                  ROLES.ZyrtarAKK,
                  ROLES.ZyrtarPerCaktiminEksperteve,
                ]}
                component={ApplicationsForRegisterListAKK}
              />
            }
          />
          <Route
            path="/view-register-application/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[
                  ROLES.ADMIN,
                  ROLES.ZyrtarAKK,
                  ROLES.ZyrtarPerCaktiminEksperteve,
                ]}
                component={ViewRegisterApplication}
              />
            }
          />
          <Route
            path="/applications"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[
                  ROLES.ADMIN,
                  ROLES.INSTITUTION,
                  ROLES.ZyrtarAKK,
                  ROLES.ZyrtarPerCaktiminEksperteve,
                  ROLES.Bord,
                  ROLES.EKSPERT,
                ]}
                component={ApplicationsList}
              />
            }
          />
          <Route
            path="/applications-list"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.INSTITUTION, ROLES.MANAGER]}
                component={ApplicationListInstitutions}
              />
            }
          />
          <Route
            path="/editapplication/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.INSTITUTION]}
                component={EditFirstApplicationFormA}
              />
            }
          />
          <Route
            path="/view-application/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[
                  ROLES.ADMIN,
                  ROLES.ZyrtarAKK,
                  ROLES.ZyrtarPerCaktiminEksperteve,
                  ROLES.Bord,
                  ROLES.EKSPERT,
                ]}
                component={ViewApplication}
              />
            }
          />
          <Route
            path="/expert-review-application/:id/:ApplicationExpertId"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.EKSPERT]}
                component={ExpertReviewApplication}
              />
            }
          />
          <Route
            path="/occupational-qualification-councils-search"
            element={<SearchOccupationalQualificationCouncil />}
          />
          <Route path="/council-details/:id" element={<CouncilDetails />} />
          <Route
            path="/certificate-suplement-search"
            element={<SearchCertificateSuplement />}
          />
          <Route
            path="/suplementdetails/:suplementId"
            element={<SuplementDetails />}
          />
          <Route path="/institutions-search" element={<SearchInstitution />} />
          {/* Institution User */}
          <Route
            path="/institution-user"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.INSTITUTION]}
                component={InstitutionUser}
              />
            }
          />
          <Route
            path="/createinstitutionuser"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.INSTITUTION, ROLES.ADMIN]}
                component={CreateInstitutionUser}
              />
            }
          />
          <Route
            path="/editinstitutionuser/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.INSTITUTION, ROLES.ADMIN]}
                component={EditInstitutionUser}
              />
            }
          />
          {/* Admin User */}
          <Route
            path="/users"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN]}
                component={InstitutionUser}
              />
            }
          />
          {/* qualifications-types */}
          <Route
            path="/qualifications-type"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={QualificationType}
              />
            }
          />
          <Route
            path="/createqualifications-type"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={CreateQualificationType}
              />
            }
          />
          <Route
            path="/qualificationtype-edit/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={EditQualificationType}
              />
            }
          />
          {/* competences */}
          <Route
            path="/competences"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={Competences}
              />
            }
          />
          <Route
            path="/createcompetences"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={CreateCompetences}
              />
            }
          />
          <Route
            path="/editcompetences/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={EditCompetences}
              />
            }
          />
          <Route
            path="/competence-details/:id"
            element={<ComptenceDetails />}
          />
          {/* qualification standart */}
          <Route
            path="/qualificationstandart"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={QualificationStandart}
              />
            }
          />
          <Route
            path="/createqualificationstandart"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={CreateQualificationStandart}
              />
            }
          />
          <Route
            path="/editqualificationstandart/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={EditQualificationStandart}
              />
            }
          />
          <Route
            path="/professional-standard-details/:id"
            element={<ProfessionalStandartDetails />}
          />
          {/*Reset password */}
          <Route path="/submit-email" element={<SubmitEmail />} />
          <Route path="/reset-password/:id" element={<ForgotPassword />} />
          {/* Application for user */}
          <Route
            path="/institution-application"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={ApplicationForUser}
              />
            }
          />
          <Route
            path="/check-institution-application/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN, ROLES.ZyrtarAKK]}
                component={CheckApplicationForUser}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};
