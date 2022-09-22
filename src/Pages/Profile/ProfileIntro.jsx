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
            src="https://scontent.fhan2-1.fna.fbcdn.net/v/t15.5256-10/293976901_1447697479060108_1972709000216760471_n.jpg?stp=dst-jpg_p296x100&_nc_cat=103&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=a7-RLpC2mTsAX8PZjwu&_nc_oc=AQmu8StyxlyprQRe9EOh7OSNYyrp5HvzkkfC7r0sgKQ4GjLXPsvQV14HiamKT8iePH4&_nc_ht=scontent.fhan2-1.fna&oh=00_AT-HQJGbUdC8AVqp6UutdwYKxI7NcBqRuKlC8jU4aJB97w&oe=631B0762"
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
