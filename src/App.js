import { Routes, Route, useNavigate } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout";
// import NotFound from "./Pages/NotFound/NotFound";
import { privateRoutes, publicRoutes } from "./Routes";
import { useSelector } from "react-redux";
import Login from "./Pages/Login/Login";

function App() {
  const currentUser = useSelector((state) => state.user.data);
  const isLogin = currentUser?.username;
  const navigate = useNavigate();
  return (
    <Routes>
      {navigate(publicRoutes[1].path)}
      {publicRoutes.map((route, index) => {
        const Page = route.component;
        return <Route key={index} path={route.path} element={<Page />} />;
      })}

      {isLogin &&
        privateRoutes.map((route, index) => {
          let Layout = DefaultLayout;
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
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
