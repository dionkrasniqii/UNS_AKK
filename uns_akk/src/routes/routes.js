import { Route, Routes } from "react-router";
import Home from "../components/home/Home";
import Login from "../components/login/Login";
import PrivateRoute from "../auth/PrivateRoute";
import Agencies from "../components/agencies/Agencies";
import CreateAgencies from "../components/agencies/CreateAgencies";

export const AppRoutes = () => {
  const ROLES = {
    ADMIN: "Admin",
    USER: "User"
  };

  return (
    <Routes>
      <Route path='/' element={<Home />} />
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
          path='/agencies'
          element={
            <PrivateRoute
              allowedRoles={[ROLES.ADMIN]}
              component={Agencies}
            />
           }
        /> 
        <Route
          path='/createagencies'
          element={
            <PrivateRoute
              allowedRoles={[ROLES.ADMIN]}
              component={CreateAgencies}
            />
           }
        /> 
    </Routes>
  );
};
