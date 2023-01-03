import { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames/bind";
import { IoImages } from "react-icons/io5";
import styles from "./ModalEditProfile.module.scss";
import { uploadImage, createPost } from "../../../Services/postService";
import {
  editAvatar,
  editCoverPhoto,
  getOneUser,
} from "../../../Services/userService";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { saveUserValues } from "../../../Features/userSlice";

const cx = classnames.bind(styles);
const SiteEditImage = ({ setSite, isEditAvatar = true }) => {
  const [image, setImage] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser.values);
  const dispatch = useDispatch();

  const handleChangeImg = async (value) => {
    const data = new FormData();
    data.append("file", value);
    data.append("upload_preset", "cbop0txi");
    data.append("cloud_name", "dsvfqgd20");
    try {
      const res = await uploadImage(data);
      if (!res.url) {
        toast.error("Choose an invalid photo, please choose another photo!!!");
        return;
      }
      setImage(res.url);
    } catch (error) {
      toast.error("Error when uploading images!!");
    }
  };

  const handleSave = async () => {
    try {
      if (isEditAvatar) {
        await editAvatar(currentUser._id, image);
        await createPost(currentUser._id, "This is my profile picture.", image);
      } else {
        await editCoverPhoto(currentUser._id, image);
        await createPost(currentUser._id, "This is my cover photo.", image);
      }
      const newDataUser = await getOneUser(currentUser._id);
      dispatch(saveUserValues(newDataUser));
      toast.success("Edit successfully!!!");
      setTimeout(() => {
        setSite((prev) => prev.slice(0, 1));
      }, 1000);
    } catch (error) {
      toast.error("Edit failed!!!");
    }
  };

  return (
    <div className={cx("site-avatar")}>
      <div className={cx("site-avatar-main")}>
        {image ? (
          <div className="">
            <img
              src={image}
              alt="avatar"
              className={
                isEditAvatar
                  ? cx("site-avatar-image")
                  : cx("site-coverPhoto-image")
              }
            />
          </div>
        ) : (
          <>
            <div className={cx("icon-upload-avatar")}>
              <IoImages />
            </div>
            <div className={cx("site-avatar-text")}>
              Please choose any image file
            </div>
            <label htmlFor="upload-avatar" className={cx("btn-upload-avatar")}>
              Upload a image
            </label>
            <input
              type="file"
              hidden
              id="upload-avatar"
              onChange={(e) => handleChangeImg(e.target.files[0])}
            />
          </>
        )}
      </div>
      <div className={cx("site-avatar-action")}>
        <button
          className={cx("btn-submit-avatar")}
          disabled={image ? false : true}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

SiteEditImage.propTypes = {
  setSite: PropTypes.func,
  isEditAvatar: PropTypes.bool,
};

export default SiteEditImage;
