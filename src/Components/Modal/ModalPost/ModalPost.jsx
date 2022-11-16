import PropTypes from "prop-types";
import {
  createPost,
  updatePost,
  uploadImage,
} from "../../../Services/postService";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../Features/postsSlice";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import noAvatar from "../../../Assets/images/noAvatar.png";
import { CgClose } from "react-icons/cg";
import { BsFileImage } from "react-icons/bs";
import { MdOutlineAttachFile } from "react-icons/md";
import { GoSmiley } from "react-icons/go";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import classnames from "classnames/bind";
import styles from "./Modal.module.scss";
import { getPostsForUser } from "../../../Features/postsForUserSlice";

const cx = classnames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow:
    "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;",
};

const ModalPost = ({
  userId = "",
  idPost = "",
  username = "",
  avatar = "",
  open = false,
  setOpen,
  contentEdit = "",
  imageEdit = "",
  typeCreate = true,
  isPageProfile = false,
}) => {
  const [showImg, setShowImg] = useState(true);
  const [contentPost, setContentPost] = useState(contentEdit);
  const [imageSelected, setImageSelected] = useState(imageEdit);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const handleChangeImg = async (value) => {
    const data = new FormData();
    data.append("file", value);
    data.append("upload_preset", "cbop0txi");
    data.append("cloud_name", "dsvfqgd20");
    try {
      const res = await uploadImage(data);
      setImageSelected(res.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      if (contentPost) {
        await createPost(userId, contentPost, imageSelected);
        setLoading(false);
        setOpen(false);
        toast.success("Create post successfully!!");
        if (isPageProfile) {
          dispatch(getPostsForUser(currentUser._id));
        } else {
          dispatch(getPosts(currentUser._id));
        }
      } else {
        toast.error("Empty content!!!");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Create post failed!!");
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      await updatePost(idPost, userId, contentPost, imageSelected);
      setLoading(false);
      setOpen(false);
      toast.success("Edit post successfully!!");
      if (isPageProfile) {
        dispatch(getPostsForUser(currentUser._id));
      } else {
        dispatch(getPosts(currentUser._id));
      }
    } catch (error) {
      toast.error("Edit post failed!!");
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={cx("modal-header")}>
          <h2 className={cx("header-heading")}>
            {typeCreate ? "Create" : "Edit"} Post
          </h2>
          <div className={cx("close-modal")} onClick={() => setOpen(false)}>
            <CgClose />
          </div>
        </div>
        <div className={cx("modal-body")}>
          <div className={cx("modal-info")}>
            <img
              src={avatar ? avatar : noAvatar}
              alt="avatar"
              className={cx("avatar")}
            />
            <p className={cx("username")}>{username}</p>
          </div>
          <div className={cx("modal-content")}>
            <textarea
              value={contentPost}
              cols="30"
              rows="2"
              placeholder="What's on your mind?"
              spellCheck={false}
              className={cx("desc")}
              onChange={(e) => setContentPost(e.target.value)}
            />
            <div className={cx("icon")}>
              <div className={cx("actions")}>
                <div
                  className={cx("icon-image")}
                  onClick={() => setShowImg(true)}
                >
                  <BsFileImage />
                  <input
                    type="file"
                    onChange={(e) => handleChangeImg(e.target.files[0])}
                  />
                </div>
                <div className={cx("icon-file")}>
                  <MdOutlineAttachFile />
                </div>
              </div>
              <div className={cx("icon-smile")}>
                <GoSmiley />
              </div>
            </div>
            <div className={cx("image")}>
              {showImg && imageSelected ? (
                <>
                  <img src={imageSelected} alt="img" />
                  <div
                    className={cx("close-image")}
                    onClick={() => {
                      setShowImg(false);
                      setImageSelected("");
                    }}
                  >
                    <CgClose />
                  </div>
                </>
              ) : showImg && imageEdit ? (
                <>
                  <img src={imageEdit} alt="img" />
                  <div
                    className={cx("close-image")}
                    onClick={() => {
                      setShowImg(false);
                      setImageSelected("");
                    }}
                  >
                    <CgClose />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <button
            className={cx("btn-post")}
            onClick={contentEdit !== "" ? handleEdit : handleCreate}
          >
            {loading ? (
              <CircularProgress color="success" size={25} />
            ) : contentEdit ? (
              "Edit"
            ) : (
              "Post"
            )}
          </button>
        </div>
      </Box>
    </Modal>
  );
};

ModalPost.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  avatar: PropTypes.string,
  username: PropTypes.string,
  userId: PropTypes.string,
  idPost: PropTypes.string,
  typeCreate: PropTypes.bool,
  isPageProfile: PropTypes.bool,
};

export default ModalPost;
