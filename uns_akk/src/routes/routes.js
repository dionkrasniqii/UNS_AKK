import { Route, Routes } from "react-router";
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
import CertificateDetails from "../components/search/details/CertificateDetails";
import QualificationDetails from "../components/search/details/QualificationDetails";
import LevelDetails from "../components/search/details/LevelDetails";
import DecisionDetails from "../components/search/details/DecisionDetails";
import InstitutionDetails from "../components/search/details/InstitutionDetails";
import PersonDetails from "../components/personinstitutions/PersonDetails";
import SearchingForms from "../components/search/searchforms/SearchingForms";
import SearchProfessionalStandards from "../components/search/searchforms/professionalstandards/SearchProfessionalStandards";
import SearchCompetencies from "../components/search/searchforms/SearchCompetencies";

export const AppRoutes = (props) => {
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
      className={`content-page ${
        props.authState ? "" : "content-page-no-margin "
      }`}
    >
      <div className="content mt-2">
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
                allowedRoles={[ROLES.ADMIN]}
                component={Institutions}
              />
            }
          />
          <Route
            path="/createinstitutions"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN]}
                component={CreateInstitutions}
              />
            }
          />
          <Route
            path="/editinstitutions/:id"
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.INSTITUTION]}
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
                allowedRoles={[ROLES.INSTITUTION]}
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
                allowedRoles={[ROLES.INSTITUTION]}
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
                allowedRoles={[ROLES.INSTITUTION]}
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
                allowedRoles={[ROLES.INSTITUTION]}
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
            path="/qualificationdetails/:qualificationId/:municipalityId/:institutionId"
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
                component={StatisticReports}
              />
            }
          />
          {/* Searching Forms */}
          <Route path="/search-forms" element={<SearchingForms />} />
          <Route
            path='/professional-standards-search'
            element={<SearchProfessionalStandards />}
          />
          <Route
            path='/compentencies-search'
            element={<SearchCompetencies />}
          />
          {/* Apply Forms */}
          <Route
            path="/application-form"
            element={<ApplyForm authState={props.authState} />}
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
                allowedRoles={[ROLES.INSTITUTION]}
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
            path='/expert-review-application/:id/:ApplicationExpertId'
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.EKSPERT]}
                component={ExpertReviewApplication}
              />
            }
          />
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
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
                allowedRoles={[ROLES.ADMIN]}
                component={EditCompetences}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};
