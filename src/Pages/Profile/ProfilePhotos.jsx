import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import classnames from "classnames/bind";
import styles from "./Profile.module.scss";
import { getAllImage } from "../../Services/postService";

const cx = classnames.bind(styles);
const ProfilePhotos = ({ idUser }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await getAllImage(idUser);
        setImages(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchImage();
  }, [idUser]);
  return (
    <div className={cx("photos")}>
      <h3 className={cx("photos-title")}>Photos</h3>
      <div className={cx("photos-body")}>
        {images && images.length > 0 ? (
          images?.map((item) => (
            <img key={item.id} src={item.image} alt="img" />
          ))
        ) : (
          <h4>No images yet</h4>
        )}
      </div>
    </div>
  );
};

ProfilePhotos.propTypes = {
  idUser: PropTypes.string,
};

export default ProfilePhotos;
