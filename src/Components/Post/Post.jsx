import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import noAvatar from "../../Assets/images/noAvatar.png";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaRegHeart, FaRegCommentAlt, FaHeart } from "react-icons/fa";
import { RiShareLine } from "react-icons/ri";
import { IoHeartCircleSharp } from "react-icons/io5";
import PropTypes from "prop-types";
import PopperPost from "../Popper/PopperPost/PopperPost";
import classnames from "classnames/bind";
import styles from "./Post.module.scss";

const cx = classnames.bind(styles);
const Post = ({ data }) => {
  const [liked, setLiked] = useState(false);
  const [adminPost, setAdminPost] = useState({});
  const [showFeature, setShowFeature] = useState(false);
  const date = new Date(`${data.createdAt || Date.now()}`);
  const time = date.getHours();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/users/${data.userId}`
        );
        setAdminPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [data.userId]);

  const handleLiked = async () => {
    try {
      await axios.put(`http://localhost:8080/api/posts/${data._id}/like`, {
        userId: adminPost._id,
      });
    } catch (error) {
      console.log(error);
    }
    setLiked((prev) => !prev);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("post-header")}>
        <div className={cx("info")}>
          <div className={cx("avatar")}>
            <img
              src={adminPost.avatar ? adminPost.avatar : noAvatar}
              alt="avatar"
            />
          </div>
          <div className={cx("info-admin")}>
            <Link to={`/profile/${adminPost._id}`} className={cx("username")}>
              {adminPost.username}
            </Link>
            <span className={cx("time")}>{time} hours ago</span>
          </div>
        </div>
        <PopperPost show={showFeature} setShow={setShowFeature}>
          <div
            className={cx("btn-more")}
            onClick={() => setShowFeature(!showFeature)}
          >
            <MdOutlineMoreHoriz />
          </div>
        </PopperPost>
      </div>
      <p className={cx("content")}>{data.desc}</p>
      <div className={cx("images")}>
        {data.image && <img src={data.image || ""} alt="images" />}
      </div>

      {(data.likes.length > 0 ||
        data.comments.length > 0 ||
        data.shares.length > 0) && (
        <div className={cx("parameter")}>
          <p className={cx("parameter-like")}>
            <span>
              <IoHeartCircleSharp className={cx("icon-heart")} />
            </span>
            <span>{data.likes.length} Likes</span>
          </p>
          <p className={cx("parameter-commented-shared")}>
            <span>{data.comments.length} comments</span>
            <span>{data.shares.length} shares</span>
          </p>
        </div>
      )}

      <div className={cx("actions")}>
        <div className={cx("like")} onClick={handleLiked}>
          {liked || data.likes.includes(adminPost._id) ? (
            <span>
              <FaHeart />
            </span>
          ) : (
            <FaRegHeart />
          )}
          <p>Like</p>
        </div>
        <div className={cx("comment")}>
          <FaRegCommentAlt /> <p>Comment</p>
        </div>
        <div className={cx("share")}>
          <RiShareLine /> <p>Share</p>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  data: PropTypes.object,
};

export default Post;
