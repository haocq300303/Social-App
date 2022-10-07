import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import noAvatar from "../../Assets/images/noAvatar.png";
import { CgClose } from "react-icons/cg";
import { BsFileImage } from "react-icons/bs";
import { MdOutlineAttachFile } from "react-icons/md";
import { GoSmiley } from "react-icons/go";
import { CircularProgress } from "@mui/material";
import classnames from "classnames/bind";
import styles from "./Modal.module.scss";

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
}) => {
  const [showImg, setShowImg] = useState(true);
  const [contentPost, setContentPost] = useState(contentEdit);
  const [imageSelected, setImageSelected] = useState(imageEdit);
  const [loading, setLoading] = useState(false);

  const handleChangeImg = async (value) => {
    const data = new FormData();
    data.append("file", value);
    data.append("upload_preset", "cbop0txi");
    data.append("cloud_name", "dsvfqgd20");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dsvfqgd20/image/upload",
        data
      );
      setImageSelected(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/posts", {
        userId,
        desc: contentPost,
        image: imageSelected,
      });
      setLoading(false);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/posts/${idPost}`, {
        userId,
        desc: contentPost,
        image: imageSelected,
      });
      setLoading(false);
      setOpen(false);
    } catch (error) {
      console.log(error);
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
            onClick={contentEdit ? handleEdit : handleCreate}
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
};

export default ModalPost;
