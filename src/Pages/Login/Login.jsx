import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeUser } from "../../Features/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import routes from "../../Config/routes";
import { useFormik } from "formik";
import { schemaLogin } from "../../Schemas";
import CircularProgress from "@mui/material/CircularProgress";
import banner from "../../Assets/images/auth.png";
import { FcGoogle } from "react-icons/fc";
import classnames from "classnames/bind";
import styles from "../Register/Auth.module.scss";

const cx = classnames.bind(styles);
const Login = () => {
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispath = useDispatch();

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        values
      );
      setLoading(false);
      dispath(changeUser(res.data));
      navigate(`${routes.home}`);
    } catch (error) {
      if (error.response.data.status === 404) {
        setErrorEmail(error.response.data.message);
        setErrorPassword("");
      } else {
        setErrorPassword(error.response.data.message);
        setErrorEmail("");
      }
    }
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
                className={errors.email || errorEmail ? cx("input-error") : ""}
              />
              <span className={cx("error-text")}>
                {errors.email || errorEmail || ""}
              </span>
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
                className={
                  errors.password || errorPassword ? cx("input-error") : ""
                }
              />
              <span className={cx("error-text")}>
                {errors.password || errorPassword || ""}
              </span>
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
