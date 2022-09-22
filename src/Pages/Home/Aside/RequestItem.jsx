import { Link } from "react-router-dom";
import noAvatar from "../../../Assets/images/noAvatar.png";
import PropTypes from "prop-types";
import classnames from "classnames/bind";
import styles from "./Aside.module.scss";

const cx = classnames.bind(styles);
const RequestItem = ({ avatar, username }) => {
  return (
    <div className={cx("request-item")}>
      <div className={cx("item-info")}>
        <div className={cx("avatar")}>
          <img src={avatar ? avatar : noAvatar} alt="avatar" />
        </div>
        <p className={cx("content")}>
          <Link to={`/profile/${username}`} className={cx("link")}>
            {username}
          </Link>
          wants to add you to friends
        </p>
      </div>
      <div className={cx("item-actions")}>
        <button className={cx("btn-accept")}>Accept</button>
        <button className={cx("btn-decline")}>Decline</button>
      </div>
    </div>
  );
};

RequestItem.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
};

export default RequestItem;
