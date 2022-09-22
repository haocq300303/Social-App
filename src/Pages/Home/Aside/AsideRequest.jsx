import classnames from "classnames/bind";
import styles from "./Aside.module.scss";
import RequestItem from "./RequestItem";

const cx = classnames.bind(styles);
const AsideRequest = () => {
   return (
      <div className={cx("request")}>
         <div className={cx("aside-header")}>
            <h4>Requests</h4>
            <span>3</span>
         </div>
         <div className={cx("request-body")}>
            <RequestItem username="Hao Chu Quang" />
            <RequestItem username="Hanh Le" />
         </div>
      </div>
   )
};

export default AsideRequest;
