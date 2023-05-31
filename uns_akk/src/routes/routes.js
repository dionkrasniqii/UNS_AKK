import { Route, Routes } from "react-router";
import Home from "../components/home/Home";
import Login from "../components/login/Login";

export const AppRoutes = () => {
  const ROLES = {
    ADMIN: "1",
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
    </Routes>
  );
};
