import PropTypes from "prop-types";
import classnames from "classnames/bind";
import styles from "./Slidebar.module.scss";
import SlidebarNav from "./SlidebarNav";
import SlidebarProfile from "./SlidebarProfile";

const cx = classnames.bind(styles);
const Slidebar = ({ active }) => {
  return (
    <div className={active ? cx("wrapper", "active") : cx("wrapper")}>
      <SlidebarProfile />
      <SlidebarNav />
    </div>
  );
};

Slidebar.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
};

export default Slidebar;
