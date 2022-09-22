import PropTypes from "prop-types";
import noAvatar from "../../Assets/images/noAvatar.png";
import classnames from "classnames/bind";
import styles from "./Profile.module.scss";

const cx = classnames.bind(styles);
const ProfileFriends = ({ data }) => {
  return (
    <div className={cx("friends")}>
      <h3 className={cx("friends-title")}>Friends</h3>
      <div className={cx("friends-body")}>
        {data.map((item, index) => (
          <div key={index} className={cx("friend-item")}>
            <div className={cx("item-avatar")}>
              <img src={item.image ? item.image : noAvatar} alt="avatar" />
            </div>
            <p className={cx("item-username")}>{item.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileFriends.propTypes = {
  data: PropTypes.array,
};

export default ProfileFriends;
