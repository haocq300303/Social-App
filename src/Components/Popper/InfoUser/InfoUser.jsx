import { memo, useState } from "react";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react";
import "tippy.js/themes/light.css";
import "tippy.js/animations/scale.css";
import { useSelector, useDispatch } from "react-redux";
import noAvatar from "../../../Assets/images/noAvatar.png";
import AvatarUser from "../../Avatar/Avatar";
import classNames from "classnames/bind";
import styles from "./InfoUser.module.scss";
import { BsPersonCheckFill, BsPersonPlusFill } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdAddCircle, MdDescription, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getOneUser, handleFollowUser } from "../../../Services/userService";
import { saveUserValues } from "../../../Features/userSlice";
import ModalLogin from "../../Modal/ModalLogin/ModalLogin";

const cx = classNames.bind(styles);
const InfoUser = ({ data, children }) => {
  const { avatar, username, city, desc } = data;
  const currentUser = useSelector((state) => state.user.currentUser.values);
  const isLogged = useSelector((state) => state.user.isLogged);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = async () => {
    if (!isLogged) {
      setOpenModalLogin(true);
      return;
    }
    try {
      const res = await handleFollowUser(data._id, currentUser._id);
      const userUpdate = await getOneUser(currentUser._id);
      dispatch(saveUserValues(userUpdate));
      toast.success(res);
    } catch (error) {
      toast.error(error);
    }
  };
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
              {currentUser._id === data._id ? (
                <>
                  <button className={cx("btn-message", "isCurrentUser")}>
                    <span className={cx("icon-message")}>
                      <MdAddCircle />
                    </span>
                    <span>Add to story</span>
                  </button>
                  <button className={cx("btn-follow", "isCurrentUser")}>
                    <span className={cx("icon-follow")}>
                      <MdEdit />
                    </span>
                    <span>Edit profile</span>
                  </button>
                </>
              ) : (
                <>
                  <button className={cx("btn-follow")} onClick={handleFollow}>
                    {currentUser?.followings?.includes(data._id) ? (
                      <>
                        <span className={cx("icon-follow")}>
                          <BsPersonCheckFill />
                        </span>
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <span className={cx("icon-follow")}>
                          <BsPersonPlusFill />
                        </span>
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                  <button className={cx("btn-message")}>
                    <span className={cx("icon-message")}>
                      <FaFacebookMessenger />
                    </span>
                    <span>Message</span>
                  </button>
                </>
              )}
            </div>
          </div>
        }
      >
        {children}
      </Tippy>
      {openModalLogin && (
        <ModalLogin show={openModalLogin} setShow={setOpenModalLogin} />
      )}
    </div>
  );
};

InfoUser.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
};

export default memo(InfoUser);
