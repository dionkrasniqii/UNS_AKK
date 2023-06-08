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
import EditQualifications from "../components/qualifications/EditQualifications";import Decisions from "../components/decisions/Decisions";
import CreateDecisions from "../components/decisions/CreateDecisions";
import EditDecisions from "../components/decisions/EditDecisions";

export const AppRoutes = (props) => {
  const ROLES = {
    ADMIN: "Admin",
    INSTITUTION: "Institution",
  };

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Login
            authState={props.authState}
            setAuthState={props.setAuthState}
          />
        }
      />
      <Route
        path='/home'
        element={
          <PrivateRoute
            setAuthState={props.setAuthState}
            authState={props.authState}
            allowedRoles={[ROLES.ADMIN, ROLES.INSTITUTION]}
            component={Home}
          />
        }
      />

      {/* 
     // PUBLIC ROUTE
       <Route
          path='/confirmApplication/:id'
            element={<ConfirmApplication />}
        />


    //PRIVATEROUTE
        <Route
          path='/applicationsinprocess'
          element={
            <PrivateRoute setAuthState={props.setAuthState}
              allowedRoles={[ROLES.PROFESOR]}
              component={ApplicationList}
            />
           }
        /> 
        */}
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
        path='/editlevel'
        element={
          <PrivateRoute
            setAuthState={props.setAuthState}
            authState={props.authState}
            allowedRoles={[ROLES.ADMIN]}
            component={EditLevel}
          />
        }
      />

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
        path="/qualifications"
        element={
          <PrivateRoute
            allowedRoles={[ROLES.ADMIN]}
            component={Qualifications}
          />
        }
      />

      <Route
        path="/createqualifications"
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMIN]} component={CreateQualifications} />
        }
      />

      <Route
        path="/editqualifications/:id"
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMIN]} component={EditQualifications} />
        }
      />
    </Routes>
  );
};
