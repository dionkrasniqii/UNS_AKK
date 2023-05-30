import { Route, Routes } from "react-router";

export const AppRoutes = () => {
  const ROLES = {
    ADMIN: "1",
  };

  return (
      <Routes>
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
