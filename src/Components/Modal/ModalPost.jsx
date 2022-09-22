import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import noAvatar from "../../Assets/images/noAvatar.png";
import { CgClose } from "react-icons/cg";
import { BsFileImage } from "react-icons/bs";
import { MdOutlineAttachFile } from "react-icons/md";
import { GoSmiley } from "react-icons/go";
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

const ModalPost = ({ avatar, open, setOpen }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={cx("modal-header")}>
          <h2 className={cx("header-heading")}>Create Post</h2>
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
            <p className={cx("username")}>Hào Chu Quangg</p>
          </div>
          <div className={cx("modal-content")}>
            <textarea
              cols="30"
              rows="2"
              placeholder="What's on your mind?"
              className={cx("desc")}
            />
            <div className={cx("icon")}>
              <div className={cx("actions")}>
                <div className={cx("icon-image")}>
                  <BsFileImage />
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
              <img
                src="https://hanoimoi.com.vn/Uploads/images/phananh/2020/06/11/sinhthai1.jpg"
                alt="img"
              />
              <div className={cx("close-image")}>
                <CgClose />
              </div>
            </div>
          </div>
          <button className={cx("btn-post")}>Post!</button>
        </div>
      </Box>
    </Modal>
  );
};

ModalPost.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  avatar: PropTypes.string,
};

export default ModalPost;
