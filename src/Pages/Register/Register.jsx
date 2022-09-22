import axios from "axios";
import { useDispatch } from "react-redux";
import { changeUser } from "../../Features/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import routes from "../../Config/routes";
import { schemaRegister } from "../../Schemas";
import banner from "../../Assets/images/auth.png";
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import classnames from "classnames/bind";
import styles from "./Auth.module.scss";

const cx = classnames.bind(styles);

const Register = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { confirmPassword, ...other } = values;
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/register",
        other
      );
      dispath(changeUser(res.data));
      navigate(`${routes.home}`);
    } catch (error) {
      console.log(error);
    }
  };

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit,
    validationSchema: schemaRegister,
  });

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("banner")}>
          <img src={banner} alt="banner" />
        </div>
        <div className={cx("content")}>
          <h1 className={cx("content-heading")}>Sign up</h1>
          <form onSubmit={handleSubmit} className={cx("form")}>
            {/* Username */}
            <div className={cx("form-ground")}>
              <label className={cx("label")}>Username</label>
              <input
                value={values.username}
                name="username"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your username"
                className={errors.username ? cx("input-error") : ""}
              />
              <span className={cx("error-text")}>{errors.username || ""}</span>
            </div>

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

            {/* confirm password */}
            <div className={cx("form-ground")}>
              <label className={cx("label")}>Confirm password</label>
              <input
                value={values.confirmPassword}
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your confirm password"
                className={errors.confirmPassword ? cx("input-error") : ""}
              />
              <span className={cx("error-text")}>
                {errors.confirmPassword || ""}
              </span>
            </div>
            <button type="submit" className={cx("form-btn")}>
              Sign up
            </button>
            <button className={cx("form-btn", "btn-gg")}>
              <span>
                <FcGoogle />
              </span>
              <p>Sign up with Google</p>
            </button>
            <p className="form-des">
              Do you already have an account?
              <Link to={routes.login} className={cx("form-link")}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
