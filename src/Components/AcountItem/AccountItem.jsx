import PropTypes from "prop-types";
import noAvatar from "../../Assets/images/noAvatar.png";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";

const cx = classNames.bind(styles);

const AccountItem = ({ avatar, username, online }) => {
   return (
      <div className={cx("wrapper")}>
         <div className={cx("avatar")}>
            <img src={avatar ? avatar : noAvatar} alt="avatar" />
            {online && <span className={cx("online")}></span>}
         </div>
         <p className={cx("username")}>{username}</p>
      </div>
   )
};

AccountItem.propTypes = {
   avatar: PropTypes.string.isRequired,
   username: PropTypes.string.isRequired,
   online: PropTypes.bool
};

export default AccountItem;
