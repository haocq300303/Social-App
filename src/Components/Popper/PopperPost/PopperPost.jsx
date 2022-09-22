import PropTypes from "prop-types";
import { dataPost } from "../../../Utils/dataPost";
import Tippy from "@tippyjs/react/headless";
import PopperWrapper from "../Popper";
import classnames from "classnames/bind";
import styles from "./PopperPost.module.scss";

const cx = classnames.bind(styles);

const PopperPost = ({ children, show, setShow }) => {
  return (
    <div>
      <Tippy
        interactive
        visible={show}
        placement="bottom-end"
        render={(attrs) => (
          <div className={cx("feature-post")} tabIndex="1" {...attrs}>
            <PopperWrapper>
              {dataPost.map((item, index) => (
                <div key={index} className={cx("item-feature")}>
                  <div className={cx("item-icon")}>{item.icon}</div>
                  <div className={cx("item-title")}>{item.title}</div>
                </div>
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={() => setShow((prev) => !prev)}
      >
        {children}
      </Tippy>
    </div>
  );
};

PopperPost.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  setShow: PropTypes.func,
};

export default PopperPost;
