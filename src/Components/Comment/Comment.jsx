import PropTypes from "prop-types";
import { useState, useEffect, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import AvatarUser from "../Avatar/Avatar";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsReply } from "react-icons/bs";
import { HiReply } from "react-icons/hi";
import noAvatar from "../../Assets/images/noAvatar.png";
import { BiSend } from "react-icons/bi";
import { getOneUser } from "../../Services/userService";
import CommentPopper from "../Popper/Comment/CommentPopper";
import classNames from "classnames/bind";
import styles from "./Comment.module.scss";
import { toast } from "react-toastify";
import {
  ChangeLikeComment,
  createReply,
  getAllComment,
  getAllReplyForOneComment,
  getOneComment,
} from "../../Services/commentService";
import InfoUser from "../Popper/InfoUser/InfoUser";
import { Link } from "react-router-dom";
import { formatDatePost } from "../../Utils/formatDate";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const cx = classNames.bind(styles);
const Comment = ({
  data,
  idAdminPost,
  setComments,
  idPost,
  isModalDetailPost = false,
}) => {
  const [showReply, setShowReply] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser.values);
  const [userComment, setUserComment] = useState({});
  const [userReplies, setUserReplies] = useState([]);
  const [showFeatureComment, setShowFeatureComment] = useState(false);
  const [showFeatureReply, setShowFeatureReply] = useState(false);
  const [checkClickReply, setCheckClickReply] = useState("");
  const [valueReply, setValueReply] = useState("");
  const [dataAffterChange, setDataAffterChange] = useState(data);
  const [activeLike, setActiveLike] = useState(false);

  useEffect(() => {
    const fetchInforUserComment = async () => {
      const res = await getOneUser(data.userId);
      setUserComment(res);
    };
    fetchInforUserComment();
  }, [data.userId]);

  useEffect(() => {
    if (data.likes.includes(currentUser?._id)) {
      setActiveLike(true);
    }
  }, [data.likes, currentUser?._id]);

  const fetchUserReply = useCallback(async () => {
    const res = await getAllReplyForOneComment(data._id);
    setUserReplies(res);
  }, [data._id]);

  const fetchInFoReply = (item, index) => {
    return (
      <div key={item._id} className={cx("item-reply")}>
        {userReplies[index] && (
          <>
            <InfoUser data={userReplies[index]}>
              <div className={cx("item-comments-avatar")}>
                <Link
                  to={
                    userReplies[index]._id === currentUser._id
                      ? "/profile"
                      : `/profileUser/${userReplies[index]._id}`
                  }
                >
                  <AvatarUser
                    src={
                      userReplies[index]?.avatar
                        ? userReplies[index]?.avatar
                        : noAvatar
                    }
                    sizeSmall={true}
                  />
                </Link>
              </div>
            </InfoUser>
            <div className={cx("item-body")}>
              <div className={cx("item-body-content")}>
                <InfoUser data={userReplies[index]}>
                  <Link
                    to={
                      userReplies[index]._id === currentUser._id
                        ? "/profile"
                        : `/profileUser/${userReplies[index]._id}`
                    }
                    className={cx("item-comments-link")}
                  >
                    <h4 className={cx("body-username")}>
                      {userReplies[index]?.username}
                    </h4>
                  </Link>
                </InfoUser>
                <p className={cx("body-para")}>{item.content}</p>
                <div className="item-comments-feature">
                  <CommentPopper
                    show={item._id === checkClickReply && showFeatureReply}
                    setShow={setShowFeatureReply}
                    setComments={setComments}
                    fetchUserReply={fetchUserReply}
                    idCurrentUser={currentUser._id}
                    idAdminPost={idAdminPost}
                    userIdReply={item.userId}
                    userId={currentUser._id}
                    userIdComment={data.userId}
                    idComment={data._id}
                    idReply={item._id}
                    isDeleteReply={true}
                    setShowReply={setShowReply}
                    idPost={idPost}
                  >
                    <div
                      className={cx("btn-feature")}
                      onClick={() => {
                        setShowFeatureReply((prev) => !prev);
                        setCheckClickReply(item._id);
                      }}
                    >
                      <FiMoreHorizontal />
                    </div>
                  </CommentPopper>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const handleSendReply = async () => {
    try {
      await createReply(data._id, currentUser._id, valueReply);
      const result = await getAllComment(idPost);
      setComments(result);
      fetchUserReply();
      setValueReply("");
    } catch (error) {
      toast.error("Create reply failed!!!");
    }
  };

  const handleEnter = (type) => {
    if (type === "Enter") {
      handleSendReply();
    }
  };

  const handleLikeComment = async () => {
    try {
      await ChangeLikeComment(data._id, currentUser._id);
      const res = await getOneComment(data._id);
      setDataAffterChange(res);
      setActiveLike((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("item-comments")}>
      <InfoUser data={userComment}>
        <div className={cx("item-comments-avatar")}>
          <Link
            to={
              userComment._id === currentUser._id
                ? "/profile"
                : `/profileUser/${userComment._id}`
            }
          >
            <AvatarUser
              src={userComment.avatar ? userComment.avatar : noAvatar}
            />
          </Link>
        </div>
      </InfoUser>
      <div className={cx("item-body")}>
        <div
          className={
            isModalDetailPost
              ? cx("item-body-content", "isModalDetailPost")
              : cx("item-body-content")
          }
        >
          <InfoUser data={userComment}>
            <Link
              to={
                userComment._id === currentUser._id
                  ? "/profile"
                  : `/profileUser/${userComment._id}`
              }
              className={cx("item-comments-link")}
            >
              <h4 className={cx("body-username")}>{userComment.username}</h4>
            </Link>
          </InfoUser>
          <p className={cx("body-para")}>{data.content}</p>
          <div className="item-comments-feature">
            <CommentPopper
              show={showFeatureComment}
              setShow={setShowFeatureComment}
              setComments={setComments}
              idCurrentUser={currentUser._id}
              idAdminPost={idAdminPost}
              userId={currentUser._id}
              userIdComment={data.userId}
              idComment={data._id}
              idPost={idPost}
            >
              <div
                className={cx("btn-feature")}
                onClick={() => setShowFeatureComment((prev) => !prev)}
              >
                <FiMoreHorizontal />
              </div>
            </CommentPopper>
          </div>
        </div>
        <div className={cx("body-actions")}>
          <div className={cx("actions-like")} onClick={handleLikeComment}>
            {activeLike ||
            dataAffterChange?.likes?.includes(currentUser?._id) ? (
              <span className={cx("icon-like", "active-like")}>
                <FaHeart />
              </span>
            ) : (
              <span className={cx("icon-like")}>
                <FaRegHeart />
              </span>
            )}
            <span>{dataAffterChange?.likes?.length}</span>
          </div>
          <div
            className={cx("actions-reply")}
            onClick={() => {
              setShowReply(true);
              fetchUserReply();
            }}
          >
            <BsReply />
            <span>{data?.replies?.length}</span>
          </div>
          <div className={cx("time-comment")}>
            {formatDatePost(data?.createdAt)}
          </div>
        </div>
        {showReply ? (
          <div className={cx("replies")}>
            {data.replies &&
              data.replies.length > 0 &&
              data.replies.map((item, index) => fetchInFoReply(item, index))}
            {showReply && (
              <div className={cx("write-comments")}>
                <AvatarUser
                  src={currentUser.avatar ? currentUser.avatar : noAvatar}
                  sizeSmall={true}
                  isActive={true}
                />
                <input
                  value={valueReply}
                  type="text"
                  autoFocus={true}
                  className={
                    isModalDetailPost
                      ? cx("input-comments", "small", "isModalDetailPost")
                      : cx("input-comments", "small")
                  }
                  placeholder="Write a reply..."
                  spellCheck={false}
                  onChange={(e) => setValueReply(e.target.value)}
                  onKeyDown={(e) => handleEnter(e.key)}
                />
                <div
                  className={cx("icon-send")}
                  onClick={() => handleSendReply()}
                >
                  <BiSend />
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {data.replies.length > 0 && (
              <div
                className={cx("btn-reply")}
                onClick={() => {
                  setShowReply(true);
                  fetchUserReply();
                }}
              >
                <span className={cx("icon-reply-reverse")}>
                  <HiReply />
                </span>
                <span>{data.replies.length} Replies</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  data: PropTypes.object,
  idAdminPost: PropTypes.string,
  setComments: PropTypes.func,
  idPost: PropTypes.string,
  isModalDetailPost: PropTypes.bool,
};

export default memo(Comment);
