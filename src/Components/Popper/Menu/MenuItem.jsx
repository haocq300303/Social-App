import { memo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdDoubleArrow } from "react-icons/md";
import routes from "../../../Config/routes";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import { logout } from "../../../Features/userSlice";

const cx = classNames.bind(styles);

const MenuItem = ({ to, icon, title, subMenu = false, onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logout());
    navigate(routes.login);
  };
  return (
    <div className={cx("menu-item")} onClick={to ? handleLogOut : onClick}>
      <div className={cx("item-icon")}>{icon}</div>
      <div className={cx("item-title")}>{title}</div>
      {subMenu && (
        <div className={cx("doubleMenu")}>
          <MdDoubleArrow />
        </div>
      )}
    </div>
  );
};

MenuItem.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
  subMenu: PropTypes.bool,
};

export default memo(MenuItem);
