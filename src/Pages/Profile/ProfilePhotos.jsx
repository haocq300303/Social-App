import classnames from "classnames/bind";
import styles from "./Profile.module.scss";

const cx = classnames.bind(styles);
const ProfilePhotos = () => {
  return (
    <div className={cx("photos")}>
      <h3 className={cx("photos-title")}>Photos</h3>
      <div className={cx("photos-body")}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcGzrJw7HMwdoP8BuPzXtj27U_368ghRM-mQ&usqp=CAU"
          alt="img"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXLTLi0wr-66cNR2sxxVTU3gSSAFEIp0g9FQ&usqp=CAU"
          alt="img"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3p_GYD-noXtARAIpycTt1_8r3_twTLwA67Q&usqp=CAU"
          alt="img"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Hevx5APOrB8EJC_Sah7_EMPConRzu4CFnA&usqp=CAU"
          alt="img"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCGrRYyUNtmV8cwYLyV4XoRGpvOLwZWGPH3g&usqp=CAU"
          alt="img"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ejM0ub-X90OkOxsYar8UfHKiRWYERup6dg&usqp=CAU"
          alt="img"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlSLy7kY_ft3jm-IJ9DjzLv9IvHzXQrMsUrw&usqp=CAU"
          alt="img"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDlt9tq_BYFea_YcH-0nue5vRCcBcEIm5dpg&usqp=CAU"
          alt="img"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBNOCB6TMa1yVRdoAMOfrNPlAQQHCls8y8Rw&usqp=CAU"
          alt="img"
        />
      </div>
    </div>
  );
};

export default ProfilePhotos;
