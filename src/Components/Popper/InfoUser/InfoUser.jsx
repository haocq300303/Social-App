import PropTypes from "prop-types";
import Tippy from "@tippyjs/react";
import "tippy.js/themes/light.css";
import "tippy.js/animations/scale.css";
import { useSelector } from "react-redux";
import noAvatar from "../../../Assets/images/noAvatar.png";
import AvatarUser from "../../Avatar/Avatar";
import classNames from "classnames/bind";
import styles from "./InfoUser.module.scss";
import { BsPersonCheckFill } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdDescription } from "react-icons/md";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const InfoUser = ({ data, children }) => {
  const { avatar, username, city, desc } = data;
  const currentUser = useSelector((state) => state.user.data);
  return (
    <div>
      <Tippy
        interactive
        placement="bottom-start"
        offset={[-30, 10]}
        theme={"light"}
        animation="scale"
        allowHTML={true}
        zIndex={99}
        content={
          <div className={cx("wrapper")}>
            <div className={cx("container")}>
              <div className={cx("avatar")}>
                <Link
                  to={
                    data._id === currentUser._id
                      ? "/profile"
                      : `/profileUser/${data._id}`
                  }
                >
                  <AvatarUser
                    src={avatar ? avatar : noAvatar}
                    sizeLage={true}
                  />
                </Link>
              </div>
              <div className={cx("content")}>
                <Link
                  to={
                    data._id === currentUser._id
                      ? "/profile"
                      : `/profileUser/${data._id}`
                  }
                  className={cx("link-username")}
                >
                  <h3 className={cx("username")}>{username}</h3>
                </Link>
                <ul className={cx("info")}>
                  <li className={cx("info-item")}>
                    <span className={cx("icon")}>
                      <MdDescription />
                    </span>
                    <span className={cx("desc")}>
                      Description <strong>{desc}</strong>
                    </span>
                  </li>
                  <li className={cx("info-item")}>
                    <span className={cx("icon")}>
                      <IoHome />
                    </span>
                    <span className={cx("desc")}>
                      Live in <strong>{city}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx("actions")}>
              <button className={cx("btn-follow")}>
                <span className={cx("icon-follow")}>
                  <BsPersonCheckFill />
                </span>
                <span>Following</span>
              </button>
              <button className={cx("btn-message")}>
                <span className={cx("icon-message")}>
                  <FaFacebookMessenger />
                </span>
                <span>Message</span>
              </button>
            </div>
          </div>
        }
      >
        {children}
      </Tippy>
    </div>
  );
};

InfoUser.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
};

export default InfoUser;
