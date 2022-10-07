import { Link } from "react-router-dom";
import routes from "../../../Config/routes.jsx";
import PropTypes from "prop-types";
import MessageItem from "./MessageItem";
import classNames from "classnames/bind";
import styles from "./Message.module.scss";

const cx = classNames.bind(styles);
const MessageListFriend = ({ data = [], setShow, setActiveMessage }) => {
  return (
    <div className={cx("list-friend")}>
      <MessageItem
        online={true}
        username="Hao Chu Quangg"
        text="hello friend!"
        time="1h"
      />
      <MessageItem
        online={true}
        username="Hao Chu Quangg"
        text="hello friend!, I love you very much"
        time="9h"
      />
      <MessageItem
        online={true}
        username="Hao Chu Quangg"
        text="hello friend!, I love you very much"
        time="1h"
      />
      <MessageItem
        online={true}
        username="Hao Chu Quangg"
        text="hello friend!, I love you very much,I love you very much"
        time="3h"
      />
      <MessageItem
        online={true}
        username="Hao Chu Quangg"
        text="hello friend!"
        time="5h"
      />
      <div className={cx("see-in-messenger")}>
        <Link
          to={routes.chat}
          className={cx("link-messenger")}
          onClick={() => {
            setShow((prev) => !prev);
            setActiveMessage((prev) => !prev);
          }}
        >
          See all in Messenger
        </Link>
      </div>
    </div>
  );
  // return data.map((item) => (
  //    <MessageItem username="Hao Chu Quangg" text="hello friend!, I love you very much" />
  // ))
};

MessageListFriend.propTypes = {
  data: PropTypes.array,
  setShow: PropTypes.func,
  setActiveMessage: PropTypes.func,
};

export default MessageListFriend;
