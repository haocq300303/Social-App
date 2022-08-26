import { Routes, Route } from "react-router-dom";
import defaultLayout from "./Layouts/DefaultLayout";
import { privateRoutes, publicRoutes } from "./Routes";


function App() {
  return (
    <Routes>
      {
        publicRoutes.map((route, index) => {
          const Layout = defaultLayout;
          const Page = route.component;
          return (
            <Route key={index} path={route.path} element={
              <Layout>
                <Page />
              </Layout>
            } />
          )
        })
      }

      {
        privateRoutes.map((route, index) => {
          const Layout = defaultLayout;
          const Page = route.component;
          return (
            <Route key={index} path={route.path} element={
              <Layout>
                <Page />
              </Layout>
            } />
          )
        })
      }
    </Routes>
  );
}

export default App;
