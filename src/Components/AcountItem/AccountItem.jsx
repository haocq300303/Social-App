import PropTypes from "prop-types";
import noAvatar from "../../Assets/images/noAvatar.png";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import AvatarUser from "../Avatar/Avatar";

const cx = classNames.bind(styles);

const AccountItem = ({ avatar, username, isOnline = false }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("avatar")}>
        <AvatarUser src={avatar ? avatar : noAvatar} isActive={isOnline} />
      </div>
      <p className={cx("username")}>{username}</p>
    </div>
  );
};

AccountItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isOnline: PropTypes.bool,
};

export default AccountItem;
