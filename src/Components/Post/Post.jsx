import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Tippy from "@tippyjs/react/headless";
import { Box, Button, Modal } from "@mui/material";
import PopperWrapper from "../Popper/Popper";
import { dataAdminPost, dataUserPost } from "../../Utils/dataPost";
import { Link } from "react-router-dom";
import noAvatar from "../../Assets/images/noAvatar.png";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaRegHeart, FaRegCommentAlt, FaHeart } from "react-icons/fa";
import { RiShareLine } from "react-icons/ri";
import { IoHeartCircleSharp } from "react-icons/io5";
import { BsReply } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { BiSend } from "react-icons/bi";
import PropTypes from "prop-types";
import ModalPost from "../Modal/ModalPost";
import AlertMessage from "../AlertMessage/AlertMessage";
import AvatarUser from "../Avatar/Avatar";
import classnames from "classnames/bind";
import styles from "./Post.module.scss";
import { likePost } from "../../Features/postSlice";

// style modal confirm delete
const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow:
    "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;",
};

const cx = classnames.bind(styles);

const Post = ({ data, currentUserId, avatar }) => {
  // const [liked, setLiked] = useState(false);
  const [adminPost, setAdminPost] = useState({});
  const [showFeature, setShowFeature] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [alertMessageSuccess, setAlertMessageSuccess] = useState(false);
  const [alertMessageError, setAlertMessageError] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const date = new Date(`${data.createdAt || Date.now()}`);
  const time = date.getHours();
  const { quantity, liked } = useSelector((state) => state.post.like);
  const dispath = useDispatch();

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

  const handleLiked = () => {
    dispath(likePost(data._id, currentUserId));
    // setLiked((prev) => !prev);

    // try {
    //   await axios.put(`http://localhost:8080/api/posts/${data._id}/like`, {
    //     userId: currentUserId,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    // setLiked((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/posts/${data._id}`, {
        data: {
          userId: currentUserId,
        },
      });
      setAlertMessageSuccess(true);
    } catch (error) {
      console.log(error);
      setAlertMessageError(true);
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
    return dataRender.map((item, index) => (
      <div
        key={index}
        className={cx("item-feature")}
        onClick={() => handleClickFeature(item.action)}
      >
        <div className={cx("item-icon")}>{item.icon}</div>
        <div className={cx("item-title")}>{item.title}</div>
      </div>
    ));
  };

  return (
    <>
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
          <Tippy
            interactive
            visible={showFeature}
            placement="bottom-end"
            render={(attrs) => (
              <div className={cx("feature-post")} tabIndex="1" {...attrs}>
                <PopperWrapper>
                  {adminPost._id === currentUserId
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
              <span>{quantity ? quantity : data.likes.length} Likes</span>
            </p>
            <p className={cx("parameter-commented-shared")}>
              <span>{data.comments.length} comments</span>
              <span>{data.shares.length} shares</span>
            </p>
          </div>
        )}

        <div className={cx("actions")}>
          <div className={cx("like")} onClick={() => handleLiked}>
            {liked || data.likes.includes(currentUserId) ? (
              <span>
                <FaHeart />
              </span>
            ) : (
              <FaRegHeart />
            )}
            <p>Like</p>
          </div>
          <div className={cx("comment")} onClick={() => setShowComment(true)}>
            <FaRegCommentAlt /> <p>Comment</p>
          </div>
          <div className={cx("share")}>
            <RiShareLine /> <p>Share</p>
          </div>
        </div>
        {showComment && (
          <div className={cx("comments")}>
            <div className={cx("write-comments")}>
              <AvatarUser src={avatar ? avatar : noAvatar} isActive={true} />
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
              <div className={cx("item-comments")}>
                <AvatarUser src={avatar ? avatar : noAvatar} />
                <div className={cx("item-body")}>
                  <div className={cx("item-body-content")}>
                    <h4 className={cx("body-username")}>Hao Quang</h4>
                    <p className={cx("body-para")}>
                      Chúc con hay ăn chóng lớn cả đời bình an khỏe mạnh và may
                      mắn hạnh phúc
                    </p>
                  </div>
                  <div className={cx("body-actions")}>
                    <div className={cx("actions-like")}>
                      <FiHeart />
                      <span>3</span>
                    </div>
                    <div className={cx("actions-reply")}>
                      <BsReply />
                      <span>20</span>
                    </div>
                    <div className={cx("time-comment")}>7h</div>
                  </div>
                  <div className={cx("replies")}>
                    <div className={cx("item-reply")}>
                      <AvatarUser
                        src={avatar ? avatar : noAvatar}
                        sizeSmall={true}
                      />
                      <div className={cx("item-body")}>
                        <div className={cx("item-body-content")}>
                          <h4 className={cx("body-username")}>Hanh Le</h4>
                          <p className={cx("body-para")}>
                            Chúc con hay ăn chóng lớn cả đời bình an khỏe mạnh
                            và may mắn hạnh phúc
                          </p>
                        </div>
                        <div className={cx("body-actions")}>
                          <div className={cx("actions-like")}>
                            <FiHeart />
                            <span>3</span>
                          </div>
                          <div className={cx("actions-reply")}>
                            <BsReply />
                            <span>20</span>
                          </div>
                          <div className={cx("time-comment")}>7h</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={cx("item-comments")}>
                <AvatarUser src={avatar ? avatar : noAvatar} />
                <div className={cx("item-body")}>
                  <div className={cx("item-body-content")}>
                    <h4 className={cx("body-username")}>Hao Quang</h4>
                    <p className={cx("body-para")}>
                      Chúc con hay ăn chóng lớn cả đời bình an khỏe mạnh và may
                      mắn hạnh phúc
                    </p>
                  </div>
                  <div className={cx("body-actions")}>
                    <div className={cx("actions-like")}>
                      <FiHeart />
                      <span>3</span>
                    </div>
                    <div className={cx("actions-reply")}>
                      <BsReply />
                      <span>20</span>
                    </div>
                    <div className={cx("time-comment")}>7h</div>
                  </div>
                </div>
              </div>

              <div className={cx("item-comments")}>
                <div className={cx("avatar")}>
                  <AvatarUser src={avatar ? avatar : noAvatar} />
                </div>
                <div className={cx("item-body")}>
                  <div className={cx("item-body-content")}>
                    <h4 className={cx("body-username")}>Hao Quang</h4>
                    <p className={cx("body-para")}>
                      Chúc con hay ăn chóng lớn cả đời bình an khỏe mạnh và may
                      mắn hạnh phúc
                    </p>
                  </div>
                  <div className={cx("body-actions")}>
                    <div className={cx("actions-like")}>
                      <FiHeart />
                      <span>3</span>
                    </div>
                    <div className={cx("actions-reply")}>
                      <BsReply />
                      <span>20</span>
                    </div>
                    <div className={cx("time-comment")}>7h</div>
                  </div>
                  <div className={cx("replies")}>
                    <div className={cx("item-reply")}>
                      <AvatarUser
                        src={avatar ? avatar : noAvatar}
                        sizeSmall={true}
                      />
                      <div className={cx("item-body")}>
                        <div className={cx("item-body-content")}>
                          <h4 className={cx("body-username")}>Hanh Le</h4>
                          <p className={cx("body-para")}>
                            Chúc con hay ăn chóng lớn cả đời bình an khỏe mạnh
                            và may mắn hạnh phúc
                          </p>
                        </div>
                        <div className={cx("body-actions")}>
                          <div className={cx("actions-like")}>
                            <FiHeart />
                            <span>3</span>
                          </div>
                          <div className={cx("actions-reply")}>
                            <BsReply />
                            <span>20</span>
                          </div>
                          <div className={cx("time-comment")}>7h</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {openModalEdit && (
        <ModalPost
          open={openModalEdit}
          setOpen={setOpenModalEdit}
          userId={currentUserId}
          idPost={data._id}
          avatar={adminPost.avatar}
          username={adminPost.username}
          contentEdit={data.desc}
          imageEdit={data.image}
          typeCreate={false}
        />
      )}
      {openConfirmDelete && (
        <Modal
          open={openConfirmDelete}
          onClose={() => setOpenConfirmDelete(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={cx("modal-header")}>
              <h3 className={cx("header-heading")}>Confirm Delete</h3>
            </div>
            <div className={cx("modal-body")}>
              <h3 className={cx("modal-content")}>
                Bạn có chắc chắn muốn xóa bài post này không?
              </h3>
              <div className={cx("btn-confirm")}>
                <Button
                  variant="contained"
                  color="error"
                  className={cx("btn-delete")}
                  size="large"
                  onClick={() => {
                    handleDelete();
                    setOpenConfirmDelete(false);
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }}
                >
                  Xác nhận
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setOpenConfirmDelete(false)}
                >
                  Hủy
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      )}
      {alertMessageSuccess && <AlertMessage content="Delete successfully!!!" />}
      {alertMessageError && (
        <AlertMessage isError={true} content="Delete error!!!" />
      )}
    </>
  );
};

Post.propTypes = {
  data: PropTypes.object,
  currentUserId: PropTypes.string,
  avatar: PropTypes.string,
};

export default Post;
