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
import CertificateDetails from "../components/search/CertificateDetails";
import LevelDetails from "../components/search/LevelDetails";
import QualificationDetails from "../components/search/QualificationDetails";
import DecisionDetails from "../components/search/DecisionDetails";
import InstitutionDetails from "../components/search/InstitutionDetails";

export const AppRoutes = (props) => {
  const ROLES = {
    ADMIN: "Admin",
    INSTITUTION: "Institution",
  };

  return (
    <div className='content-page'>
      <div className='content mt-2'>
        <Routes>
          <Route
            path='/'
            element={
              props.authState ? (
                <PrivateRoute
                  setAuthState={props.setAuthState}
                  authState={props.authState}
                  allowedRoles={[ROLES.ADMIN, ROLES.INSTITUTION]}
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
            path='/institutions'
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
            path='/createinstitutions'
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
            path='/editinstitutions/:id'
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
            path='/level'
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
            path='/createlevel'
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
            path='/editlevel/:id'
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
            path='/decisions'
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN]}
                component={Decisions}
              />
            }
          />
          <Route
            path='/createdecisions'
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
            path='/editdecisions/:id'
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
            path='/qualifications'
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
            path='/createqualifications'
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
            path='/editqualifications/:id'
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
            path='/subqualifications'
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
            path='/createsubqualifications'
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
            path='/editsubqualifications/:id'
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
            path='/students'
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
            path='/createstudents'
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
            path='/editstudent/:id'
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
            path='/groups'
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
            path='/creategroup'
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
            path='/profile'
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.INSTITUTION]}
                component={Profile}
              />
            }
          />
          <Route
            path='/login'
            element={
              <Login
                authState={props.authState}
                setAuthState={props.setAuthState}
              />
            }
          />
          {/* Certification */}
          <Route
            path='/certificationdetails/:id'
            element={<CertificateDetails />}
          />
          {/* Qualification */}
          <Route
            path='/qualificationdetails/:qualificationId/:municipalityId/:institutionId'
            element={<QualificationDetails />}
          />
          {/* Level */}
          <Route path='/leveldetails/:id' element={<LevelDetails />} />
          {/*Decision */}
          <Route path='/decisiondetails/:id' element={<DecisionDetails />} />
          <Route
            path='/institutiondetails/:id'
            element={<InstitutionDetails />}
          />
          {/* {/ PersonList /} */}
          <Route
            path='/person'
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
            path='/personlist/:id'
            element={
              <PrivateRoute
                setAuthState={props.setAuthState}
                authState={props.authState}
                allowedRoles={[ROLES.ADMIN]}
                component={PersonList}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};
