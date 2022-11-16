import { useState, useEffect } from "react";
import { deletePost, getOnePost, likePost } from "../../Services/postService";
import { getOneUser } from "../../Services/userService";
import { useDispatch } from "react-redux";
import { getPosts } from "../../Features/postsSlice";
import Tippy from "@tippyjs/react/headless";
import { CircularProgress } from "@mui/material";
import PopperWrapper from "../Popper/Popper";
import { dataAdminPost, dataUserPost } from "../../Utils/dataItem";
import { Link, useLocation } from "react-router-dom";
import noAvatar from "../../Assets/images/noAvatar.png";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaRegHeart, FaRegCommentAlt, FaHeart } from "react-icons/fa";
import { RiShareLine } from "react-icons/ri";
import { IoHeartCircleSharp } from "react-icons/io5";
import { BiSend } from "react-icons/bi";
import PropTypes from "prop-types";
import AvatarUser from "../Avatar/Avatar";
import InfoUser from "../Popper/InfoUser/InfoUser";
import { toast } from "react-toastify";
import ModalDetailPost from "../Modal/ModalDetailPost/ModalDetailPost";
import ModalPost from "../Modal/ModalPost/ModalPost";
import { formatDatePost } from "../../Utils/formatDate";
import Comment from "../Comment/Comment";
import classnames from "classnames/bind";
import styles from "./Post.module.scss";
import ModalDelete from "../Modal/ModalDelete/ModalDelete";
import { createComment, getAllComment } from "../../Services/commentService";
import { getPostsForUser } from "../../Features/postsForUserSlice";

