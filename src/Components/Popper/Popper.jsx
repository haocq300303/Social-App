import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Popper.module.scss";

const cx = classNames.bind(styles);

const PopperWrapper = ({ children }) => {
   return (
      <div className={cx("wrapper")}>
         {children}
      </div>
   )
};

PopperWrapper.propTypes = {
   children: PropTypes.node
};

export default PopperWrapper;