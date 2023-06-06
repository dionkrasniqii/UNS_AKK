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


export const AppRoutes = () => {
  const ROLES = {
    ADMIN: "Admin",
    USER: "User",
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
            <PrivateRoute
              allowedRoles={[ROLES.PROFESOR]}
              component={ApplicationList}
            />
           }
        /> 
        */}

      <Route
        path="/institutions"
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMIN]} component={Institutions} />
        }
      />

      <Route
        path="/createinstitutions"
        element={
          <PrivateRoute
            allowedRoles={[ROLES.ADMIN]}
            component={CreateInstitutions}
          />
        }
      />

<Route
        path="/editinstitutions/:id"
        element={
          <PrivateRoute
            allowedRoles={[ROLES.ADMIN]}
            component={EditInstitution}
          />
        }
      />

      {/* Levels */}
      <Route
        path="/level"
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMIN]} component={Level} />
        }
      />

      <Route
        path="/createlevel"
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMIN]} component={CreateLevel} />
        }
      />

      <Route
        path="/editlevel"
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMIN]} component={EditLevel} />
        }
      />
    </Routes>
  );
};
