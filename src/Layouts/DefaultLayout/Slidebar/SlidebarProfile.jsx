import { useSelector } from "react-redux";
import classnames from "classnames/bind";

import noAvatar from "../../../Assets/images/noAvatar.png";
import styles from "./Slidebar.module.scss";

const cx = classnames.bind(styles);
const SlidebarProfile = () => {
  const { avatar, username, email } = useSelector((state) => state.user.data);
  return (
    <div className={cx("slidebar-profile")}>
      <div className={cx("profile-avatar")}>
        <img src={avatar ? avatar : noAvatar} alt="avatar" />
      </div>
      <div className={cx("profile-info")}>
        <p className={cx("info-username")}>{username ? username : ""}</p>
        <p className={cx("info-email")}>
          {`@${email && email.replace("@gmail.com", "")}`}
        </p>
      </div>
    </div>
  );
};

export default SlidebarProfile;
