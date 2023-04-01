import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout";
import NotFound from "./Pages/NotFound/NotFound";
import routes from "./Config/routes";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
// import PrivateRouter from "./Components/Private";
import Home from "./Pages/Home/Home.jsx";
import Chat from "./Pages/Chat/Chat.jsx";
import Login from "./Pages/Login/Login.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import ProfileUser from "./Pages/Profile/ProfileUser.jsx";
import Register from "./Pages/Register/Register.jsx";
import Setting from "./Pages/Setting/Setting.jsx";
import Stories from "./Pages/Stories/Stories.jsx";
import Gaming from "./Pages/Gaming/Gaming.jsx";
import HeaderOnly from "./Layouts/HeaderOnly/HeaderOnly";
import Explore from "./Pages/Explore/Explore.jsx";

function App() {
  const isLogged = useSelector((state) => state.user.isLogged);
  return (
    <>
      <Routes>
        {isLogged ? (
          <Route path={routes.home} element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path={routes.profile} element={<Profile />} />
            <Route path={routes.profileUser} element={<ProfileUser />} />
            <Route path={routes.chat} element={<Chat />} />
            <Route path={routes.setting} element={<Setting />} />
            <Route path={routes.stories} element={<Stories />} />
            <Route path={routes.gaming} element={<Gaming />} />
          </Route>
        ) : (
          <Route path={routes.home} element={<HeaderOnly />}>
            <Route index element={<Explore />} />
            <Route path={routes.profileUser} element={<ProfileUser />} />
            <Route path={routes.setting} element={<Setting />} />
          </Route>
        )}

        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
