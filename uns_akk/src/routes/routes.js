import React, { lazy } from "react";
import { Route, Routes } from "react-router";
const Home = lazy(() => import("../components/home/Home"));
const Login = lazy(() => import("../components/login/Login"));
const PrivateRoute = lazy(() => import("../auth/PrivateRoute"));
const Level = lazy(() => import("../components/level/Level"));
const CreateLevel = lazy(() => import("../components/level/CreateLevel"));
const EditLevel = lazy(() => import("../components/level/EditLevel"));
const Institutions = lazy(() =>
  import("../components/institutions/Institutions")
);
const CreateInstitutions = lazy(() =>
  import("../components/institutions/CreateInstitutions")
);
const EditInstitution = lazy(() =>
  import("../components/institutions/EditInstitutions")
);
const Qualifications = lazy(() =>
  import("../components/qualifications/Qualifications")
);
const CreateQualifications = lazy(() =>
  import("../components/qualifications/CreateQualifications")
);
const EditQualifications = lazy(() =>
  import("../components/qualifications/EditQualifications")
);
const Decisions = lazy(() => import("../components/decisions/Decisions"));
const CreateDecisions = lazy(() =>
  import("../components/decisions/CreateDecisions")
);
const EditDecisions = lazy(() =>
  import("../components/decisions/EditDecisions")
);
const SubQualifications = lazy(() =>
  import("../components/subqualifications/SubQualifications")
);
const CreateSubQualification = lazy(() =>
  import("../components/subqualifications/CreateSubQualification")
);
const EditSubQualification = lazy(() =>
  import("../components/subqualifications/EditSubQualification")
);
const Profile = lazy(() => import("../components/profile/Profile"));
const Students = lazy(() => import("../components/students/Students"));
const CreateStudents = lazy(() =>
  import("../components/students/CreateStudents")
);
const EditStudents = lazy(() => import("../components/students/EditStudents"));
const Groups = lazy(() => import("../components/groups/Groups"));
const CreateGroup = lazy(() => import("../components/groups/CreateGroup"));
const Landing = lazy(() => import("../components/home/Landing"));
const Person = lazy(() => import("../components/personinstitutions/Person"));
const PersonList = lazy(() =>
  import("../components/personinstitutions/PersonList")
);
const CertificateDetails = lazy(() =>
  import("../components/search/CertificateDetails")
);
const LevelDetails = lazy(() => import("../components/search/LevelDetails"));
const QualificationDetails = lazy(() =>
  import("../components/search/QualificationDetails")
);
const DecisionDetails = lazy(() =>
  import("../components/search/DecisionDetails")
);
const InstitutionDetails = lazy(() =>
  import("../components/search/InstitutionDetails")
);

export const AppRoutes = (props) => {
  const ROLES = {
    ADMIN: "Admin",
    INSTITUTION: "Institution",
  };
  return (
    <div
      className={`content-page ${
        props.authState ? "" : "content-page-no-margin "
      }`}
    >
      <div className='content mt-2'>
        <Routes>
          <Route
            path='*'
            element={
              props.authState ? (
                <PrivateRoute
                  setAuthState={props.setAuthState}
                  authState={props.authState}
                  allowedRoles={[ROLES.ADMIN]}
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
            path='/'
            element={
              props.authState ? (
                <PrivateRoute
                  setAuthState={props.setAuthState}
                  authState={props.authState}
                  allowedRoles={[ROLES.ADMIN]}
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
