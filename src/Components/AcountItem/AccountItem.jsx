import PropTypes from "prop-types";
import noAvatar from "../../Assets/images/noAvatar.png";
import AvatarUser from "../Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";

const cx = classNames.bind(styles);
const AccountItem = ({
  idUser = "",
  avatar,
  username,
  isOnline = false,
  setShowResult,
}) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.data);
  return (
    <div
      className={cx("wrapper")}
      onClick={() => {
        if (idUser) {
          if (currentUser._id === idUser) {
            navigate("/profile");
            setShowResult(false);
            return;
          }
          navigate(`/profileUser/${idUser}`);
          setShowResult(false);
        }
      }}
    >
      <div className={cx("avatar")}>
        <AvatarUser src={avatar ? avatar : noAvatar} isActive={isOnline} />
      </div>
      <p className={cx("username")}>{username}</p>
    </div>
  );
};

AccountItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  idUser: PropTypes.string,
  username: PropTypes.string.isRequired,
  isOnline: PropTypes.bool,
  showResult: PropTypes.func,
};

export default AccountItem;
