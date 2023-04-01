import { NavLink } from "react-router-dom";
import { dataShortcuts, dataNav } from "../../../Utils/dataItem";
import { CgMenuGridO } from "react-icons/cg";
import { BsLink45Deg } from "react-icons/bs";
import classnames from "classnames/bind";
import styles from "./Slidebar.module.scss";

const cx = classnames.bind(styles);

const SlidebarNav = () => {
  return (
    <div className={cx("slidebar-nav")}>
      <div className={cx("nav-menu")}>
        <div className={cx("nav-icon")}>
          <CgMenuGridO />
        </div>
        <p className={cx("title")}>Menu</p>
      </div>
      <nav className={cx("nav")}>
        {dataNav.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={(navData) =>
              navData.isActive ? cx("nav-link", "active") : cx("nav-link")
            }
          >
            <div className={cx("icon")}>{item.icon}</div>
            <p className={cx("title")}>{item.title}</p>
          </NavLink>
        ))}
      </nav>
      <div className={cx("nav-shortcuts")}>
        <div className={cx("suggested-nav")}>
          <div className={cx("nav-icon")}>
            <BsLink45Deg />
          </div>
          <p className={cx("title")}>Shortcuts</p>
        </div>
        <div className={cx("shortcuts-body")}>
          {dataShortcuts.map((item, index) => (
            <div key={index} className={cx("shortcuts-item")}>
              <div className={cx("shortcuts-item_img")}>
                <img src={item.image} alt="background" />
              </div>
              <div className={cx("shortcuts-item_title")}>{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlidebarNav;
