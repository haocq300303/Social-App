import { Modal, Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AvatarUser from "../../Avatar/Avatar";
import { CgClose } from "react-icons/cg";
import { FaRegHeart, FaRegCommentAlt, FaHeart } from "react-icons/fa";
import { RiShareLine } from "react-icons/ri";
import { IoHeartCircleSharp } from "react-icons/io5";
import { BiSend } from "react-icons/bi";
import noAvatar from "../../../Assets/images/noAvatar.png";
import classNames from "classnames/bind";
import styles from "./ModalDetailPost.module.scss";
import { formatDatePost } from "../../../Utils/formatDate";
import Comment from "../../Comment/Comment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow:
    "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;",
  overFlow: "hidden",
};
const cx = classNames.bind(styles);
const ModalDetailPost = ({
  data = {},
  handleLiked,
  adminPost = {},
  comments,
  currentUser,
  setComments,
  countComment,
  open,
  setOpen,
  userId,
  isLoadingComment,
}) => {
  const time = formatDatePost(data.createdAt);
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={cx("wrapper")}>
          <div className={cx("content-left")}>
            <img src={data.image} alt="Background post" />
          </div>
          <div className={cx("content-right")}>
            <div className={cx("heading")}>
              <Link
                to={
                  adminPost._id === currentUser._id
                    ? "/profile"
                    : `/profileUser/${adminPost._id}`
                }
              >
                <AvatarUser src={adminPost.avatar} />
              </Link>
              <div className={cx("info")}>
                <Link
                  to={
                    adminPost._id === currentUser._id
                      ? "/profile"
                      : `/profileUser/${adminPost._id}`
                  }
                  className={cx("username")}
                >
                  {adminPost.username}
                </Link>
                <p className={cx("time")}>{time} ago</p>
              </div>
              <div className={cx("icon-close")} onClick={() => setOpen(false)}>
                <CgClose />
              </div>
            </div>
            <div className={cx("content-param")}>{data.desc}</div>
            <div className={cx("parameter")}>
              <p className={cx("parameter-like")}>
                <span>
                  <IoHeartCircleSharp className={cx("icon-heart")} />
                </span>
                <span>{data?.likes?.length} Likes</span>
              </p>
              <p className={cx("parameter-commented-shared")}>
                <span>{countComment(comments)} comments</span>
                <span>{data?.shares?.length} shares</span>
              </p>
            </div>
            <div className={cx("actions")}>
              <div className={cx("like")} onClick={() => handleLiked()}>
                {data?.likes.includes(userId) ? (
                  <span className={cx("isLiked")}>
                    <FaHeart />
                  </span>
                ) : (
                  <span>
                    <FaRegHeart />
                  </span>
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
            <div className={cx("comments")}>
              <div className={cx("write-comments")}>
                <AvatarUser
                  src={currentUser.avatar ? currentUser.avatar : noAvatar}
                  isActive={true}
                />
                <input
                  type="text"
                  className={cx("input-comments")}
                  placeholder="Write a comments..."
                />
                <div className={cx("icon-send")}>
                  <BiSend />
                </div>
              </div>
              <div className={cx("list-comments")}>
                {isLoadingComment ? (
                  <div className={cx("icon-loading")}>
                    <CircularProgress size={20} />
                  </div>
                ) : comments && comments.length > 0 ? (
                  comments.map((item) => (
                    <Comment
                      key={item._id}
                      data={item}
                      idAdminPost={data.userId}
                      idPost={data._id}
                      setComments={setComments}
                      isModalDetailPost={true}
                    />
                  ))
                ) : (
                  <div className={cx("not-comment")}>
                    There are no comments for this post yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

ModalDetailPost.propTypes = {
  data: PropTypes.object,
  adminPost: PropTypes.object,
  currentUser: PropTypes.object,
  handleLiked: PropTypes.func,
  open: PropTypes.bool,
  isLoadingComment: PropTypes.bool,
  setOpen: PropTypes.func,
  userId: PropTypes.string,
  comments: PropTypes.array,
  setComments: PropTypes.func,
  countComment: PropTypes.func,
};

export default ModalDetailPost;
