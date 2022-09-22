import noAvatar from "../../../Assets/images/noAvatar.png";

import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Notification.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

const NotificationItem = ({ avatar, content, time = "1h" }) => {
   const [seen, setSeen] = useState(false);
   return (
      <div className={cx("noti-item")} onClick={() => setSeen(true)} >
         <div className={cx("item-avatar")}>
            <img src={avatar ? avatar : noAvatar} alt="avatar" />
         </div>
         <div className={cx("item-content")}>
            <p>{content}</p>
            <span>{`${time} ago`}</span>
         </div>
         {!seen && <span className={cx("item-check")}></span>}
      </div>
   )
};

NotificationItem.propTypes = {
   avatar: PropTypes.string,
   content: PropTypes.string,
   time: PropTypes.string
};

export default NotificationItem;
