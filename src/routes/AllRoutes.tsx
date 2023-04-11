import { Route, Routes as RoutesWrapper } from "react-router-dom";
import { authLayout, mainLayout } from "./const";

import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const AllRoutes = () => {
  const { isLoggedIn } = useContext(UserContext);
  const { Layout, routes } = isLoggedIn ? mainLayout : authLayout;
  return (
    <RoutesWrapper>
      {routes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout>
              <Component />
            </Layout>
          }
        />
      ))}
    </RoutesWrapper>
  );
};

export default AllRoutes;
