import { Navigate } from "react-router-dom";
import { JwtDecode } from "../../Utils/auth";

const PrivateRouter = ({ children }) => {
  if (JwtDecode()) return <Navigate to="/notFound" />;
  return children;
};

export default PrivateRouter;
