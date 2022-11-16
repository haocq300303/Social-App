import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classnames from "classnames/bind";
import styles from "./ModalEditProfile.module.scss";
import { dataProfile } from "../../../Utils/dataItem";
import { MdEdit } from "react-icons/md";
import noAvatar from "../../../Assets/images/noAvatar.png";
import noBackground from "../../../Assets/images/noBackground.png";
import { formatDateUser } from "../../../Utils/formatDate";

const cx = classnames.bind(styles);

const MainSite = ({ setSite, setOpen }) => {
  const inforUser = useSelector((state) => state.user.data);
  const birthday = formatDateUser(inforUser.date_of_birth);
  const arr = [
    inforUser.city,
    inforUser.from,
    inforUser.desc,
    birthday,
    inforUser.gender,
  ];
  return (
    <div className={cx("main-site")}>
      <div className={cx("main-item")}>
        <div className={cx("item-header")}>
          <h3 className={cx("main-title")}>Profile Picture</h3>
          <div
            className={cx("action-edit")}
            onClick={() =>
              setSite((prev) => [
                ...prev,
                {
                  title: "Profile Picture",
                  component: "SiteEditProfilePicture",
                },
              ])
            }
          >
            <span>
              <MdEdit />
            </span>
            <span>Edit</span>
          </div>
        </div>
        <div className={cx("main-image")}>
          <img
            src={inforUser.avatar ? inforUser.avatar : noAvatar}
            alt=""
            className={cx("main-image-avatar")}
          />
        </div>
      </div>
      <div className={cx("main-item")}>
        <div className={cx("item-header")}>
          <h3 className={cx("main-title")}>Cover Photo</h3>
          <div
            className={cx("action-edit")}
            onClick={() =>
              setSite((prev) => [
                ...prev,
                { title: "Cover Photo", component: "SiteEditCoverPhoto" },
              ])
            }
          >
            <span>
              <MdEdit />
            </span>
            <span>Edit</span>
          </div>
        </div>
        <div className={cx("main-image")}>
          <img
            src={inforUser.background ? inforUser.background : noBackground}
            alt=""
            className={cx("main-image-background")}
          />
        </div>
      </div>
      <div className={cx("main-item")}>
        <div className={cx("item-header")}>
          <h3 className={cx("main-title")}>Customize Your Intro</h3>
          <div
            className={cx("action-edit")}
            onClick={() =>
              setSite((prev) => [
                ...prev,
                { title: "Intro", component: "SiteEditIntro" },
              ])
            }
          >
            <span>
              <MdEdit />
            </span>
            <span>Edit</span>
          </div>
        </div>
        <div className={cx("main-intro")}>
          {dataProfile.map((item, index) => (
            <div key={index} className={cx("intro-item")}>
              <div className={cx("intro-item_icon")}>{item.icon}</div>
              <div className={cx("intro-item_text")}>
                {item.title}
                <span>{arr[index]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={cx("main-item")}>
        <div className={cx("item-header")}>
          <h3 className={cx("main-title")}>Featured</h3>
          <div
            className={cx("action-edit")}
            onClick={() =>
              setSite((prev) => [
                ...prev,
                { title: "Featured", component: "SiteEditFeatured" },
              ])
            }
          >
            <span>
              <MdEdit />
            </span>
            <span>Edit</span>
          </div>
        </div>
        <div className={cx("main-featured")}>
          <img
            src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t15.5256-10/293976901_1447697479060108_1972709000216760471_n.jpg?stp=dst-jpg_p296x100&_nc_cat=103&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=HzLat5j4c0MAX_Dzmq9&_nc_oc=AQnMdYombvqCT-R9u7gn2_ou5ecygIAnCNU7iGvcTbX6GVDQ3AY6sn6oLkrcFMOvi10&_nc_ht=scontent.fsgn2-2.fna&oh=00_AT_KC_WAS9OscFpgost2B0BgTyEsrQHwRQWSnaV_vJMV5A&oe=635C49A2"
            alt=""
            className={cx("main-featured_image")}
          />
          <img
            src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t15.5256-10/293976901_1447697479060108_1972709000216760471_n.jpg?stp=dst-jpg_p296x100&_nc_cat=103&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=HzLat5j4c0MAX_Dzmq9&_nc_oc=AQnMdYombvqCT-R9u7gn2_ou5ecygIAnCNU7iGvcTbX6GVDQ3AY6sn6oLkrcFMOvi10&_nc_ht=scontent.fsgn2-2.fna&oh=00_AT_KC_WAS9OscFpgost2B0BgTyEsrQHwRQWSnaV_vJMV5A&oe=635C49A2"
            alt=""
            className={cx("main-featured_image")}
          />
          <img
            src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t15.5256-10/293976901_1447697479060108_1972709000216760471_n.jpg?stp=dst-jpg_p296x100&_nc_cat=103&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=HzLat5j4c0MAX_Dzmq9&_nc_oc=AQnMdYombvqCT-R9u7gn2_ou5ecygIAnCNU7iGvcTbX6GVDQ3AY6sn6oLkrcFMOvi10&_nc_ht=scontent.fsgn2-2.fna&oh=00_AT_KC_WAS9OscFpgost2B0BgTyEsrQHwRQWSnaV_vJMV5A&oe=635C49A2"
            alt=""
            className={cx("main-featured_image")}
          />
        </div>
      </div>
      <button
        className={cx("btn-done")}
        onClick={() => {
          setOpen(false);
        }}
      >
        Done!
      </button>
    </div>
  );
};

MainSite.propTypes = {
  setSite: PropTypes.func,
  setOpen: PropTypes.func,
};

export default MainSite;
