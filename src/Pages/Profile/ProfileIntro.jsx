import PropTypes from "prop-types";
import { dataProfile } from "../../Utils/dataProfile";
import classnames from "classnames/bind";
import styles from "./Profile.module.scss";

const cx = classnames.bind(styles);
const ProfileIntro = ({ data }) => {
  const date = new Date(`${data.date_of_birth}`);
  const birthday = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  const arr = [data.city, data.from, data.desc, birthday, data.gender];
  return (
    <div className={cx("intro")}>
      <h3 className={cx("intro-title")}>Intro</h3>
      <div className={cx("intro-body")}>
        {dataProfile.map((item, index) => (
          <div key={index} className={cx("intro-item")}>
            <div className={cx("intro-item_icon")}>{item.icon}</div>
            <div className={cx("intro-item_text")}>
              {item.title}
              <span>{arr[index]}</span>
            </div>
          </div>
        ))}
        <button className={cx("intro-btn_details")}>Edit details</button>
      </div>
      <div className={cx("intro-featured")}>
        <div className={cx("featured-img")}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMHjJI6n0gOX8eHiChogFXHkZGjfen22lSvg&usqp=CAU"
            alt="img"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXLTLi0wr-66cNR2sxxVTU3gSSAFEIp0g9FQ&usqp=CAU"
            alt="img"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDlt9tq_BYFea_YcH-0nue5vRCcBcEIm5dpg&usqp=CAU"
            alt="img"
          />
        </div>
        <button className={cx("intro-btn_featured")}>Edit Featured</button>
      </div>
    </div>
  );
};

ProfileIntro.propTypes = {
  data: PropTypes.object,
};

export default ProfileIntro;
