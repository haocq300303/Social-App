import PropTypes from "prop-types";
import noAvatar from "../../Assets/images/noAvatar.png";
import { FiMoreHorizontal } from "react-icons/fi";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";

const cx = classNames.bind(styles);

const AccountItem = ({ avatar, username, sizeBig = false }) => {
   return (
      <div className={cx("wrapper")}>
         <img src={avatar ? avatar : noAvatar} className={cx("avatar")} alt="avatar" />
         <p className={cx("username")}>{username}</p>
         {sizeBig && <button className={cx("btn-more")}>
            <FiMoreHorizontal />
         </button>}
      </div>
   )
};

AccountItem.propTypes = {
   avatar: PropTypes.string.isRequired,
   username: PropTypes.string.isRequired,
   sizeBig: PropTypes.bool
};

export default AccountItem;
