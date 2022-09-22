import PropTypes from "prop-types";
import classnames from "classnames/bind";
import styles from "./Stories.module.scss";

const cx = classnames.bind(styles);
const StoryItem = ({ avatar, username, background }) => {
   return (
      <div className={cx("story-item")}>
         <img src={background} className={cx("item-background")} alt="background" />
         <div className={cx("avatar")}>
            <img src={avatar} alt="avatar" />
         </div>
         <div className={cx("username")}>
            {username}
         </div>
      </div>
   )
};

StoryItem.propTypes = {
   avatar: PropTypes.string,
   username: PropTypes.string,
   background: PropTypes.string,
};

export default StoryItem;
