import { Route, Routes as RoutesWrapper } from "react-router-dom";

import { mainLayout } from "./const";

const AllRoutes = () => {
  const { Layout, routes } = mainLayout;
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
