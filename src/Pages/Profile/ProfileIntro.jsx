import PropTypes from "prop-types";
import { dataProfile } from "../../Utils/dataItem";
import classnames from "classnames/bind";
import styles from "./Profile.module.scss";
import { formatDateUser } from "../../Utils/formatDate";

const cx = classnames.bind(styles);
const ProfileIntro = ({
  data,
  setOpenModalEditProfile,
  setSite,
  currentUserId,
  userId,
}) => {
  const birthday = formatDateUser(data.date_of_birth);
  const arr = [data.city, data.from, data.desc, birthday, data.gender];
  return (
    <div className={cx("intro")}>
      <h3 className={cx("intro-title")}>Intro</h3>
      <div className={cx("intro-body")}>
        {dataProfile.map((item, index) => (
          <>
            {arr[index] && (
              <div key={index} className={cx("intro-item")}>
                <div className={cx("intro-item_icon")}>{item.icon}</div>
                <div className={cx("intro-item_text")}>
                  {item.title}
                  <span>{arr[index]}</span>
                </div>
              </div>
            )}
          </>
        ))}
        {currentUserId === userId && (
          <button
            className={cx("intro-btn_details")}
            onClick={() => {
              setSite((prev) => [
                ...prev,
                { title: "Intro", component: "SiteEditIntro" },
              ]);
              setOpenModalEditProfile(true);
            }}
          >
            Edit details
          </button>
        )}
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
        {currentUserId === userId && (
          <button
            className={cx("intro-btn_featured")}
            onClick={() => {
              setSite((prev) => [
                ...prev,
                { title: "Featured", component: "SiteEditFeatured" },
              ]);
              setOpenModalEditProfile(true);
            }}
          >
            Edit Featured
          </button>
        )}
      </div>
    </div>
  );
};

ProfileIntro.propTypes = {
  data: PropTypes.object,
  setOpenModalEditProfile: PropTypes.func,
  setSite: PropTypes.func,
  currentUserId: PropTypes.string,
  userId: PropTypes.string,
};

export default ProfileIntro;
