import { memo } from "react";
import PropTypes from "prop-types";
import noAvatar from "../../Assets/images/noAvatar.png";
import classnames from "classnames/bind";
import styles from "./Profile.module.scss";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);
const ProfileFriends = ({ data, currentUserId }) => {
  return (
    <div className={cx("friends")}>
      <h3 className={cx("friends-title")}>Followers</h3>
      <div className={cx("friends-body")}>
        {data?.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className={cx("friend-item")}>
              <div className={cx("item-avatar")}>
                <Link
                  to={
                    currentUserId === item._id
                      ? `/profile`
                      : `/profileUser/${item._id}`
                  }
                >
                  <img
                    src={item.avatar ? item.avatar : noAvatar}
                    alt="avatar"
                  />
                </Link>
              </div>
              <Link
                to={`/profileUser/${item._id}`}
                className={cx("item-username")}
              >
                {item.username}
              </Link>
            </div>
          ))
        ) : (
          <h4 className={cx("message-notdata")}>No Followers yet</h4>
        )}
      </div>
    </div>
  );
};

ProfileFriends.propTypes = {
  data: PropTypes.array,
};

export default memo(ProfileFriends);
