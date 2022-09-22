import { Routes, Route } from "react-router-dom";
import defaultLayout from "./Layouts/DefaultLayout";
import NotFound from "./Pages/NotFound/NotFound";
import { privateRoutes, publicRoutes } from "./Routes";
import { useSelector } from "react-redux";

function App() {
  const currentUser = useSelector((state) => state.user.value);
  const isLogin = currentUser.username;
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
        const Page = route.component;
        return <Route key={index} path={route.path} element={<Page />} />;
      })}

      {isLogin &&
        privateRoutes.map((route, index) => {
          let Layout = defaultLayout;
          const Page = route.component;
          if (route.layout) {
            Layout = route.layout;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
