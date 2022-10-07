import noAvatar from "../../../Assets/images/noAvatar.png";

import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Notification.module.scss";
import { useState } from "react";
import AvatarUser from "../../Avatar/Avatar";

const cx = classNames.bind(styles);

const NotificationItem = ({ avatar, username, content, time = "1h" }) => {
  const [seen, setSeen] = useState(false);
  return (
    <div className={cx("noti-item")} onClick={() => setSeen(true)}>
      <div className={cx("item-avatar")}>
        <AvatarUser src={avatar ? avatar : noAvatar} sizeLage={true} />
      </div>
      <div className={cx("item-content")}>
        <p>
          <span className={cx("username")}>{username}</span>
          {content}
        </p>
        <span>{`${time} ago`}</span>
      </div>
      {!seen && <span className={cx("item-check")}></span>}
    </div>
  );
};

NotificationItem.propTypes = {
  avatar: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  time: PropTypes.string,
};

export default NotificationItem;
