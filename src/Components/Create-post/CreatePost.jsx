import PropTypes from "prop-types";
import noAvatar from "../../Assets/images/noAvatar.png";
import { IoAttachSharp } from "react-icons/io5";
import classnames from "classnames/bind";
import styles from "./CreatePost.module.scss";

const cx = classnames.bind(styles);
const CreatePost = ({ avatar }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("avatar")}>
        <img src={avatar ? avatar : noAvatar} alt="avatar" />
      </div>
      <input
        className={cx("create-input")}
        type="text"
        placeholder="What's on your mind, Hao?"
      />
      <button className={cx("btn-post")}>
        <span className={cx("icon-share")}>
          <IoAttachSharp />
        </span>
        <span className={cx("btn-text")}>Post It!</span>
      </button>
    </div>
  );
};

CreatePost.propTypes = {
  avatar: PropTypes.string,
};

export default CreatePost;