const cx = classnames.bind(styles);
const Post = ({ data, currentUser, isPageProfile = false }) => {
  const [adminPost, setAdminPost] = useState({});
  const [showFeature, setShowFeature] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [activeLike, setActiveLike] = useState(false);
  const [dataAffterChange, setDataAffterChange] = useState(data);
  const [comments, setComments] = useState([]);
  const [isLoadingComment, setIsLoadingComment] = useState(true);
  const [valueComment, setValueComment] = useState("");
  const dispatch = useDispatch();

  // get url
  const location = useLocation();
  const url = location.pathname.slice(0, 8);

  // Format date
  const time = formatDatePost(data.createdAt);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getOneUser(data.userId);
        setAdminPost(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [data.userId]);

  useEffect(() => {
    if (data.likes.includes(currentUser?._id)) {
      setActiveLike(true);
    }
  }, [data.likes, currentUser?._id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getAllComment(data._id);
        setComments(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [data._id]);

  const handleLiked = async () => {
    try {
      await likePost(data._id, currentUser?._id);
      const res = await getOnePost(data._id);
      setDataAffterChange(res);
      setActiveLike((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowComment = () => {
    setShowComment(true);
    setIsLoadingComment(true);
    setTimeout(() => {
      setIsLoadingComment(false);
    }, 1000);
  };

  const handleSendComment = async () => {
    try {
      await createComment(data._id, currentUser?._id, valueComment);
      const res = await getAllComment(data._id);
      setComments(res);
      setValueComment("");
      toast.success("Create comment successfully!!!");
    } catch (error) {
      toast.error("Comment failed!!!");
    }
  };

  const handleEnter = (type) => {
    if (type === "Enter") {
      handleSendComment();
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(data._id, currentUser._id);
      toast.success("Delete post successfully!!");
      setOpenConfirmDelete(false);
      if (isPageProfile) {
        dispatch(getPostsForUser(currentUser?._id));
      } else {
        dispatch(getPosts(currentUser?._id));
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete post failed!!");
    }
  };

  const handleClickFeature = (action) => {
    setShowFeature(false);
    switch (action) {
      case "edit":
        setOpenModalEdit(true);
        break;
      case "delete":
        setOpenConfirmDelete(true);
        break;
      default:
        break;
    }
  };

  const renderPopper = (dataRender) => {
    return dataRender.map((item, i) => (
      <div
        key={i}
        className={cx("item-feature")}
        onClick={() => handleClickFeature(item.action)}
      >
        <div className={cx("item-icon")}>{item.icon}</div>
        <div className={cx("item-title")}>{item.title}</div>
      </div>
    ));
  };

  const countComment = (comments) => {
    let count = 0;
    for (let i = 0; i < comments?.length; i++) {
      count++;
      if (comments[i]?.replies?.length > 0) {
        for (let j = 0; j < comments[i]?.replies?.length; j++) {
          count++;
        }
      }
    }
    return count;
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("post-header")}>
          <InfoUser data={adminPost}>
            <div className={cx("info")}>
              <div className={cx("avatar")}>
                <Link
                  to={
                    adminPost._id === currentUser._id
                      ? "/profile"
                      : `/profileUser/${adminPost._id}`
                  }
                >
                  <img
                    src={adminPost.avatar ? adminPost.avatar : noAvatar}
                    alt="avatar"
                  />
                </Link>
              </div>
              <div className={cx("info-admin")}>
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
                <span className={cx("time")}>{time} ago</span>
              </div>
            </div>
          </InfoUser>
          <Tippy
            interactive
            visible={showFeature}
            placement="bottom-end"
            render={(attrs) => (
              <div className={cx("feature-post")} tabIndex="1" {...attrs}>
                <PopperWrapper>
                  {adminPost._id === currentUser?._id
                    ? renderPopper(dataAdminPost)
                    : renderPopper(dataUserPost)}
                </PopperWrapper>
              </div>
            )}
            onClickOutside={() => setShowFeature((prev) => !prev)}
          >
            <div
              className={cx("btn-more")}
              onClick={() => setShowFeature(!showFeature)}
            >
              <MdOutlineMoreHoriz />
            </div>
          </Tippy>
        </div>
        <p className={cx("content")}>{data.desc}</p>
        <div
          className={cx("images")}
          onClick={() => {
            setOpenModalDetail(true);
            handleShowComment();
          }}
        >
          {data.image && <img src={data.image || ""} alt="images" />}
        </div>

        <div className={cx("parameter")}>
          <p className={cx("parameter-like")}>
            <span>
              <IoHeartCircleSharp className={cx("icon-heart")} />
            </span>
            <span>{dataAffterChange?.likes.length} Likes</span>
          </p>
          <p className={cx("parameter-commented-shared")}>
            <span>{countComment(comments)} comments</span>
            <span>{data?.shares?.length} shares</span>
          </p>
        </div>

        <div className={cx("actions")}>
          <div className={cx("like")} onClick={handleLiked}>
            {activeLike || dataAffterChange.likes.includes(currentUser?._id) ? (
              <span>
                <FaHeart />
              </span>
            ) : (
              <FaRegHeart />
            )}
            <p>Like</p>
          </div>
          <div
            className={cx("comment")}
            onClick={() => {
              handleShowComment();
            }}
          >
            <FaRegCommentAlt /> <p>Comment</p>
          </div>
          <div className={cx("share")}>
            <RiShareLine /> <p>Share</p>
          </div>
        </div>
        {showComment && (
          <div className={cx("comments")}>
            <div className={cx("write-comments")}>
              <AvatarUser
                src={currentUser.avatar ? currentUser.avatar : noAvatar}
                isActive={true}
              />
              <input
                value={valueComment}
                type="text"
                autoFocus={true}
                className={cx("input-comments")}
                placeholder="Write a comments..."
                spellCheck={false}
                onChange={(e) => setValueComment(e.target.value)}
                onKeyDown={(e) => handleEnter(e.key)}
              />
              <div className={cx("icon-send")} onClick={handleSendComment}>
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
                  />
                ))
              ) : (
                <div className={cx("not-comment")}>
                  There are no comments for this post yet
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {openModalEdit && (
        <ModalPost
          open={openModalEdit}
          setOpen={setOpenModalEdit}
          userId={currentUser?._id}
          idPost={data._id}
          avatar={adminPost.avatar}
          username={adminPost.username}
          contentEdit={data.desc}
          imageEdit={data.image}
          typeCreate={false}
          isPageProfile={url === "/profile" ? true : false}
        />
      )}
      {openConfirmDelete && (
        <ModalDelete
          show={openConfirmDelete}
          setShow={setOpenConfirmDelete}
          content={"posts"}
          handleDelete={handleDelete}
        />
      )}
      {openModalDetail && (
        <ModalDetailPost
          open={openModalDetail}
          setOpen={setOpenModalDetail}
          data={dataAffterChange}
          adminPost={adminPost}
          comments={comments}
          countComment={countComment}
          currentUser={currentUser}
          setComments={setComments}
          handleLiked={handleLiked}
          userId={currentUser?._id}
          isLoadingComment={isLoadingComment}
        />
      )}
    </>
  );
};

Post.propTypes = {
  data: PropTypes.object,
  currentUser: PropTypes.object,
  isPageProfile: PropTypes.bool,
};

export default Post;
