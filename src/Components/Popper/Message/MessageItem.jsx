import { useState } from "react";
import MessageFeature from "./MessageFeature";
import noAvatar from "../../../Assets/images/noAvatar.png";
import { FiMoreHorizontal } from "react-icons/fi";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Message.module.scss";
import AvatarUser from "../../Avatar/Avatar";

const cx = classNames.bind(styles);

const MessageItem = ({ avatar, username, text, time, online = false }) => {
  const [show, setShow] = useState(false);
  return (
    <div className={cx("message-item")}>
      <div className={cx("item-avatar")}>
        <AvatarUser
          src={avatar ? avatar : noAvatar}
          isActive={online}
          sizeLage={true}
        />
      </div>
      <div className={cx("item-content")}>
        <p className={cx("item-username")}>{username}</p>
        <p className={cx("item-para")}>
          <span className={cx("para-text")}>{`${text}.`}</span>
          <span className={cx("para-time")}>{`${time}`}</span>
        </p>
      </div>
      <MessageFeature show={show} setShow={setShow}>
        <button className={cx("btn-more")} onClick={() => setShow(!show)}>
          <FiMoreHorizontal />
        </button>
      </MessageFeature>
    </div>
  );
};

MessageItem.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  content: PropTypes.string,
  time: PropTypes.string,
  online: PropTypes.bool,
};

export default MessageItem;
