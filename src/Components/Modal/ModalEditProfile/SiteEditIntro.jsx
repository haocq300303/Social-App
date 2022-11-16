import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { schemaEditProfile } from "../../../Schemas";
import { editIntro } from "../../../Services/userService";
import { getInfoUser } from "../../../Features/userSlice";
import { toast } from "react-toastify";
import { formatDateUser, formatValueBirthday } from "../../../Utils/formatDate";
import classnames from "classnames/bind";
import styles from "./ModalEditProfile.module.scss";

const cx = classnames.bind(styles);
const SiteEditIntro = ({ setSite }) => {
  const inforUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const birthday = formatDateUser(inforUser.date_of_birth);

  const onSubmit = async (values) => {
    const birthdayFormat = formatValueBirthday(values.birthday);
    try {
      await editIntro(
        inforUser._id,
        values.city,
        values.from,
        values.description,
        birthdayFormat,
        values.gender
      );
      dispatch(getInfoUser(inforUser._id));
      toast.success("Edit successfully!!!");
      setTimeout(() => {
        setSite((prev) => prev.slice(0, 1));
      }, 1000);
    } catch (error) {
      toast.error("Edit failed!!!");
    }
  };

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      city: inforUser.city,
      from: inforUser.from,
      description: inforUser.desc,
      birthday,
      gender: inforUser.gender,
    },
    onSubmit,
    validationSchema: schemaEditProfile,
  });

  return (
    <div className={cx("site-intro")}>
      <form onSubmit={handleSubmit} className={cx("form-intro")}>
        {/* City */}
        <div className={cx("form-group")}>
          <div className={cx("form-control")}>
            <label className={cx("form-label")}>City</label>
            <input
              value={values.city}
              type="text"
              name="city"
              placeholder="Enter city"
              className={
                errors.city ? cx("form-input", "input-error") : cx("form-input")
              }
              onChange={handleChange}
              onBlur={handleBlur}
              spellCheck={false}
            />
          </div>
          {errors.city ? (
            <span className={cx("error-text")}>{errors.city}</span>
          ) : (
            ""
          )}
        </div>
        {/* From */}
        <div className={cx("form-group")}>
          <div className={cx("form-control")}>
            <label className={cx("form-label")}>From</label>
            <input
              value={values.from}
              type="text"
              name="from"
              placeholder="Enter from"
              className={
                errors.from ? cx("form-input", "input-error") : cx("form-input")
              }
              onChange={handleChange}
              onBlur={handleBlur}
              spellCheck={false}
            />
          </div>
          {errors.from ? (
            <span className={cx("error-text")}>{errors.from}</span>
          ) : (
            ""
          )}
        </div>
        {/* Description */}
        <div className={cx("form-group")}>
          <div className={cx("form-control")}>
            <label className={cx("form-label")}>Description</label>
            <input
              value={values.description}
              type="text"
              name="description"
              placeholder="Enter description"
              className={
                errors.description
                  ? cx("form-input", "input-error")
                  : cx("form-input")
              }
              onChange={handleChange}
              onBlur={handleBlur}
              spellCheck={false}
            />
          </div>
          {errors.description ? (
            <span className={cx("error-text")}>{errors.description}</span>
          ) : (
            ""
          )}
        </div>
        {/* Birthday */}
        <div className={cx("form-group")}>
          <div className={cx("form-control")}>
            <label className={cx("form-label")}>Birthday</label>
            <input
              value={values.birthday}
              type="text"
              name="birthday"
              placeholder="dd/mm/yyyy"
              className={
                errors.birthday
                  ? cx("form-input", "input-error")
                  : cx("form-input")
              }
              onChange={handleChange}
              onBlur={handleBlur}
              spellCheck={false}
            />
          </div>
          {errors.birthday ? (
            <span className={cx("error-text")}>{errors.birthday}</span>
          ) : (
            ""
          )}
        </div>
        {/* Gender */}
        <div className={cx("form-group")}>
          <div className={cx("form-control")}>
            <label className={cx("form-label")}>Gender</label>
            <input
              value={values.gender}
              type="text"
              name="gender"
              placeholder="Enter gender"
              className={
                errors.gender
                  ? cx("form-input", "input-error")
                  : cx("form-input")
              }
              onChange={handleChange}
              onBlur={handleBlur}
              spellCheck={false}
            />
          </div>
          {errors.gender ? (
            <span className={cx("error-text")}>{errors.gender}</span>
          ) : (
            ""
          )}
        </div>
        <div className={cx("btn-editIntro")}>
          <button type="submit" className={cx("btn-save-intro")}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

SiteEditIntro.propTypes = {
  setSite: PropTypes.func,
};

export default SiteEditIntro;
