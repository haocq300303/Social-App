import { Link } from "react-router-dom";
import { MdDoubleArrow } from "react-icons/md";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

const MenuItem = ({ to, icon, title, subMenu = false, onClick }) => {
   return (
      <Link
         to={to}
         className={cx("menu-item")}
         onClick={onClick}
      >
         <div className={cx("item-icon")}>
            {icon}
         </div>
         <div className={cx("item-title")}>{title}</div>
         {subMenu && <div className={cx("doubleMenu")}><MdDoubleArrow /></div>}
      </Link>
   )
};


MenuItem.propTypes = {
   to: PropTypes.string,
   icon: PropTypes.node,
   title: PropTypes.string,
   subMenu: PropTypes.bool
};

export default MenuItem;
