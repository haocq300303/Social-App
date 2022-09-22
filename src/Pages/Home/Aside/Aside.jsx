import classnames from "classnames/bind";
import styles from "./Aside.module.scss";
import AsideContact from "./AsideContact";
import AsideRequest from "./AsideRequest";

const cx = classnames.bind(styles);
const Aside = () => {
   return (
      <div className={cx("wrapper")}>
         <AsideRequest />
         <AsideContact />
      </div>
   )
};

export default Aside;
