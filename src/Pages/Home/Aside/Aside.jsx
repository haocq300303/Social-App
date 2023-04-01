import { useSelector } from "react-redux";
import classnames from "classnames/bind";
import styles from "./Aside.module.scss";
import AsideContact from "./AsideContact";
import AsideSuggested from "./AsideSuggested";

const cx = classnames.bind(styles);
const Aside = () => {
  const currentUser = useSelector((state) => state.user.currentUser.values);
  return (
    <div className={cx("wrapper")}>
      <AsideSuggested />
      {currentUser?.followers?.length > 0 && <AsideContact />}
    </div>
  );
};

export default Aside;
