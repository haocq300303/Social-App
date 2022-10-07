import { GrAdd } from "react-icons/gr";
import PropTypes from "prop-types";
import classnames from "classnames/bind";
import styles from "./Stories.module.scss";

const cx = classnames.bind(styles);
const ListStory = (props) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h3>Your Story</h3>
        <div className={cx("create-story")}>
          <div className={cx("icon")}>
            <GrAdd />
          </div>
          <div className={cx("content")}>
            <p className={cx("content-title")}>Create a Story</p>
            <span className={cx("content-text")}>
              Share a photo or write something
            </span>
          </div>
        </div>
      </div>
      <div className={cx("list-group")}>
        <h3>All Stories</h3>
        <div className={cx("main-story")}>
          <div className={cx("story-item")}>
            <div className={cx("avatar")}>
              <img src="" alt="avatar" />
            </div>
            <div className={cx("info")}>
              <div className={cx("username")}>Hào Chu Quang</div>
              <div className={cx("detail-content")}>
                <span className={cx("quantity-story")}>1 new</span>
                <p className={cx("time")}>32m</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ListStory.propTypes = {};

export default ListStory;
