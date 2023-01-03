import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../Features/userSlice";
import { useNavigate, Link } from "react-router-dom";
import routes from "../../Config/routes";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { schemaLogin } from "../../Schemas";
import CircularProgress from "@mui/material/CircularProgress";
import banner from "../../Assets/images/auth.png";
import { FcGoogle } from "react-icons/fc";
import classnames from "classnames/bind";
import styles from "../Register/Auth.module.scss";
import { useEffect } from "react";

const cx = classnames.bind(styles);
const Login = () => {
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.user.loading);
  const isLogged = useSelector((state) => state.user.isLogged);
  const navigate = useNavigate();
  const dispath = useDispatch();

  useEffect(() => {
    if (user.error !== "") {
      toast.error(user.error);
    }
  }, [user.error]);

  useEffect(() => {
    if (user.currentUser.accessToken !== "") {
      toast.success("Login successfully!!");
      localStorage.setItem("accessToken", user.currentUser.accessToken);
    }
  }, [user.currentUser.accessToken]);

  useEffect(() => {
    if (isLogged) {
      setTimeout(() => {
        navigate("/");
      }, 100);
    }
  }, [isLogged, navigate]);

  const onSubmit = async (values) => {
    dispath(loginAsync(values));
  };

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: schemaLogin,
  });

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("banner")}>
          <img src={banner} alt="banner" />
        </div>
        <div className={cx("content")}>
          <h1 className={cx("content-heading")}>Sign in</h1>
          <form onSubmit={handleSubmit} className={cx("form")}>
            {/* email */}
            <div className={cx("form-ground")}>
              <label className={cx("label")}>Email</label>
              <input
                value={values.email}
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                className={errors.email ? cx("input-error") : ""}
              />
              <span className={cx("error-text")}>{errors.email || ""}</span>
            </div>

            {/* password */}
            <div className={cx("form-ground")}>
              <label className={cx("label")}>Password</label>
              <input
                value={values.password}
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
                className={errors.password ? cx("input-error") : ""}
              />
              <span className={cx("error-text")}>{errors.password || ""}</span>
            </div>
            <button type="submit" className={cx("form-btn")}>
              {loading ? (
                <CircularProgress color="error" size={25} />
              ) : (
                "Sign in"
              )}
            </button>
            <button className={cx("form-btn", "btn-gg")}>
              {loading ? (
                <CircularProgress color="error" size={25} />
              ) : (
                <>
                  <span>
                    <FcGoogle />
                  </span>
                  <p>Sign in with Google</p>
                </>
              )}
            </button>
            <p className="form-des">
              Don't have an account?
              <Link to={routes.register} className={cx("form-link")}>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
