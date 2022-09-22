import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { MENU } from "../../../Utils/dataMenu";

import logo from "../../../Assets/images/logo.png";
import noAvatar from "../../../Assets/images/noAvatar.png";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

import classnames from "classnames/bind";
import styles from "./Header.module.scss";
import Search from "../Search/Search";
import Menu from "../../../Components/Popper/Menu/Menu";
import Notification from "../../../Components/Popper/Notification/Notification";
import Message from "../../../Components/Popper/Message/Message";

const cx = classnames.bind(styles);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [activeMessage, setActiveMessage] = useState(false);
  const [activeNoti, setActiveNoti] = useState(false);
  const [seenMessage, setSeenMessage] = useState(true);
  const [seenNoti, setSeenNoti] = useState(true);

  const { avatar } = useSelector((state) => state.user.value);

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link to="/" className={cx("logo")}>
          <img src={logo} alt="logo" />
          <p>Social</p>
        </Link>
        <div className={cx("search")}>
          <Search />
        </div>
        <div className={cx("actions")}>
          <Message
            show={showMessage}
            setShow={setShowMessage}
            setActiveMessage={setActiveMessage}
          >
            <div>
              <Tippy interactive content="Message" arrow={false}>
                <button
                  className={
                    activeMessage
                      ? cx("btn-message", "active")
                      : cx("btn-message")
                  }
                  onClick={() => {
                    setShowMessage(!showMessage);
                    setActiveMessage(!activeMessage);
                    setSeenMessage(false);
                  }}
                >
                  <FaFacebookMessenger />
                  {seenMessage && <div className={cx("quantity")}>2</div>}
                </button>
              </Tippy>
            </div>
          </Message>
          <Notification
            show={showNoti}
            setShow={setShowNoti}
            setActiveNoti={setActiveNoti}
          >
            <div>
              <Tippy interactive content="Notification" arrow={false}>
                <button
                  className={
                    activeNoti ? cx("btn-notifi", "active") : cx("btn-notifi")
                  }
                  onClick={() => {
                    setShowNoti(!showNoti);
                    setActiveNoti(!activeNoti);
                    setSeenNoti(false);
                  }}
                >
                  <IoNotificationsSharp />
                  {seenNoti && <div className={cx("quantity")}>1</div>}
                </button>
              </Tippy>
            </div>
          </Notification>
          <Menu show={showMenu} setShow={setShowMenu} items={MENU}>
            <div>
              <Tippy interactive content="Account" arrow={false}>
                <div
                  className={cx("avatar")}
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <img src={avatar ? avatar : noAvatar} alt="avatar" />
                  <button className={cx("icon-arrow")}>
                    <IoMdArrowDropdown />
                  </button>
                </div>
              </Tippy>
            </div>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
