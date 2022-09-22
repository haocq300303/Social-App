import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Message.module.scss";

const cx = classNames.bind(styles);

const FeatureItem = ({ icon, title, setShow }) => {
   return (
      <div className={cx("faeture-item")} onClick={() => setShow(prev => !prev)} >
         <div className={cx("feature-icon")}>
            {icon}
         </div>
         <p className={cx("feature-title")}>{title}</p>
      </div>
   )
};

FeatureItem.propTypes = {
   icon: PropTypes.node,
   title: PropTypes.string,
   setShow: PropTypes.func
};

export default FeatureItem;
