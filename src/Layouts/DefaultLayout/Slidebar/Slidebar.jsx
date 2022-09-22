import classnames from "classnames/bind";
import styles from "./Slidebar.module.scss";
import SlidebarNav from "./SlidebarNav";
import SlidebarProfile from "./SlidebarProfile";

const cx = classnames.bind(styles);
const Slidebar = () => {
  return (
    <div className={cx("wrapper")}>
      <SlidebarProfile />
      <SlidebarNav />
    </div>
  );
};

export default Slidebar;
