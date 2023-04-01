import PropTypes from "prop-types";
import noAvatar from "../../Assets/images/noAvatar.png";
import AvatarUser from "../Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdAddCircleOutline } from "react-icons/md";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { getOneUser, handleFollowUser } from "../../Services/userService";
import { saveUserValues } from "../../Features/userSlice";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
const AccountItem = ({
  idUser = "",
  avatar,
  username,
  isOnline = false,
  setShowResult,
  subName = "",
  isFollow = false,
  setOpenModalLogin,
}) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser.values);
  const isLogged = useSelector((state) => state.user.isLogged);
  const isFollowing = currentUser?.followings?.includes(idUser);
  const dispatch = useDispatch();

  const handleFollow = async (event) => {
    event.stopPropagation();
    if (!isLogged) {
      setOpenModalLogin(true);
      return;
    }
    try {
      const res = await handleFollowUser(idUser, currentUser._id);
      const userUpdate = await getOneUser(currentUser._id);
      dispatch(saveUserValues(userUpdate));
      toast.success(res);
    } catch (error) {
      toast.error(error);
    }
  };

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
      <div className={cx("username")}>
        <p>
          <span>{username}</span>
          <span></span>
        </p>
        <p className={cx("displayname")}>
          @{subName.replace("@gmail.com", "")}
        </p>
      </div>
      {isFollow && (
        <button
          className={
            isFollowing
              ? cx("action-follow", "isFollowing")
              : cx("action-follow")
          }
          onClick={(e) => handleFollow(e)}
        >
          {!isFollowing ? (
            <>
              <MdAddCircleOutline />
              <span>Follow</span>
            </>
          ) : (
            <span>Following</span>
          )}
        </button>
      )}
    </div>
  );
};

AccountItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  idUser: PropTypes.string,
  username: PropTypes.string.isRequired,
  isOnline: PropTypes.bool,
  isFollow: PropTypes.bool,
  showResult: PropTypes.func,
  setOpenModalLogin: PropTypes.func,
  subName: PropTypes.string,
};

export default AccountItem;
