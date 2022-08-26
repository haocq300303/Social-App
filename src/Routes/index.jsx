// ALL ROUTE
import routes from "../Config/routes.jsx";

// PAGE
import Home from "../Pages/Home/Home.jsx";
import Chat from "../Pages/Chat/Chat.jsx";
import Login from "../Pages/Login/Login.jsx";
import Profile from "../Pages/Profile/Profile.jsx";
import Register from "../Pages/Register/Register.jsx";
import Setting from "../Pages/Setting/Setting.jsx";
import Stories from "../Pages/Stories/Stories.jsx";

const publicRoutes = [
   { path: routes.register, component: Register },
   { path: routes.login, component: Login }
];

const privateRoutes = [
   { path: routes.home, component: Home },
   { path: routes.profile, component: Profile },
   { path: routes.chat, component: Chat },
   { path: routes.stories, component: Stories },
   { path: routes.setting, component: Setting },
];

export { publicRoutes, privateRoutes };