import { Link } from "react-router-dom";

import logo from "../../../Assets/images/logo.png";
import noAvatar from "../../../Assets/images/noAvatar.png";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

import classnames from "classnames/bind";
import styles from "./Header.module.scss";
import Search from "../Search/Search";

const cx = classnames.bind(styles);
const Header = () => {
   const user = null;
   return (
      <header className={cx("wrapper")} >
         <div className={cx("inner")}>
            <Link to="/" className={cx("logo")}>
               <img src={logo} alt="logo" />
               <p>Social</p>
            </Link>
            <div className={cx("search")}>
               <Search />
            </div>
            <div className={cx("actions")}>
               <button className={cx("btn-message")}>
                  <FaFacebookMessenger />
                  <div className={cx("quantity")}>2</div>
               </button>
               <button className={cx("btn-notifi")}>
                  <IoNotificationsSharp />
                  <div className={cx("quantity")}>1</div>
               </button>
               <div className={cx("avatar")}>
                  <img src={user ? user.avatar : noAvatar} alt="" />
                  <button className={cx("icon-arrow")}><IoMdArrowDropdown /></button>
               </div>
            </div>
         </div>
      </header>
   )
};

export default Header;
