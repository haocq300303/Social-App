import PropTypes from "prop-types";
import { CgClose } from "react-icons/cg";
import classnames from "classnames/bind";
import styles from "./ModalEditProfile.module.scss";
import { HiArrowLeft } from "react-icons/hi";

const cx = classnames.bind(styles);

const HeaderEditProfile = ({
  isChildren = false,
  title = "",
  setOpen,
  setSite,
}) => {
  return (
    <div className={cx("modal-header")}>
      <h2 className={cx("header-heading")}>Edit {title}</h2>
      <div
        className={cx("close-modal")}
        onClick={() => {
          setOpen(false);
          setSite((prev) => prev.slice(0, 1));
        }}
      >
        <CgClose />
      </div>
      {isChildren && (
        <div
          className={cx("btn-back")}
          onClick={() => setSite((prev) => prev.slice(0, 1))}
        >
          <HiArrowLeft />
        </div>
      )}
    </div>
  );
};

HeaderEditProfile.propTypes = {
  isChildren: PropTypes.bool,
  title: PropTypes.string,
  setOpen: PropTypes.func,
  setSite: PropTypes.func,
};

export default HeaderEditProfile;
